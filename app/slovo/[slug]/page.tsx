import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { SearchBox } from '@/components/search-box'
import { ViewCounter } from '@/components/view-counter'
import { getWordByUrl, getSimilarWords } from '@/lib/dictionary'
import { ArrowLeft, Volume2, Share2, Copy, Check, BookOpen } from 'lucide-react'

// Force dynamic rendering - no SSG
export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const word = getWordByUrl(slug)

  if (!word) {
    return {
      title: 'Slovo nenájdené | Šarišský Slovník',
    }
  }

  return {
    title: `${word.slovenske} po šarišsky | Šarišský Slovník`,
    description: `${word.slovenske} v šarištine: ${word.sariske.join(', ')}. Objavte preklad a význam tohto slova v šarišskom nárečí.`,
    openGraph: {
      title: `${word.slovenske} = ${word.sariske[0]}`,
      description: `Preklad slovenského slova "${word.slovenske}" do šarištiny`,
    },
  }
}

export default async function WordPage({ params }: PageProps) {
  const { slug } = await params
  const word = getWordByUrl(slug)

  if (!word) {
    notFound()
  }

  // Get similar words (words containing or starting with same prefix)
  const relatedWords = getSimilarWords(word.slovenske, 6)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-muted/30 border-b border-border">
          <div className="container mx-auto px-4 py-3">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Späť na vyhľadávanie
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <section className="py-8 sm:py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              {/* Word Card */}
              <div className="bg-card rounded-3xl border-2 border-border shadow-lg overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-primary to-accent p-6 sm:p-8">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-primary-foreground/70 text-sm font-medium mb-1">
                        Slovensky
                      </p>
                      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground">
                        {word.slovenske}
                      </h1>
                    </div>
                    <CopyButton text={word.slovenske} />
                  </div>
                </div>

                {/* Translations */}
                <div className="p-6 sm:p-8">
                  <div className="mb-6">
                    <ViewCounter wordUrl={slug} />
                  </div>

                  <p className="text-muted-foreground text-sm font-medium mb-4">
                    Po šarišsky ({word.sariske.length} {word.sariske.length === 1 ? 'preklad' : word.sariske.length < 5 ? 'preklady' : 'prekladov'})
                  </p>

                  <div className="space-y-3">
                    {word.sariske.map((translation, index) => (
                      <div
                        key={index}
                        className="group flex items-center justify-between p-4 bg-accent/10 rounded-2xl hover:bg-accent/20 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-full bg-accent/30 flex items-center justify-center text-accent font-bold text-sm">
                            {index + 1}
                          </span>
                          <span className="text-xl sm:text-2xl font-bold text-foreground">
                            {translation}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <CopyButton text={translation} small />
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </div>

              {/* Search Box */}
              <div className="mt-8">
                <p className="text-muted-foreground text-center mb-4">
                  Hľadajte ďalšie slová
                </p>
                <SearchBox />
              </div>

              {/* Similar Words */}
              {relatedWords.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    Podobné slová
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {relatedWords.map((relatedWord) => (
                      <Link
                        key={relatedWord.url}
                        href={`/slovo/${relatedWord.url}`}
                        className="p-4 bg-card rounded-xl border border-border hover:border-primary hover:shadow-md transition-all"
                      >
                        <p className="font-bold text-foreground">
                          {relatedWord.slovenske}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {relatedWord.sariske.slice(0, 3).map((s, i) => (
                            <span
                              key={i}
                              className="inline-block px-2 py-0.5 bg-accent/20 text-accent-foreground rounded-full text-xs"
                            >
                              {s}
                            </span>
                          ))}
                          {relatedWord.sariske.length > 3 && (
                            <span className="text-muted-foreground text-xs">
                              +{relatedWord.sariske.length - 3}
                            </span>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

function CopyButton({ text, small = false }: { text: string; small?: boolean }) {
  return (
    <CopyButtonClient text={text} small={small} />
  )
}

// Client component for copy functionality
import { CopyButtonClient } from '@/components/copy-button-client'
