"use client"

import { useEffect, useState } from "react"

import { useHeaderOffset } from "@/lib/hooks/useHeaderOffset"

interface ResearchArea {
  id: string
  title: string
  slug: string
  description: string
  extended?: string
  featured?: boolean
  tools?: unknown[]
  image?: string | string[]
}

export function StickyLocalNav({ areas }: { areas: ResearchArea[] }) {
  const [activeSlug, setActiveSlug] = useState<string>("")
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const headerOffset = useHeaderOffset()

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSlug(entry.target.id)
          }
        })
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    )

    areas.forEach((area) => {
      const element = document.getElementById(area.slug)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [areas])

  const scrollToSection = (slug: string) => {
    const element = document.getElementById(slug)
    if (element) {
      element.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" })
    }
  }

  return (
    <nav
      className="sticky top-16 z-20 border-b border-border/60 bg-background/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/80"
      style={headerOffset !== null ? { top: headerOffset } : undefined}
      aria-label="Research navigation"
    >
      <div className="section-container">
        <div className="scrollbar-hide flex gap-1.5 overflow-x-auto py-2.5 sm:gap-2 sm:py-3">
          {areas.map((area, idx) => (
            <button
              key={area.slug}
              onClick={() => scrollToSection(area.slug)}
              data-active={activeSlug === area.slug}
              aria-current={activeSlug === area.slug ? "true" : undefined}
              className="inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-1.5 text-sm transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[active=true]:bg-foreground data-[active=true]:text-background"
            >
              {idx + 1}. {area.title}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
