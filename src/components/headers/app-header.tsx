import { Header } from './index'
import { HomeLink } from '@/components/common/home-link'
import { AuthButtonsClient } from '@/components/buttons/auth-buttons.client'
import { AppNavigation } from '@/components/navigation/app-navigation'

export const AppHeader = () => {
  return (
    <Header.Root>
      <Header.Left>
        <HomeLink />
        <AppNavigation />
      </Header.Left>
      <Header.Right>
        <AuthButtonsClient />
      </Header.Right>
    </Header.Root>
  )
}
