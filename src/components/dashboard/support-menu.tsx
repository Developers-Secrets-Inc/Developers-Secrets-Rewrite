
import { SupportDialog } from '@/api/support/components/support-message-dialog'
import { SidebarMenuItem } from '@/components/ui/sidebar'
import { SidebarMenuButton } from '@/components/ui/sidebar'
import { HelpCircle } from 'lucide-react'
import { SupportStatusBadge } from '@/api/support/components/support-status-badge'

export const SupportMenu = () => {
  return (
    <SupportDialog>
      <SidebarMenuItem>
        <SidebarMenuButton className="cursor-pointer flex justify-between w-full">
          <span className="flex items-center gap-2">
            <HelpCircle className="size-4" />
            Support
          </span>
          <SupportStatusBadge status={'online'} />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SupportDialog>
  )
}