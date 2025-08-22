import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

export const PopularCategoriesTutorials = () => {
  const items = [
    {
      id: 1,
      title: 'React Hooks Deep Dive',
      category: 'React',
      description: 'Understand useEffect, useMemo, and custom hooks with practical patterns.',
      level: 'Intermediate',
    },
    {
      id: 2,
      title: 'Next.js Routing Essentials',
      category: 'Next.js',
      description: 'Master app router, dynamic routes, layouts, and loading states.',
      level: 'Beginner',
    },
    {
      id: 3,
      title: 'TypeScript Utility Types',
      category: 'TypeScript',
      description: 'Level up with Partial, Pick, Record, and advanced mapped types.',
      level: 'Intermediate',
    },
    {
      id: 4,
      title: 'Node.js Streams 101',
      category: 'Node.js',
      description: 'Process large datasets efficiently using streams and pipelines.',
      level: 'Advanced',
    },
    {
      id: 5,
      title: 'Testing React Components',
      category: 'Testing',
      description: 'Write reliable tests with Testing Library and Vitest best practices.',
      level: 'Beginner',
    },
    {
      id: 6,
      title: 'Performance in Next.js',
      category: 'Next.js',
      description: 'Optimize images, caching, and data fetching for blazing-fast apps.',
      level: 'Intermediate',
    },
  ] as const

  // Keep the same shape (bg-*/10 border-*/20 text-*) but vary color per level
  const levelStyles: Record<'Beginner' | 'Intermediate' | 'Advanced', string> = {
    Beginner: 'bg-sky-500/10 border-sky-500/20 text-sky-600',
    Intermediate: 'bg-primary/10 border-primary/20 text-primary',
    Advanced: 'bg-amber-500/10 border-amber-500/20 text-amber-600',
  }

  return (
    <section>
      <div className="mb-4">
        <h2 className="text-xl font-semibold tracking-tight">Popular Categories Tutorials</h2>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Link
            key={item.id}
            href="#"
            className="relative block rounded-lg border p-4 transition-colors hover:bg-accent/40 hover:border-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Badge variant="secondary" className={`absolute right-2 top-2 ${levelStyles[item.level]}`}>
              {item.level}
            </Badge>
            <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {item.category}
            </div>
            <h3 className="mt-1 text-base font-semibold leading-snug">{item.title}</h3>
            <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{item.description}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
