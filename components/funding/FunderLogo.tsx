"use client"

import { cn } from "@/lib/utils"

interface FunderLogoProps {
  name: string
  logo: string
  website?: string
  size?: "sm" | "md" | "lg"
  className?: string
  grayscale?: boolean
}

const sizeClasses = {
  sm: "w-36 h-20",
  md: "w-full h-40 sm:w-56 sm:h-40",
  lg: "w-full h-48 sm:w-72 sm:h-48",
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
  grayscale = true,
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
        className={cn(
          "size-full object-contain transition-all duration-500 ease-out group-hover:scale-105",
          grayscale
            ? "opacity-70 mix-blend-multiply grayscale group-hover:opacity-100 group-hover:grayscale-0 dark:opacity-90 dark:mix-blend-normal dark:grayscale-0"
            : "opacity-90 group-hover:opacity-100 dark:opacity-100"
        )}
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
