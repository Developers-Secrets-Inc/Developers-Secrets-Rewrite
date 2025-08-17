import { SerializedHeadingNode } from '@payloadcms/richtext-lexical'
import { JSXConverters } from '@payloadcms/richtext-lexical/react'
import { internalDocToHref } from '@/components/richtext/internal-link'
import {
  TypographyBlockquote,
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyLink,
  TypographyList,
  TypographyP,
  TypographyInlineCode,
  TypographyBold,
  TypographyItalic,
} from '@/components/typography'
import { JSX } from 'react'
import { CodeBlock, CodeBlockCode } from '@/components/code-block'

export const typographyConverter: JSXConverters<SerializedHeadingNode> = {
  heading: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children })
    if (node.tag === 'h2') {
      const id = (Array.isArray(children) ? children : [children])
        .join('')
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
      return <TypographyH2 id={id}>{children}</TypographyH2>
    }
    if (node.tag === 'h1') return <TypographyH1>{children}</TypographyH1>
    if (node.tag === 'h3') return <TypographyH3>{children}</TypographyH3>

    const Tag = node.tag as keyof JSX.IntrinsicElements
    const text = Array.isArray(children) ? children.join('') : children
    return <Tag>{text}</Tag>
  },
  paragraph: ({ node, nodesToJSX }) => (
    <TypographyP>{nodesToJSX({ nodes: node.children })}</TypographyP>
  ),
  link: ({ node, nodesToJSX }) => {
    const fields = (node as any)?.fields
    let href = '#'
    if (fields?.linkType === 'internal' && fields?.doc) {
      href = internalDocToHref({ linkNode: node as any })
    } else if (fields?.linkType === 'custom' && fields?.url) {
      href = (fields.url as string) || '#'
    }
    return <TypographyLink href={href}>{nodesToJSX({ nodes: node.children })}</TypographyLink>
  },
  quote: ({ node, nodesToJSX }) => (
    <TypographyBlockquote>{nodesToJSX({ nodes: node.children })}</TypographyBlockquote>
  ),
  list: ({ node, nodesToJSX }) => {
    const items = nodesToJSX({ nodes: node.children })
    if ((node as any).listType === 'number') {
      return <ol className="my-4 ml-6 list-decimal marker:text-gray-500 [&>li]:mt-1.5">{items}</ol>
    }
    return <TypographyList>{items}</TypographyList>
  },
  inlineCode: ({ node, nodesToJSX }) => (
    <TypographyInlineCode>{nodesToJSX({ nodes: node.children })}</TypographyInlineCode>
  ),
  bold: ({ node, nodesToJSX }) => <TypographyBold>{nodesToJSX({ nodes: node.children })}</TypographyBold>,
  italic: ({ node, nodesToJSX }) => <TypographyItalic>{nodesToJSX({ nodes: node.children })}</TypographyItalic>,
  blocks: {
    Code: ({ node }) => {
      const fields = (node as any)?.fields || {}
      const language = fields.language || 'ts'
      const code = fields.code || ''
      return (
        <CodeBlock>
          <CodeBlockCode className="pl-2" language={language} code={code} />
        </CodeBlock>
      )
    },
  },
}
