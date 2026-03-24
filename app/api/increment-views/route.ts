import { NextRequest, NextResponse } from 'next/server'
import { isCounterConfigured, trackPageView } from '@/lib/cloudflare-counter'
import { getWordByUrl } from '@/lib/dictionary'

export async function POST(request: NextRequest) {
  try {
    const { wordUrl } = await request.json()

    if (!wordUrl || typeof wordUrl !== 'string') {
      return NextResponse.json({ error: 'Invalid wordUrl' }, { status: 400 })
    }

    const word = getWordByUrl(wordUrl)
    if (!word) {
      return NextResponse.json({ error: 'Word not found' }, { status: 404 })
    }

    if (!isCounterConfigured()) {
      return NextResponse.json({
        views: 0,
        wordUrl,
        source: 'fallback',
        message: 'Cloudflare counter nie je nakonfigurovaný',
      })
    }

    const views = await trackPageView(`/slovo/${wordUrl}`)

    return NextResponse.json({
      views: views ?? 0,
      wordUrl,
      source: 'cloudflare-durable-object',
    })
  } catch (error) {
    console.error('Error incrementing views:', error)
    return NextResponse.json({ error: 'Failed to increment views' }, { status: 500 })
  }
}
