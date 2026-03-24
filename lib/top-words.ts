import { getTopWordPaths, isCounterConfigured } from '@/lib/cloudflare-counter'
import { getRandomWords, getWordByUrl } from '@/lib/dictionary'
import type { WordWithViews } from '@/lib/types'

export function getFallbackTopWords(limit = 10): WordWithViews[] {
  const randomWords = getRandomWords(limit)

  return randomWords.map((word, index) => ({
    ...word,
    views: Math.floor(Math.random() * 500) + (limit - index) * 50,
  }))
}

export async function getTopWordsData(limit = 10): Promise<{
  words: WordWithViews[]
  source: 'cloudflare-durable-object' | 'fallback'
}> {
  if (!isCounterConfigured()) {
    console.info('[top-words] fallback: counter is not configured')
    return {
      words: getFallbackTopWords(limit),
      source: 'fallback',
    }
  }

  try {
    const topWordUrls = await getTopWordPaths(limit)
    const missingUrls: string[] = []
    const words = topWordUrls
      .map(({ url, views }) => {
        const word = getWordByUrl(url)
        if (!word) {
          missingUrls.push(url)
          return null
        }

        return { ...word, views }
      })
      .filter((word): word is WordWithViews => Boolean(word))

    if (words.length > 0) {
      console.info('[top-words] cloudflare hit', {
        requestedLimit: limit,
        cloudflareCount: topWordUrls.length,
        mappedCount: words.length,
        missingUrls,
      })
      return {
        words,
        source: 'cloudflare-durable-object',
      }
    }

    console.info('[top-words] fallback: cloudflare returned no usable words', {
      requestedLimit: limit,
      cloudflareCount: topWordUrls.length,
      missingUrls,
    })
  } catch (error) {
    console.error('Error fetching top words:', error)
  }

  console.info('[top-words] fallback: using generated words')
  return {
    words: getFallbackTopWords(limit),
    source: 'fallback',
  }
}
