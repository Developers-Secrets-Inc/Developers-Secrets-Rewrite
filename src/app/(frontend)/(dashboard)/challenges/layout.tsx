import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { cookies } from 'next/headers'

export default async function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true'

  return (
    <SidebarProvider
      style={{ '--sidebar-width': '270px' } as React.CSSProperties}
      defaultOpen={defaultOpen}
    >
      <DashboardSidebar />
      <SidebarInset className="relative h-screen flex flex-col min-h-0">
        <DashboardHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
