import { JSXConverters } from '@payloadcms/richtext-lexical/react'
import { SerializedHeadingNode } from '@payloadcms/richtext-lexical'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { AlertCircleIcon, TagsIcon } from 'lucide-react'

export const blocksConverter: JSXConverters<SerializedHeadingNode> = {
  blocks: {
    Alert: ({ node }: { node: any }) => {
      const fields = (node as any)?.fields || {}
      const variant = (fields.variant as 'default' | 'destructive') || 'default'
      const content = (fields.content as string) || ''

      return (
        <Alert variant={variant}>
          <AlertCircleIcon className="text-muted" />
          <AlertDescription>{content}</AlertDescription>
        </Alert>
      )
    },
    CTA: ({ node }: { node: any }) => {
      const fields = (node as any)?.fields || {}
      const title = (fields.title as string) || ''
      const description = (fields.description as string) || ''
      const buttonLabel = (fields.buttonLabel as string) || ''
      const href = (fields.href as string) || '#'
      const newTab = Boolean(fields.newTab)

      return (
        <section className="my-6 flex items-center justify-between gap-6 rounded-lg border bg-card p-5 text-card-foreground">
          <div className="min-w-0 pr-6">
            <div className="mb-2 flex items-center gap-2">
              <TagsIcon className="size-4 shrink-0 self-center" />
              {title ? (
                <h3 className="font-semibold leading-none tracking-tight">{title}</h3>
              ) : null}
            </div>
            {description ? <p className="mb-4 text-muted-foreground">{description}</p> : null}
          </div>
          {buttonLabel ? (
            <Button variant="outline" asChild className="shrink-0">
              <Link
                href={href}
                target={newTab ? '_blank' : undefined}
                rel={newTab ? 'noreferrer noopener' : undefined}
              >
                {buttonLabel}
              </Link>
            </Button>
          ) : null}
        </section>
      )
    },
  },
}
