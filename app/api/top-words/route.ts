import { NextRequest, NextResponse } from 'next/server'
import { getTopWordPaths, isCounterConfigured } from '@/lib/cloudflare-counter'
import { getWordByUrl, getRandomWords } from '@/lib/dictionary'
import type { WordWithViews } from '@/lib/types'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const limit = parseInt(searchParams.get('limit') || '10')

  if (!isCounterConfigured()) {
    const randomWords = getRandomWords(limit)
    const fallbackWords: WordWithViews[] = randomWords.map((word, index) => ({
      ...word,
      views: Math.floor(Math.random() * 100) + (limit - index) * 10,
    }))

    return NextResponse.json({
      words: fallbackWords,
      source: 'fallback',
      message: 'Cloudflare counter nie je nakonfigurovaný. Zobrazujú sa náhodné slová.',
    })
  }

  try {
    const topWordUrls = await getTopWordPaths(limit)

    const words: WordWithViews[] = []
    for (const { url, views } of topWordUrls) {
      const word = getWordByUrl(url)
      if (word) {
        words.push({ ...word, views })
      }
    }

    return NextResponse.json({
      words,
      source: 'cloudflare-durable-object',
    })
  } catch (error) {
    console.error('Error fetching top words:', error)

    const randomWords = getRandomWords(limit)
    const fallbackWords: WordWithViews[] = randomWords.map((word, index) => ({
      ...word,
      views: Math.floor(Math.random() * 100) + (limit - index) * 10,
    }))

    return NextResponse.json({
      words: fallbackWords,
      source: 'fallback',
      error: 'Failed to fetch from Cloudflare counter',
    })
  }
}
