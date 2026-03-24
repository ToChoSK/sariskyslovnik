'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import type { DictionaryEntry } from '@/lib/types'

interface SearchBoxProps {
  onSearch?: (query: string) => void
  placeholder?: string
  autoFocus?: boolean
}

export function SearchBox({ placeholder = "Hľadaj slovenské alebo šarišské slovo...", autoFocus = false }: SearchBoxProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<DictionaryEntry[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowResults(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (query.length < 2) {
      setResults([])
      setShowResults(false)
      return
    }

    const debounceTimer = setTimeout(async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        const data = await response.json()
        setResults(data.results || [])
        setShowResults(true)
      } catch (error) {
        console.error('Search error:', error)
        setResults([])
      } finally {
        setIsLoading(false)
      }
    }, 300)

    return () => clearTimeout(debounceTimer)
  }, [query])

  const clearSearch = () => {
    setQuery('')
    setResults([])
    setShowResults(false)
    inputRef.current?.focus()
  }

  return (
    <div ref={containerRef} className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setShowResults(true)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="pl-12 pr-12 h-14 text-lg rounded-2xl border-2 border-primary/20 focus:border-primary bg-card shadow-lg transition-all duration-200 focus:shadow-xl"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted transition-colors"
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        )}
      </div>

      {/* Search Results - flows with page content */}
      {showResults && (
        <div className="mt-2 bg-card rounded-2xl shadow-2xl border-2 border-border overflow-hidden">
          {isLoading ? (
            <div className="p-6 text-center text-muted-foreground">
              <div className="animate-spin inline-block w-6 h-6 border-2 border-primary border-t-transparent rounded-full" />
              <p className="mt-2">Hľadám...</p>
            </div>
          ) : results.length > 0 ? (
            <ul className="divide-y divide-border text-left">
              {results.map((result) => (
                <li key={result.url}>
                  <Link
                    href={`/slovo/${result.url}`}
                    onClick={() => setShowResults(false)}
                    className="block p-4 hover:bg-primary/10 transition-colors text-left"
                  >
                    <p className="font-bold text-foreground text-lg text-left">
                      {result.slovenske}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-1 justify-start">
                      {result.sariske.slice(0, 3).map((s, i) => (
                        <span
                          key={i}
                          className="inline-block px-2 py-0.5 bg-accent/20 text-accent-foreground rounded-full text-sm"
                        >
                          {s}
                        </span>
                      ))}
                      {result.sariske.length > 3 && (
                        <span className="text-muted-foreground text-sm">
                          +{result.sariske.length - 3} ďalších
                        </span>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-6 text-center text-muted-foreground">
              <p>{'Nenašli sa žiadne výsledky pre "'}{query}{'"'}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
