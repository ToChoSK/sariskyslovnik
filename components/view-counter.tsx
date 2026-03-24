'use client'

import { useEffect, useState } from 'react'
import { Eye } from 'lucide-react'
import { getPageViewCount } from '@/lib/cloudflare-counter'

interface ViewCounterProps {
  wordUrl: string
}

export function ViewCounter({ wordUrl }: ViewCounterProps) {
  const [views, setViews] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadViews() {
      try {
        const count = await getPageViewCount(`/slovo/${wordUrl}`)
        if (typeof count === 'number') {
          setViews(count)
        }
      } finally {
        setIsLoading(false)
      }
    }

    void loadViews()
  }, [wordUrl])

  return (
    <div className="flex items-center gap-2 text-muted-foreground">
      <Eye className="w-4 h-4" />
      {isLoading ? (
        <span className="text-sm">Načítavam...</span>
      ) : views !== null ? (
        <span className="text-sm">
          {views.toLocaleString('sk-SK')} zobrazení
        </span>
      ) : (
        <span className="text-sm">Zobrazenia nie sú k dispozícii</span>
      )}
    </div>
  )
}
