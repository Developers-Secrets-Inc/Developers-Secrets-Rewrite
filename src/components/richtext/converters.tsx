import { DefaultNodeTypes } from '@payloadcms/richtext-lexical'
import { JSXConvertersFunction, LinkJSXConverter } from '@payloadcms/richtext-lexical/react'
import type { JSX, ReactNode } from 'react'

import { typographyConverter } from '@/components/richtext/typography-converter'
import { internalDocToHref } from '@/components/richtext/internal-link'
import { customConverter } from '@/components/richtext/custom-converter'

type NodeTypes = DefaultNodeTypes

export type CodeBlockRenderer = (args: {
  node: any
  nodesToJSX: (opts: { nodes: any[] }) => ReactNode[]
}) => JSX.Element

export type RichTextOverrides = {
  blocks?: {
    Code?: CodeBlockRenderer
  }
}

export const createJsxConverter =
  (overrides?: RichTextOverrides): JSXConvertersFunction<NodeTypes> =>
  ({ defaultConverters }) => {
    const base = {
      ...defaultConverters,
      ...LinkJSXConverter({ internalDocToHref }),
      ...typographyConverter,
      ...customConverter,
    } as any

    if (overrides?.blocks?.Code) {
      const existingBlocks = (base as any).blocks ?? {}
      ;(base as any).blocks = {
        ...existingBlocks,
        Code: overrides.blocks.Code,
      }
    }

    return base
  }

// Backward-compatible default converter (no overrides)
export const jsxConverter = createJsxConverter()
