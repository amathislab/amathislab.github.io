#!/usr/bin/env python3
"""Sync lab publications from the PI's Google Scholar profile.

The script adds papers that include at least one lab member besides the PI. It
uses SerpApi for Scholar data, Crossref/arXiv for optional metadata, and writes
both `data/publications.json` and a short `pr_body.md` review summary.
"""

from __future__ import annotations

import argparse
import json
import os
import re
import sys
import time
import unicodedata
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path
from typing import Callable, Iterable, Optional

ROOT = Path(__file__).resolve().parent.parent
PEOPLE_PATH = ROOT / "data" / "people.json"
PUBLICATIONS_PATH = ROOT / "data" / "publications.json"
PR_BODY_PATH = ROOT / "pr_body.md"

SERPAPI_ENDPOINT = "https://serpapi.com/search.json"
CROSSREF_ENDPOINT = "https://api.crossref.org/works"
ARXIV_ENDPOINT = "http://export.arxiv.org/api/query"

PAGE_SIZE = 100  # SerpApi max articles per author-page request
DEFAULT_MAX_AUTHOR_FETCHES = 40
DEFAULT_ENRICH_DELAY = 3.0


# Author matching
def strip_accents(text: str) -> str:
    return "".join(
        c for c in unicodedata.normalize("NFKD", text) if not unicodedata.combining(c)
    )


def normalize_token(text: str) -> str:
    """Normalize names for matching."""
    text = strip_accents(text)
    text = text.replace("*", " ").replace(".", " ")
    return re.sub(r"\s+", " ", text).strip().lower()


def author_key(name: str) -> Optional[tuple[str, str]]:
    """Return the `(first_initial, last_name_token)` matching key for a name."""
    parts = normalize_token(name).split(" ")
    if len(parts) < 2 or not parts[0] or not parts[-1]:
        return None
    return (parts[0][0], parts[-1])


def build_member_keys(people: list[dict], pi_id: str) -> dict[tuple[str, str], str]:
    """Build author-matching keys for lab members, excluding the PI."""
    keys: dict[tuple[str, str], str] = {}
    for person in people:
        if person.get("id") == pi_id:
            continue
        key = author_key(person.get("name", ""))
        if key:
            keys.setdefault(key, person["name"])
    return keys


def split_authors(authors_str: str) -> list[str]:
    return [a.strip() for a in authors_str.split(",") if a.strip()]


def is_truncated(authors_str: str) -> bool:
    """Return whether Scholar elided the author list."""
    return "..." in authors_str or "…" in authors_str


def matched_members(authors_str: str, member_keys: dict) -> set[str]:
    """Return distinct non-PI lab members found in an author string."""
    found: set[str] = set()
    for author in split_authors(authors_str):
        if author in ("...", "…"):
            continue
        key = author_key(author)
        if key and key in member_keys:
            found.add(member_keys[key])
    return found


# Venue and type helpers
PREPRINT_HINTS = ("arxiv", "biorxiv", "preprint", "openreview")
CONFERENCE_HINTS = (
    "proceedings",
    "conference",
    "neurips",
    "advances in neural",
    "icml",
    "iclr",
    "cvpr",
    "iccv",
    "eccv",
    "icra",
    "aaai",
    "workshop",
)


def infer_type(publication: str) -> str:
    low = publication.lower()
    if any(h in low for h in PREPRINT_HINTS):
        return "preprint"
    if any(h in low for h in CONFERENCE_HINTS):
        return "conference"
    return "journal"


def clean_venue(publication: str) -> str:
    """Extract a short venue name from Scholar's publication string."""
    venue = publication.split(",")[0].strip()
    venue = re.sub(r"\s+\d+\s*\(\d+\)\s*$", "", venue)
    venue = re.sub(r"\s+\d+\s*$", "", venue)
    return venue.strip() or publication.strip()


def slugify(text: str, max_words: int = 5) -> str:
    text = re.sub(r"[^a-z0-9\s-]", "", strip_accents(text).lower())
    return "-".join(text.split()[:max_words]) or "paper"


def normalize_title(title: str) -> str:
    title = re.sub(r"[^a-z0-9]+", " ", strip_accents(title).lower())
    return re.sub(r"\s+", " ", title).strip()


