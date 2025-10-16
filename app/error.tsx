'use client'

import { Home, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react'

import { Button } from '@/components/ui/button'


export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center">
      <div className="section-container text-center">
        <h1 className="text-6xl font-bold text-muted-foreground">Error</h1>
        <h2 className="mt-4 text-2xl font-bold tracking-tight">
          Something went wrong
        </h2>
        <p className="mx-auto mt-4 max-w-md text-lg text-muted-foreground">
          We encountered an unexpected error. Please try again or return to the home page.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Button onClick={reset}>
            <RefreshCw className="mr-2 size-4" />
            Try Again
          </Button>
          <Button asChild variant="outline">
            <Link href="/">
              <Home className="mr-2 size-4" />
              Go Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
