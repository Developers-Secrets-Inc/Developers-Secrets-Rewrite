'use client'

import { SidebarTrigger } from '@/components/ui/sidebar'
import { useSidebar } from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'

export const ArticlesSidebarTrigger = () => {
  const { open } = useSidebar()

  return (
    !open && (
      <Button variant="outline" size="icon" className="absolute left-2 top-2 size-7" asChild>
        <SidebarTrigger />
      </Button>
    )
  )
}
