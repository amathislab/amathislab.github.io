"use client"

import { Code, ExternalLink, FileText, Globe } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"

interface Publication {
  id: string
  title: string
  image?: string
  authors: string[]
  year: number
  venue: string
  type: string
  tags: string[]
  links?: {
    website?: string
    arxiv?: string
    biorxiv?: string
    github?: string
    docs?: string
  }
  featured?: boolean
}

interface ResearchHighlightProps {
  publications: Publication[]
}

export function ResearchHighlight({ publications }: ResearchHighlightProps) {
  if (!publications || publications.length === 0) return null

  const heroPub = publications[0]
  if (!heroPub) return null
  
  const gridPubs = publications.slice(1)

  const getPrimaryLink = (pub: Publication) => 
    pub.links?.website || pub.links?.arxiv || pub.links?.biorxiv || "#"

  return (
    <section className="py-24 lg:py-32">
      <div className="section-container">
        <div className="mb-16 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Latest Research
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Breakthroughs and discoveries from our lab
            </p>
          </div>
          <Button asChild variant="outline" className="hidden sm:flex">
            <Link href="/publications">View All Publications</Link>
          </Button>
        </div>

        <div className="space-y-8">
          {/* Hero Card */}
          <div className="rounded-2xl border border-border/50 bg-card p-6 lg:p-8">
            <div className="flex flex-col gap-6">
              {/* Image Container */}
              <div className="relative overflow-hidden rounded-xl bg-muted/10 dark:bg-white/95">
                {heroPub.image ? (
                  <Image
                    src={heroPub.image}
                    alt={heroPub.title}
                    width={1000}
                    height={562}
                    className="h-auto w-full object-contain"
                    priority
                  />
                ) : (
                  <div className="aspect-[2/1] w-full bg-muted/10" />
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col">
                <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="text-primary">{heroPub.venue}</span>
                  <span>•</span>
                  <span>{heroPub.year}</span>
                </div>

                <Link
                  href={getPrimaryLink(heroPub)}
                  target="_blank"
                  className="mb-3 inline-block text-xl font-bold underline decoration-1 underline-offset-2 transition-all hover:text-primary hover:decoration-2 sm:text-2xl"
                >
                  {heroPub.title}
                </Link>

                <p className="mb-5 text-sm text-muted-foreground">
                  {heroPub.authors.join(", ")}
                </p>

                <div className="flex flex-wrap gap-2">
                  {heroPub.links?.arxiv && (
                    <Button asChild variant="outline" size="sm">
                      <a href={heroPub.links.arxiv} target="_blank" rel="noopener noreferrer">
                        <FileText className="mr-2 size-4" />
                        arXiv
                        <ExternalLink className="ml-2 size-3" />
                      </a>
                    </Button>
                  )}
                  {heroPub.links?.biorxiv && (
                    <Button asChild variant="outline" size="sm">
                      <a href={heroPub.links.biorxiv} target="_blank" rel="noopener noreferrer">
                        <FileText className="mr-2 size-4" />
                        bioRxiv
                        <ExternalLink className="ml-2 size-3" />
                      </a>
                    </Button>
                  )}
                  {heroPub.links?.github && (
                    <Button asChild variant="outline" size="sm">
                      <a href={heroPub.links.github} target="_blank" rel="noopener noreferrer">
                        <Code className="mr-2 size-4" />
                        Code
                        <ExternalLink className="ml-2 size-3" />
                      </a>
                    </Button>
                  )}
                  {heroPub.links?.website && (
                    <Button asChild variant="outline" size="sm">
                      <a href={heroPub.links.website} target="_blank" rel="noopener noreferrer">
                        <Globe className="mr-2 size-4" />
                        Website
                        <ExternalLink className="ml-2 size-3" />
                      </a>
                    </Button>
                  )}
                  {heroPub.links?.docs && (
                    <Button asChild variant="outline" size="sm">
                      <a href={heroPub.links.docs} target="_blank" rel="noopener noreferrer">
                        <FileText className="mr-2 size-4" />
                        Docs
                        <ExternalLink className="ml-2 size-3" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Grid Layout */}
          <div className="grid gap-x-8 gap-y-16 md:grid-cols-2">
            {gridPubs.map((pub) => (
              <div
                key={pub.id}
                className="flex h-full flex-col rounded-xl border border-border/50 bg-card p-4"
              >
                <div className="mb-6 overflow-hidden rounded-xl bg-muted/10 dark:bg-white/95">
                  {pub.image ? (
                    <Image
                      src={pub.image}
                      alt={pub.title}
                      width={800}
                      height={450}
                      className="h-auto w-full object-contain"
                    />
                  ) : (
                    <div className="aspect-video w-full bg-muted/10" />
                  )}
                </div>

                <div className="flex flex-1 flex-col">
                  <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="text-primary">{pub.venue}</span>
                    <span>•</span>
                    <span>{pub.year}</span>
                  </div>

                  <Link
                    href={getPrimaryLink(pub)}
                    target="_blank"
                    className="mb-3 inline-block text-xl font-bold underline decoration-1 underline-offset-2 transition-all hover:text-primary hover:decoration-2"
                  >
                    {pub.title}
                  </Link>

                  <p className="mb-4 text-sm text-muted-foreground">
                    {pub.authors.join(", ")}
                  </p>

                  <div className="mt-auto flex flex-wrap gap-2 pt-2">
                    {pub.links?.arxiv && (
                      <Button asChild variant="outline" size="sm">
                        <a href={pub.links.arxiv} target="_blank" rel="noopener noreferrer">
                          <FileText className="mr-2 size-4" />
                          arXiv
                          <ExternalLink className="ml-2 size-3" />
                        </a>
                      </Button>
                    )}
                    {pub.links?.biorxiv && (
                      <Button asChild variant="outline" size="sm">
                        <a href={pub.links.biorxiv} target="_blank" rel="noopener noreferrer">
                          <FileText className="mr-2 size-4" />
                          bioRxiv
                          <ExternalLink className="ml-2 size-3" />
                        </a>
                      </Button>
                    )}
                    {pub.links?.github && (
                      <Button asChild variant="outline" size="sm">
                        <a href={pub.links.github} target="_blank" rel="noopener noreferrer">
                          <Code className="mr-2 size-4" />
                          Code
                          <ExternalLink className="ml-2 size-3" />
                        </a>
                      </Button>
                    )}
                    {pub.links?.website && (
                      <Button asChild variant="outline" size="sm">
                        <a href={pub.links.website} target="_blank" rel="noopener noreferrer">
                          <Globe className="mr-2 size-4" />
                          Website
                          <ExternalLink className="ml-2 size-3" />
                        </a>
                      </Button>
                    )}
                    {pub.links?.docs && (
                      <Button asChild variant="outline" size="sm">
                        <a href={pub.links.docs} target="_blank" rel="noopener noreferrer">
                          <FileText className="mr-2 size-4" />
                          Docs
                          <ExternalLink className="ml-2 size-3" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center sm:hidden">
            <Button asChild variant="outline" className="w-full">
              <Link href="/publications">View All Publications</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
