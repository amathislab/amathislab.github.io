"use client"

import { useEffect, useState } from "react"

export function AnimatedLogo({ className = "" }: { className?: string }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Small delay to ensure animation is visible on page load
    const timer = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={className}>
      <div
        className={`transition-all duration-[2000ms] ease-out ${
          visible
            ? 'scale-100 opacity-100'
            : 'scale-95 opacity-0'
        }`}
      >
        <img
          src="/clean_logo.svg"
          alt="Mathis Group Logo"
          className="h-auto w-full transition-shadow duration-500 dark:brightness-110 dark:drop-shadow-[0_20px_60px_rgba(255,255,255,0.18)]"
        />
      </div>
    </div>
  )
}
