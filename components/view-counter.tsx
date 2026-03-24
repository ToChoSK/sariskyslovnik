'use client'

import { useEffect, useState } from 'react'
import { BarChart3, Eye } from 'lucide-react'

interface ViewCounterProps {
  wordUrl: string
}

export function ViewCounter({ wordUrl }: ViewCounterProps) {
  const [views, setViews] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadViews() {
      try {
        const response = await fetch(`/api/page-views?path=${encodeURIComponent(`/slovo/${wordUrl}`)}`, {
          cache: 'no-store',
        })

        if (!response.ok) {
          return
        }

        const payload = (await response.json()) as { views?: number }
        if (typeof payload.views === 'number') {
          setViews(payload.views)
        }
      } finally {
        setIsLoading(false)
      }
    }

    void loadViews()
  }, [wordUrl])

  return (
    <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-accent/10 to-background p-5 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 text-primary">
          <BarChart3 className="h-6 w-6" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-muted-foreground">Popularita slova</p>

          {isLoading ? (
            <p className="mt-2 text-2xl font-bold text-foreground">Načítavam...</p>
          ) : views !== null ? (
            <>
              <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {views.toLocaleString('sk-SK')}
              </p>
              <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-background/80 px-3 py-1 text-sm text-muted-foreground">
                <Eye className="h-4 w-4 text-primary" />
                <span>Toto slovo má zatiaľ {views.toLocaleString('sk-SK')} zobrazení</span>
              </div>
            </>
          ) : (
            <p className="mt-2 text-sm text-muted-foreground">Zobrazenia nie sú momentálne k dispozícii.</p>
          )}
        </div>
      </div>
    </div>
  )
}
