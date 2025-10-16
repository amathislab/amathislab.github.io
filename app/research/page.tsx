import { ExternalLink, Github, FileText, Globe } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import researchData from "@/data/research.json"

import { CopyLinkButton } from "./CopyLinkButton"
import { ReadMoreSection } from "./ReadMoreSection"
import { StickyLocalNav } from "./StickyLocalNav"

export const metadata = {
  title: "Research | Mathis Group",
  description: "Our research directions in computational neuroscience and machine learning.",
  openGraph: {
    title: "Research | Mathis Group",
    description: "We develop machine learning tools for behavioral and neural data analysis, and learn from the brain to solve challenging ML problems.",
  },
}

// Type-safe interfaces for research data
interface Tool {
  name: string
  description: string
  github?: string
  arxiv?: string
  paper?: string
  website?: string
}

interface ResearchArea {
  id: string
  title: string
  slug: string
  description: string
  extended?: string
  featured?: boolean
  tools?: Tool[]
  image?: string | string[]
}

// Media mosaic with lazy loading
function MediaMosaic({ images, title }: { images: string[]; title: string }) {
  if (images.length === 0) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-xl border border-dashed bg-muted/30">
        <p className="text-sm text-muted-foreground">Media coming soon</p>
      </div>
    )
  }

  if (images.length === 1) {
    return (
      <figure className="overflow-hidden rounded-xl ring-1 ring-border/50">
        <img
          src={images[0]}
          alt={title}
          loading="lazy"
          decoding="async"
          className="h-auto w-full transition-transform duration-200 hover:scale-[1.01]"
        />
        <figcaption className="sr-only">{title}</figcaption>
      </figure>
    )
  }

  const gridClass =
    images.length === 2
      ? "grid-cols-1 sm:grid-cols-2"
      : images.length === 3
        ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"

  return (
    <div className={`grid gap-3 ${gridClass}`}>
      {images.map((img, idx) => (
        <figure
          key={idx}
          className="group relative aspect-[4/3] overflow-hidden rounded-xl ring-1 ring-border/50 transition-all duration-200 hover:scale-[1.01] hover:shadow-lg"
        >
          <img
            src={img}
            alt={`${title} - Figure ${idx + 1}`}
            loading="lazy"
            decoding="async"
            className="size-full object-cover"
          />
          <figcaption className="sr-only">
            {title} - Figure {idx + 1}
          </figcaption>
        </figure>
      ))}
    </div>
  )
}

