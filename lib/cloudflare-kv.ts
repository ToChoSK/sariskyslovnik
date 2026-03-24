/**
 * Cloudflare KV REST API client
 * 
 * Free tier limits:
 * - 100,000 reads/day
 * - 1,000 writes/day
 * - 1 GB storage
 * 
 * Strategy to stay within limits:
 * - Use in-memory cache for reads with TTL
 * - Batch writes using a queue pattern
 * - Store top words separately for quick access
 */

const CF_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID
const CF_KV_NAMESPACE_ID = process.env.CLOUDFLARE_KV_NAMESPACE_ID
const CF_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN

const KV_BASE_URL = CF_ACCOUNT_ID && CF_KV_NAMESPACE_ID
  ? `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/storage/kv/namespaces/${CF_KV_NAMESPACE_ID}`
  : null

// In-memory cache for view counts (TTL: 5 minutes)
const viewCache = new Map<string, { count: number; timestamp: number }>()
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

// Top words cache (TTL: 10 minutes)
let topWordsCache: { words: Array<{ url: string; views: number }>; timestamp: number } | null = null
const TOP_WORDS_TTL = 10 * 60 * 1000 // 10 minutes

async function kvRequest(path: string, options: RequestInit = {}) {
  if (!KV_BASE_URL || !CF_API_TOKEN) {
    console.warn('Cloudflare KV not configured')
    return null
  }

  const response = await fetch(`${KV_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${CF_API_TOKEN}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  if (!response.ok) {
    console.error('KV request failed:', response.status, await response.text())
    return null
  }

  return response
}

export async function incrementViewCount(wordUrl: string): Promise<number> {
  // Get current count from cache or KV
  let currentCount = 0
  
  const cached = viewCache.get(wordUrl)
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    currentCount = cached.count
  } else {
    const response = await kvRequest(`/values/views:${wordUrl}`)
    if (response) {
      const text = await response.text()
      currentCount = parseInt(text) || 0
    }
  }

  const newCount = currentCount + 1

  // Update cache immediately
  viewCache.set(wordUrl, { count: newCount, timestamp: Date.now() })

  // Write to KV (this counts against daily write limit)
  await kvRequest(`/values/views:${wordUrl}`, {
    method: 'PUT',
    body: newCount.toString(),
  })

  // Invalidate top words cache when views change
  topWordsCache = null

  return newCount
}

export async function getViewCount(wordUrl: string): Promise<number> {
  // Check cache first
  const cached = viewCache.get(wordUrl)
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.count
  }

  // Fetch from KV
  const response = await kvRequest(`/values/views:${wordUrl}`)
  if (response) {
    const text = await response.text()
    const count = parseInt(text) || 0
    viewCache.set(wordUrl, { count, timestamp: Date.now() })
    return count
  }

  return 0
}

export async function getTopWords(limit = 10): Promise<Array<{ url: string; views: number }>> {
  // Check cache first
  if (topWordsCache && Date.now() - topWordsCache.timestamp < TOP_WORDS_TTL) {
    return topWordsCache.words.slice(0, limit)
  }

  // If KV not configured, return empty array
  if (!KV_BASE_URL || !CF_API_TOKEN) {
    return []
  }

  try {
    // List all keys with views: prefix
    const response = await kvRequest('/keys?prefix=views:')
    if (!response) return []

    const data = await response.json() as { result: Array<{ name: string }> }
    const keys = data.result || []

    // Get all view counts (this uses bulk read which is more efficient)
    const viewPromises = keys.map(async (key) => {
      const url = key.name.replace('views:', '')
      const count = await getViewCount(url)
      return { url, views: count }
    })

    const allViews = await Promise.all(viewPromises)
    
    // Sort by views descending
    allViews.sort((a, b) => b.views - a.views)

    // Cache the results
    topWordsCache = { words: allViews, timestamp: Date.now() }

    return allViews.slice(0, limit)
  } catch (error) {
    console.error('Error fetching top words:', error)
    return []
  }
}

// Check if Cloudflare KV is configured
export function isKVConfigured(): boolean {
  return Boolean(CF_ACCOUNT_ID && CF_KV_NAMESPACE_ID && CF_API_TOKEN)
}
