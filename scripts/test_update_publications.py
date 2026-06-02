#!/usr/bin/env python3
"""Tests for update_publications.py."""

from __future__ import annotations

import unittest
from unittest.mock import patch

import update_publications as up


REQUIRED_ENTRY_KEYS = (
    "id",
    "title",
    "authors",
    "year",
    "venue",
    "type",
    "tags",
    "links",
    "featured",
)

MEMBER_KEYS = {
    ("c", "li"): "Chengkun Li",
    ("b", "ziliotto"): "Bianca Ziliotto",
    ("m", "simos"): "Merkourios Simos",
    ("a", "chiappa"): "Alberto Chiappa",
}

ARTICLES = [
    {
        "citation_id": "a",
        "title": "MuscleMimic",
        "year": "2026",
        "authors": "C Li, C Wang, B Ziliotto, M Simos, A Mathis",
        "publication": "arXiv preprint, 2026",
    },
    {
        "citation_id": "b",
        "title": "External collab",
        "year": "2024",
        "authors": "J Doe, R Roe, A Mathis",
        "publication": "Nature, 2024",
    },
    {
        "citation_id": "c",
        "title": "Truncated",
        "year": "2025",
        "authors": "A Mathis, X One, Y Two, ...",
        "publication": "Some J, 2025",
    },
    {
        "citation_id": "d",
        "title": "Solo",
        "year": "2023",
        "authors": "A Mathis",
        "publication": "J Things, 2023",
    },
]

FULL_AUTHORS = {"c": "A Mathis, X One, Y Two, AS Chiappa"}


def full_authors(article: dict) -> str:
    return FULL_AUTHORS.get(article["citation_id"], "")


class AuthorMatching(unittest.TestCase):
    def test_author_key_full_and_abbreviated_collapse(self):
        self.assertEqual(up.author_key("Alberto Chiappa"), up.author_key("AS Chiappa"))
        self.assertEqual(up.author_key("Alexander Mathis"), ("a", "mathis"))
        self.assertEqual(up.author_key("C Li*"), ("c", "li"))

    def test_author_key_compound_surname(self):
        self.assertEqual(
            up.author_key("Alessandro Marin Vargas"),
            up.author_key("A Marin Vargas"),
        )

    def test_author_key_unparseable(self):
        self.assertIsNone(up.author_key("Madonna"))
        self.assertIsNone(up.author_key(""))

    def test_build_member_keys_excludes_pi(self):
        people = [
            {"id": "alexander-mathis", "name": "Alexander Mathis"},
            {"id": "x", "name": "Merkourios Simos"},
        ]

        keys = up.build_member_keys(people, "alexander-mathis")

        self.assertIn(("m", "simos"), keys)
        self.assertNotIn(("a", "mathis"), keys)

    def test_matched_members_distinct(self):
        keys = {("c", "li"): "Chengkun Li", ("m", "simos"): "Merkourios Simos"}

        found = up.matched_members("C Li, X Other, M Simos, A Mathis", keys)

        self.assertEqual(found, {"Chengkun Li", "Merkourios Simos"})

    def test_is_truncated(self):
        self.assertTrue(up.is_truncated("A Mathis, B C, ..."))
        self.assertTrue(up.is_truncated("A Mathis, B C, \u2026"))
        self.assertFalse(up.is_truncated("A Mathis, B C"))


class Heuristics(unittest.TestCase):
    def test_infer_type(self):
        self.assertEqual(up.infer_type("arXiv preprint arXiv:2503.1"), "preprint")
        self.assertEqual(up.infer_type("Proceedings of NeurIPS 2024"), "conference")
        self.assertEqual(up.infer_type("Nature neuroscience 21 (9), 2018"), "journal")

    def test_clean_venue(self):
        self.assertEqual(
            up.clean_venue("Nature neuroscience 21 (9), 1281-1289, 2018"),
            "Nature neuroscience",
        )

    def test_normalize_title_dedup(self):
        self.assertEqual(
            up.normalize_title("LLaVAction: Multi-Modal LLMs!"),
            up.normalize_title("llavaction multi modal llms"),
        )

    def test_parse_year_fallback(self):
        self.assertEqual(up.parse_year({"year": "2025"}), 2025)
        self.assertEqual(up.parse_year({"publication": "Some J, 2019"}), 2019)
        self.assertEqual(up.parse_year({}), 0)