// Tool card with link guards
function ToolCard({ tool }: { tool: Tool }) {
  const hasLinks = Boolean(tool.github || tool.arxiv || tool.paper || tool.website)

  // Dev warning for tools without links
  if (!hasLinks && process.env.NODE_ENV === "development") {
    console.warn(`Tool "${tool.name}" has no links`)
  }

  return (
    <Card className="group relative rounded-2xl border bg-card/60 transition-all duration-200 hover:shadow-md supports-[backdrop-filter]:bg-card/50">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-base">
          {tool.name}
          {tool.github && (
            <Github className="size-4 text-muted-foreground" aria-hidden="true" />
          )}
        </CardTitle>
        <CardDescription className="text-sm">{tool.description}</CardDescription>
      </CardHeader>
      {hasLinks && (
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {tool.github && (
              <Button asChild variant="ghost" size="sm">
                <a href={tool.github} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 size-3" aria-hidden="true" />
                  <span>GitHub</span>
                  <ExternalLink className="ml-2 size-3" aria-hidden="true" />
                  <span className="sr-only">Opens in new tab</span>
                </a>
              </Button>
            )}
            {tool.arxiv && (
              <Button asChild variant="ghost" size="sm">
                <a href={tool.arxiv} target="_blank" rel="noopener noreferrer">
                  <FileText className="mr-2 size-3" aria-hidden="true" />
                  <span>arXiv</span>
                  <ExternalLink className="ml-2 size-3" aria-hidden="true" />
                  <span className="sr-only">Opens in new tab</span>
                </a>
              </Button>
            )}
            {tool.paper && (
              <Button asChild variant="ghost" size="sm">
                <a href={tool.paper} target="_blank" rel="noopener noreferrer">
                  <FileText className="mr-2 size-3" aria-hidden="true" />
                  <span>Paper</span>
                  <ExternalLink className="ml-2 size-3" aria-hidden="true" />
                  <span className="sr-only">Opens in new tab</span>
                </a>
              </Button>
            )}
            {tool.website && (
              <Button asChild variant="ghost" size="sm">
                <a href={tool.website} target="_blank" rel="noopener noreferrer">
                  <Globe className="mr-2 size-3" aria-hidden="true" />
                  <span>Website</span>
                  <ExternalLink className="ml-2 size-3" aria-hidden="true" />
                  <span className="sr-only">Opens in new tab</span>
                </a>
              </Button>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  )
}

// Research area card
function AreaCard({ area, index }: { area: ResearchArea; index: number }) {
  const images = Array.isArray(area.image) ? area.image : area.image ? [area.image] : []

  return (
    <div
      id={area.slug}
      className="animate-in fade-in slide-in-from-bottom-4 scroll-mt-28 duration-500"
      style={{ animationDelay: `${index * 100}ms`, animationFillMode: "backwards" }}
    >
      <Card className="relative overflow-hidden rounded-2xl border bg-card/60 supports-[backdrop-filter]:bg-card/50">
        <CardHeader className="bg-muted/30 pb-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <Badge variant="outline" className="mb-4">
                Research Direction {index + 1}
              </Badge>
              <CardTitle className="mb-4 text-3xl">{area.title}</CardTitle>
              <CardDescription className="text-base leading-relaxed">
                {area.description}
              </CardDescription>
            </div>
            <CopyLinkButton slug={area.slug} />
          </div>
        </CardHeader>

        <CardContent className="space-y-8 pt-8">
          {area.extended && <ReadMoreSection text={area.extended} />}

          <MediaMosaic images={images} title={area.title} />

          {area.tools && area.tools.length > 0 && (
            <div>
              <h3 className="mb-4 text-lg font-semibold">Key Tools & Projects</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {area.tools.map((tool) => (
                  <ToolCard key={tool.name} tool={tool} />
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default function ResearchPage() {
  const typedResearchData = researchData as ResearchArea[]
  const hasAnyTools = typedResearchData.some((area) => area.tools && area.tools.length > 0)

  return (
    <div className="flex flex-col">
      {/* Enhanced Hero Section */}
      <section className="relative border-b bg-muted/30 pb-12 pt-24 lg:pb-16">
        <div className="section-container">
          <div className="mx-auto max-w-2xl space-y-6 text-center sm:space-y-8">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Research</h1>
            <p className="text-lg leading-8 text-muted-foreground">
              We develop machine learning tools for behavioral and neural data analysis, and
              conversely learn from the brain to solve challenging machine learning problems.
            </p>
          </div>
        </div>
      </section>

      {/* Sticky Navigation */}
      <StickyLocalNav areas={typedResearchData} />

      {/* Research Areas */}
      <section className="py-16 lg:py-24">
        <div className="section-container max-w-5xl">
          <div className="space-y-24">
            {typedResearchData.map((area, index) => (
              <AreaCard key={area.id} area={area} index={index} />
            ))}
          </div>

          {/* Empty state for tools */}
          {!hasAnyTools && (
            <div className="mt-12 text-center">
              <p className="text-sm text-muted-foreground">
                Tools & projects will be posted soon.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Mission Statement */}
      <section className="bg-muted/30 py-24">
        <div className="section-container">
          <div className="glass-card mx-auto max-w-2xl rounded-3xl p-8 lg:p-12">
            <h2 className="mb-6 text-center text-2xl font-bold">Our Mission</h2>
            <div className="space-y-6">
              <p className="text-lg leading-relaxed text-muted-foreground">
                Our work strives to understand how the brain creates complex behavior. We develop
                tools for measuring behavior to achieve that goal, while ensuring they are broadly
                accessible to the community.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                We make models and theories to elucidate how the brain gives rise to behavior with
                a specific focus on motor control and sensorimotor learning. Measuring behavior is
                key for assessing and constraining these models.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
