import { Mail, MapPin, Phone } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata = {
  title: "Contact | Mathis Group",
  description: "Get in touch with the Mathis Group at EPFL.",
}

export default function ContactPage() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-muted/30 py-24">
        <div className="section-container">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Contact Us
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Get in touch with our team at EPFL&apos;s Campus Biotech
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 lg:py-24">
        <div className="section-container max-w-4xl">
          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="size-5 text-primary" />
                  Principal Investigator
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-semibold">Alexander Mathis, PhD</p>
                  <p className="text-sm text-muted-foreground">
                    Tenure Track Assistant Professor
                  </p>
                  <a
                    href="mailto:alexander.mathis@epfl.ch"
                    className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    alexander.mathis@epfl.ch
                  </a>
                  <p className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="size-4" />
                    +41 21 693 87 21
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="size-5 text-primary" />
                  Administrative Contact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-semibold">Pauline Stehli</p>
                  <p className="text-sm text-muted-foreground">Admin Assistant</p>
                  <a
                    href="mailto:pauline.stehli@epfl.ch"
                    className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    pauline.stehli@epfl.ch
                  </a>
                  <p className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="size-4" />
                    +41 21 695 52 56
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="size-5 text-primary" />
                Lab Location
              </CardTitle>
              <CardDescription>Campus Biotech, Geneva</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-1 text-sm">
                <p>Chemin des Mines 9</p>
                <p>Campus Biotech</p>
                <p>CH-1202 Genève</p>
                <p>Switzerland</p>
              </div>
            </CardContent>
          </Card>

          <div className="mt-12 rounded-2xl bg-muted/30 p-8">
            <h2 className="mb-4 text-xl font-bold">Interested in Joining?</h2>
            <p className="mb-6 text-muted-foreground">
              We are always looking for motivated individuals with backgrounds in mathematics,
              computer science, computational neuroscience, and related fields.
            </p>
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">For PhD positions:</span> Apply to the{" "}
                <a
                  href="https://www.epfl.ch/education/phd/edne-neuroscience/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Doctoral Program in Neuroscience
                </a>{" "}
                or{" "}
                <a
                  href="https://www.epfl.ch/education/phd/edic-computer-and-communication-sciences/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Doctoral Program in Computer and Communication Sciences
                </a>{" "}
                at EPFL.
              </p>
              <p>
                <span className="font-medium">For postdoctoral positions:</span> Contact Alexander
                directly with your research interests and CV. Consider applying for{" "}
                <a
                  href="http://www.snf.ch/en/funding/careers/postdoc-mobility/Pages/default.aspx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  SNSF Swiss Postdoctoral Fellowship
                </a>{" "}
                or{" "}
                <a
                  href="https://www.epfl.ch/research/domains/aicenter/education/postdoctoral-fellowship/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  EPFL AI Center Postdoctoral Fellowship
                </a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
