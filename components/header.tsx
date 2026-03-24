import Link from 'next/link'
import { BookOpen } from 'lucide-react'

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
            <BookOpen className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg leading-tight text-foreground">Šarišský</span>
            <span className="text-sm text-muted-foreground leading-tight -mt-0.5">Slovník</span>
          </div>
        </Link>

        <nav className="hidden sm:flex items-center gap-6">
          <Link 
            href="/" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Domov
          </Link>
          <Link 
            href="/#popular" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Populárne
          </Link>
        </nav>
      </div>
    </header>
  )
}
