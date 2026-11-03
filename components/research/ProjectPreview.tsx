"use client"

import { Pause, Play } from "lucide-react"
import { useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

export interface PreviewVideo {
  src: string
  poster: string
  label: string
}

interface ProjectPreviewProps {
  videos: PreviewVideo[]
  href: string
  title: string
}

export function ProjectPreview({ videos, href, title }: ProjectPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [paused, setPaused] = useState(true)

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const updatePreference = () => setPaused(reducedMotion.matches)
    updatePreference()
    reducedMotion.addEventListener("change", updatePreference)
    return () => reducedMotion.removeEventListener("change", updatePreference)
  }, [])

  useEffect(() => {
    const elements = Array.from(containerRef.current?.querySelectorAll("video") ?? [])
    const visible = new Set<HTMLVideoElement>()
    let disposed = false

    const updatePlayback = () => {
      elements.forEach(video => {
        if (paused || document.hidden || !visible.has(video)) {
          video.pause()
          return
        }
        if (!video.getAttribute("src")) video.src = video.dataset.src ?? ""
        video.muted = true
        video.play().catch((error: DOMException) => {
          if (!disposed && error.name !== "AbortError") setPaused(true)
        })
      })
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const video = entry.target as HTMLVideoElement
        if (entry.isIntersecting && entry.intersectionRatio >= 0.15) visible.add(video)
        else visible.delete(video)
      })
      updatePlayback()
    }, { threshold: 0.15 })

    elements.forEach(video => observer.observe(video))
    document.addEventListener("visibilitychange", updatePlayback)

    return () => {
      disposed = true
      observer.disconnect()
      document.removeEventListener("visibilitychange", updatePlayback)
      elements.forEach(video => video.pause())
    }
  }, [paused, videos])

  return (
    <div ref={containerRef} className="relative" role="group" aria-label={`${title} video previews`}>
      <div className={cn("grid gap-2", videos.length > 1 && "sm:grid-cols-2")}>
        {videos.map(video => (
          <a
            key={video.src}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${title} — ${video.label}`}
            className="block overflow-hidden rounded-xl bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <video
              width={960}
              height={540}
              muted
              loop
              playsInline
              preload="none"
              poster={video.poster}
              data-src={video.src}
              aria-label={video.label}
              className="block aspect-video h-auto w-full object-contain"
            >
              {video.label}
            </video>
          </a>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setPaused(value => !value)}
        aria-label={paused ? "Play video previews" : "Pause video previews"}
        aria-pressed={paused}
        title={paused ? "Play video previews" : "Pause video previews"}
        className="absolute right-2 top-2 grid size-11 place-items-center rounded-full border border-white/40 bg-black/70 text-white transition-colors hover:bg-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        {paused ? <Play className="size-4" aria-hidden="true" /> : <Pause className="size-4" aria-hidden="true" />}
      </button>
    </div>
  )
}
