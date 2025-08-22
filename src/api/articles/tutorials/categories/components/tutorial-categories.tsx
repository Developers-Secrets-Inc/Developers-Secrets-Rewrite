'use client'

import * as React from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ChevronRight } from 'lucide-react'

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'

const groups = [
  {
    id: 'frameworks',
    name: 'Frameworks',
    items: [
      { name: 'React', slug: 'react' },
      { name: 'Next.js', slug: 'nextjs' },
    ],
  },
  {
    id: 'languages',
    name: 'Languages',
    items: [
      { name: 'TypeScript', slug: 'typescript' },
      { name: 'Node.js', slug: 'nodejs' },
    ],
  },
  {
    id: 'testing',
    name: 'Testing',
    items: [{ name: 'Testing', slug: 'testing' }],
  },
] as const

export const TutorialCategories = () => {
  const searchParams = useSearchParams()
  const active = searchParams.get('category') ?? ''

  // Track which groups are open
  const [open, setOpen] = React.useState<Record<string, boolean>>({})

  // Ensure the group with the active category is opened by default
  React.useEffect(() => {
    if (!active) return
    const parent = groups.find((g) => g.items.some((i) => i.slug === active))
    if (parent && !open[parent.id]) {
      setOpen((prev) => ({ ...prev, [parent.id]: true }))
    }
  }, [active, open])

  const toggle = (id: string) => setOpen((prev) => ({ ...prev, [id]: !prev[id] }))

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-muted-foreground font-medium">
        Categories
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className="gap-0.5">
          {groups.map((group) => {
            const isOpen = !!open[group.id]
            return (
              <SidebarMenuItem key={group.id}>
                <SidebarMenuButton
                  onClick={() => toggle(group.id)}
                  className="justify-between"
                  aria-expanded={isOpen}
                >
                  <span>{group.name}</span>
                  <ChevronRight
                    className={cn('transition-transform', isOpen ? 'rotate-90' : 'rotate-0')}
                  />
                </SidebarMenuButton>

                {isOpen && (
                  <SidebarMenuSub>
                    {group.items.map((item) => (
                      <SidebarMenuSubItem key={item.slug}>
                        <SidebarMenuSubButton asChild isActive={active === item.slug}>
                          <Link href={`/articles?category=${item.slug}`}>{item.name}</Link>
                        </SidebarMenuSubButton>
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
  )
}
