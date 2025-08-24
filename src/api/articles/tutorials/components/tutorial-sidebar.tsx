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
import { getTutorialSectionOutline } from '../sections/actions'
import { ArticleMetadata, ArticleType } from '../../types'

const icons = {
  book: <Info />,
}

const getIcon = (icon: string) => {
  return icons[icon as keyof typeof icons]
}

const SubsectionAccordion = ({
  subsection,
  tutorialSlug,
}: {
  subsection: SubsectionOutline
  tutorialSlug: string
}) => {
  return (
    <Collapsible defaultOpen className="group/collapsible">
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton>
            {isSome(subsection.mainArticle) ? (
              <Link
                href={`/articles/${tutorialSlug}/${subsection.mainArticle.value.slug}`}
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
                        ? `/articles/${tutorialSlug}/${subsection.mainArticle.value.slug}/${article.slug}`
                        : `/articles/${tutorialSlug}/${article.slug}`
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

const activeColors: Record<ArticleType, string> = {
  tutorial:
    'data-[active=true]:bg-primary/10 data-[active=true]:text-primary data-[active=true]:border-primary/20',
  examples:
    'data-[active=true]:bg-blue-500/10 data-[active=true]:text-blue-500 data-[active=true]:border-blue-500/20',
  references:
    'data-[active=true]:bg-purple-500/10 data-[active=true]:text-purple-500 data-[active=true]:border-purple-500/20',
}

const SectionOutline = ({
  section,
  metadata,
}: {
  section: SectionOutlineType
  metadata: ArticleMetadata
}) => {
  return (
    <SidebarMenu>
      {section.items.map((item) => {
        if (item.mainArticle) {
          return (
            <SubsectionAccordion key={item.title} subsection={item} tutorialSlug={metadata.tutorialSlug} />
          )
        }

        return (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              asChild
              className={`text-sidebar-foreground/70 data-[active=true]:border ${activeColors[metadata.type]}`}
              isActive={item.slug === metadata.articleSlug}
            >
              <Link href={`/articles/${metadata.type}/${metadata.tutorialSlug}/${item.slug}`}>
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

const FeedbackMenu = () => {
  return (
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
  )
}

const SupportMenu = () => {
  return (
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
  )
}

const TutorialSidebarFooter = () => {
  return (
    <SidebarFooter>
      <FeedbackMenu />
      <SupportMenu />
      <CreateAccountCTA />
    </SidebarFooter>
  )
}

export const TutorialSidebar = async (metadata: ArticleMetadata) => {
  const sections = await getTutorialSectionOutline(metadata)

  return (
    <Sidebar>
      <SidebarHeader>
        <HomeButton />
        <TutorialSearchBar />
        <ArticleTypeSwitcher tutorialSlug={metadata.tutorialSlug} currentType={metadata.type} />
      </SidebarHeader>
      <SidebarContent>
        {sections.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel className="text-sidebar-foreground">
              {section.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SectionOutline section={section} metadata={metadata} />
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <TutorialSidebarFooter />
      <SidebarRail />
    </Sidebar>
  )
}
