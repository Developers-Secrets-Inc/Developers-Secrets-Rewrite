import { Toaster } from '../ui/sonner'
import { ThemeProvider } from './theme-provider'
import { QueryProvider } from './query-provider'

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
        {children}
        <Toaster />
      </ThemeProvider>
    </QueryProvider>
  )
}
