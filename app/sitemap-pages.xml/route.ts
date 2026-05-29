import { createUrlsetSitemap } from '@/lib/sitemap'

export const revalidate = 86400

export function GET(): Response {
  return new Response(createUrlsetSitemap(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  })
}
