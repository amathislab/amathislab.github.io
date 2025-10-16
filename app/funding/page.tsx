import { Badge } from "@/components/ui/badge"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata = {
  title: "Funding | Mathis Group",
  description: "Our funding sources and grants.",
}

export default function FundingPage() {
  const grants = [
    {
      period: "2024 - 2028",
      title: "SNSF Project Grant",
      description: "Prof. Mathis was awarded another SNSF Project Grant!",
      type: "Research Grant"
    },
    {
      period: "2022 - 2026",
      title: "SNSF Project Grant",
      description: "Prof. Mathis was awarded a SNSF Project Grant!",
      type: "Research Grant"
    },
    {
      period: "2024 - 2028",
      title: "PhD Fellowship - Sepideh Mamooler",
      description: "PhD Student Sepideh Mamooler was awarded a PhD Fellowship!",
      type: "Fellowship"
    },
    {
      period: "2022 - 2026",
      title: "PhD Fellowship - Haozhe Qi",
      description: "PhD Student Haozhe Qi was awarded a PhD Fellowship!",
      type: "Fellowship"
    },
    {
      period: "2022 - 2026",
      title: "Project Funding with Prof. Bosselut",
      description: "Profs. Mathis & Bosselut are awarded project funding!",
      type: "Research Grant"
    },
    {
      period: "2022 - 2023",
      title: "Microsoft Funding",
      description: "Prof. Mathis is awarded funding from Microsoft!",
      type: "Industry"
    },
    {
      period: "2019 - 2023",
      title: "Chan Zuckerberg Initiative (CZI)",
      description: "Prof. Mathis & Prof. M. Mathis co-awarded funding from CZI!",
      type: "Foundation"
    },
    {
      period: "2021 - 2022",
      title: "Kavli Foundation",
      description: "Prof. Mathis was awarded funding from the Kavli Foundation",
      type: "Foundation"
    }
  ]

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-muted/30 py-24">
        <div className="section-container">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Funding
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              We gratefully thank our funders who keep the magic alive
            </p>
          </div>
        </div>
      </section>

      {/* Grants List */}
      <section className="py-16 lg:py-24">
        <div className="section-container max-w-4xl">
          <div className="space-y-6">
            {grants.map((grant, index) => (
              <Card key={index} className="transition-all hover:shadow-soft-lg">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-3">
                        <Badge variant="outline">{grant.period}</Badge>
                        <Badge variant="secondary">{grant.type}</Badge>
                      </div>
                      <CardTitle className="text-xl">{grant.title}</CardTitle>
                      <CardDescription className="mt-2">{grant.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="mt-12 rounded-2xl bg-muted/30 p-8 text-center">
            <p className="text-lg text-muted-foreground">
              Our research is made possible through generous support from public funding agencies,
              private foundations, and industry partners. This support enables us to pursue
              fundamental research while developing tools that benefit the broader scientific community.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
