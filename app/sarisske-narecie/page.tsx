import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, BookOpen, MapPin, MessageCircle } from 'lucide-react'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'

export const metadata: Metadata = {
  title: 'Šarišské nárečie – stručný sprievodca',
  description: 'Prečo šarišské nárečie nemá iba jednu podobu, ako sa zapisuje a kde hľadať odborné zdroje.',
  alternates: {
    canonical: '/sarisske-narecie',
  },
}

export default function SarisDialectPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="border-b border-border bg-gradient-to-b from-primary/10 via-accent/5 to-background">
          <div className="container mx-auto px-4 py-14 sm:py-20">
            <div className="mx-auto max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-wider text-primary">Jazyk a región</p>
              <h1 className="mt-3 text-4xl font-bold text-foreground sm:text-5xl">
                Šarišské nárečie nie je iba jedna podoba reči
              </h1>
              <p className="mt-5 text-lg leading-8 text-muted-foreground">
                Názov spája nárečové variety historického Šariša. Spoločné črty sa
                prelínajú s rozdielmi medzi severom, stredom, juhozápadom aj susednými
                oblasťami východného Slovenska.
              </p>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-18">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl space-y-12">
              <section aria-labelledby="uzemie">
                <div className="flex items-center gap-3">
                  <MapPin className="h-6 w-6 text-primary" aria-hidden="true" />
                  <h2 id="uzemie" className="text-2xl font-bold text-foreground">
                    Zemepisný názov a vnútorná pestrosť
                  </h2>
                </div>
                <div className="mt-4 space-y-4 leading-7 text-muted-foreground">
                  <p>
                    Šariš leží v severnej časti východného Slovenska. Keď jazykovedci
                    hovoria o šarišských nárečiach, vychádzajú najmä z územia historickej
                    Šarišskej stolice. Hranice reči však nekopírujú administratívnu čiaru
                    presne a nárečové javy plynulo pokračujú do susedných oblastí.
                  </p>
                  <p>
                    Už odborné práce upozorňujú, že označenie „šarišské nárečia“ je do
                    veľkej miery zemepisné. Jednotlivé miestne variety sa môžu v niektorých
                    znakoch približovať spišským, zemplínskym či abovským nárečiam. Aj
                    korpus nárečí Jazykovedného ústavu Ľudovíta Štúra pracuje v rámci
                    šarišského areálu s menšími oblasťami, napríklad so stredným a severným
                    Šarišom.
                  </p>
                </div>
              </section>

              <section aria-labelledby="zapis">
                <div className="flex items-center gap-3">
                  <MessageCircle className="h-6 w-6 text-accent" aria-hidden="true" />
                  <h2 id="zapis" className="text-2xl font-bold text-foreground">
                    Prečo sa rovnaké slovo zapisuje rôzne
                  </h2>
                </div>
                <p className="mt-4 leading-7 text-muted-foreground">
                  Nárečie sa tradične odovzdáva najmä hovorením. Bežný internetový zápis
                  preto nemusí používať presnú fonetickú transkripciu. Pisateľ sa rozhoduje,
                  ktoré zvuky zachytí spisovnými písmenami, či vyznačí mäkkosť a ako zapíše
                  hlásku, ktorá sa medzi obcami vyslovuje odlišne.
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <article className="rounded-2xl border border-border bg-card p-5">
                    <h3 className="font-bold text-foreground">Jeden význam, blízke podoby</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      Tvary „chlib“, „chľib“, „hľeb“ a „hľib“ pri hesle „chlieb“ môžu
                      odrážať rozdielnu výslovnosť aj rozdielny spôsob jej zápisu.
                    </p>
                  </article>
                  <article className="rounded-2xl border border-border bg-card p-5">
                    <h3 className="font-bold text-foreground">Jeden význam, iné slová</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      „Bandura“, „gruľa“ a „krompľa“ pri hesle „zemiak“ sú odlišné
                      pomenovania, ktorých známosť a používanie sa môžu regionálne meniť.
                    </p>
                  </article>
                </div>
              </section>

              <section aria-labelledby="pouzivanie">
                <h2 id="pouzivanie" className="text-2xl font-bold text-foreground">
                  Živá reč sa mení
                </h2>
                <div className="mt-4 space-y-4 leading-7 text-muted-foreground">
                  <p>
                    Nárečie nie je uzavretý historický exponát. Hovoriaci prepínajú medzi
                    miestnou rečou a spisovnou slovenčinou podľa prostredia. Mladšia a
                    staršia generácia nemusia používať rovnakú slovnú zásobu a do reči
                    vstupujú výrazy z médií, školy, práce aj susedných jazykových oblastí.
                  </p>
                  <p>
                    Preto nemožno z jedného slovníkového páru spoľahlivo určiť presnú
                    výslovnosť, frekvenciu ani citové zafarbenie. Najlepším doplnením
                    slovníka je autentický rozhovor, nárečová nahrávka alebo odborný prameň
                    s údajom o lokalite a hovoriacom.
                  </p>
                </div>
              </section>

              <section className="rounded-3xl bg-muted/40 p-7 sm:p-9" aria-labelledby="zdroje">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-6 w-6 text-primary" aria-hidden="true" />
                  <h2 id="zdroje" className="text-2xl font-bold text-foreground">
                    Zdroje na ďalšie štúdium
                  </h2>
                </div>
                <p className="mt-4 leading-7 text-muted-foreground">
                  Nasledujúce odborné a inštitucionálne zdroje pomáhajú zaradiť šarišské
                  variety do širšieho dialektologického kontextu:
                </p>
                <ul className="mt-5 space-y-4">
                  <li>
                    <a
                      href="https://korpus.juls.savba.sk/dialect.html"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-start gap-2 font-bold text-primary hover:underline"
                    >
                      Korpus nárečí – Jazykovedný ústav Ľudovíta Štúra SAV
                      <ArrowUpRight className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
                    </a>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      Mapa nárečových oblastí a vyhľadávanie v prepisoch nárečových nahrávok.
                    </p>
                  </li>
                  <li>
                    <a
                      href="https://www.juls.savba.sk/ediela/jc/1962/2/JC_1962_2_LQ.pdf"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-start gap-2 font-bold text-primary hover:underline"
                    >
                      I. Kotulič: Ku charakteristike nárečia juhozápadného Šariša
                      <ArrowUpRight className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
                    </a>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      Odborná štúdia o členení a charakteristike šarišského nárečového areálu.
                    </p>
                  </li>
                  <li>
                    <a
                      href="https://www.juls.savba.sk/ediela/ks/2005/2/ks2005-2.html"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-start gap-2 font-bold text-primary hover:underline"
                    >
                      Kultúra slova: Slovník šarišských nárečí
                      <ArrowUpRight className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
                    </a>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      O diele Ferdinanda Buffu a dlhodobom výskume slovnej zásoby Šariša.
                    </p>
                  </li>
                </ul>
              </section>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/ako-pouzivat-slovnik"
                  className="rounded-full bg-primary px-5 py-3 font-bold text-primary-foreground hover:opacity-90"
                >
                  Ako čítať heslá
                </Link>
                <Link
                  href="/"
                  className="rounded-full border border-border bg-card px-5 py-3 font-bold text-foreground hover:border-primary"
                >
                  Prejsť na vyhľadávanie
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
