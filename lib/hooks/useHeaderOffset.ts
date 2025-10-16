"use client"

import { useEffect, useState } from "react"

/**
 * Returns the dynamic offset required to position a sticky element directly
 * beneath the site header. Falls back to `null` until the height is measured
 * on the client so SSR keeps the Tailwind class fallback.
 */
export function useHeaderOffset(additionalOffset = 0) {
  const [offset, setOffset] = useState<number | null>(null)

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    const updateOffset = () => {
      const target =
        document.querySelector<HTMLElement>("[data-header-height]") ??
        document.querySelector<HTMLElement>("header")
      if (!target) {
        setOffset(additionalOffset)
        return
      }

      const { height } = target.getBoundingClientRect()
      setOffset(height + additionalOffset)
    }

    updateOffset()
    window.addEventListener("resize", updateOffset)

    let resizeObserver: ResizeObserver | null = null
    if (typeof ResizeObserver !== "undefined") {
      const target =
        document.querySelector<HTMLElement>("[data-header-height]") ??
        document.querySelector<HTMLElement>("header")
      if (target) {
        resizeObserver = new ResizeObserver(updateOffset)
        resizeObserver.observe(target)
      }
    }

    return () => {
      window.removeEventListener("resize", updateOffset)
      resizeObserver?.disconnect()
    }
  }, [additionalOffset])

  return offset
}
