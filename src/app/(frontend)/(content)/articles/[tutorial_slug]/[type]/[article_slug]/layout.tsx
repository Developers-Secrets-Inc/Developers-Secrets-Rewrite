import { PearlTriggerBubble } from '@/api/articles/ai/components/pearl-trigger-bubble'
import { TutorialSidebar } from '@/api/articles/tutorials/components/tutorial-sidebar'
import { ArticleType } from '@/api/articles/types'
import { AppHeader } from '@/components/headers/app-header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ tutorial_slug: string; type: ArticleType; article_slug: string }>
}) {
  const { tutorial_slug: tutorialSlug, type, article_slug: articleSlug } = await params
  const metadata = { tutorialSlug, type, articleSlug }

  return (
    <SidebarProvider>
      <TutorialSidebar {...metadata} />
      <SidebarInset className="relative h-screen flex flex-col min-h-0">
        <AppHeader />
        {children}
        <PearlTriggerBubble />
      </SidebarInset>
    </SidebarProvider>
  )
}
