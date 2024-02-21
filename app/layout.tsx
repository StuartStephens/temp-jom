import type { Metadata } from 'next'
import { Gothic_A1 } from 'next/font/google'
import './globals.css'
import './App.scss'
import './output.css'
import { Providers } from "./providers";

const gothic = Gothic_A1({ subsets: ['latin'], weight: '400' })

export const metadata: Metadata = {
  title: 'Joel Osteen Ministries',
  description: 'Sharing Hope for Today | Joel Osteen',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={gothic.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
