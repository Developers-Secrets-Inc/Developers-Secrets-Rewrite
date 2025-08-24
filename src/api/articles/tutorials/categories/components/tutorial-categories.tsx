'use client'

import * as React from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ChevronRight, Lock } from 'lucide-react'

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'

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
  const searchParams = useSearchParams()
  const active = searchParams.get('category') ?? ''

  // Track which groups are open
  const [open, setOpen] = React.useState<Record<string, boolean>>({})

  // Ensure the group with the active category is opened by default
  React.useEffect(() => {
    if (!active) return
    // Find the subgroup that contains the active slug and open it
    for (const cat of categories) {
      for (const subgroup of cat.groups) {
        if (subgroup.type === 'accordion' && subgroup.items.some((i) => i.slug === active)) {
          const subKey = `${cat.id}:${subgroup.id}`
          setOpen((prev) => (prev[subKey] ? prev : { ...prev, [subKey]: true }))
          return
        }
      }
    }
  }, [active])

  const toggle = (id: string) => setOpen((prev) => ({ ...prev, [id]: !prev[id] }))

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
                      {group.locked ? (
                        <SidebarMenuSubButton aria-disabled title="Locked">
                          <Lock className="opacity-70" />
                          <span>{group.name}</span>
                        </SidebarMenuSubButton>
                      ) : (
                        <SidebarMenuSubButton asChild isActive={active === group.slug}>
                          <Link href={`/articles?category=${group.slug}`}>{group.name}</Link>
                        </SidebarMenuSubButton>
                      )}
                    </SidebarMenuItem>
                  )
                }

                const subKey = `${category.id}:${group.id}`
                const isSubOpen = !!open[subKey]
                return (
                  <SidebarMenuItem key={group.id}>
                    <SidebarMenuSubButton
                      onClick={() => toggle(subKey)}
                      className="justify-between"
                      aria-expanded={isSubOpen}
                    >
                      <span>{group.name}</span>
                      <ChevronRight
                        className={cn('transition-transform', isSubOpen ? 'rotate-90' : 'rotate-0')}
                      />
                    </SidebarMenuSubButton>

                    {isSubOpen && (
                      <SidebarMenuSub>
                        {group.items.map((item) => (
                          <SidebarMenuSubItem key={item.slug}>
                            {item.locked ? (
                              <SidebarMenuSubButton aria-disabled title="Locked">
                                <Lock className="opacity-70" />
                                <span>{item.name}</span>
                              </SidebarMenuSubButton>
                            ) : (
                              <SidebarMenuSubButton asChild isActive={active === item.slug}>
                                <Link href={`/articles/${item.slug}`}>{item.name}</Link>
                              </SidebarMenuSubButton>
                            )}
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    )}
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
