import type { Metadata } from 'next'
import { Assistant, Heebo } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import { ProgressProvider } from '@/contexts/ProgressContext'

const assistant = Assistant({
  subsets: ['hebrew', 'latin'],
  variable: '--font-assistant',
  display: 'swap',
})

const heebo = Heebo({
  subsets: ['hebrew', 'latin'],
  variable: '--font-heebo',
  weight: ['300', '400', '500', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'מתמטיקול - שבילים פלוס',
  description: 'אפליקציה ללימוד מתמטיקה לכיתות א-ו',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he" dir="rtl">
      <body className={`${assistant.variable} ${heebo.variable} font-sans antialiased`}>
        <ProgressProvider>
          <Header />
          {children}
        </ProgressProvider>
      </body>
    </html>
  )
}