class EntryShape(unittest.TestCase):
    def test_make_entry_has_render_required_keys(self):
        entry = up.make_entry(
            {
                "title": "A Paper",
                "authors": "C Li, A Mathis",
                "year": "2025",
                "publication": "arXiv preprint, 2025",
            },
            used_ids=set(),
        )

        for key in REQUIRED_ENTRY_KEYS:
            self.assertIn(key, entry)

        self.assertEqual(entry["tags"], [])
        self.assertEqual(entry["type"], "preprint")
        self.assertEqual(entry["authors"], ["C Li", "A Mathis"])

    def test_make_entry_unique_ids(self):
        used: set[str] = set()

        first = up.make_entry({"title": "Same", "year": "2025"}, used)
        second = up.make_entry({"title": "Same", "year": "2025"}, used)

        self.assertNotEqual(first["id"], second["id"])


class Selection(unittest.TestCase):
    def select(self, **kwargs):
        return up.select_new_publications(
            ARTICLES,
            MEMBER_KEYS,
            existing_titles=set(),
            used_ids=set(),
            full_authors_fn=full_authors,
            **kwargs,
        )

    def test_qualifying_and_truncation(self):
        added, stats = self.select()

        titles = {entry["title"] for entry in added}
        truncated = next(entry for entry in added if entry["title"] == "Truncated")

        self.assertEqual(titles, {"MuscleMimic", "Truncated"})
        self.assertEqual(stats["author_fetches"], 1)
        self.assertFalse(stats["author_fetch_capped"])
        self.assertEqual(truncated["_matched_members"], ["Alberto Chiappa"])

    def test_since_year_floor(self):
        added, _ = self.select(since_year=2026)

        self.assertEqual({entry["title"] for entry in added}, {"MuscleMimic"})

    def test_dedup_against_existing(self):
        added, _ = up.select_new_publications(
            ARTICLES,
            MEMBER_KEYS,
            existing_titles={up.normalize_title("MuscleMimic")},
            used_ids=set(),
            full_authors_fn=full_authors,
        )

        self.assertNotIn("MuscleMimic", {entry["title"] for entry in added})

    def test_fetch_cap_is_surfaced(self):
        added, stats = self.select(max_author_fetches=0)

        self.assertEqual({entry["title"] for entry in added}, {"MuscleMimic"})
        self.assertTrue(stats["author_fetch_capped"])

    def test_enrich_fn_invoked_per_entry(self):
        seen = []

        self.select(enrich_fn=lambda entry: seen.append(entry["title"]))

        self.assertEqual(set(seen), {"MuscleMimic", "Truncated"})


class Enrichment(unittest.TestCase):
    def enrich(self, entry: dict, *, crossref=None, arxiv=None) -> None:
        with patch.object(up, "crossref_lookup", return_value=crossref), patch.object(
            up, "arxiv_lookup", return_value=arxiv
        ):
            up.enrich_entry(entry, "ua")

    def test_never_downgrades_published_to_preprint(self):
        entry = {"title": "T", "type": "journal", "venue": "X", "links": {}}

        self.enrich(
            entry,
            crossref={"venue": "bioRxiv", "type": "preprint", "doi": "10.1101/x"},
        )

        self.assertEqual(entry["type"], "journal")
        self.assertEqual(entry["venue"], "X")
        self.assertNotIn("doi", entry["links"])

    def test_upgrades_preprint_to_published(self):
        entry = {"title": "T", "type": "preprint", "venue": "arXiv", "links": {}}

        self.enrich(entry, crossref={"venue": "Cell", "type": "journal", "doi": ""})

        self.assertEqual(entry["type"], "journal")

    def test_adds_doi_link_for_published_match(self):
        entry = {"title": "T", "type": "preprint", "venue": "arXiv", "links": {}}

        self.enrich(
            entry,
            crossref={
                "venue": "Cell",
                "type": "journal",
                "doi": "10.1016/j.cell.2026.01.001",
            },
        )

        self.assertEqual(
            entry["links"]["doi"],
            "https://doi.org/10.1016/j.cell.2026.01.001",
        )

    def test_adds_arxiv_link(self):
        entry = {"title": "T", "type": "preprint", "venue": "", "links": {}}

        self.enrich(entry, arxiv="2508.18066")

        self.assertEqual(entry["links"]["arxiv"], "https://arxiv.org/abs/2508.18066")


if __name__ == "__main__":
    unittest.main(verbosity=2)
