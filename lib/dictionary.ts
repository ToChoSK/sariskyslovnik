import type { DictionaryEntry } from './types'
import dictionaryData from '@/data/slovnik.json'

// Cache the dictionary in memory
let dictionary: DictionaryEntry[] | null = null
let urlIndex: Map<string, DictionaryEntry> | null = null

export function getDictionary(): DictionaryEntry[] {
  if (!dictionary) {
    dictionary = dictionaryData as DictionaryEntry[]
  }
  return dictionary
}

export function getUrlIndex(): Map<string, DictionaryEntry> {
  if (!urlIndex) {
    urlIndex = new Map()
    const dict = getDictionary()
    for (const entry of dict) {
      urlIndex.set(entry.url, entry)
    }
  }
  return urlIndex
}

export function getWordByUrl(url: string): DictionaryEntry | undefined {
  return getUrlIndex().get(url)
}

export function searchWords(query: string, limit = 50): DictionaryEntry[] {
  if (!query || query.length < 1) return []
  
  const normalizedQuery = query.toLowerCase().trim()
  const dict = getDictionary()
  const results: DictionaryEntry[] = []
  
  for (const entry of dict) {
    // Search in Slovak word
    if (entry.slovenske.toLowerCase().includes(normalizedQuery)) {
      results.push(entry)
      continue
    }
    
    // Search in Šariš translations
    for (const sariske of entry.sariske) {
      if (sariske.toLowerCase().includes(normalizedQuery)) {
        results.push(entry)
        break
      }
    }
  }
  
  // Sort by number of Šariš translations (descending) and return limited results
  return results
    .sort((a, b) => b.sariske.length - a.sariske.length)
    .slice(0, limit)
}

export function getRandomWords(count: number): DictionaryEntry[] {
  const dict = getDictionary()
  const shuffled = [...dict].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

export function getSimilarWords(baseWord: string, limit = 6): DictionaryEntry[] {
  const dict = getDictionary()
  const normalizedBase = baseWord.toLowerCase().trim()
  const results: DictionaryEntry[] = []
  
  for (const entry of dict) {
    if (results.length >= limit) break
    
    const entryWord = entry.slovenske.toLowerCase()
    
    // Skip exact match
    if (entryWord === normalizedBase) continue
    
    // Find words that contain the base word (e.g., "hlúpy" matches "hlúpy človek")
    // Or words that start with the same prefix (first 3+ chars)
    const startsWithBase = entryWord.startsWith(normalizedBase)
    const containsBase = entryWord.includes(normalizedBase) && entryWord !== normalizedBase
    const baseContainsEntry = normalizedBase.includes(entryWord) && entryWord.length >= 3
    
    // Check for common prefix (at least 3 characters)
    let commonPrefixLength = 0
    const minLen = Math.min(normalizedBase.length, entryWord.length)
    for (let i = 0; i < minLen; i++) {
      if (normalizedBase[i] === entryWord[i]) {
        commonPrefixLength++
      } else {
        break
      }
    }
    const hasCommonPrefix = commonPrefixLength >= 3
    
    if (startsWithBase || containsBase || baseContainsEntry || hasCommonPrefix) {
      results.push(entry)
    }
  }
  
  // Sort by relevance: exact prefix match first, then by number of translations
  return results.sort((a, b) => {
    const aStartsWith = a.slovenske.toLowerCase().startsWith(normalizedBase)
    const bStartsWith = b.slovenske.toLowerCase().startsWith(normalizedBase)
    
    if (aStartsWith && !bStartsWith) return -1
    if (!aStartsWith && bStartsWith) return 1
    
    return b.sariske.length - a.sariske.length
  })
}
