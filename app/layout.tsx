import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import Header from '@/components/layout/Header'
import './globals.css'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '맑은샘교회 새벽예배',
  description: '설교 녹음 파일을 관리하는 웹 서비스',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className={geist.className}>
      <body className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <Header />
        <main className="mx-auto max-w-4xl px-4 py-8">{children}</main>
      </body>
    </html>
  )
}
