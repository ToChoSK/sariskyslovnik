'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { getPublicCounterBaseUrl, toTrackedPath } from '@/lib/cloudflare-counter'

const RECENT_TRACKS_TTL_MS = 3000
const recentTracks = new Map<string, number>()

export function CloudflarePageTracker() {
  const pathname = usePathname()

  useEffect(() => {
    const baseUrl = getPublicCounterBaseUrl()
    if (!baseUrl || !pathname) {
      return
    }

    const path = toTrackedPath(pathname)
    const lastTrackedAt = recentTracks.get(path) ?? 0
    const now = Date.now()

    if (now - lastTrackedAt < RECENT_TRACKS_TTL_MS) {
      return
    }

    recentTracks.set(path, now)

    const payload = JSON.stringify({ path })
    const endpoint = `${baseUrl}/track`
    const blob = new Blob([payload], { type: 'application/json' })

    if (navigator.sendBeacon) {
      navigator.sendBeacon(endpoint, blob)
      return
    }

    void fetch(endpoint, {
      method: 'POST',
      body: payload,
      headers: {
        'Content-Type': 'application/json',
      },
      keepalive: true,
    })
  }, [pathname])

  return null
}
