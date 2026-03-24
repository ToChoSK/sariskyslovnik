import { NextRequest, NextResponse } from 'next/server'
import { searchWords } from '@/lib/dictionary'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q') || ''
  const limit = parseInt(searchParams.get('limit') || '20')

  if (query.length < 1) {
    return NextResponse.json({ results: [] })
  }

  const results = searchWords(query, Math.min(limit, 50))

  return NextResponse.json({ 
    results,
    query,
    count: results.length 
  })
}
