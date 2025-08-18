import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { ArticlesSidebar } from '@/api/articles/components/articles-sidebar'
import { AppHeader } from '@/components/headers/app-header'

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { tutorial_slug: string; article_slug: string }
}) {
  return (
    <SidebarProvider>
      <ArticlesSidebar />
      <SidebarInset>
        <AppHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
