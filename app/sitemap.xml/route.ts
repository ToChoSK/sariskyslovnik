import { getSitemapCount, SITE_URL, escapeXml } from '@/lib/sitemap'

export const revalidate = 86400

export function GET(): Response {
  const lastModified = new Date().toISOString()
  const entries = Array.from({ length: getSitemapCount() }, (_, id) => {
    return [
      '<sitemap>',
      `<loc>${escapeXml(`${SITE_URL}/sitemaps/${id}`)}</loc>`,
      `<lastmod>${lastModified}</lastmod>`,
      '</sitemap>',
    ].join('')
  }).join('')

  return new Response(
    [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      entries,
      '</sitemapindex>',
    ].join(''),
    {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
      },
    },
  )
}
