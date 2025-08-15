import { Header } from './index'
import { HomeLink } from '@/components/common/home-link'

export const AppHeader = () => {
  return (
    <Header.Root>
      <Header.Left>
        <HomeLink />
      </Header.Left>
    </Header.Root>
  )
}
