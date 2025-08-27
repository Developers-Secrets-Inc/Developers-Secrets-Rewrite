'use client'

import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar'
import {
    Package,
    Store,
    User,
    Users
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const socialItems = [
  {
    title: 'Marketplace',
    icon: <Store className="size-4" />,
    dialog: 'marketplace',
  },
  {
    title: 'Inventory',
    icon: <Package className="size-4" />,
    dialog: 'inventory',
  },
  {
    title: 'Guilds',
    icon: <Users className="size-4" />,
    dialog: 'leagues',
  },
] as const

export const SocialGroup = () => {
  const pathname = usePathname()

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Social</SidebarGroupLabel>
      <SidebarMenu>
        {socialItems.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton tooltip={item.title}>
              {item.icon}
              {item.title}
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem>
          <SidebarMenuButton
            tooltip={'Profile'}
            asChild
            isActive={pathname === 'Profile' || pathname.startsWith('Profile' + '/')}
          >
            <Link href={'/profile/me'}>
              <User className="size-4" />
              Profile
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}
