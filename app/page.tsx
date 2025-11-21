import { ArrowRight, Brain, Code2, Telescope } from "lucide-react"
import Link from "next/link"

import { AnimatedLogo } from "@/components/animations/AnimatedLogo"
import { FunderSection } from "@/components/funding/FunderSection"
import { ResearchHighlight } from "@/components/research/ResearchHighlight"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Aurora } from "@/components/visuals/Aurora"
import publicationsData from "@/data/publications.json"
import researchData from "@/data/research.json"

export default function Home() {
  const featuredPublications = publicationsData.filter(pub => pub.featured).slice(0, 7)

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b">
        <Aurora />
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
                  href="#research"
                  className="group relative inline-block underline decoration-foreground/40 decoration-1 underline-offset-4 transition-colors hover:decoration-foreground sm:no-underline"
                >
                  <span className="text-gradient">computational neuroscience</span>
                  <span className="absolute bottom-1 left-0 hidden h-[1px] w-full bg-foreground/25 sm:block" />
                  <span className="absolute bottom-1 left-0 hidden h-[1px] w-0 bg-foreground transition-all duration-300 group-hover:w-full sm:block" />
                </Link>{" "}
                and{" "}
                <Link
                  href="#research"
                  className="group relative inline-block underline decoration-foreground/40 decoration-1 underline-offset-4 transition-colors hover:decoration-foreground sm:no-underline"
                >
                  <span className="text-gradient">machine learning</span>
                  <span className="absolute bottom-1 left-0 hidden h-[1px] w-full bg-foreground/25 sm:block" />
                  <span className="absolute bottom-1 left-0 hidden h-[1px] w-0 bg-foreground transition-all duration-300 group-hover:w-full sm:block" />
                </Link>
              </h1>
              <p className="animate-slide-up text-sm leading-relaxed text-muted-foreground sm:text-base lg:text-base">
                We are interested in understanding{" "}
                <Link
                  href="/publications"
                  className="group relative inline-block transition-colors hover:text-foreground underline decoration-muted-foreground/50 decoration-1 underline-offset-2 hover:decoration-foreground sm:no-underline"
                >
                  behavior
                  <span className="absolute bottom-0.5 left-0 hidden h-[1px] w-full bg-muted-foreground/30 sm:block" />
                  <span className="absolute bottom-0.5 left-0 hidden h-[1px] w-0 bg-foreground transition-all duration-300 group-hover:w-full sm:block" />
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
      <ResearchHighlight publications={featuredPublications} />

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
                    <div className="text-4xl font-bold text-primary">3×</div>
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
