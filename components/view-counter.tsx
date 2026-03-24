'use client'

import { useEffect, useState } from 'react'
import { Eye } from 'lucide-react'

interface ViewCounterProps {
  wordUrl: string
}

export function ViewCounter({ wordUrl }: ViewCounterProps) {
  const [views, setViews] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function incrementViews() {
      try {
        const response = await fetch('/api/increment-views', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ wordUrl }),
        })

        if (response.ok) {
          const data = await response.json()
          setViews(data.views)
        }
      } catch (error) {
        console.error('Error incrementing views:', error)
      } finally {
        setIsLoading(false)
      }
    }

    incrementViews()
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
