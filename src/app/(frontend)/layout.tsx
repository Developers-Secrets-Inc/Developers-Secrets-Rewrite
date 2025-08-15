import '@/styles/globals.css'

import { Inter } from 'next/font/google'
import { Providers } from '@/components/providers'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  description: 'The best way to learn software engineering.',
  title: 'Developers Secrets',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" suppressHydrationWarning className={cn(inter.className)}>
      <body className="min-h-screen h-full">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
