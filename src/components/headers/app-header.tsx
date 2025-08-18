import { Header } from './index'
import { HomeLink } from '@/components/common/home-link'
import { AuthButtonsClient } from '@/components/buttons/auth-buttons.client'
import { AppNavigation } from '@/components/navigation/app-navigation'
import { UserSheet } from '@/core/users/components/user-sheet'

export const AppHeader = () => {
  return (
    <Header.Root>
      <Header.Left>
        <HomeLink />
        <AppNavigation className="hidden md:block" />
      </Header.Left>
      <Header.Right>
        <AuthButtonsClient className="hidden md:flex" />
        <UserSheet className="md:hidden" />
      </Header.Right>
    </Header.Root>
  )
}
