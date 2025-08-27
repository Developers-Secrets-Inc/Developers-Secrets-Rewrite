'use client'

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { BarChart, CheckCircle, Shield, Star } from 'lucide-react'

const progressionItems = [
  {
    title: 'Quests',
    icon: <CheckCircle className="size-4" />,
    dialog: 'quests',
  },
  {
    title: 'Achievements',
    icon: <Star className="size-4" />,
    dialog: 'achievements',
  },
  {
    title: 'Leagues',
    icon: <Shield className="size-4" />,
    dialog: 'leagues',
  },
  {
    title: 'Leaderboard',
    icon: <BarChart className="size-4" />,
    dialog: 'leaderboard',
  },
] as const

export const ProgressionGroup = () => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Progression</SidebarGroupLabel>
      <SidebarMenu>
        {progressionItems.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton tooltip={item.title}>
              {item.icon}
              {item.title}
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
