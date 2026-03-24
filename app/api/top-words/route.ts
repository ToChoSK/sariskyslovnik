import { NextRequest, NextResponse } from 'next/server'
import { getTopWordsData } from '@/lib/top-words'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const limit = parseInt(searchParams.get('limit') || '10')

  const { words, source } = await getTopWordsData(limit)
  console.info('[api/top-words]', {
    limit,
    source,
    count: words.length,
    sampleUrls: words.slice(0, 3).map((word) => word.url),
  })

  return NextResponse.json({
    words,
    source,
  })
}
