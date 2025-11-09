import { Github, Mail, Youtube } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const footerLinks = {
  research: [
    { name: "Publications", href: "/publications" },
    { name: "Research Areas", href: "/research" },
    { name: "Funding", href: "/funding" },
    { name: "Awards", href: "/awards" },
  ],
  about: [
    { name: "People", href: "/people" },
    { name: "Open Positions", href: "/positions" },
    { name: "Contact", href: "/contact" },
  ],
  resources: [
    { name: "DeepLabCut", href: "https://github.com/DeepLabCut/DeepLabCut" },
    { name: "Hugging Face", href: "https://huggingface.co/amathislab" },
    { name: "Zenodo", href: "https://zenodo.org/communities/amg/" },
    { name: "BIO-210", href: "https://edu.epfl.ch/coursebook/en/applied-software-engineering-for-life-sciences-BIO-210" },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="section-container py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <h3 className="text-lg font-bold">Mathis Group</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Computational neuroscience and machine learning research at EPFL.
            </p>
            <div className="mt-4 flex gap-4">
              <a
                href="https://www.youtube.com/@amathis_group"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="YouTube"
              >
                <Youtube className="size-5" />
              </a>
              <a
                href="https://github.com/amathislab"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="GitHub"
              >
                <Github className="size-5" />
              </a>
              <a
                href="mailto:alexander.mathis@epfl.ch"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Email"
              >
                <Mail className="size-5" />
              </a>
            </div>
            <div className="mt-6">
              <a
                href="https://www.epfl.ch"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center"
                aria-label="Visit EPFL"
              >
                <Image
                  src="/images/footer/epfl_logo.png"
                  alt="EPFL"
                  width={150}
                  height={64}
                  className="h-10 w-auto dark:hidden"
                  priority={false}
                />
                <Image
                  src="/images/footer/epfl_logo_r.png"
                  alt="EPFL"
                  width={150}
                  height={64}
                  className="hidden h-10 w-auto dark:inline"
                  priority={false}
                />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Research</h4>
            <ul className="space-y-2">
              {footerLinks.research.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">About</h4>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Mathis Group, EPFL. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
