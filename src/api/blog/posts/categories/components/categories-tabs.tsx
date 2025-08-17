'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { BlogPost } from '@/payload-types'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export type BlogPostCategory = NonNullable<BlogPost['category']>

export const categories: ReadonlyArray<{ label: string; value: BlogPostCategory }> = [
  { label: 'Engineering', value: 'engineering' },
  { label: 'Community', value: 'community' },
  { label: 'Company News', value: 'company-news' },
  { label: 'Customers', value: 'customers' },
  { label: 'Changelog', value: 'changelog' },
] as const

export const CategoriesTabs = () => {
  const pathname = usePathname()
  const isCurrent = (category: BlogPostCategory) =>
    category === 'changelog' ? pathname === '/changelog' : pathname === `/blog/category/${category}`
  const isAll = pathname === '/blog'

  return (
    <div className="flex flex-wrap gap-2 py-8">
      <Button
        variant={isAll ? 'default' : 'ghost'}
        className={cn(
          'rounded-full',
          isAll ? 'border bg-primary/10 border-primary/20 text-primary hover:bg-primary/20 hover:text-primary' : '',
        )}
        size="sm"
        asChild
      >
        <Link href="/blog">All posts</Link>
      </Button>
      {categories.map((category) => (
        <Button
          key={category.value}
          variant={isCurrent(category.value) ? 'default' : 'ghost'}
          className={cn(
            'rounded-full',
            isCurrent(category.value) ? 'border bg-primary/10 border-primary/20 text-primary hover:bg-primary/20 hover:text-primary' : '',
          )}
          size="sm"
          asChild
        >
          <Link
            href={
              category.value === 'changelog' ? '/changelog' : `/blog/category/${category.value}`
            }
          >
            {category.label}
          </Link>
        </Button>
      ))}
    </div>
  )
}
