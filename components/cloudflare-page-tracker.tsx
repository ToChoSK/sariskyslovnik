'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { toTrackedPath } from '@/lib/cloudflare-counter'

const RECENT_TRACKS_TTL_MS = 3000
const recentTracks = new Map<string, number>()

export function CloudflarePageTracker() {
  const pathname = usePathname()

  useEffect(() => {
    if (!pathname) {
      return
    }

    const path = toTrackedPath(pathname)
    const lastTrackedAt = recentTracks.get(path) ?? 0
    const now = Date.now()

    if (now - lastTrackedAt < RECENT_TRACKS_TTL_MS) {
      return
    }

    recentTracks.set(path, now)

    void fetch('/api/page-views', {
      method: 'POST',
      body: JSON.stringify({ path }),
      headers: {
        'Content-Type': 'application/json',
      },
      keepalive: true,
      cache: 'no-store',
    })
  }, [pathname])

  return null
}
