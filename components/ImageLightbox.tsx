"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { useEffect } from "react"

interface ImageLightboxProps {
  images: string[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  onNavigate: (index: number) => void
  title: string
}

export function ImageLightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
  title,
}: ImageLightboxProps) {
  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft" && currentIndex > 0) onNavigate(currentIndex - 1)
      if (e.key === "ArrowRight" && currentIndex < images.length - 1) onNavigate(currentIndex + 1)
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, currentIndex, images.length, onClose, onNavigate])

  // Prevent body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15, ease: "easeInOut" }}
          className="fixed inset-0 z-50"
          style={{ willChange: "opacity" }}
        >
          {/* Backdrop */}
          <button
            type="button"
            className="fixed inset-0 bg-background/80 backdrop-blur-md"
            onClick={onClose}
            aria-label="Close lightbox"
            tabIndex={-1}
          />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-20 rounded-lg p-2 text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:right-6 sm:top-6"
            aria-label="Close"
            style={{ transform: "translate3d(0, 0, 0)" }}
          >
            <X className="size-5" />
          </button>

          {/* Image container - centered and full screen */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative flex size-full items-center justify-center">
              <AnimatePresence mode="wait" custom={currentIndex}>
                <motion.img
                  key={currentIndex}
                  src={images[currentIndex]}
                  alt={`${title} - Figure ${currentIndex + 1}`}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.15, ease: "easeInOut" }}
                  className="max-h-full max-w-full object-contain"
                  style={{ willChange: "transform, opacity", transform: "translate3d(0, 0, 0)" }}
                  onClick={onClose}
                />
              </AnimatePresence>

              {/* Navigation buttons */}
              {images.length > 1 && (
                <>
                  {currentIndex > 0 && (
                    <button
                      onClick={() => onNavigate(currentIndex - 1)}
                      className="absolute left-4 rounded-lg bg-background/80 p-2 text-foreground backdrop-blur-sm transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="size-6" />
                    </button>
                  )}
                  {currentIndex < images.length - 1 && (
                    <button
                      onClick={() => onNavigate(currentIndex + 1)}
                      className="absolute right-4 rounded-lg bg-background/80 p-2 text-foreground backdrop-blur-sm transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      aria-label="Next image"
                    >
                      <ChevronRight className="size-6" />
                    </button>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Image counter */}
          {images.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-muted-foreground">
              {currentIndex + 1} / {images.length}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
