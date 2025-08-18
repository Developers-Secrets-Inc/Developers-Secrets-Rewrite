import { Toaster } from '../ui/sonner'
import { ThemeProvider } from './theme-provider'
import { QueryProvider } from './query-provider'
import Script from 'next/script'

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
        {children}
        <Toaster />
        <Script
          src="https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js"
          strategy="beforeInteractive"
        />
      </ThemeProvider>
    </QueryProvider>
  )
}
