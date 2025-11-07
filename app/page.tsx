import { ArrowRight, Brain, Code, Code2, FileText, Globe, Telescope } from "lucide-react"
import Link from "next/link"

import { AnimatedLogo } from "@/components/animations/AnimatedLogo"
import { FunderSection } from "@/components/funding/FunderSection"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import publicationsData from "@/data/publications.json"
import researchData from "@/data/research.json"

export default function Home() {
  const featuredPublications = publicationsData.filter(pub => pub.featured).slice(0, 6)

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative border-b">
        <div className="section-container py-20 sm:py-24 lg:py-32">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 lg:grid-cols-[2.5fr_1fr] lg:gap-16">
            {/* Logo - Mobile Only (Top) */}
            <div className="flex animate-fade-in items-center justify-center lg:hidden">
              <AnimatedLogo className="w-full max-w-[240px]" />
            </div>

            {/* Text Content - Left Side */}
            <div className="space-y-5 lg:space-y-6">
              <h1 className="animate-fade-in text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl lg:text-[2.75rem] xl:text-5xl">
                We work at the intersection of{" "}
                <Link
                  href="/research"
                  className="group relative inline-block"
                >
                  computational neuroscience
                  <span className="absolute -bottom-0.5 left-0 h-[1px] w-full bg-foreground/25" />
                  <span className="absolute -bottom-0.5 left-0 h-[1px] w-0 bg-foreground transition-all duration-300 group-hover:w-full" />
                </Link>{" "}
                and{" "}
                <Link
                  href="/research"
                  className="group relative inline-block"
                >
                  machine learning
                  <span className="absolute -bottom-0.5 left-0 h-[1px] w-full bg-foreground/25" />
                  <span className="absolute -bottom-0.5 left-0 h-[1px] w-0 bg-foreground transition-all duration-300 group-hover:w-full" />
                </Link>
              </h1>
              <p className="animate-slide-up text-sm leading-relaxed text-muted-foreground sm:text-base lg:text-base">
                We are interested in understanding{" "}
                <Link
                  href="/publications"
                  className="group relative inline-block transition-colors hover:text-foreground"
                >
                  behavior
                  <span className="absolute -bottom-0.5 left-0 h-[1px] w-full bg-muted-foreground/30" />
                  <span className="absolute -bottom-0.5 left-0 h-[1px] w-0 bg-foreground transition-all duration-300 group-hover:w-full" />
                </Link>{" "}
                in computational terms and in reverse-engineering the algorithms of the brain.
              </p>
              <div className="flex animate-slide-up flex-wrap items-center gap-4">
                <Button asChild size="lg" className="rounded-full">
                  <Link href="/research">
                    Explore Our Research
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full">
                  <Link href="/positions">Open Positions</Link>
                </Button>
              </div>
            </div>

            {/* Logo - Desktop Only (Right Side) */}
            <div className="hidden animate-fade-in items-center justify-end lg:flex">
              <AnimatedLogo className="w-full max-w-[360px]" />
            </div>
          </div>
        </div>
      </section>

      {/* Research Overview */}
      <section className="py-24 lg:py-32">
        <div className="section-container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Research Directions
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We develop machine learning tools for behavioral and neural data analysis,
              and conversely try to learn from the brain to solve challenging machine learning problems.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-7xl gap-8 lg:grid-cols-3">
            {researchData.map((area, index) => (
              <Card
                key={area.id}
                className="group relative overflow-hidden transition-all hover:shadow-soft-lg"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-primary/10">
                    {index === 0 && <Code2 className="size-6 text-primary" />}
                    {index === 1 && <Brain className="size-6 text-primary" />}
                    {index === 2 && <Telescope className="size-6 text-primary" />}
                  </div>
                  <CardTitle className="text-xl">{area.title}</CardTitle>
                  <CardDescription className="mt-2 line-clamp-4">
                    {area.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link
                    href={`/research#${area.slug}`}
                    className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                  >
                    Learn more
                    <ArrowRight className="ml-1 size-4" />
                  </Link>
                  {area.tools && area.tools.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {area.tools.slice(0, 3).map((tool) => (
                        <Badge key={tool.name} variant="secondary" className="text-xs">
                          {tool.name}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Research */}
      <section className="bg-muted/30 py-24 lg:py-32">
        <div className="section-container">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Featured Publications
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Recent advances from our lab
              </p>
            </div>
            <Button asChild variant="outline">
              <Link href="/publications">View All</Link>
            </Button>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredPublications.map((pub) => {
              const pubWithImage = pub as typeof pub & { image?: string }
              return (
                <Card key={pub.id} className="group transition-all hover:shadow-soft-lg">
                  <CardHeader>
                    <Badge variant="outline" className="mb-3 w-fit">
                      {pub.year}
                    </Badge>
                    <CardTitle className="text-lg leading-tight transition-colors group-hover:text-primary">
                      {pub.title}
                    </CardTitle>
                    <CardDescription className="mt-2">
                      {pub.authors.join(", ")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {pubWithImage.image && (
                      <div className="overflow-hidden rounded-lg border bg-white shadow-sm dark:bg-white/90">
                        <img
                          src={pubWithImage.image}
                          alt={pub.title}
                          className="h-auto w-full"
                        />
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {pub.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">{pub.venue}</p>
                    {pub.links && (
                      <div className="flex flex-wrap gap-2">
                        {pub.links.arxiv && (
                          <Button asChild variant="outline" size="sm">
                            <a href={pub.links.arxiv} target="_blank" rel="noopener noreferrer">
                              <FileText className="mr-2 size-3" />
                              arXiv
                            </a>
                          </Button>
                        )}
                        {pub.links.biorxiv && (
                          <Button asChild variant="outline" size="sm">
                            <a href={pub.links.biorxiv} target="_blank" rel="noopener noreferrer">
                              <FileText className="mr-2 size-3" />
                              bioRxiv
                            </a>
                          </Button>
                        )}
                        {pub.links.github && (
                          <Button asChild variant="outline" size="sm">
                            <a href={pub.links.github} target="_blank" rel="noopener noreferrer">
                              <Code className="mr-2 size-3" />
                              Code
                            </a>
                          </Button>
                        )}
                        {pub.links.website && (
                          <Button asChild variant="outline" size="sm">
                            <a href={pub.links.website} target="_blank" rel="noopener noreferrer">
                              <Globe className="mr-2 size-3" />
                              Website
                            </a>
                          </Button>
                        )}
                        {pub.links.docs && (
                          <Button asChild variant="outline" size="sm">
                            <a href={pub.links.docs} target="_blank" rel="noopener noreferrer">
                              <FileText className="mr-2 size-3" />
                              Docs
                            </a>
                          </Button>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-24 lg:py-32">
        <div className="section-container">
          <div className="mx-auto max-w-4xl">
            <div className="glass-card rounded-3xl p-8 lg:p-12">
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Open Science & Community Impact
                </h2>
                <p className="mt-6 text-lg leading-8 text-muted-foreground">
                  We are passionate about open-source code and making our tools broadly accessible
                  to the scientific community.
                </p>
                <div className="mt-10 grid gap-8 sm:grid-cols-3">
                  <div>
                    <div className="text-4xl font-bold text-primary">40+</div>
                    <div className="mt-2 text-sm text-muted-foreground">Publications</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-primary">20+</div>
                    <div className="mt-2 text-sm text-muted-foreground">Open sourced tools</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-primary">2×</div>
                    <div className="mt-2 text-sm text-muted-foreground">NeurIPS Winners</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted/30 py-24 lg:py-32">
        <div className="section-container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Join Our Team
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              We are actively looking for undergraduate, master&apos;s, and PhD students with interests
              in behavioral analysis and modeling sensorimotor learning. We also regularly recruit
              postdoctoral fellows.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-x-6">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/positions">
                  View Open Positions
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                <Link href="/people">Meet the Team</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Funders Section */}
      <FunderSection />
    </div>
  )
}
