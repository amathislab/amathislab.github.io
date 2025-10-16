"use client"

import { ExternalLink, FileText, Code, Globe } from "lucide-react"
import { useEffect, useRef, useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import publicationsData from "@/data/publications.json"
import { useHeaderOffset } from "@/lib/hooks/useHeaderOffset"

export default function PublicationsPage() {
  const [selectedYear, setSelectedYear] = useState<number | null>(null)
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const filterRef = useRef<HTMLElement | null>(null)
  const [yearStickyOffset, setYearStickyOffset] = useState<number | null>(null)
  const headerOffset = useHeaderOffset()

  useEffect(() => {
    if (headerOffset === null) {
      return
    }

    const updateOffset = () => {
      const filterHeight = filterRef.current?.getBoundingClientRect().height ?? 0
      const combinedHeight = headerOffset + filterHeight

      setYearStickyOffset(prev => {
        if (prev !== null && Math.abs(prev - combinedHeight) < 0.5) {
          return prev
        }
        return combinedHeight
      })
    }

    updateOffset()
    window.addEventListener("resize", updateOffset)

    let resizeObserver: ResizeObserver | null = null
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(updateOffset)
      if (filterRef.current) {
        resizeObserver.observe(filterRef.current)
      }
    }

    return () => {
      window.removeEventListener("resize", updateOffset)
      resizeObserver?.disconnect()
    }
  }, [headerOffset])

  const years = Array.from(new Set(publicationsData.map(p => p.year))).sort((a, b) => b - a)
  const types = Array.from(new Set(publicationsData.map(p => p.type)))

  const filteredPublications = publicationsData.filter(pub => {
    if (selectedYear && pub.year !== selectedYear) return false
    if (selectedType && pub.type !== selectedType) return false
    return true
  })

  const groupedByYear = filteredPublications.reduce((acc, pub) => {
    if (!acc[pub.year]) acc[pub.year] = []
    acc[pub.year]!.push(pub)
    return acc
  }, {} as Record<number, typeof publicationsData>)

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-muted/30 pb-12 pt-24 lg:pb-16">
        <div className="section-container">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Publications
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Our research contributions spanning computational neuroscience, machine learning,
              and computer vision. For a complete list, visit our{" "}
              <a
                href="https://scholar.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Google Scholar page
              </a>.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section
        ref={filterRef}
        className="sticky top-16 z-10 border-b bg-background py-6 sm:py-8"
        style={headerOffset !== null ? { top: headerOffset } : undefined}
      >
        <div className="section-container">
          <div className="flex flex-col gap-4">
            <div className="scrollbar-hide flex items-center gap-2 overflow-x-auto pb-1">
              <span className="shrink-0 text-sm font-medium">Year:</span>
              <div className="flex items-center gap-2">
                <Button
                  variant={selectedYear === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedYear(null)}
                  className="shrink-0"
                >
                  All
                </Button>
                {years.map(year => (
                  <Button
                    key={year}
                    variant={selectedYear === year ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedYear(year)}
                    className="shrink-0"
                  >
                    {year}
                  </Button>
                ))}
              </div>
            </div>
            <div className="scrollbar-hide flex items-center gap-2 overflow-x-auto pb-1">
              <span className="shrink-0 text-sm font-medium">Type:</span>
              <div className="flex items-center gap-2">
                <Button
                  variant={selectedType === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedType(null)}
                  className="shrink-0"
                >
                  All
                </Button>
                {types.map(type => (
                  <Button
                    key={type}
                    variant={selectedType === type ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedType(type)}
                    className="shrink-0"
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Publications List */}
      <section className="py-16 lg:py-24">
        <div className="section-container max-w-5xl">
          {Object.entries(groupedByYear)
            .sort(([a], [b]) => Number(b) - Number(a))
            .map(([year, pubs]) => (
              <div key={year} className="mb-16">
                <h2
                  className="sticky top-32 mb-8 bg-background py-4 text-3xl font-bold"
                  style={yearStickyOffset !== null ? { top: yearStickyOffset } : undefined}
                >
                  {year}
                </h2>
                <div className="space-y-6">
                  {pubs.map((pub) => (
                    <Card key={pub.id} className="group transition-all hover:shadow-soft-lg">
                      <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <CardTitle className="text-xl leading-tight transition-colors group-hover:text-primary">
                              {pub.title}
                            </CardTitle>
                            <CardDescription className="mt-3">
                              {pub.authors.join(", ")}
                            </CardDescription>
                            <div className="mt-3 flex items-center gap-3 text-sm text-muted-foreground">
                              <span className="font-medium">{pub.venue}</span>
                              {pub.volume && <span>Vol. {pub.volume}</span>}
                              {pub.pages && <span>pp. {pub.pages}</span>}
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-4 flex flex-wrap gap-2">
                          {pub.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        {pub.links && (
                          <div className="flex flex-wrap gap-2">
                            {pub.links.arxiv && (
                              <Button asChild variant="outline" size="sm">
                                <a href={pub.links.arxiv} target="_blank" rel="noopener noreferrer">
                                  <FileText className="mr-2 size-4" />
                                  arXiv
                                  <ExternalLink className="ml-2 size-3" />
                                </a>
                              </Button>
                            )}
                            {pub.links.biorxiv && (
                              <Button asChild variant="outline" size="sm">
                                <a href={pub.links.biorxiv} target="_blank" rel="noopener noreferrer">
                                  <FileText className="mr-2 size-4" />
                                  bioRxiv
                                  <ExternalLink className="ml-2 size-3" />
                                </a>
                              </Button>
                            )}
                            {pub.links.github && (
                              <Button asChild variant="outline" size="sm">
                                <a href={pub.links.github} target="_blank" rel="noopener noreferrer">
                                  <Code className="mr-2 size-4" />
                                  Code
                                  <ExternalLink className="ml-2 size-3" />
                                </a>
                              </Button>
                            )}
                            {pub.links.website && (
                              <Button asChild variant="outline" size="sm">
                                <a href={pub.links.website} target="_blank" rel="noopener noreferrer">
                                  <Globe className="mr-2 size-4" />
                                  Website
                                  <ExternalLink className="ml-2 size-3" />
                                </a>
                              </Button>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  )
}
