import { Collapsible, CollapsibleTrigger } from '@/components/ui/collapsible'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import { isSome } from '@/core/fn/maybe'
import { CollapsibleContent } from '@radix-ui/react-collapsible'
import { ChevronRight, HelpCircle, Info, MessageSquare } from 'lucide-react'
import Link from 'next/link'
import { SectionOutline as SectionOutlineType, SubsectionOutline } from '../sections/types'
import { ArticleTypeSwitcher } from './article-type-switcher'
import { TutorialSearchBar } from './tutorial-search-bar'
import { HomeButton } from './home-button'
import { CreateAccountCTA } from '@/components/cta/create-account-cta'
import { FeedbackDialog } from '@/api/feedbacks/components/feedback-dialog'
import { SupportDialog } from '@/api/support/components/support-message-dialog'
import { FeedbackIcon } from '@/components/icons/feedback-icon'
import { SupportStatusBadge } from '@/api/support/components/support-status-badge'

const icons = {
  book: <Info />,
}

const getIcon = (icon: string) => {
  return icons[icon as keyof typeof icons]
}

const SubsectionAccordion = ({ subsection }: { subsection: SubsectionOutline }) => {
  return (
    <Collapsible defaultOpen className="group/collapsible">
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton>
            {isSome(subsection.mainArticle) ? (
              <Link
                href={`/articles/${subsection.mainArticle.value.slug}`}
                className="text-sidebar-foreground/70"
              >
                {subsection.title}
              </Link>
            ) : (
              <span className="text-sidebar-foreground/70">{subsection.title}</span>
            )}
            <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {subsection.articles.map((article) => (
              <SidebarMenuSubItem key={article.title}>
                <SidebarMenuButton asChild>
                  <Link
                    href={
                      isSome(subsection.mainArticle)
                        ? `/articles/${subsection.mainArticle.value.slug}/${article.slug}`
                        : `/articles/${article.slug}`
                    }
                    className="text-sidebar-foreground/70"
                  >
                    {article.title}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  )
}

const SectionOutline = ({ section }: { section: SectionOutlineType }) => {
  console.log(section)

  return (
    <SidebarMenu>
      {section.items.map((item) => {
        console.log('Item', item)
        if (item.mainArticle) {
          return <SubsectionAccordion key={item.title} subsection={item} />
        }

        return (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild className="text-sidebar-foreground/70">
              <Link href={'#'}>
                {item.icon && getIcon(item.icon)}
                {item.title}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )
      })}
    </SidebarMenu>
  )
}

export const TutorialSidebar = ({
  sections,
  type,
}: {
  sections: SectionOutlineType[]
  type: 'tutorial' | 'examples' | 'references'
}) => {
  console.log(sections)

  return (
    <Sidebar>
      <SidebarHeader>
        <HomeButton />
        <TutorialSearchBar />
        <ArticleTypeSwitcher />
      </SidebarHeader>
      <SidebarContent>
        {sections.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel className="text-sidebar-foreground">
              {section.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SectionOutline section={section} />
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <FeedbackDialog>
          <SidebarMenuItem>
            <SidebarMenuButton className="cursor-pointer flex justify-between w-full">
              <span className="flex items-center gap-2">
                <MessageSquare className="size-4" />
                Feedback
              </span>
              <FeedbackIcon />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </FeedbackDialog>
        <SupportDialog>
          <SidebarMenuItem>
            <SidebarMenuButton className="cursor-pointer flex justify-between w-full">
              <span className="flex items-center gap-2">
                <HelpCircle className="size-4" />
                Support
              </span>
              <SupportStatusBadge status={'online'} />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SupportDialog>
        <CreateAccountCTA />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
