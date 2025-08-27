import { SidebarMenuButton } from '@/components/ui/sidebar'
import Link from 'next/link'
import { Eclipse } from 'lucide-react'

export const HomeButton = () => {
    return (
      <SidebarMenuButton
        size="lg"
        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:cursor-pointer"
        asChild
      >
        <Link href="/">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <Eclipse className="size-4" />
          </div>
          <div className="flex flex-col gap-0.5 leading-none">
            <span className="font-semibold">Developers Secrets</span>
          </div>
        </Link>
      </SidebarMenuButton>
    )
  }