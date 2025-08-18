import { DefaultNodeTypes } from '@payloadcms/richtext-lexical'
import { JSXConvertersFunction, LinkJSXConverter } from '@payloadcms/richtext-lexical/react'

import { typographyConverter } from '@/components/richtext/typography-converter'
import { internalDocToHref } from '@/components/richtext/internal-link'
import { blocksConverter } from '@/components/richtext/blocks-converter'

type NodeTypes = DefaultNodeTypes

export const jsxConverter: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => {
  const linkConverters = LinkJSXConverter({ internalDocToHref })
  return {
    ...defaultConverters,
    ...linkConverters,
    ...typographyConverter,
    ...blocksConverter,
    // Merge nested `blocks` so we don't override previous mappings (e.g., Code)
    blocks: {
      ...(defaultConverters as any)?.blocks,
      ...(linkConverters as any)?.blocks,
      ...(typographyConverter as any)?.blocks,
      ...(blocksConverter as any)?.blocks,
    },
  }
}
