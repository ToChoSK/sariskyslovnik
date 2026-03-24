import { NextRequest, NextResponse } from 'next/server'
import {
  getPageViewCount,
  isCounterConfigured,
  toTrackedPath,
  trackPageView,
} from '@/lib/cloudflare-counter'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get('path')
  if (!path) {
    return NextResponse.json({ error: 'Missing path' }, { status: 400 })
  }

  const normalizedPath = toTrackedPath(path)

  if (!isCounterConfigured()) {
    return NextResponse.json({
      path: normalizedPath,
      views: 0,
      source: 'fallback',
    })
  }

  const views = await getPageViewCount(normalizedPath)

  return NextResponse.json({
    path: normalizedPath,
    views: views ?? 0,
    source: 'cloudflare-durable-object',
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const path = typeof body?.path === 'string' ? body.path : ''
    if (!path) {
      return NextResponse.json({ error: 'Missing path' }, { status: 400 })
    }

    const normalizedPath = toTrackedPath(path)

    if (!isCounterConfigured()) {
      return NextResponse.json({
        path: normalizedPath,
        views: 0,
        source: 'fallback',
      })
    }

    const views = await trackPageView(normalizedPath)

    return NextResponse.json({
      path: normalizedPath,
      views: views ?? 0,
      source: 'cloudflare-durable-object',
    })
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }
}