def parse_year(article: dict) -> int:
    try:
        return int(article.get("year"))
    except (TypeError, ValueError):
        m = re.search(r"(19|20)\d{2}", article.get("publication", "") or "")
        return int(m.group(0)) if m else 0


def make_entry(article: dict, used_ids: set[str]) -> dict:
    """Build a publications.json entry from a Scholar article."""
    title = (article.get("title") or "").strip()
    year = parse_year(article)

    base_id = f"{slugify(title)}-{year}" if year else slugify(title)
    entry_id, suffix = base_id, 2
    while entry_id in used_ids:
        entry_id = f"{base_id}-{suffix}"
        suffix += 1
    used_ids.add(entry_id)

    publication = article.get("publication", "") or ""
    return {
        "id": entry_id,
        "title": title,
        "authors": split_authors(article.get("authors", "")),
        "year": year,
        "venue": clean_venue(publication) if publication else "",
        "type": infer_type(publication),
        "tags": [],
        "links": {},
        "featured": False,
    }


# Metadata enrichment

# Crossref work types mapped to this site's publication types. Unmapped types
# leave the heuristic value unchanged.
_CROSSREF_TYPE = {
    "journal-article": "journal",
    "proceedings-article": "conference",
    "book-chapter": "journal",
    "posted-content": "preprint",
}
_CROSSREF_RANK = {"journal-article": 0, "proceedings-article": 0, "posted-content": 1}
_ARXIV_NS = {"a": "http://www.w3.org/2005/Atom"}


def _get(url: str, user_agent: str, timeout: int = 30) -> bytes:
    req = urllib.request.Request(url, headers={"User-Agent": user_agent})
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        return resp.read()


def crossref_lookup(title: str, user_agent: str) -> Optional[dict]:
    """Return Crossref metadata for an exact title match."""
    query = urllib.parse.urlencode(
        {"query.bibliographic": title, "rows": 3, "select": "title,container-title,type,DOI"}
    )
    try:
        items = json.loads(_get(f"{CROSSREF_ENDPOINT}?{query}", user_agent))
        items = items.get("message", {}).get("items", [])
    except Exception:
        return None

    target = normalize_title(title)
    hits = [it for it in items if normalize_title((it.get("title") or [""])[0]) == target]
    if not hits:
        return None
    best = min(hits, key=lambda it: _CROSSREF_RANK.get(it.get("type", ""), 2))
    container = best.get("container-title") or [""]
    return {
        "venue": container[0] if container else "",
        "type": _CROSSREF_TYPE.get(best.get("type", "")),
        "doi": best.get("DOI", ""),
    }


def arxiv_lookup(title: str, user_agent: str) -> Optional[str]:
    """Return the arXiv id for an exact title match."""
    query = urllib.parse.urlencode({"search_query": f'ti:"{title}"', "max_results": 2})
    try:
        root = ET.fromstring(_get(f"{ARXIV_ENDPOINT}?{query}", user_agent))
    except Exception:
        return None
    target = normalize_title(title)
    for entry in root.findall("a:entry", _ARXIV_NS):
        found = (entry.findtext("a:title", "", _ARXIV_NS) or "").strip()
        if normalize_title(found) == target:
            return (entry.findtext("a:id", "", _ARXIV_NS) or "").rsplit("/", 1)[-1]
    return None


def enrich_entry(entry: dict, user_agent: str, delay: float = 0.0) -> None:
    """Add Crossref and arXiv metadata in place."""
    if delay:
        time.sleep(delay)
    title = entry["title"]
    meta = crossref_lookup(title, user_agent)
    if meta:
        new_type = meta["type"]
        preprint_downgrade = entry["type"] in ("journal", "conference") and new_type == "preprint"
        if not preprint_downgrade:
            if meta["doi"]:
                entry["links"]["doi"] = f"https://doi.org/{meta['doi']}"
            if meta["venue"]:
                entry["venue"] = meta["venue"]
            if new_type:
                entry["type"] = new_type

    arxiv_id = arxiv_lookup(title, user_agent)
    if arxiv_id and "arxiv" not in entry["links"]:
        entry["links"]["arxiv"] = f"https://arxiv.org/abs/{arxiv_id}"


