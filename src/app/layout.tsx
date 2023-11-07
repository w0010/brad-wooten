import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import Header from './com/Header'
import Footer from './com/Footer'
import Polyspace from './com/Polyspace'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Brad Wooten',
  description: 'Tattooer x Developer x Sculptor',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex min-h-screen flex-col items-center justify-between p-24`}>
        <Header />

        {children}
        <Polyspace />
        <Footer />
      </body>
    </html>
  )
}
