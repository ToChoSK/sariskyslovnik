import Link from 'next/link'
import { Heart } from 'lucide-react'

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-10">
        <div className="grid gap-8 md:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="font-bold text-foreground">Šarišský slovník</p>
            <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
              Praktická pomôcka na vyhľadávanie regionálnych podôb slov. Nárečie sa
              medzi obcami líši, preto záznamy čítajte ako zachytené varianty, nie ako
              jedinú záväznú podobu.
            </p>
          </div>

          <nav aria-label="Informácie o projekte" className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
            <Link href="/o-slovniku" className="text-muted-foreground hover:text-foreground">
              O slovníku
            </Link>
            <Link href="/sarisske-narecie" className="text-muted-foreground hover:text-foreground">
              Šarišské nárečie
            </Link>
            <Link href="/ako-pouzivat-slovnik" className="text-muted-foreground hover:text-foreground">
              Ako čítať heslá
            </Link>
            <Link href="/ochrana-sukromia" className="text-muted-foreground hover:text-foreground">
              Ochrana súkromia
            </Link>
          </nav>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Šarišský slovník
          </p>
          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            Vytvorené s <Heart className="w-4 h-4 text-destructive fill-destructive" aria-hidden="true" /> na východe
          </p>
        </div>
      </div>
    </footer>
  )
}
