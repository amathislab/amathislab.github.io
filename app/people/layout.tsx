import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "People | Mathis Group",
  description: "Meet our team of researchers working at the intersection of neuroscience, machine learning, and computer vision.",
  openGraph: {
    title: "People | Mathis Group",
    description:
      "We are a diverse group of researchers working at the intersection of neuroscience, machine learning, and computer vision.",
  },
}

export default function PeopleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
