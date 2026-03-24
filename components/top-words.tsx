'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { TrendingUp, Eye, Sparkles } from 'lucide-react'
import type { WordWithViews } from '@/lib/types'

interface TopWordsProps {
  words: WordWithViews[]
}

const rankColors = [
  'from-yellow-400 to-amber-500',
  'from-gray-300 to-gray-400',
  'from-amber-600 to-orange-700',
  'from-primary/80 to-primary',
]

export function TopWords({ words }: TopWordsProps) {
  const [liveWords, setLiveWords] = useState(words)

  useEffect(() => {
    let active = true

    async function loadTopWords() {
      try {
        const response = await fetch('/api/top-words?limit=10', { cache: 'no-store' })
        if (!response.ok) {
          return
        }

        const payload = (await response.json()) as {
          words?: WordWithViews[]
          source?: string
        }
        if (active && Array.isArray(payload.words) && payload.words.length > 0) {
          setLiveWords(payload.words)
        }
      } catch {
        // Keep the server-rendered value as fallback.
      }
    }

    void loadTopWords()

    return () => {
      active = false
    }
  }, [])

  if (!liveWords || liveWords.length === 0) {
    return (
      <div className="text-center py-12">
        <Sparkles className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
        <p className="text-muted-foreground">Zatiaľ žiadne populárne slová.</p>
        <p className="text-sm text-muted-foreground mt-1">Buďte prvý, kto preskúma slovník!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold text-foreground">Najpopulárnejšie slová</h2>
      </div>

      <div className="flex flex-wrap items-start gap-4">
        {liveWords.map((word, index) => (
          <Link
            key={word.url}
            href={`/slovo/${word.url}`}
            className="group relative block min-w-[18rem] max-w-full flex-1 basis-[18rem] overflow-hidden rounded-2xl bg-card border-2 border-border p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lg sm:min-w-0 sm:flex-none sm:basis-auto"
          >
            <div
              className={`absolute -top-1 -left-1 flex h-10 w-10 items-center justify-center rounded-br-2xl bg-gradient-to-br ${
                rankColors[Math.min(index, 3)]
              } shadow-md`}
            >
              <span className="text-sm font-bold text-white">{index + 1}</span>
            </div>

            <div className="ml-6">
              <h3 className="text-xl font-bold text-foreground transition-colors group-hover:text-primary">
                {word.slovenske}
              </h3>

              <div className="mt-2 flex flex-wrap gap-2">
                {word.sariske.map((s, i) => (
                  <span
                    key={i}
                    className="inline-block rounded-full bg-accent/15 px-3 py-1 text-sm font-medium text-accent transition-colors group-hover:bg-accent/25"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <div className="mt-3 flex items-center gap-1 text-sm text-muted-foreground">
                <Eye className="h-4 w-4" />
                <span>{word.views.toLocaleString('sk-SK')} zobrazení</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
