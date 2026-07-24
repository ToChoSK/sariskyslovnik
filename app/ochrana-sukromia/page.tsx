import type { Metadata } from 'next'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'

export const metadata: Metadata = {
  title: 'Ochrana súkromia',
  description: 'Informácie o technických a analytických údajoch spracúvaných na webe Šarišský slovník.',
  alternates: {
    canonical: '/ochrana-sukromia',
  },
}

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="border-b border-border bg-muted/30">
          <div className="container mx-auto px-4 py-14 sm:py-20">
            <div className="mx-auto max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-wider text-primary">Transparentnosť</p>
              <h1 className="mt-3 text-4xl font-bold text-foreground sm:text-5xl">
                Ochrana súkromia
              </h1>
              <p className="mt-5 text-lg leading-8 text-muted-foreground">
                Stručný prehľad toho, aké údaje web potrebuje na prevádzku a meranie
                návštevnosti. Posledná aktualizácia: 24. júla 2026.
              </p>
            </div>
          </div>
        </section>

        <section className="py-14">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl space-y-10 leading-7 text-muted-foreground">
              <section aria-labelledby="bez-uctu">
                <h2 id="bez-uctu" className="text-2xl font-bold text-foreground">
                  Bez používateľského účtu
                </h2>
                <p className="mt-4">
                  Slovník nevyžaduje registráciu, prihlasovanie ani zadanie mena, e-mailu
                  či telefónneho čísla. Web v tejto verzii neobsahuje formulár na
                  odosielanie osobných údajov.
                </p>
              </section>

              <section aria-labelledby="navstevnost">
                <h2 id="navstevnost" className="text-2xl font-bold text-foreground">
                  Súhrnné počítanie návštev
                </h2>
                <p className="mt-4">
                  Pri otvorení stránky aplikácia odošle normalizovanú cestu stránky do
                  počítadla návštev. Databáza počítadla ukladá cestu, súhrnný počet
                  zobrazení a čas poslednej zmeny. Aplikácia k tomuto záznamu nepridáva
                  meno, e-mail ani vlastný identifikátor používateľa.
                </p>
                <p className="mt-4">
                  Poskytovateľ hostingu a sieťovej infraštruktúry môže pri doručení
                  požiadavky technicky spracovať bežné prevádzkové údaje, napríklad IP
                  adresu, typ prehliadača a čas požiadavky, podľa vlastných bezpečnostných
                  a prevádzkových pravidiel.
                </p>
              </section>

              <section aria-labelledby="analytika">
                <h2 id="analytika" className="text-2xl font-bold text-foreground">
                  Analytika
                </h2>
                <p className="mt-4">
                  Web používa službu Vercel Analytics na súhrnné informácie o používaní
                  stránok. Tieto údaje pomáhajú zistiť, ktoré časti webu fungujú a kde
                  vznikajú technické problémy. Podrobnosti o spracúvaní údajov poskytovateľom
                  sú uvedené v{' '}
                  <a
                    href="https://vercel.com/legal/privacy-policy"
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold text-primary hover:underline"
                  >
                    pravidlách ochrany súkromia Vercel
                  </a>
                  .
                </p>
              </section>

              <section aria-labelledby="reklama">
                <h2 id="reklama" className="text-2xl font-bold text-foreground">
                  Reklamy Google
                </h2>
                <p className="mt-4">
                  Táto verzia webu nenačítava reklamný skript Google a nezobrazuje
                  reklamné jednotky Google. V zdrojovom kóde zostáva iba identifikácia
                  vlastníka webu potrebná na overenie účtu. Pred prípadným budúcim
                  zapnutím reklám musí byť táto stránka aktualizovaná a pre používateľov,
                  ktorých sa to týka, nasadený zodpovedajúci mechanizmus súhlasu.
                </p>
              </section>

              <section aria-labelledby="odkazy">
                <h2 id="odkazy" className="text-2xl font-bold text-foreground">
                  Odkazy na iné weby
                </h2>
                <p className="mt-4">
                  Redakčné stránky odkazujú na odborné externé zdroje. Po otvorení takého
                  odkazu sa uplatňujú pravidlá ochrany súkromia cieľového webu, ktoré tento
                  projekt neovplyvňuje.
                </p>
              </section>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
