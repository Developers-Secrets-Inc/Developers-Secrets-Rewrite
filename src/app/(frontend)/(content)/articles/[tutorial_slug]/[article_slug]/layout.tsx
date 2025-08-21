import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { AppHeader } from '@/components/headers/app-header'
import { ArticlesSidebarTrigger } from '@/api/articles/components/sidebar-trigger'
import { TutorialSidebar } from '@/api/articles/tutorials/components/tutorial-sidebar'
import { getTutorialSectionOutline } from '@/api/articles/tutorials/sections/actions'
import { ArticleViews } from '@/api/articles/views/components/article-views'

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ tutorial_slug: string; article_slug: string }>
}) {
  const { tutorial_slug: tutorialSlug, article_slug: articleSlug } = await params
  const sections = await getTutorialSectionOutline({
    tutorialSlug,
    articleSlug,
  })

  return (
    <SidebarProvider>
      <TutorialSidebar
        sections={sections}
        type="tutorial"
        tutorialSlug={tutorialSlug}
        articleSlug={articleSlug}
      />
      <SidebarInset className="h-screen flex flex-col min-h-0">
        <AppHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
