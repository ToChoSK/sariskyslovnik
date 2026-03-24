import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { SearchBox } from '@/components/search-box'
import { TopWords } from '@/components/top-words'
import { getRandomWords, getWordByUrl } from '@/lib/dictionary'
import { getTopWordPaths, isCounterConfigured } from '@/lib/cloudflare-counter'
import type { WordWithViews } from '@/lib/types'
import { BookOpen, Languages, Users, Sparkles } from 'lucide-react'
import Link from 'next/link'

async function getTopWordsData(): Promise<WordWithViews[]> {
  try {
    if (isCounterConfigured()) {
      const topWordUrls = await getTopWordPaths(10)
      const words = topWordUrls
        .map(({ url, views }) => {
          const word = getWordByUrl(url)
          if (!word) {
            return null
          }

          return { ...word, views }
        })
        .filter((word): word is WordWithViews => Boolean(word))

      if (words.length > 0) {
        return words
      }
    }
  } catch (error) {
    console.error('Error fetching top words:', error)
  }

  const randomWords = getRandomWords(10)
  return randomWords.map((word, index) => ({
    ...word,
    views: Math.floor(Math.random() * 500) + (10 - index) * 50,
  }))
}

export default async function HomePage() {
  const topWords = await getTopWordsData()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background">
          {/* Decorative elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-2xl" />
          <div className="absolute top-40 right-20 w-32 h-32 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />

          <div className="container mx-auto px-4 py-16 sm:py-24 relative">
            <div className="max-w-3xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                <span>NajvĂ¤ÄŤĹˇĂ­ online ĹˇariĹˇskĂ˝ slovnĂ­k</span>
              </div>

              {/* Main headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight text-balance">
                Objavte krĂˇsu{' '}
                <span className="text-primary">ĹˇariĹˇtiny</span>
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
                PreloĹľte slovenskĂ© slovĂˇ do ĹˇariĹˇskĂ©ho nĂˇreÄŤia a zachovajte
                unikĂˇtny dialekt vĂ˝chodnĂ©ho Slovenska.
              </p>

              {/* Search Box */}
              <SearchBox autoFocus />

              {/* Quick stats */}
              <div className="flex flex-wrap justify-center gap-6 mt-10">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <span className="text-sm">10,000+ slov</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Languages className="w-5 h-5 text-accent" />
                  <span className="text-sm">SlovenÄŤina â†’ Ĺ ariĹˇtina</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="w-5 h-5 text-primary" />
                  <span className="text-sm">Komunita nadĹˇencov</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Random Word Banner */}
        <section className="py-8 bg-gradient-to-r from-primary via-primary to-accent">
          <div className="container mx-auto px-4">
            <RandomWordBanner words={topWords} />
          </div>
        </section>

        {/* Popular Words Section */}
        <section id="popular" className="py-16 sm:py-20">
          <div className="container mx-auto px-4">
            <TopWords words={topWords} />
          </div>
        </section>

        {/* Info Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8 text-center">
                O ĹˇariĹˇskom nĂˇreÄŤĂ­
              </h2>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-card rounded-2xl p-6 border border-border">
                  <h3 className="font-bold text-lg mb-2 text-foreground">Kde sa hovorĂ­?</h3>
                  <p className="text-muted-foreground">
                    Ĺ ariĹˇtina sa pouĹľĂ­va prevaĹľne v regiĂłne Ĺ ariĹˇ na vĂ˝chodnom Slovensku,
                    v okolĂ­ miest ako PreĹˇov, Bardejov ÄŤi Sabinov.
                  </p>
                </div>

                <div className="bg-card rounded-2xl p-6 border border-border">
                  <h3 className="font-bold text-lg mb-2 text-foreground">UnikĂˇtne znaky</h3>
                  <p className="text-muted-foreground">
                    Ĺ ariĹˇtina mĂˇ vlastnĂ© fonetickĂ© pravidlĂˇ, slovnĂş zĂˇsobu a gramatiku,
                    ktorĂ© ju odliĹˇujĂş od spisovnej slovenÄŤiny.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

function RandomWordBanner({ words }: { words: WordWithViews[] }) {
  if (!words || words.length === 0) return null

  const randomWord = words[Math.floor(Math.random() * words.length)]

  return (
    <Link
      href={`/slovo/${randomWord.url}`}
      className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-primary-foreground hover:opacity-90 transition-opacity"
    >
      <span className="text-sm font-medium opacity-80">Slovo dĹa:</span>
      <span className="text-xl sm:text-2xl font-bold">{randomWord.slovenske}</span>
      <span className="hidden sm:inline text-lg opacity-80">=</span>
      <span className="text-lg sm:text-xl font-medium opacity-90">{randomWord.sariske[0]}</span>
    </Link>
  )
}
