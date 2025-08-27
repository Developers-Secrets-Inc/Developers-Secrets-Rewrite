'use client'

import type * as React from 'react'
import Link from 'next/link'
import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from 'lucide-react'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { PythonLogoIcon } from '@/components/icons/python-logo-icon'
import { ReactLogoIcon } from '@/components/icons/react-logo-icon'
import { NextjsLogoIcon } from '@/components/icons/nextjs-logo-icon'
import { TypescriptLogoIcon } from '@/components/icons/typescript-logo-icon'
import { TailwindLogoIcon } from '@/components/icons/tailwind-logo-icon'
import { DjangoLogoIcon } from '@/components/icons/django-logo-icon'
import { JsLogoIcon } from '@/components/icons/js-logo-icon'
import { HtmlLogoIcon } from '@/components/icons/html-logo-icon'
import { CssLogoIcon } from '@/components/icons/css-logo-icon'
import { GoLogoIcon } from '@/components/icons/go-logo-icon'
import { GraphQLLogoIcon } from '@/components/icons/graphql-logo-icon'
import { PostgreSqlLogoIcon } from '@/components/icons/postgresql-logo-icon'

const courses: { title: string; href: string; description: string; icon: React.ElementType }[] = [
  {
    title: 'JavaScript Fundamentals',
    href: '/articles/javascript/tutorial',
    description: 'Learn the core concepts of JavaScript.',
    icon: JsLogoIcon,
  },
  {
    title: 'HTML5 & CSS3 Basics',
    href: '/articles/html-css/tutorial',
    description: 'Build responsive web pages with modern HTML and CSS.',
    icon: HtmlLogoIcon,
  },
  {
    title: 'Go Programming',
    href: '/articles/go/tutorial',
    description: 'A powerful and efficient language for backend development.',
    icon: GoLogoIcon,
  },
  {
    title: 'GraphQL API Development',
    href: '/articles/graphql/tutorial',
    description: 'Build flexible and efficient APIs with GraphQL.',
    icon: GraphQLLogoIcon,
  },
  {
    title: 'PostgreSQL Database',
    href: '/articles/postgresql/tutorial',
    description: 'Master the open-source relational database system.',
    icon: PostgreSqlLogoIcon,
  },
  {
    title: 'Advanced CSS Techniques',
    href: '/articles/css-advanced/tutorial',
    description: 'Dive deeper into CSS for complex layouts and animations.',
    icon: CssLogoIcon,
  },
]

const tutorials: { title: string; href: string; description: string; icon: React.ElementType }[] = [
  {
    title: 'Python Basics',
    href: '/articles/python/tutorial',
    description: 'Learn the fundamentals of Python programming.',
    icon: PythonLogoIcon,
  },
  {
    title: 'React Hooks',
    href: '/articles/react/tutorial',
    description: 'Master React Hooks for state management and side effects.',
    icon: ReactLogoIcon,
  },
  {
    title: 'Next.js Fundamentals',
    href: '/articles/nextjs/tutorial',
    description: 'Build server-rendered React applications with Next.js.',
    icon: NextjsLogoIcon,
  },
  {
    title: 'TypeScript for Beginners',
    href: '/articles/typescript/tutorial',
    description: 'Add static typing to your JavaScript projects.',
    icon: TypescriptLogoIcon,
  },
  {
    title: 'Tailwind CSS Crash Course',
    href: '/articles/tailwind/tutorial',
    description: 'Utility-first CSS framework for rapid UI development.',
    icon: TailwindLogoIcon,
  },
  {
    title: 'Django Web Development',
    href: '/articles/django/tutorial',
    description: 'Create robust web applications with the Django framework.',
    icon: DjangoLogoIcon,
  },
]

export const AppNavigation = ({ className }: { className?: string }) => {
  return (
    <NavigationMenu viewport={false} className={className}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-muted-foreground">Articles</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-1 md:w-[400px] lg:w-[750px] lg:grid-cols-[.75fr_1fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                    href="/articles"
                  >
                    <div className="mt-4 mb-2 text-lg font-medium">View All Articles</div>
                    <p className="text-muted-foreground text-sm leading-tight">
                      Browse all our articles and tutorials.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ul className="grid gap-1 col-start-2">
                {tutorials.slice(0, 3).map((tutorial) => (
                  <ListItem
                    key={tutorial.title}
                    title={tutorial.title}
                    href={tutorial.href}
                    icon={tutorial.icon}
                  >
                    {tutorial.description}
                  </ListItem>
                ))}
              </ul>
              <ul className="grid gap-1 col-start-3">
                {tutorials.slice(3, 6).map((tutorial) => (
                  <ListItem
                    key={tutorial.title}
                    title={tutorial.title}
                    href={tutorial.href}
                    icon={tutorial.icon}
                  >
                    {tutorial.description}
                  </ListItem>
                ))}
              </ul>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-muted-foreground">Courses</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-1 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {courses.map((course) => (
                <ListItem
                  key={course.title}
                  title={course.title}
                  href={course.href}
                  icon={course.icon}
                >
                  {course.description}
                </ListItem>
              ))}
            </ul>
            <div className="flex justify-end pt-2 border-t">
              <Button variant="outline" asChild>
                <Link href="/catalog/courses">View All Courses</Link>
              </Button>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={cn(navigationMenuTriggerStyle(), 'text-muted-foreground')}
          >
            <Link href="/pricing">Pricing</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={cn(navigationMenuTriggerStyle(), 'text-muted-foreground')}
          >
            <Link href="/blog">Blog</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

function ListItem({
  title,
  children,
  href,
  icon: Icon,
  ...props
}: React.ComponentPropsWithoutRef<'li'> & { href: string; icon?: React.ElementType }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className="flex flex-row flex-nowrap select-none items-center space-x-3 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
        >
          {Icon && (
            <div className="flex flex-shrink-0 h-9 w-9 items-center justify-center rounded-md border">
              <Icon className="h-6 w-6" />
            </div>
          )}
          <div className="min-w-0">
            <div className="text-sm leading-none font-medium">{title}</div>
            <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">{children}</p>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
