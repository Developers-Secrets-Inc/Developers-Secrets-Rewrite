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
  const { tutorial_slug, article_slug } = await params
  const sections = await getTutorialSectionOutline({
    tutorialSlug: tutorial_slug,
    articleSlug: article_slug,
  })

  return (
    <SidebarProvider>
      <TutorialSidebar sections={sections} type="tutorial" />
      <SidebarInset className="h-screen flex flex-col min-h-0">
        <AppHeader />
        <div className="relative flex-1 min-h-0 flex overflow-hidden">
          <ArticlesSidebarTrigger />
          <div className="flex-1 min-h-0 overflow-y-auto">
            <ArticleViews>{children}</ArticleViews>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
