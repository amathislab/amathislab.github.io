"use client"

import Link from "next/link"

import fundingData from "@/data/funding.json"

export function FunderSection() {
  // Extract unique funders
  const uniqueFunders = Array.from(
    new Map(
      fundingData.map((grant) => [grant.funder.name, grant.funder])
    ).values()
  )

  return (
    <section className="border-y border-border bg-muted/20 py-8 lg:py-10">
      <div className="section-container">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Supported By
          </h2>
          <p className="mb-6 text-xs text-muted-foreground">
            We gratefully thank our funders who keep the magic alive
          </p>

          {/* Grid layout for logos */}
          <div className="grid grid-cols-3 items-center justify-items-center gap-6 sm:grid-cols-4 lg:grid-cols-6">
            {uniqueFunders.map((funder) => (
              <a
                key={funder.name}
                href={funder.website}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-12 w-full items-center justify-center transition-opacity hover:opacity-100 lg:h-14"
                aria-label={`Visit ${funder.name} website`}
              >
                <img
                  src={funder.logo}
                  alt={funder.name}
                  className="max-h-full max-w-full object-contain opacity-60 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                />
              </a>
            ))}
          </div>

          {/* Link to full funding page */}
          <div className="mt-6">
            <Link
              href="/funding"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-primary transition-colors hover:text-primary/80"
            >
              View All Funding & Grants
              <svg
                className="size-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
