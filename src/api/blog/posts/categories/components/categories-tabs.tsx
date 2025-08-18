'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { BlogPost } from '@/payload-types'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export type BlogPostCategory = NonNullable<BlogPost['category']> | 'all'

export const categories: ReadonlyArray<{ label: string; value: BlogPostCategory; href: string }> = [
  { label: 'All posts', value: 'all', href: '/blog' },
  { label: 'Engineering', value: 'engineering', href: '/blog/category/engineering' },
  { label: 'Community', value: 'community', href: '/blog/category/community' },
  { label: 'Company News', value: 'company-news', href: '/blog/category/company-news' },
  { label: 'Customers', value: 'customers', href: '/blog/category/customers' },
  { label: 'Changelog', value: 'changelog', href: '/changelog' },
] as const

export const CategoriesTabs = () => {
  const pathname = usePathname()
  const isCurrent = (category: BlogPostCategory) => {
    if (category === 'all') return pathname === '/blog'
    if (category === 'changelog') return pathname === '/changelog'
    return pathname === `/blog/category/${category}`
  }

  return (
    <div className="flex flex-wrap gap-2 py-8">
      {categories.map((category) => (
        <Button
          key={category.value}
          variant={isCurrent(category.value) ? 'default' : 'ghost'}
          className={cn(
            'rounded-full',
            isCurrent(category.value)
              ? 'border bg-primary/10 border-primary/20 text-primary hover:bg-primary/20 hover:text-primary'
              : '',
          )}
          size="sm"
          asChild
        >
          <Link href={category.href}>{category.label}</Link>
        </Button>
      ))}
    </div>
  )
}