# Publication selection
def select_new_publications(
    articles: Iterable[dict],
    member_keys: dict,
    existing_titles: set[str],
    used_ids: set[str],
    *,
    since_year: int = 0,
    full_authors_fn: Callable[[dict], str],
    enrich_fn: Optional[Callable[[dict], None]] = None,
    max_author_fetches: int = DEFAULT_MAX_AUTHOR_FETCHES,
) -> tuple[list[dict], dict]:
    """Select new papers that include at least one non-PI lab member."""
    added: list[dict] = []
    fetches = 0
    capped = False

    for article in articles:
        title = (article.get("title") or "").strip()
        if not title or normalize_title(title) in existing_titles:
            continue

        year = parse_year(article)
        if since_year and year and year < since_year:
            continue

        authors_str = article.get("authors", "") or ""
        members = matched_members(authors_str, member_keys)

        if not members and is_truncated(authors_str):
            if fetches < max_author_fetches:
                fetches += 1
                full = full_authors_fn(article)
                if full:
                    members = matched_members(full, member_keys)
                    if members:
                        article = {**article, "authors": full}
            else:
                capped = True

        if not members:
            continue

        entry = make_entry(article, used_ids)
        entry["_matched_members"] = sorted(members)
        if enrich_fn:
            enrich_fn(entry)
        added.append(entry)
        existing_titles.add(normalize_title(title))

    return added, {"author_fetches": fetches, "author_fetch_capped": capped}


# SerpApi access
def _serpapi_get_url(url: str, api_key: str) -> dict:
    if api_key and "api_key=" not in url:
        sep = "&" if "?" in url else "?"
        url = f"{url}{sep}api_key={urllib.parse.quote(api_key)}"
    with urllib.request.urlopen(url, timeout=60) as resp:
        return json.loads(resp.read().decode("utf-8"))


def _serpapi_get(params: dict) -> dict:
    return _serpapi_get_url(
        f"{SERPAPI_ENDPOINT}?{urllib.parse.urlencode(params)}", params.get("api_key", "")
    )


def fetch_author_articles(author_id: str, api_key: str) -> list[dict]:
    """Fetch all profile articles, following SerpApi pagination links."""
    articles: list[dict] = []
    data = _serpapi_get(
        {
            "engine": "google_scholar_author",
            "author_id": author_id,
            "api_key": api_key,
            "num": PAGE_SIZE,
            "start": 0,
            "sort": "pubdate",
        }
    )
    while True:
        if "error" in data:
            raise RuntimeError(f"SerpApi error: {data['error']}")
        articles.extend(data.get("articles") or [])
        next_url = (data.get("serpapi_pagination") or {}).get("next")
        if not next_url:
            return articles
        data = _serpapi_get_url(next_url, api_key)


def fetch_full_authors(citation_id: str, author_id: str, api_key: str) -> str:
    """Fetch the full author string for a single citation."""
    if not citation_id:
        return ""
    data = _serpapi_get(
        {
            "engine": "google_scholar_author",
            "view_op": "view_citation",
            "citation_id": citation_id,
            "author_id": author_id,
            "api_key": api_key,
        }
    )
    return (data.get("citation") or {}).get("authors", "") or ""


# Configuration helpers
def find_pi(people: list[dict], pi_id: str) -> dict:
    pi = next((p for p in people if p.get("id") == pi_id), None)
    if not pi:
        raise SystemExit(f"PI '{pi_id}' not found in people.json")
    return pi


def parse_author_id(pi: dict) -> str:
    scholar = (pi.get("links") or {}).get("scholar", "")
    m = re.search(r"[?&]user=([^&]+)", scholar)
    if not m:
        raise SystemExit(f"Could not parse Scholar author id from: {scholar!r}")
    return m.group(1)


def build_user_agent(pi: dict) -> str:
    """Build a Crossref-friendly User-Agent."""
    mailto = os.environ.get("CROSSREF_MAILTO") or pi.get("email") or ""
    contact = f"; mailto:{mailto}" if mailto else ""
    return f"amathislab-pubbot/1.0 (+https://amathislab.github.io{contact})"


