import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Search } from 'lucide-react'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { SearchBox } from '@/components/search-box'

export const metadata: Metadata = {
  title: 'Ako používať slovník',
  description: 'Návod na vyhľadávanie a správne čítanie šarišských variantov v slovníku.',
  alternates: {
    canonical: '/ako-pouzivat-slovnik',
  },
}

const steps = [
  {
    title: 'Napíšte slovenské alebo šarišské slovo',
    text: 'Vyhľadávač prechádza obe strany záznamu. Nemusíte preto vopred vedieť, v ktorom smere hľadáte.',
  },
  {
    title: 'Pri neistom zápise použite kratší základ',
    text: 'Výsledok nemusí byť presná zhoda. Ak neviete, či sa píše „chiža“ alebo „chyža“, skúste napríklad základ „chiž“ alebo slovenské heslo „dom“.',
  },
  {
    title: 'Otvorte detail a porovnajte všetky podoby',
    text: 'Prvý zobrazený tvar nie je automaticky najlepší pre každú obec. Viac variantov čítajte ako možnosti zachytené v databáze.',
  },
]

export default function DictionaryGuidePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="border-b border-border bg-gradient-to-b from-accent/10 to-background">
          <div className="container mx-auto px-4 py-14 sm:py-20">
            <div className="mx-auto max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-wider text-accent">Praktický návod</p>
              <h1 className="mt-3 text-4xl font-bold text-foreground sm:text-5xl">
                Ako vyhľadávať a čítať heslá
              </h1>
              <p className="mt-5 text-lg leading-8 text-muted-foreground">
                Tri jednoduché kroky pomôžu nájsť slovo aj pri neistom pravopise a
                správne pochopiť, prečo detail niekedy ukazuje veľa rôznych podôb.
              </p>
            </div>
          </div>
        </section>

        <section className="py-14">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <ol className="space-y-5">
                {steps.map((step, index) => (
                  <li key={step.title} className="flex gap-5 rounded-2xl border border-border bg-card p-6">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
                      {index + 1}
                    </span>
                    <div>
                      <h2 className="text-lg font-bold text-foreground">{step.title}</h2>
                      <p className="mt-2 leading-7 text-muted-foreground">{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-10 rounded-3xl border border-primary/20 bg-primary/5 p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <Search className="h-6 w-6 text-primary" aria-hidden="true" />
                  <h2 className="text-xl font-bold text-foreground">Vyskúšajte vyhľadávanie</h2>
                </div>
                <p className="mt-3 mb-5 leading-7 text-muted-foreground">
                  Skúste napríklad slová <strong className="text-foreground">chlieb</strong>,{' '}
                  <strong className="text-foreground">dom</strong>,{' '}
                  <strong className="text-foreground">zemiak</strong> alebo šarišský tvar{' '}
                  <strong className="text-foreground">bandura</strong>.
                </p>
                <SearchBox placeholder="Skúste: chlieb, dom, bandura…" />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-muted/30 py-14">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-2xl font-bold text-foreground">Ako rozumieť variantom</h2>
              <div className="mt-6 space-y-5">
                <article className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="font-bold text-foreground">Príklad: chlieb</h3>
                  <p className="mt-3 leading-7 text-muted-foreground">
                    Pri hesle „chlieb“ databáza uvádza podoby ako „chlib“, „chľeb“,
                    „hľeb“ či „hľib“. Takýto zoznam nehovorí, že všetky tvary používa
                    každý hovoriaci. Ukazuje, že vstupné záznamy zachytili viac miestnych
                    alebo pravopisných variantov.
                  </p>
                </article>
                <article className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="font-bold text-foreground">Príklad: zemiak</h3>
                  <p className="mt-3 leading-7 text-muted-foreground">
                    Heslo „zemiak“ spája výrazy „bandura“, „gruľa“, „krompľa“ a ďalšie.
                    Tu môže ísť o skutočne rozdielne regionálne pomenovania, nielen o inú
                    grafickú podobu jedného slova.
                  </p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-2xl font-bold text-foreground">Kontrolný zoznam pred použitím slova</h2>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  'Overte si, či tvar poznajú ľudia z oblasti, pre ktorú ho chcete použiť.',
                  'Pri viacerých podobách nepredpokladajte, že prvá je všeobecne najčastejšia.',
                  'Pri expresívnom alebo nezvyčajnom slove si overte význam v celej vete.',
                  'Pri odbornom texte porovnajte heslo s jazykovedným prameňom.',
                ].map((item) => (
                  <li key={item} className="flex gap-3 rounded-2xl border border-border bg-card p-5">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                    <span className="text-sm leading-6 text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/o-slovniku"
                className="mt-8 inline-flex items-center gap-2 font-bold text-primary hover:underline"
              >
                Prečítať si obmedzenia databázy
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
