import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://bimalbarkha.in'),
  title: 'Bimal and Barkha - 25 years & counting!',
  description: 'Journey of Togetherness & Love',
  generator: 'v0.app',
  openGraph: {
    title: 'Bimal and Barkha - 25 years & counting!',
    description: 'Journey of Togetherness & Love',
    url: '/',
    siteName: 'Bimal & Barkha',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Bimal & Barkha — A Silver Jubilee Celebration, 10–13 December 2026, Khopoli',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bimal and Barkha - 25 years & counting!',
    description: 'Journey of Togetherness & Love',
    images: ['/og-image.png'],
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
  colorScheme: 'light',
  themeColor: '#FAF7F2',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
