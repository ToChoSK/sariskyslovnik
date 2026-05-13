import type { MetadataRoute } from 'next'
import { getDictionary } from '@/lib/dictionary'

const SITE_URL = 'https://www.slovniksaris.eu'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    ...getDictionary().map((entry) => ({
      url: `${SITE_URL}/slovo/${entry.url}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
