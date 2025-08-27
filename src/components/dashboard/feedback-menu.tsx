
import { FeedbackDialog } from '@/api/feedbacks/components/feedback-dialog'
import { SidebarMenuItem } from '@/components/ui/sidebar'
import { SidebarMenuButton } from '@/components/ui/sidebar'
import { MessageSquare } from 'lucide-react'
import { FeedbackIcon } from '@/components/icons/feedback-icon'

export const FeedbackMenu = () => {
  return (
    <FeedbackDialog>
      <SidebarMenuItem>
        <SidebarMenuButton className="cursor-pointer flex justify-between w-full">
          <span className="flex items-center gap-2">
            <MessageSquare className="size-4" />
            Feedback
          </span>
          <FeedbackIcon />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </FeedbackDialog>
  )
}
