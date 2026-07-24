import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Database, Search, ShieldCheck } from 'lucide-react'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { getDictionary } from '@/lib/dictionary'

export const metadata: Metadata = {
  title: 'O slovníku',
  description: 'Ako vznikla databáza Šarišského slovníka, čo obsahuje a aké sú jej obmedzenia.',
  alternates: {
    canonical: '/o-slovniku',
  },
}

export default function AboutDictionaryPage() {
  const entryCount = getDictionary().length

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="border-b border-border bg-gradient-to-b from-primary/10 to-background">
          <div className="container mx-auto px-4 py-14 sm:py-20">
            <div className="mx-auto max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-wider text-primary">O projekte</p>
              <h1 className="mt-3 text-4xl font-bold text-foreground sm:text-5xl">
                Slovník ako otvorená orientačná pomôcka
              </h1>
              <p className="mt-5 text-lg leading-8 text-muted-foreground">
                Cieľom webu je uľahčiť hľadanie medzi slovenským výrazom a zachytenými
                šarišskými podobami. Databáza je rozsiahla, ale nenahrádza odborný
                nárečový slovník ani znalosť reči konkrétnej obce.
              </p>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-18">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl space-y-12">
              <section aria-labelledby="rozsah">
                <div className="flex items-center gap-3">
                  <Database className="h-6 w-6 text-primary" aria-hidden="true" />
                  <h2 id="rozsah" className="text-2xl font-bold text-foreground">
                    Čo databáza obsahuje
                  </h2>
                </div>
                <p className="mt-4 leading-7 text-muted-foreground">
                  Aktuálna verzia obsahuje {entryCount.toLocaleString('sk-SK')} slovenských
                  hesiel. Každé heslo má jednu alebo viac šarišských podôb. Viaceré podoby
                  pri jednom hesle môžu zachytávať miestny variant, rozdielny zápis
                  výslovnosti, synonymum alebo odlišný význam, ktorý pôvodný záznam
                  nerozdelil do samostatných hesiel.
                </p>
                <p className="mt-4 leading-7 text-muted-foreground">
                  Vyhľadávanie prechádza slovenské aj šarišské tvary. Nevyžaduje presnú
                  zhodu, takže pomôže aj vtedy, keď poznáte iba časť slova alebo si nie ste
                  istí jeho zápisom.
                </p>
              </section>

              <section aria-labelledby="spracovanie">
                <h2 id="spracovanie" className="text-2xl font-bold text-foreground">
                  Ako boli záznamy technicky spracované
                </h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  {[
                    ['1', 'Zjednotenie zápisu', 'Odstránili sa nadbytočné medzery, okrajová interpunkcia a technické značky.'],
                    ['2', 'Spojenie zhôd', 'Rovnaké slovenské heslá sa zlúčili a ich šarišské podoby sa ponechali spolu.'],
                    ['3', 'Vyhľadateľná adresa', 'Každé heslo dostalo vlastnú jednoznačnú adresu pre otvorenie detailu.'],
                  ].map(([number, title, text]) => (
                    <article key={number} className="rounded-2xl border border-border bg-card p-5">
                      <span className="text-sm font-bold text-primary">{number}</span>
                      <h3 className="mt-2 font-bold text-foreground">{title}</h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
                    </article>
                  ))}
                </div>
                <p className="mt-5 rounded-2xl border border-amber-300/60 bg-amber-50 p-5 leading-7 text-amber-950">
                  Technické čistenie nie je to isté ako individuálna jazykovedná revízia.
                  Nie každé heslo bolo samostatne posúdené odborným redaktorom. Preto web
                  záznamy označuje ako orientačné a automaticky vytvorené detaily nezaraďuje
                  medzi samostatný redakčný obsah určený pre vyhľadávače.
                </p>
              </section>

              <section aria-labelledby="limity">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-6 w-6 text-accent" aria-hidden="true" />
                  <h2 id="limity" className="text-2xl font-bold text-foreground">
                    Čo treba pri používaní zohľadniť
                  </h2>
                </div>
                <ul className="mt-5 space-y-4 text-muted-foreground">
                  <li className="rounded-2xl border border-border bg-card p-5 leading-7">
                    <strong className="text-foreground">Miestna rôznorodosť:</strong> tvar
                    bežný v jednej obci nemusí byť známy o niekoľko kilometrov ďalej.
                  </li>
                  <li className="rounded-2xl border border-border bg-card p-5 leading-7">
                    <strong className="text-foreground">Význam a citové zafarbenie:</strong>{' '}
                    samotný pár slov neukazuje, či je výraz neutrálny, zastaraný, žartovný
                    alebo expresívny.
                  </li>
                  <li className="rounded-2xl border border-border bg-card p-5 leading-7">
                    <strong className="text-foreground">Pravopis nárečia:</strong> pri
                    neštandardizovanom zápise sa tá istá výslovnosť môže objaviť vo viacerých
                    podobách.
                  </li>
                  <li className="rounded-2xl border border-border bg-card p-5 leading-7">
                    <strong className="text-foreground">Chyby vstupných údajov:</strong>{' '}
                    rozsiahla komunitná zbierka môže obsahovať preklepy, nesprávne rozdelené
                    významy alebo technické zvyšky, ktoré čakajú na revíziu.
                  </li>
                </ul>
              </section>

              <section className="rounded-3xl bg-muted/40 p-7 sm:p-9" aria-labelledby="pouzitie">
                <Search className="h-7 w-7 text-primary" aria-hidden="true" />
                <h2 id="pouzitie" className="mt-4 text-2xl font-bold text-foreground">
                  Kedy je slovník užitočný
                </h2>
                <p className="mt-4 leading-7 text-muted-foreground">
                  Pomôže pri porozumení regionálneho výrazu, pri hľadaní možných šarišských
                  podôb slovenského slova alebo ako východisko pre rozhovor s rodeným
                  hovoriacim. Na odbornú publikáciu, úradný preklad či presný opis miestnej
                  výslovnosti použite aj vedecké dialektologické pramene.
                </p>
                <div className="mt-6 flex flex-wrap gap-4">
                  <Link
                    href="/ako-pouzivat-slovnik"
                    className="inline-flex items-center gap-2 font-bold text-primary hover:underline"
                  >
                    Ako čítať heslá
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <Link
                    href="/sarisske-narecie"
                    className="inline-flex items-center gap-2 font-bold text-primary hover:underline"
                  >
                    Sprievodca nárečím
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </section>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
