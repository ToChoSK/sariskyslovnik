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

  const lastModified = new Date().toISOString()
  const homeEntry =
    sitemapId === 0
      ? [
          '<url>',
          `<loc>${escapeXml(SITE_URL)}</loc>`,
          `<lastmod>${lastModified}</lastmod>`,
          '<changefreq>weekly</changefreq>',
          '<priority>1</priority>',
          '</url>',
        ].join('')
      : ''

  const wordEntries = getSitemapWords(sitemapId).map((entry) => {
    return [
      '<url>',
      `<loc>${escapeXml(`${SITE_URL}/slovo/${entry.url}`)}</loc>`,
      `<lastmod>${lastModified}</lastmod>`,
      '<changefreq>monthly</changefreq>',
      '<priority>0.8</priority>',
      '</url>',
    ].join('')
  }).join('')

  return new Response(
    [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      homeEntry,
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