# Output
def render_pr_body(added: list[dict], stats: dict) -> str:
    lines = [
        "## Auto-detected publications",
        "",
        "Papers from the PI's Google Scholar profile with at least one other lab "
        "member as an author, not yet in `data/publications.json`. Venue, type, "
        "and links are enriched from Crossref/arXiv where possible.",
        "",
    ]
    if not added:
        lines.append("_No new qualifying papers found._")
    else:
        lines.append(f"Found **{len(added)}** new paper(s).")
        lines.append("")
        for e in added:
            links = " | ".join(f"[{k}]({v})" for k, v in e["links"].items()) or "-"
            lines += [
                f"### {e['title']} ({e['year']})",
                f"- **Lab members matched:** {', '.join(e.get('_matched_members', []))}",
                f"- **Authors:** {', '.join(e['authors'])}",
                f"- **Venue:** {e['venue'] or '-'} - _type:_ `{e['type']}`",
                f"- **Links:** {links}",
                "",
            ]
    if stats.get("author_fetch_capped"):
        lines += [
            "",
            f"> Warning: hit the truncation-fetch cap "
            f"({stats.get('author_fetches')} calls); some papers with long, "
            "elided author lists were not fully checked. Re-run with a "
            "`since_year` floor or a higher `MAX_AUTHOR_FETCHES` to cover them.",
        ]
    return "\n".join(lines) + "\n"


def write_outputs(added: list[dict], stats: dict) -> None:
    PR_BODY_PATH.write_text(render_pr_body(added, stats), encoding="utf-8")
    out = os.environ.get("GITHUB_OUTPUT")
    if out:
        with open(out, "a", encoding="utf-8") as fh:
            fh.write(f"added={len(added)}\n")


def main(argv: Optional[list[str]] = None) -> int:
    parser = argparse.ArgumentParser(description="Sync publications from Google Scholar")
    parser.add_argument("--pi-id", default="alexander-mathis", help="people.json id of the PI")
    parser.add_argument(
        "--since-year",
        type=int,
        default=int(os.environ.get("SINCE_YEAR") or 0),
        help="Only consider papers published in/after this year (0 = no floor)",
    )
    parser.add_argument(
        "--no-enrich",
        action="store_true",
        default=bool(os.environ.get("NO_ENRICH")),
        help="Skip Crossref/arXiv metadata enrichment",
    )
    parser.add_argument(
        "--max-author-fetches",
        type=int,
        default=int(os.environ.get("MAX_AUTHOR_FETCHES") or DEFAULT_MAX_AUTHOR_FETCHES),
        help="Cap on truncation-resolving SerpApi citation calls per run",
    )
    parser.add_argument(
        "--enrich-delay",
        type=float,
        default=float(os.environ.get("ENRICH_DELAY") or DEFAULT_ENRICH_DELAY),
        help="Seconds between enrichment passes (arXiv courtesy)",
    )
    args = parser.parse_args(argv)

    api_key = os.environ.get("SERPAPI_KEY")
    if not api_key:
        raise SystemExit("SERPAPI_KEY is not set")

    people = json.loads(PEOPLE_PATH.read_text(encoding="utf-8"))
    publications = json.loads(PUBLICATIONS_PATH.read_text(encoding="utf-8"))

    pi = find_pi(people, args.pi_id)
    author_id = parse_author_id(pi)
    member_keys = build_member_keys(people, args.pi_id)
    user_agent = build_user_agent(pi)

    articles = fetch_author_articles(author_id, api_key)
    existing_titles = {normalize_title(p.get("title", "")) for p in publications}
    used_ids = {p.get("id") for p in publications if p.get("id")}

    def full_authors(article: dict) -> str:
        return fetch_full_authors(article.get("citation_id", ""), author_id, api_key)

    def enrich(entry: dict) -> None:
        enrich_entry(entry, user_agent, args.enrich_delay)

    enrich_fn = None if args.no_enrich else enrich

    added, stats = select_new_publications(
        articles,
        member_keys,
        existing_titles=existing_titles,
        used_ids=used_ids,
        since_year=args.since_year,
        full_authors_fn=full_authors,
        enrich_fn=enrich_fn,
        max_author_fetches=args.max_author_fetches,
    )

    write_outputs(added, stats)

    if added:
        for entry in added:
            entry.pop("_matched_members", None)
        publications.extend(added)
        PUBLICATIONS_PATH.write_text(
            json.dumps(publications, indent=2, ensure_ascii=False) + "\n",
            encoding="utf-8",
        )

    print(f"Scanned {len(articles)} articles; added {len(added)} publication(s).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
