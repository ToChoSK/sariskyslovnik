import type { Metadata, Viewport } from 'next'
import { Nunito } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const nunito = Nunito({ 
  subsets: ["latin", "latin-ext"],
  variable: '--font-nunito',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Šarišský Slovník - Preklad slovenčiny do šarištiny',
  description: 'Najväčší online slovník slovensko-šarišského nárečia. Preložte slovenské slová do šarištiny a objavte krásu východoslovenského dialektu.',
  keywords: ['šariš', 'šariština', 'slovník', 'nárečie', 'slovenčina', 'východné slovensko', 'dialekt'],
  generator: 'v0.app',
  openGraph: {
    title: 'Šarišský Slovník',
    description: 'Preložte slovenské slová do šarištiny',
    type: 'website',
    locale: 'sk_SK',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#d97706',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="sk">
      <body className={`${nunito.variable} font-sans antialiased min-h-screen`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
