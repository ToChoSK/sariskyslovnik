'use client'

import Link from 'next/link'
import { TrendingUp, Eye, Sparkles } from 'lucide-react'
import type { WordWithViews } from '@/lib/types'

interface TopWordsProps {
  words: WordWithViews[]
}

const rankColors = [
  'from-yellow-400 to-amber-500', // 1st - gold
  'from-gray-300 to-gray-400', // 2nd - silver
  'from-amber-600 to-orange-700', // 3rd - bronze
  'from-primary/80 to-primary', // 4th+
]

export function TopWords({ words }: TopWordsProps) {
  if (!words || words.length === 0) {
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

      <div className="grid gap-4 sm:grid-cols-2">
        {words.map((word, index) => (
          <Link
            key={word.url}
            href={`/slovo/${word.url}`}
            className="group relative block overflow-hidden rounded-2xl bg-card border-2 border-border p-5 transition-all duration-300 hover:border-primary hover:shadow-lg hover:-translate-y-1"
          >
            {/* Rank badge */}
            <div
              className={`absolute -top-1 -left-1 w-10 h-10 rounded-br-2xl bg-gradient-to-br ${
                rankColors[Math.min(index, 3)]
              } flex items-center justify-center shadow-md`}
            >
              <span className="text-white font-bold text-sm">{index + 1}</span>
            </div>

            <div className="ml-6">
              {/* Slovak word */}
              <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                {word.slovenske}
              </h3>

              {/* Saris translations */}
              <div className="flex flex-wrap gap-2 mt-2">
                {word.sariske.slice(0, 3).map((s, i) => (
                  <span
                    key={i}
                    className="inline-block px-3 py-1 bg-accent/15 text-accent rounded-full text-sm font-medium transition-colors group-hover:bg-accent/25"
                  >
                    {s}
                  </span>
                ))}
                {word.sariske.length > 3 && (
                  <span className="inline-block px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm">
                    +{word.sariske.length - 3}
                  </span>
                )}
              </div>

              {/* View count */}
              <div className="flex items-center gap-1 mt-3 text-muted-foreground text-sm">
                <Eye className="w-4 h-4" />
                <span>{word.views.toLocaleString('sk-SK')} zobrazení</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
