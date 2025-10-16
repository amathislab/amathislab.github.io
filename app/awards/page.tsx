import { Trophy } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata = {
  title: "Awards | Mathis Group",
  description: "Recognition and awards received by the Mathis Group.",
}

export default function AwardsPage() {
  const awards = [
    {
      date: "October 2024",
      title: "Robert Bing Prize",
      organization: "Swiss Academy of Medical Sciences (SAMS)",
      recipients: "Mackenzie and Alexander Mathis",
      description: "Honored for groundbreaking contributions to the intersection of neuroscience and machine learning",
      type: "Prize"
    },
    {
      date: "September 2024",
      title: "HackaHealth Award",
      organization: "HackaHealth",
      recipients: "Merkourios Simos",
      description: "Received for his Master's thesis in the lab on imitation learning",
      type: "Award"
    },
    {
      date: "July 2023",
      title: "Eric Kandel Young Neuroscientists Prize 2023",
      organization: "Eric Kandel Foundation",
      recipients: "Mackenzie W. Mathis and Alexander Mathis",
      description: "For uncovering the theoretical and neural basis of mechanisms underlying adaptive behaviour in intelligent systems. They developed the first animal pose estimation computer vision tool that requires little user input data.",
      type: "Prize"
    },
    {
      date: "December 2023",
      title: "MyoChallenge Track Winner at NeurIPS 2023",
      organization: "NeurIPS",
      recipients: "Team Lattice (Alessandro Marin Vargas, Alberto Chiappa, Alexander Mathis)",
      description: "Through the application of curriculum learning, reward shaping, and Lattice-driven exploration, they successfully trained a policy to control a biologically-realistic arm equipped with 63 muscles and 27 degrees of freedom.",
      type: "Competition"
    },
    {
      date: "December 2022",
      title: "Inaugural MyoChallenge Winner at NeurIPS 2022",
      organization: "NeurIPS",
      recipients: "Alberto Chiappa, Nisheet Patel, Pablo Tano, Alexandre Pouget, Alexander Mathis",
      description: "Winning solution for the inaugural NeurIPS MyoChallenge. See the Neuron paper discussing the solution and implications for biological motor control.",
      type: "Competition"
    }
  ]

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-muted/30 py-24">
        <div className="section-container">
          <div className="mx-auto max-w-2xl text-center">
            <Trophy className="mx-auto mb-6 size-12 text-primary" />
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Awards & Recognition
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Recognition for our contributions to neuroscience and machine learning
            </p>
          </div>
        </div>
      </section>

      {/* Awards List */}
      <section className="py-16 lg:py-24">
        <div className="section-container max-w-4xl">
          <div className="space-y-8">
            {awards.map((award, index) => (
              <Card key={index} className="transition-all hover:shadow-soft-lg">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-3">
                        <Badge variant="outline">{award.date}</Badge>
                        <Badge variant="secondary">{award.type}</Badge>
                      </div>
                      <CardTitle className="text-2xl">{award.title}</CardTitle>
                      <CardDescription className="mt-1 text-base">
                        {award.organization}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="mb-1 text-sm font-medium text-muted-foreground">Recipients:</p>
                      <p className="text-sm">{award.recipients}</p>
                    </div>
                    <div>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {award.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
