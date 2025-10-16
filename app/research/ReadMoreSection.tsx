"use client"

import { ChevronDown } from "lucide-react"
import { useState } from "react"

export function ReadMoreSection({ text }: { text: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        aria-expanded={isOpen}
      >
        Read more
        <ChevronDown
          className={`size-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>
      {isOpen && (
        <p className="animate-in fade-in slide-in-from-top-2 mt-3 leading-relaxed text-muted-foreground duration-200">
          {text}
        </p>
      )}
    </div>
  )
}
