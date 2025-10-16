import { ExternalLink, Github } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import researchData from "@/data/research.json"

export const metadata = {
  title: "Research | Mathis Group",
  description: "Our research directions in computational neuroscience and machine learning.",
}

export default function ResearchPage() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-muted/30 py-24">
        <div className="section-container">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Research
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              We develop machine learning tools for behavioral and neural data analysis,
              and conversely try to learn from the brain to solve challenging machine learning problems.
            </p>
          </div>
        </div>
      </section>

      {/* Research Areas */}
      <section className="py-16 lg:py-24">
        <div className="section-container max-w-5xl">
          <div className="space-y-24">
            {researchData.map((area, index) => (
              <div key={area.id} id={area.slug} className="scroll-mt-24">
                <Card className="overflow-hidden">
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
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-8 pt-8">
                    {area.extended && (
                      <p className="leading-relaxed text-muted-foreground">
                        {area.extended}
                      </p>
                    )}

                    {area.image && (
                      <div className="not-prose">
                        {(() => {
                          const images = Array.isArray(area.image) ? area.image : [area.image]
                          if (images.length === 1) {
                            return (
                              <div className="overflow-hidden rounded-xl border bg-muted/30">
                                <img
                                  src={images[0]}
                                  alt={area.title}
                                  className="h-auto w-full"
                                />
                              </div>
                            )
                          }
                          return (
                            <div className={`grid gap-3 ${
                              images.length === 2 ? 'grid-cols-1 sm:grid-cols-2' :
                              images.length === 3 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' :
                              'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                            }`}>
                              {images.map((img, idx) => (
                                <div
                                  key={idx}
                                  className="group relative aspect-[4/3] overflow-hidden rounded-xl border bg-muted/30 transition-all hover:scale-[1.02] hover:shadow-lg"
                                >
                                  <img
                                    src={img}
                                    alt={`${area.title} - Figure ${idx + 1}`}
                                    className="size-full object-cover"
                                  />
                                </div>
                              ))}
                            </div>
                          )
                        })()}
                      </div>
                    )}

                    {area.tools && area.tools.length > 0 && (
                      <div>
                        <h3 className="mb-4 text-lg font-semibold">Key Tools & Projects</h3>
                        <div className="grid gap-4 sm:grid-cols-2">
                          {area.tools.map((tool) => (
                            <Card key={tool.name} className="group transition-all hover:shadow-soft">
                              <CardHeader>
                                <CardTitle className="flex items-center justify-between text-base">
                                  {tool.name}
                                  {tool.github && (
                                    <Github className="size-4 text-muted-foreground" />
                                  )}
                                </CardTitle>
                                <CardDescription className="text-sm">
                                  {tool.description}
                                </CardDescription>
                              </CardHeader>
                              <CardContent>
                                <div className="flex gap-2">
                                  {tool.github && (
                                    <Button asChild variant="outline" size="sm">
                                      <a
                                        href={tool.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        <Github className="mr-2 size-3" />
                                        GitHub
                                        <ExternalLink className="ml-2 size-3" />
                                      </a>
                                    </Button>
                                  )}
                                  {tool.arxiv && (
                                    <Button asChild variant="outline" size="sm">
                                      <a
                                        href={tool.arxiv}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        Paper
                                        <ExternalLink className="ml-2 size-3" />
                                      </a>
                                    </Button>
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="bg-muted/30 py-24">
        <div className="section-container">
          <div className="glass-card mx-auto max-w-4xl rounded-3xl p-8 lg:p-12">
            <h2 className="mb-6 text-center text-2xl font-bold">Our Mission</h2>
            <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
              Our work strives to understand how the brain creates complex behavior. We develop
              tools for measuring behavior to achieve that goal, while making sure that they are
              broadly accessible to the community.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Furthermore, we make models and theories to elucidate how the brain gives rise to
              behavior with a specific focus on motor control and sensorimotor learning. Measuring
              behavior is key for assessing and constraining these models.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
