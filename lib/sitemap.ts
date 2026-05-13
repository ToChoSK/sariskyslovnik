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

export function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}
