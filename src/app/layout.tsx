import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ankh.ai - Decode Your Inner World with AI',
  description: 'A comprehensive self-discovery platform powered by AI. Journey through the five sacred stages of healing: Awakening, Descent, Purification, Integration, and Embodiment.',
  keywords: ['self-discovery', 'AI therapy', 'journaling', 'dream analysis', 'wellness', 'psychology'],
  authors: [{ name: 'Ankh.ai Team' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}