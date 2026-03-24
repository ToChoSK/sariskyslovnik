import { NextRequest, NextResponse } from 'next/server'
import { getTopWordsData } from '@/lib/top-words'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const limit = parseInt(searchParams.get('limit') || '10')

  const { words, source } = await getTopWordsData(limit)

  return NextResponse.json({
    words,
    source,
  })
}
