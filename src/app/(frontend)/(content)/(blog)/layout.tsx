import { BlogCTA } from '@/api/blog/components/blog-cta'
import { AppHeader } from '@/components/headers/app-header'
import { Footer } from '@/components/sections/landing/main'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppHeader />
      <div className="max-w-5xl mx-auto">
        {children}
        <BlogCTA />
      </div>
      <Footer className="max-w-5xl mx-auto" />
    </>
  )
}
