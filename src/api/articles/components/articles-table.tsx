import Link from 'next/link'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'

type ArticleItem = { title: string; href: string; description?: string }
type Section = { id: string; label: string; description?: string; articles: ArticleItem[] }

const sections: Section[] = [
  {
    id: 'tutorial',
    label: 'Tutorial',
    description: 'Start here with progressive lessons.',
    articles: [
      {
        title: 'Getting Started',
        href: '/articles/python/tutorial/getting-started',
        description: 'Environment, syntax, first steps.',
      },
      {
        title: 'Variables & Types',
        href: '/articles/python/examples/variables',
        description: 'Numbers, strings, lists, dicts.',
      },
      {
        title: 'Control Flow',
        href: '/articles/python/examples/control-flow',
        description: 'if/else, loops, patterns.',
      },
    ],
  },
  {
    id: 'examples',
    label: 'Examples',
    description: 'Hands-on code samples.',
    articles: [
      {
        title: 'Functions & Modules',
        href: '/articles/python/references/functions',
        description: 'Reusable code and organization.',
      },
      {
        title: 'File I/O',
        href: '/articles/python/examples/file-io',
        description: 'Read/write files safely.',
      },
      {
        title: 'Error Handling',
        href: '/articles/python/examples/errors',
        description: 'Exceptions and best practices.',
      },
    ],
  },
  {
    id: 'references',
    label: 'References',
    description: 'Concise lookups for APIs and syntax.',
    articles: [
      {
        title: 'Built-ins',
        href: '/articles/python/references/builtins',
        description: 'Core functions and types.',
      },
      {
        title: 'Standard Library',
        href: '/articles/python/references/stdlib',
        description: 'Useful modules overview.',
      },
      {
        title: 'Typing',
        href: '/articles/python/references/typing',
        description: 'Type hints and usage.',
      },
    ],
  },
]

export const ArticlesTable = ({ defaultSection = 'tutorial' }: { defaultSection?: string }) => {
  return (
    <Card className="p-0">
      <CardContent className="p-0">
        <Tabs defaultValue={defaultSection} className="gap-6 lg:flex lg:flex-row lg:gap-0">
          <div className="flex-none lg:w-1/5 lg:border-r lg:border-border flex flex-col">
            <TabsList className="flex h-auto w-full flex-1 flex-col bg-transparent p-0 divide-y divide-border">
              {sections.map((s) => (
                <TabsTrigger
                  key={s.id}
                  value={s.id}
                  className="w-full justify-start rounded-none text-left font-medium px-4 py-4 first:rounded-tl-md last:rounded-bl-md"
                >
                  {s.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <div className="flex-1 min-w-0 lg:w-4/5">
            {sections.map((s) => (
              <TabsContent key={s.id} value={s.id} className="flex-1">
                <ul className="divide-y divide-border">
                  {s.articles.map((a) => (
                    <li key={a.href} className="p-4 hover:bg-muted/50">
                      <Link href={a.href} className="group block">
                        <div>
                          <h3 className="text-sm font-medium leading-none group-hover:underline">
                            {a.title}
                          </h3>
                          {a.description && (
                            <p className="mt-1 text-sm text-muted-foreground">{a.description}</p>
                          )}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </CardContent>
    </Card>
  )
}
