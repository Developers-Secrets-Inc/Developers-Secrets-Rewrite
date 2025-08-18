import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const ChangelogBreadcrumb = () => {
  return (
    <div>
      <Link
        href="/blog"
        className="inline-flex items-center text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="sr-only">Back to changelog</span>
      </Link>
      <span className="text-muted-foreground">blog</span>
      <span className="text-muted-foreground">/</span>
      <Link href="/changelog" className="text-primary-foreground hover:underline">
        changelog
      </Link>
    </div>
  )
}
