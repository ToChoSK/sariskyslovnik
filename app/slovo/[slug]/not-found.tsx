import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { SearchBox } from '@/components/search-box'
import { BookX, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-muted flex items-center justify-center">
              <BookX className="w-10 h-10 text-muted-foreground" />
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
              Slovo nenájdené
            </h1>

            <p className="text-muted-foreground mb-8">
              Toto slovo sa v našom slovníku nenachádza. 
              Skúste vyhľadať iné slovo alebo sa vráťte na domovskú stránku.
            </p>

            <div className="space-y-4">
              <SearchBox placeholder="Hľadať iné slovo..." />

              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
              >
                <ArrowLeft className="w-4 h-4" />
                Späť na domovskú stránku
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
