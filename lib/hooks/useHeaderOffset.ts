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
      const header = document.querySelector<HTMLElement>("header")
      if (!header) {
        setOffset(additionalOffset)
        return
      }

      const { height } = header.getBoundingClientRect()
      setOffset(height + additionalOffset)
    }

    updateOffset()
    window.addEventListener("resize", updateOffset)

    let resizeObserver: ResizeObserver | null = null
    if (typeof ResizeObserver !== "undefined") {
      const header = document.querySelector<HTMLElement>("header")
      if (header) {
        resizeObserver = new ResizeObserver(updateOffset)
        resizeObserver.observe(header)
      }
    }

    return () => {
      window.removeEventListener("resize", updateOffset)
      resizeObserver?.disconnect()
    }
  }, [additionalOffset])

  return offset
}
