import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  icons: {
    icon: '/icon.ico',
  },
  title: 'IndProp',
  description: 'Website for Property management by Muhammad Laksmana Indra',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 text-slate-950 tabular-nums overflow-y-scroll`}>
        {children}
      </body>
    </html>
  )
}
