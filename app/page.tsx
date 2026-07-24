import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { SearchBox } from '@/components/search-box'
import { TopWords } from '@/components/top-words'
import { getTopWordsData } from '@/lib/top-words'
import { getDictionary } from '@/lib/dictionary'
import type { WordWithViews } from '@/lib/types'
import { ArrowRight, BookOpen, Languages, MapPin, Search, Sparkles } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function HomePage() {
  const { words: topWords, source: topWordsSource } = await getTopWordsData(10)
  const dictionarySize = getDictionary().length

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
                <span>Online pomôcka pre šarišské slová</span>
              </div>

              {/* Main headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight text-balance">
                Slovenské slová{' '}
                <span className="text-primary">po šarišsky</span>
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
                Vyhľadajte slovenské heslo alebo šarišskú podobu, porovnajte zachytené
                varianty a spoznajte slovnú zásobu regiónu Šariš.
              </p>

              {/* Search Box */}
              <SearchBox autoFocus />

              {/* Quick stats */}
              <div className="flex flex-wrap justify-center gap-6 mt-10">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <span className="text-sm">{dictionarySize.toLocaleString('sk-SK')} hesiel</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Languages className="w-5 h-5 text-accent" />
                  <span className="text-sm">Vyhľadávanie oboma smermi</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="text-sm">Regionálne varianty</span>
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
            <TopWords words={topWords} source={topWordsSource} />
          </div>
        </section>

        <section className="pb-16 sm:pb-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-5xl">
              <div className="max-w-2xl">
                <p className="text-sm font-bold uppercase tracking-wider text-primary">
                  Čo slovník ponúka
                </p>
                <h2 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">
                  Viac než zoznam izolovaných slov
                </h2>
                <p className="mt-4 leading-7 text-muted-foreground">
                  Slovník je vyhľadávacia pomôcka. Pri jednom slovenskom výraze môže
                  ukázať viac šarišských podôb, pretože živé nárečie sa mení podľa
                  oblasti, generácie aj situácie, v ktorej sa slovo používa.
                </p>
              </div>

              <div className="mt-8 grid gap-5 md:grid-cols-3">
                <article className="rounded-2xl border border-border bg-card p-6">
                  <Search className="h-6 w-6 text-primary" aria-hidden="true" />
                  <h3 className="mt-4 text-lg font-bold text-foreground">Hľadajte oboma smermi</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Do poľa môžete napísať spisovné slovenské slovo aj šarišský tvar.
                    Výsledky sa zobrazia priebežne už počas písania.
                  </p>
                </article>
                <article className="rounded-2xl border border-border bg-card p-6">
                  <Languages className="h-6 w-6 text-accent" aria-hidden="true" />
                  <h3 className="mt-4 text-lg font-bold text-foreground">Porovnajte podoby</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Ak databáza eviduje viac nárečových ekvivalentov, detail hesla ich
                    ponechá vedľa seba. Rozdiel nemusí znamenať chybu.
                  </p>
                </article>
                <article className="rounded-2xl border border-border bg-card p-6">
                  <MapPin className="h-6 w-6 text-primary" aria-hidden="true" />
                  <h3 className="mt-4 text-lg font-bold text-foreground">Vnímajte región</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Šarišské nárečia netvoria jednu úplne rovnakú podobu reči.
                    Výslovnosť a slovná zásoba sa môžu líšiť aj medzi blízkymi obcami.
                  </p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-accent">
                  Dôležitý kontext
                </p>
                <h2 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">
                  Nárečie nie je jeden pevný prekladový kód
                </h2>
                <div className="mt-5 space-y-4 leading-7 text-muted-foreground">
                  <p>
                    Označenie „šarišské nárečie“ pomenúva rečové podoby späté s
                    historickým regiónom Šariš. Jazykovedné práce upozorňujú, že ide o
                    vnútorne pestrú oblasť, nie o jeden nemenný systém platný v každej obci.
                  </p>
                  <p>
                    Zápis nárečového slova môže kopírovať miestnu výslovnosť. Preto sa v
                    bežných záznamoch stretávajú mäkčené tvary, odlišné samohlásky aj viac
                    pravopisných podôb toho istého výrazu.
                  </p>
                  <p>
                    Tento web je orientačná vyhľadávacia pomôcka, nie kodifikačná
                    príručka. Pri dôležitom použití porovnajte výraz s rečou konkrétnej
                    obce alebo s odbornými dialektologickými zdrojmi.
                  </p>
                </div>
                <Link
                  href="/sarisske-narecie"
                  className="mt-6 inline-flex items-center gap-2 font-bold text-primary hover:underline"
                >
                  Prečítať sprievodcu nárečím
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>

              <div className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-accent/10 p-7">
                <h3 className="text-xl font-bold text-foreground">Ako získať lepší výsledok</h3>
                <ol className="mt-5 space-y-5">
                  {[
                    ['1', 'Začnite základným tvarom', 'Skúste sloveso v neurčitku alebo podstatné meno v jednotnom čísle.'],
                    ['2', 'Skráťte hľadaný výraz', 'Vyhľadávanie nájde aj časť slova, čo pomáha pri neistom pravopise.'],
                    ['3', 'Otvorte detail hesla', 'Pozrite si všetky zaznamenané podoby a súvisiace heslá.'],
                  ].map(([number, title, text]) => (
                    <li key={number} className="flex gap-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
                        {number}
                      </span>
                      <div>
                        <p className="font-bold text-foreground">{title}</p>
                        <p className="mt-1 text-sm leading-6 text-muted-foreground">{text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                <Link
                  href="/ako-pouzivat-slovnik"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
                >
                  Podrobný návod
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl rounded-3xl border border-border bg-card p-7 text-center shadow-sm sm:p-10">
              <BookOpen className="mx-auto h-8 w-8 text-primary" aria-hidden="true" />
              <h2 className="mt-4 text-2xl font-bold text-foreground">
                Ako vznikajú a čo znamenajú záznamy?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl leading-7 text-muted-foreground">
                Prečítajte si rozsah databázy, jej obmedzenia a zásady, podľa ktorých
                treba interpretovať viacnásobné či neobvyklé podoby slov.
              </p>
              <Link
                href="/o-slovniku"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 font-bold text-primary-foreground hover:opacity-90"
              >
                O projekte a databáze
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
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
      <span className="text-sm font-medium opacity-80">Tip na heslo:</span>
      <span className="text-xl sm:text-2xl font-bold">{randomWord.slovenske}</span>
      <span className="hidden sm:inline text-lg opacity-80">=</span>
      <span className="text-lg sm:text-xl font-medium opacity-90">{randomWord.sariske[0]}</span>
    </Link>
  )
}
