import { NextRequest, NextResponse } from 'next/server'
import { getTopWords, isKVConfigured } from '@/lib/cloudflare-kv'
import { getWordByUrl, getRandomWords } from '@/lib/dictionary'
import type { WordWithViews } from '@/lib/types'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const limit = parseInt(searchParams.get('limit') || '10')

  // If KV is not configured, return random popular words as fallback
  if (!isKVConfigured()) {
    const randomWords = getRandomWords(limit)
    const fallbackWords: WordWithViews[] = randomWords.map((word, index) => ({
      ...word,
      views: Math.floor(Math.random() * 100) + (limit - index) * 10, // Fake view counts for demo
    }))
    
    return NextResponse.json({ 
      words: fallbackWords,
      source: 'fallback',
      message: 'Cloudflare KV nie je nakonfigurovaný. Zobrazujú sa náhodné slová.'
    })
  }

  try {
    const topWordUrls = await getTopWords(limit)
    
    // Get full word data for each top word
    const words: WordWithViews[] = []
    for (const { url, views } of topWordUrls) {
      const word = getWordByUrl(url)
      if (word) {
        words.push({ ...word, views })
      }
    }

    return NextResponse.json({ 
      words,
      source: 'cloudflare-kv'
    })
  } catch (error) {
    console.error('Error fetching top words:', error)
    
    // Fallback to random words on error
    const randomWords = getRandomWords(limit)
    const fallbackWords: WordWithViews[] = randomWords.map((word, index) => ({
      ...word,
      views: Math.floor(Math.random() * 100) + (limit - index) * 10,
    }))
    
    return NextResponse.json({ 
      words: fallbackWords,
      source: 'fallback',
      error: 'Failed to fetch from Cloudflare KV'
    })
  }
}
