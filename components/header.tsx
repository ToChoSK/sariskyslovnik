import Link from 'next/link'
import Image from 'next/image'

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/logo.png"
            alt=""
            width={40}
            height={40}
            priority
            className="h-10 w-10 rounded-xl shadow-md transition-shadow group-hover:shadow-lg"
          />
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
