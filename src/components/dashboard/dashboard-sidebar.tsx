import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuItem,
  SidebarMenu,
  SidebarRail,
} from '@/components/ui/sidebar'
import { HomeButton } from './home-button'

import { FeedbackMenu } from './feedback-menu'
import { SupportMenu } from './support-menu'
import { LearningGroup } from './learning-group'
import { ProgressionGroup } from './progression-group'
import { SocialGroup } from './social-group'
import { ProCtaCard } from '@/components/cta/pro-upgrade-cta'

export const DashboardSidebar = () => {
  return (
    <Sidebar collapsible="icon" className="z-50">
      <SidebarHeader className="flex items-center justify-center h-14">
        <SidebarMenu>
          <SidebarMenuItem>
            <HomeButton />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <LearningGroup />
        <ProgressionGroup />
        <SocialGroup />
      </SidebarContent>

      <SidebarFooter>
        <FeedbackMenu />
        <SupportMenu />
        <SidebarMenuItem>
          {/* {user.value.informations.role === 'basic' ? <ProCtaCard /> : <MainSidebarNews />} */}
          <ProCtaCard />
        </SidebarMenuItem>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
