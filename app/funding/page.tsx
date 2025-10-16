import { FunderLogo } from "@/components/funding/FunderLogo"
import { Badge } from "@/components/ui/badge"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import fundingData from "@/data/funding.json"

export const metadata = {
  title: "Funding | Mathis Group",
  description: "Our funding sources and grants.",
}

export default function FundingPage() {
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
            {fundingData.map((grant) => (
              <Card key={grant.id} className="group transition-all hover:shadow-soft-lg">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    {/* Funder Logo */}
                    <FunderLogo
                      name={grant.funder.name}
                      logo={grant.funder.logo}
                      website={grant.funder.website}
                      size="md"
                    />

                    {/* Grant Content */}
                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
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
