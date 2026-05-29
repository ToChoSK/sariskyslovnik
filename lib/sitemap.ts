import { getDictionary } from '@/lib/dictionary'

export const SITE_URL = 'https://www.slovniksaris.eu'
export const WORDS_PER_SITEMAP = 10000

export function getSitemapCount(): number {
  return Math.ceil(getDictionary().length / WORDS_PER_SITEMAP)
}

export function getSitemapWords(id: number) {
  const start = id * WORDS_PER_SITEMAP
  return getDictionary().slice(start, start + WORDS_PER_SITEMAP)
}

export function createUrlsetSitemap(): string {
  const lastModified = new Date().toISOString()
  const homeEntry = [
    '<url>',
    `<loc>${escapeXml(SITE_URL)}</loc>`,
    `<lastmod>${lastModified}</lastmod>`,
    '<changefreq>weekly</changefreq>',
    '<priority>1</priority>',
    '</url>',
  ].join('')

  const wordEntries = getDictionary().map((entry) => {
    return [
      '<url>',
      `<loc>${escapeXml(`${SITE_URL}/slovo/${entry.url}`)}</loc>`,
      `<lastmod>${lastModified}</lastmod>`,
      '<changefreq>monthly</changefreq>',
      '<priority>0.8</priority>',
      '</url>',
    ].join('')
  }).join('')

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    homeEntry,
    wordEntries,
    '</urlset>',
  ].join('')
}

export function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}
