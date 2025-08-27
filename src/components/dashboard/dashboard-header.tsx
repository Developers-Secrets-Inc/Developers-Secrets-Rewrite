import { Header } from '../headers/index'
import { HomeLink } from '@/components/common/home-link'
import { AuthButtonsClient } from '@/components/buttons/auth-buttons.client'
import { AppNavigation } from '@/components/navigation/app-navigation'
import { UserSheet } from '@/core/users/components/user-sheet'
import { SidebarTrigger } from '../ui/sidebar'

export const DashboardHeader = () => {
  return (
    <Header.Root>
      <Header.Left>
        <SidebarTrigger className="size-5 text-muted-foreground" />
        <AppNavigation className="hidden md:block" />
      </Header.Left>
      <Header.Right>
        <AuthButtonsClient className="hidden md:flex" />
        <UserSheet className="md:hidden" />
      </Header.Right>
    </Header.Root>
  )
}
