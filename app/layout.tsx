import type { Metadata, Viewport } from 'next'
import { Nunito } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CloudflarePageTracker } from '@/components/cloudflare-page-tracker'
import './globals.css'

const nunito = Nunito({ 
  subsets: ["latin", "latin-ext"],
  variable: '--font-nunito',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.slovniksaris.eu'),
  title: {
    default: 'Šarišský slovník – slovenské a šarišské slová',
    template: '%s | Šarišský slovník',
  },
  description: 'Vyhľadávajte slovenské heslá a ich šarišské podoby. Spoznajte regionálne varianty, spôsob používania slovníka a osobitosti šarišských nárečí.',
  keywords: ['šariš', 'šariština', 'slovník', 'nárečie', 'slovenčina', 'východné slovensko', 'dialekt'],
  alternates: {
    canonical: '/',
  },
  other: {
    'google-adsense-account': 'ca-pub-7058805435322327',
  },
  openGraph: {
    title: 'Šarišský slovník',
    description: 'Slovenské heslá, šarišské podoby a sprievodca šarišskými nárečiami.',
    type: 'website',
    locale: 'sk_SK',
    images: [
      {
        url: '/logo.png',
        width: 1254,
        height: 1254,
        alt: 'Šarišský Slovník',
      },
    ],
  },
  icons: {
    icon: [
      {
        url: '/favicon100.png',
        sizes: '100x100',
        type: 'image/png',
      },
    ],
    shortcut: '/favicon100.png',
    apple: '/favicon.png',
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
        <CloudflarePageTracker />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
