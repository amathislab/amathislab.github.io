"use client"

import { cn } from "@/lib/utils"

interface FunderLogoProps {
  name: string
  logo: string
  website?: string
  size?: "sm" | "md" | "lg"
  className?: string
}

const sizeClasses = {
  sm: "w-36 h-20",
  md: "w-48 h-28 lg:w-56 lg:h-32",
  lg: "w-64 h-36 lg:w-72 lg:h-40",
}

const containerPadding = {
  sm: "p-4",
  md: "p-5 lg:p-6",
  lg: "p-6 lg:p-8",
}

export function FunderLogo({
  name,
  logo,
  website,
  size = "md",
  className,
}: FunderLogoProps) {
  const logoElement = (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-muted/30 to-muted/60 shadow-sm transition-all duration-300",
        "group-hover:border-border group-hover:shadow-soft group-hover:from-muted/50 group-hover:to-muted/80",
        sizeClasses[size],
        containerPadding[size],
        className
      )}
    >
      <img
        src={logo}
        alt={`${name} logo`}
        className="size-full object-contain opacity-60 grayscale transition-all duration-500 ease-out group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
        style={{ mixBlendMode: "multiply" }}
      />
    </div>
  )

  if (website) {
    return (
      <a
        href={website}
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0"
        aria-label={`Visit ${name} website`}
        onClick={(e) => e.stopPropagation()}
      >
        {logoElement}
      </a>
    )
  }

  return <div className="shrink-0">{logoElement}</div>
}
