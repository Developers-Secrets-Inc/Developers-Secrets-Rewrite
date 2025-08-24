import { Check, ChevronsUpDown, GraduationCap, Code2, BookMarked } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import Link from 'next/link'

type ArticleType = 'tutorial' | 'examples' | 'references'

const ArticleTypeIcon = {
  tutorial: {
    color: 'bg-sidebar-primary/10 border-sidebar-primary/20 ',
    icon: <GraduationCap className="size-4 text-sidebar-primary" />,
  },
  examples: {
    color: 'bg-blue-500/10 border-blue-500/20',
    icon: <Code2 className="size-4 text-blue-500" />,
  },
  references: {
    color: 'bg-purple-500/10 border-purple-500/20',
    icon: <BookMarked className="size-4 text-purple-500" />,
  },
}

export function ArticleTypeSwitcher({
  tutorialSlug,
  currentType,
}: {
  tutorialSlug: string
  currentType: ArticleType
}) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton className="border border-border h-10 px-1">
              <div
                className={`${ArticleTypeIcon[currentType].color} border flex aspect-square size-8 items-center justify-center rounded-lg`}
              >
                {ArticleTypeIcon[currentType].icon}
              </div>
              <div className="flex flex-col gap-0.5 leading-none font-semibold">
                {currentType.charAt(0).toUpperCase() + currentType.slice(1)}
              </div>
              <ChevronsUpDown className="ml-auto text-muted-foreground" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width)" align="start">
            {['tutorial', 'examples', 'references'].map((type) => (
              <DropdownMenuItem key={type} asChild>
                <Link href={`/${tutorialSlug}/${type}`}>
                  <div
                    className={`${ArticleTypeIcon[type as ArticleType].color} border flex aspect-square size-8 items-center justify-center rounded-lg`}
                  >
                    {ArticleTypeIcon[type as ArticleType].icon}
                  </div>
                  <div className="flex flex-col gap-0.5 leading-none font-semibold">
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </div>
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
