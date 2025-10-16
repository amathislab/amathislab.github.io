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
        "dark:border-white/10 dark:from-white/5 dark:to-white/[0.07]",
        "group-hover:border-border group-hover:shadow-soft group-hover:from-muted/50 group-hover:to-muted/80",
        "dark:group-hover:border-white/20 dark:group-hover:from-white/10 dark:group-hover:to-white/[0.12]",
        sizeClasses[size],
        containerPadding[size],
        className
      )}
    >
      <img
        src={logo}
        alt={`${name} logo`}
        className="size-full object-contain opacity-70 mix-blend-multiply grayscale transition-all duration-500 ease-out group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0 dark:opacity-90 dark:mix-blend-normal dark:grayscale-0"
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
