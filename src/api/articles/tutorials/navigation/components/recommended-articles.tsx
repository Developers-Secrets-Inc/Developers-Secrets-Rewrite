import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Sparkles, FileText } from 'lucide-react'
import Link from 'next/link'

export const RecommendedArticles = () => {
  const items = [
    {
      title: 'Getting started with the basics',
      description: 'A quick primer to reinforce the fundamentals before moving on.',
      href: '#',
    },
    {
      title: 'Common pitfalls and best practices',
      description: 'Avoid frequent mistakes and learn patterns used in production.',
      href: '#',
    },
    {
      title: 'Next steps and advanced topics',
      description: 'Where to go next once you are comfortable with the essentials.',
      href: '#',
    },
  ]

  return (
    <section className="border-t border-border pt-4">
      <div className="space-y-3">
          <h3 className="text-xl font-medium">Recommended articles</h3>
        <div className="grid gap-2 sm:grid-cols-2">
          {items.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="block rounded-md border p-4 transition-colors hover:bg-accent space-y-2"
            >
              <div className={cn(buttonVariants({ variant: 'outline', size: 'icon' }), "size-8")}>
                <FileText className="h-4 w-4" aria-hidden="true" />
              </div>
              <div className="text-sm font-medium leading-none">{item.title}</div>
              <p className="text-sm text-muted-foreground leading-snug">{item.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}