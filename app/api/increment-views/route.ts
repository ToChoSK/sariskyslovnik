import { NextRequest, NextResponse } from 'next/server'
import { incrementViewCount, isKVConfigured } from '@/lib/cloudflare-kv'
import { getWordByUrl } from '@/lib/dictionary'

export async function POST(request: NextRequest) {
  try {
    const { wordUrl } = await request.json()

    if (!wordUrl || typeof wordUrl !== 'string') {
      return NextResponse.json(
        { error: 'Invalid wordUrl' },
        { status: 400 }
      )
    }

    // Verify the word exists
    const word = getWordByUrl(wordUrl)
    if (!word) {
      return NextResponse.json(
        { error: 'Word not found' },
        { status: 404 }
      )
    }

    // If KV is not configured, return a fake view count
    if (!isKVConfigured()) {
      // Generate a consistent fake view count based on word URL
      const hash = wordUrl.split('').reduce((acc, char) => {
        return char.charCodeAt(0) + ((acc << 5) - acc)
      }, 0)
      const fakeViews = Math.abs(hash % 1000) + 1
      
      return NextResponse.json({
        views: fakeViews,
        wordUrl,
        source: 'fallback',
        message: 'Cloudflare KV nie je nakonfigurovaný'
      })
    }

    // Increment view count in Cloudflare KV
    const views = await incrementViewCount(wordUrl)

    return NextResponse.json({
      views,
      wordUrl,
      source: 'cloudflare-kv'
    })
  } catch (error) {
    console.error('Error incrementing views:', error)
    return NextResponse.json(
      { error: 'Failed to increment views' },
      { status: 500 }
    )
  }
}
