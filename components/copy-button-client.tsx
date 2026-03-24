'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

interface CopyButtonClientProps {
  text: string
  small?: boolean
}

export function CopyButtonClient({ text, small = false }: CopyButtonClientProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  if (small) {
    return (
      <button
        onClick={handleCopy}
        className="p-2 rounded-lg hover:bg-accent/30 transition-colors"
        title="Kopírovať"
      >
        {copied ? (
          <Check className="w-4 h-4 text-accent" />
        ) : (
          <Copy className="w-4 h-4 text-muted-foreground" />
        )}
      </button>
    )
  }

  return (
    <button
      onClick={handleCopy}
      className="p-3 rounded-xl bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
      title="Kopírovať"
    >
      {copied ? (
        <Check className="w-5 h-5 text-primary-foreground" />
      ) : (
        <Copy className="w-5 h-5 text-primary-foreground" />
      )}
    </button>
  )
}
