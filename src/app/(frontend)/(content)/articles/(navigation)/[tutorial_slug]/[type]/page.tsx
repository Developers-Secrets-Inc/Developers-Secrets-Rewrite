import Link from 'next/link'
import { BookOpen, Code2, BookMarked, GraduationCap, TerminalSquare } from 'lucide-react'
import { PopularArticles } from '@/api/articles/components/popular-articles'
import { ArticlesTable } from '@/api/articles/components/articles-table'



export default async function Page({
  params,
}: {
  params: Promise<{ tutorial_slug: string; type: string }>
}) {
  const { tutorial_slug, type } = await params

  return (
    <div className="mb-6">
      <div className="flex items-stretch gap-4">
        <div className="self-stretch flex-none aspect-square min-w-[7rem] h-32 rounded-md bg-muted flex items-center justify-center py-3 md:py-4">
          <BookOpen className="h-12 w-12 text-muted-foreground" />
        </div>

        <div className="flex-1 self-end">
          <h1 className="text-4xl font-semibold tracking-tight">Python</h1>
          <nav className="mt-8 flex items-end gap-12 text-lg border-b border-border pb-4">
            <Link
              href="/articles/python/tutorial"
              aria-current="page"
              className="relative inline-flex items-center gap-2 pb-2 leading-none text-foreground font-semibold after:absolute after:left-0 after:-bottom-[16px] after:h-1 after:w-full after:bg-primary after:rounded-t-full after:content-['']"
            >
              <BookOpen className="h-5 w-5" />
              Tutorial
            </Link>
            <Link
              href="/articles/python/course"
              className="inline-flex items-center gap-2 pb-2 leading-none text-muted-foreground hover:text-foreground"
            >
              <GraduationCap className="h-5 w-5" />
              Course
            </Link>
            <Link
              href="/articles/python/examples"
              className="inline-flex items-center gap-2 pb-2 leading-none text-muted-foreground hover:text-foreground"
            >
              <Code2 className="h-5 w-5" />
              Examples
            </Link>
            <Link
              href="/articles/python/references"
              className="inline-flex items-center gap-2 pb-2 leading-none text-muted-foreground hover:text-foreground"
            >
              <BookMarked className="h-5 w-5" />
              References
            </Link>
            <Link
              href="/articles/playground/python"
              className="inline-flex items-center gap-2 pb-2 leading-none text-muted-foreground hover:text-foreground"
            >
              <TerminalSquare className="h-5 w-5" />
              Compiler
            </Link>
          </nav>
        </div>
      </div>
      <p className="mt-6 max-w-3xl text-base text-muted-foreground leading-relaxed">
        Learn Python from the ground up with clear, progressive lessons, practical examples, and
        concise references. This tutorial covers core concepts like syntax, data types, control
        flow, functions, modules, and common patterns—so you can move from fundamentals to real
        projects with confidence.
      </p>
      <h2 className="mt-6 text-2xl font-semibold tracking-tight">Popular Articles</h2>
      <PopularArticles />
      <div className="mt-6">
        <ArticlesTable />
      </div>
    </div>
  )
}