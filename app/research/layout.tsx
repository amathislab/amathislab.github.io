import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Research | Mathis Group",
  description: "Our research directions in computational neuroscience and artificial intelligence.",
  openGraph: {
    title: "Research | Mathis Group",
    description:
      "We develop artificial intelligence tools for behavioral and neural data analysis, and learn from the brain to solve challenging ML problems.",
  },
}

export default function ResearchLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
