import Link from 'next/link'
import { BookOpen, Code2, BookMarked, GraduationCap, TerminalSquare } from 'lucide-react'
import { PopularArticles } from '@/api/articles/components/popular-articles'
import { ArticlesTable } from '@/api/articles/components/articles-table'
import { PythonLogoIcon } from '@/components/icons/python-logo-icon'

const ArticleNavLink = ({
  href,
  icon: Icon,
  label,
  isActive,
}: {
  href: string
  icon: React.ElementType
  label: string
  isActive: boolean
}) => (
  <Link
    href={href}
    className={`inline-flex items-center gap-2 pb-2 leading-none ${
      isActive
        ? "relative inline-flex items-center gap-2 pb-2 leading-none text-foreground font-semibold after:absolute after:left-0 after:-bottom-[16px] after:h-1 after:w-full after:bg-primary after:rounded-t-full after:content-['']"
        : 'text-muted-foreground hover:text-foreground'
    }`}
  >
    <Icon className="h-5 w-5" />
    {label}
  </Link>
)

const navLinks = (tutorialSlug: string) => [
  {
    href: `/articles/${tutorialSlug}/tutorial`,
    icon: BookOpen,
    label: 'Tutorial',
    type: 'tutorial',
  },
  {
    href: `/catalog/courses/${tutorialSlug}`,
    icon: GraduationCap,
    label: 'Course',
    type: 'course',
  },
  {
    href: `/articles/${tutorialSlug}/examples`,
    icon: Code2,
    label: 'Examples',
    type: 'examples',
  },
  {
    href: `/articles/${tutorialSlug}/references`,
    icon: BookMarked,
    label: 'References',
    type: 'references',
  },
  {
    href: `/playground/python`,
    icon: TerminalSquare,
    label: 'Playground',
    type: 'playground',
  },
]

export default async function Page({
  params,
}: {
  params: Promise<{ tutorial_slug: string; type: string }>
}) {
  const { tutorial_slug, type } = await params

  return (
    <div className="mb-6">
      <div className="flex items-stretch gap-4">
        <div className="self-stretch flex-none aspect-square min-w-[7rem] h-32 rounded-md border border-border flex items-center justify-center py-3 md:py-4">
          <PythonLogoIcon className="h-12 w-12" />
        </div>

        <div className="flex-1 self-end">
          <h1 className="text-4xl font-semibold tracking-tight">{tutorial_slug}</h1>
          <nav className="mt-8 flex items-end gap-12 text-lg border-b border-border pb-4">
            {navLinks(tutorial_slug).map((link) => (
              <ArticleNavLink
                key={link.type}
                href={link.href}
                icon={link.icon}
                label={link.label}
                isActive={type === link.type}
              />
            ))}
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
