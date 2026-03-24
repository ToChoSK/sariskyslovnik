import { Heart } from 'lucide-react'

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            Zachovávame krásne šarišské nárečie pre budúce generácie.
          </p>
          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            Vytvorené s <Heart className="w-4 h-4 text-destructive fill-destructive" /> na východe
          </p>
        </div>
      </div>
    </footer>
  )
}
