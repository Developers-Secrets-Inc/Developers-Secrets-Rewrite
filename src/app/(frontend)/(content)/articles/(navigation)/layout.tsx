import { TutorialCategories } from '@/api/articles/tutorials/categories/components'
import { AppHeader } from '@/components/headers/app-header'
import { Footer } from '@/components/sections/landing/main'
import { Sidebar, SidebarContent, SidebarProvider } from '@/components/ui/sidebar'
import { Suspense } from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <AppHeader />
      <div className="mx-auto w-full max-w-7xl border-x border-b flex-1 min-h-0">
        <SidebarProvider className="min-h-min flex-1 items-start px-0 [--sidebar-width:220px] lg:grid lg:grid-cols-[var(--sidebar-width)_minmax(0,1fr)] lg:[--sidebar-width:240px] lg:divide-x">
          <Sidebar
            className="sticky top-14 z-30 hidden h-[calc(100svh-theme(space.14))] bg-transparent lg:flex"
            collapsible="none"
          >
            <SidebarContent className="no-scrollbar px-2 pb-12">
              <Suspense>
                <TutorialCategories />
              </Suspense>
            </SidebarContent>
          </Sidebar>

          <div className="h-full w-full p-8">{children}</div>
        </SidebarProvider>
      </div>
      <Footer />
    </div>
  )
}
