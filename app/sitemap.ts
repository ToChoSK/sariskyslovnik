import { getDictionary } from '@/lib/dictionary'
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const words = getDictionary()

  const wordEntries = words.map((word) => ({
    url: `https://www.slovniksaris.eu/slovo/${word.url}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: 'https://www.slovniksaris.eu',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    ...wordEntries,
  ]
}
