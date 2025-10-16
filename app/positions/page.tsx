import { ArrowRight, ExternalLink } from "lucide-react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata = {
  title: "Open Positions | Mathis Group",
  description: "Join our team working on computational neuroscience and machine learning.",
}

export default function PositionsPage() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-muted/30 py-24">
        <div className="section-container">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Open Positions
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              We are actively recruiting talented individuals to join our research team
            </p>
          </div>
        </div>
      </section>

      {/* Opportunities */}
      <section className="py-16 lg:py-24">
        <div className="section-container max-w-4xl">
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <Badge variant="outline" className="mb-3">Undergraduate & Master&apos;s</Badge>
                    <CardTitle className="text-2xl">Student Researchers</CardTitle>
                    <CardDescription className="mt-2">
                      Lab immersions, Thesis, Semester projects, and internships
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground">
                  We are always actively looking for undergraduate and master&apos;s students with
                  interests in behavioral analysis and modeling sensorimotor learning.
                </p>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Research areas:</span> Machine learning tools
                    for animal behavior analysis, brain-inspired motor skill learning, proprioception
                    and sensorimotor processing
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Requirements:</span> Background in mathematics,
                    computer science, computational neuroscience, or related fields
                  </p>
                </div>
                <div className="mt-6">
                  <Button asChild>
                    <a
                      href="https://docs.google.com/forms/d/e/1FAIpQLScyKbu2Hfv24i3RClKZsAEnt8Rzo77RQ27w-VIo4fZEFk8QFg/viewform"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Express Interest (EPFL Students)
                      <ExternalLink className="ml-2 size-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <Badge variant="outline" className="mb-3">PhD</Badge>
                    <CardTitle className="text-2xl">PhD Students</CardTitle>
                    <CardDescription className="mt-2">
                      Full-time doctoral research positions
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground">
                  We regularly recruit PhD students through EPFL&apos;s doctoral programs.
                  Projects span computer vision, reinforcement learning, computational neuroscience,
                  and wildlife conservation applications.
                </p>
                <div className="space-y-3">
                  <div>
                    <h4 className="mb-1 font-medium">Apply through:</h4>
                    <div className="space-y-1">
                      <a
                        href="https://www.epfl.ch/education/phd/edne-neuroscience/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-primary hover:underline"
                      >
                        Doctoral Program in Neuroscience
                        <ExternalLink className="size-3" />
                      </a>
                      <a
                        href="https://www.epfl.ch/education/phd/edic-computer-and-communication-sciences/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-primary hover:underline"
                      >
                        Doctoral Program in Computer and Communication Sciences
                        <ExternalLink className="size-3" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Button asChild>
                    <Link href="/contact">
                      Contact Us
                      <ArrowRight className="ml-2 size-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <a
                      href="https://www.epfl.ch/education/phd/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      EPFL PhD Programs
                      <ExternalLink className="ml-2 size-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <Badge variant="outline" className="mb-3">Postdoctoral</Badge>
                    <CardTitle className="text-2xl">Postdoctoral Fellows</CardTitle>
                    <CardDescription className="mt-2">
                      Postdoctoral research positions
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground">
                  We welcome applications from postdoctoral candidates with strong backgrounds
                  in relevant fields. Several fellowship opportunities are available.
                </p>
                <div className="space-y-3">
                  <div>
                    <h4 className="mb-1 font-medium">Fellowship opportunities:</h4>
                    <div className="space-y-1">
                      <a
                        href="http://www.snf.ch/en/funding/careers/postdoc-mobility/Pages/default.aspx"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-primary hover:underline"
                      >
                        SNSF Swiss Postdoctoral Fellowship
                        <ExternalLink className="size-3" />
                      </a>
                      <a
                        href="https://www.epfl.ch/research/domains/aicenter/education/postdoctoral-fellowship/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-primary hover:underline"
                      >
                        EPFL AI Center Postdoctoral Fellowship
                        <ExternalLink className="size-3" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <Button asChild>
                    <a href="mailto:alexander.mathis@epfl.ch">
                      Contact Alexander Mathis
                      <ArrowRight className="ml-2 size-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 rounded-2xl bg-muted/30 p-8">
            <h2 className="mb-4 text-xl font-bold">Lab Culture</h2>
            <p className="mb-4 text-muted-foreground">
              We are passionate about open-source code and collaborative research. Check out our{" "}
              <a
                href="https://github.com/amathislab"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                GitHub organization
              </a>{" "}
              to see our projects and contributions.
            </p>
            <p className="text-muted-foreground">
              We are looking for motivated individuals with backgrounds in mathematics, computer
              science, computational neuroscience, and related fields. Our team is interdisciplinary,
              collaborative, and committed to advancing both fundamental science and practical applications.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
