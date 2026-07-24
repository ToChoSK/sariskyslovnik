import { notFound } from 'next/navigation'
import {
  SITE_URL,
  escapeXml,
  getSitemapCount,
  getSitemapWords,
} from '@/lib/sitemap'

export const revalidate = 86400

type SitemapParams = {
  params: Promise<{
    id: string
  }>
}

export function generateStaticParams() {
  return Array.from({ length: getSitemapCount() }, (_, id) => ({
    id: String(id),
  }))
}

export async function GET(_request: Request, { params }: SitemapParams): Promise<Response> {
  const { id } = await params
  const sitemapId = Number(id)

  if (!Number.isInteger(sitemapId) || sitemapId < 0 || sitemapId >= getSitemapCount()) {
    notFound()
  }

  const wordEntries = getSitemapWords(sitemapId).map((entry) => {
    return [
      '<url>',
      `<loc>${escapeXml(`${SITE_URL}/slovo/${entry.url}`)}</loc>`,
      '<lastmod>2026-07-24</lastmod>',
      '<changefreq>monthly</changefreq>',
      '<priority>0.7</priority>',
      '</url>',
    ].join('')
  }).join('')

  return new Response(
    [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      wordEntries,
      '</urlset>',
    ].join(''),
    {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
      },
    },
  )
}
