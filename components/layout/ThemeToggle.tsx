"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState, type ComponentProps } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type ThemeToggleProps = {
  className?: string
  size?: ComponentProps<typeof Button>["size"]
  variant?: ComponentProps<typeof Button>["variant"]
}

export function ThemeToggle({
  className,
  size = "icon",
  variant = "ghost",
}: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const currentTheme = theme === "system" ? resolvedTheme : theme
  const isDark = currentTheme === "dark"

  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark")
  }

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      onClick={handleToggle}
      aria-label="Toggle theme"
      className={cn("relative", className)}
    >
      <Sun
        className={cn(
          "size-5 transition-all duration-300",
          mounted && isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
        )}
        aria-hidden="true"
      />
      <Moon
        className={cn(
          "absolute inset-0 m-auto size-5 transition-all duration-300",
          mounted && isDark ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-0 opacity-0"
        )}
        aria-hidden="true"
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
