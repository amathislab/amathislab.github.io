"use client"

import { Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import * as React from "react"
import { createPortal } from "react-dom"

import { ThemeToggle } from "@/components/layout/ThemeToggle"
import { Button } from "@/components/ui/button"
import { useHeaderOffset } from "@/lib/hooks/useHeaderOffset"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Research", href: "/research" },
  { name: "People", href: "/people" },
  { name: "Publications", href: "/publications" },
  { name: "Awards", href: "/awards" },
  { name: "Open Positions", href: "/positions" },
  { name: "Contact", href: "/contact" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  const pathname = usePathname()
  const headerOffset = useHeaderOffset() ?? 64

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    if (!mobileMenuOpen) {
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [mobileMenuOpen])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      )}
    >
      <nav className="section-container flex items-center justify-between py-4" data-header-height>
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="text-xl font-bold tracking-tight">Mathis Group</span>
          </Link>
        </div>
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
          >
            {mobileMenuOpen ? (
              <X className="size-6" />
            ) : (
              <Menu className="size-6" />
            )}
          </Button>
        </div>
        <div className="hidden items-center gap-6 lg:flex">
          <div className="flex items-center gap-8">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname === `${item.href}/`
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "group relative text-sm font-medium transition-all duration-200",
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.name}
                  <span className={cn(
                    "absolute -bottom-1 left-0 h-0.5 bg-foreground transition-all duration-300",
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  )} />
                </Link>
              )
            })}
          </div>
          <ThemeToggle />
        </div>
      </nav>

      {/* Mobile menu */}
      {mounted &&
        mobileMenuOpen &&
        createPortal(
          <div
            id="mobile-nav"
            className="fixed inset-x-0 bottom-0 z-50 animate-slide-down overflow-y-auto border-t border-border bg-background/95 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/80 lg:hidden"
            style={{ top: headerOffset }}
          >
            <div className="section-container space-y-1 py-6">
              {navigation.map((item, index) => {
                const isActive = pathname === item.href || pathname === `${item.href}/`
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "block rounded-md px-3 py-2 text-base transition-all hover:bg-accent hover:pl-4",
                      isActive ? "bg-accent text-foreground" : "text-muted-foreground"
                    )}
                    style={{ animationDelay: `${index * 50}ms` }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </div>,
          document.body
        )}
    </header>
  )
}
