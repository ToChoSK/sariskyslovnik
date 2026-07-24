import { getDictionary } from '@/lib/dictionary'

export const SITE_URL = 'https://www.slovniksaris.eu'
export const WORDS_PER_SITEMAP = 10000
const CONTENT_LAST_MODIFIED = '2026-07-24'
const INDEXABLE_PAGES = [
  { path: '', priority: '1', changefreq: 'weekly' },
  { path: '/o-slovniku', priority: '0.8', changefreq: 'monthly' },
  { path: '/sarisske-narecie', priority: '0.8', changefreq: 'monthly' },
  { path: '/ako-pouzivat-slovnik', priority: '0.7', changefreq: 'monthly' },
  { path: '/ochrana-sukromia', priority: '0.4', changefreq: 'yearly' },
] as const

export function getSitemapCount(): number {
  return Math.ceil(getDictionary().length / WORDS_PER_SITEMAP)
}

export function getSitemapWords(id: number) {
  const start = id * WORDS_PER_SITEMAP
  return getDictionary().slice(start, start + WORDS_PER_SITEMAP)
}

export function createUrlsetSitemap(): string {
  const editorialEntries = INDEXABLE_PAGES.map((page) => {
    return [
      '<url>',
      `<loc>${escapeXml(`${SITE_URL}${page.path}`)}</loc>`,
      `<lastmod>${CONTENT_LAST_MODIFIED}</lastmod>`,
      `<changefreq>${page.changefreq}</changefreq>`,
      `<priority>${page.priority}</priority>`,
      '</url>',
    ].join('')
  }).join('')

  const wordEntries = getDictionary().map((entry) => {
    return [
      '<url>',
      `<loc>${escapeXml(`${SITE_URL}/slovo/${entry.url}`)}</loc>`,
      `<lastmod>${CONTENT_LAST_MODIFIED}</lastmod>`,
      '<changefreq>monthly</changefreq>',
      '<priority>0.7</priority>',
      '</url>',
    ].join('')
  }).join('')

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    editorialEntries,
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
