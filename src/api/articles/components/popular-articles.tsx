// src/api/articles/components/popular-articles.tsx
import Link from 'next/link'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card'

export type PopularArticle = {
  title: string
  description: string
  href: string
}

const defaultItems: PopularArticle[] = [
  {
    title: 'Variables & Types',
    description: 'Learn Python variables, basic types, and best practices.',
    href: '/articles/python/examples/variables',
  },
  {
    title: 'Control Flow',
    description: 'Master if/else, loops, and common control patterns.',
    href: '/articles/python/examples/control-flow',
  },
  {
    title: 'Functions & Modules',
    description: 'Build reusable code with functions and organize with modules.',
    href: '/articles/python/references/functions',
  },
]

export const PopularArticles = ({
  items = defaultItems,
}: {
  items?: PopularArticle[]
}) => {
  return (
    <section className="mt-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg"
            aria-label={item.title}
          >
            <Card className="h-full transition-colors hover:bg-muted">
              <CardHeader>
                <CardTitle className="text-base">{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}