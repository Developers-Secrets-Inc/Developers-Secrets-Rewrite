import { Lock } from 'lucide-react'
import Link from 'next/link'

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'

// Types to support locked tutorials
type TutorialItem = { name: string; slug: string; locked?: boolean }
type AccordionGroup = {
  id: string
  name: string
  type: 'accordion'
  items: TutorialItem[]
}
type SingleGroup = {
  id: string
  name: string
  type: 'single'
  slug: string
  locked?: boolean
}
type TutorialGroup = AccordionGroup | SingleGroup
type TutorialCategory = { id: string; name: string; groups: TutorialGroup[] }

// Top-level categories with nested subgroups (accordions)
const categories: TutorialCategory[] = [
  {
    id: 'frontend',
    name: 'Frontend',
    groups: [
      // React as its own accordion with sub-libraries
      {
        id: 'react',
        name: 'React',
        type: 'accordion',
        items: [
          { name: 'Zustand', slug: 'zustand' },
          { name: 'Zod', slug: 'zod' },
          { name: 'TanStack Query', slug: 'tanstack-query' },
        ],
      },
      // Next.js as a standalone single group
      {
        id: 'nextjs',
        name: 'Next.js',
        type: 'single',
        slug: 'nextjs',
      },
      {
        id: 'languages',
        name: 'Languages',
        type: 'accordion',
        items: [{ name: 'TypeScript', slug: 'typescript' }],
      },
      {
        id: 'testing',
        name: 'Testing',
        type: 'accordion',
        items: [{ name: 'Testing', slug: 'testing' }],
      },
    ],
  },
  {
    id: 'backend',
    name: 'Backend',
    groups: [
      {
        id: 'languages',
        name: 'Languages',
        type: 'accordion',
        items: [
          { name: 'Node.js', slug: 'nodejs', locked: true },
          { name: 'Python', slug: 'python' },
        ],
      },
    ],
  },
]

export const TutorialCategories = () => {
  return (
    <>
      {categories.map((category) => (
        <SidebarGroup key={category.id}>
          <SidebarGroupLabel className="text-muted-foreground font-medium">
            {category.name}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              {category.groups.map((group) => {
                if (group.type === 'single') {
                  return (
                    <SidebarMenuItem key={group.id}>
                      <SidebarMenuSubButton asChild>
                        <Link href={`/articles/${group.slug}`}>{group.name}</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuItem>
                  )
                }

                return (
                  <SidebarMenuItem key={group.id}>
                    <SidebarMenuButton className="justify-between">
                      <span>{group.name}</span>
                    </SidebarMenuButton>

                    <SidebarMenuSub>
                      {group.items.map((item) => (
                        <SidebarMenuSubItem key={item.slug}>
                          {item.locked ? (
                            <SidebarMenuSubButton aria-disabled>
                              <Lock className="opacity-70" />
                              <span>{item.name}</span>
                            </SidebarMenuSubButton>
                          ) : (
                            <SidebarMenuSubButton asChild>
                              <Link href={`/articles/${item.slug}`}>{item.name}</Link>
                            </SidebarMenuSubButton>
                          )}
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  )
}
