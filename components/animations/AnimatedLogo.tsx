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
          className="h-auto w-full"
        />
      </div>
    </div>
  )
}
