import { Article } from '@/payload-types'

export type Outline = {
  title: string
  children: Outline[]
}

type LexicalNode = {
  type?: string
  tag?: string
  text?: string
  children?: LexicalNode[]
}

type ArticleContent = {
  root?: { children?: LexicalNode[] }
}

const headingLevelFromTag = (tag?: string): number => {
  if (!tag) return 6
  const match = /^h([1-6])$/.exec(tag)
  return match ? Number(match[1]) : 6
}

const plainTextFromNodes = (nodes: LexicalNode[] = []): string => {
  let result = ''
  for (const node of nodes) {
    if (!node) continue
    if (typeof node.text === 'string') {
      result += node.text
    }
    if (Array.isArray(node.children) && node.children.length) {
      result += plainTextFromNodes(node.children)
    }
  }
  return result.trim()
}

const collectHeadings = (nodes: LexicalNode[] = []): Array<{ level: number; title: string }> => {
  const res: Array<{ level: number; title: string }> = []
  for (const node of nodes) {
    if (!node) continue
    if (node.type === 'heading') {
      const level = headingLevelFromTag(node.tag)
      const title = plainTextFromNodes(node.children)
      if (title) res.push({ level, title })
    }
    // In case headings appear within nested structures (unlikely, but safe)
    if (Array.isArray(node.children) && node.children.length) {
      res.push(...collectHeadings(node.children))
    }
  }
  return res
}

export const getArticleOutline = (articleContent: Article['content']): Outline[] => {
  const content = (articleContent as unknown as ArticleContent) || {}
  const headings = collectHeadings(content.root?.children)
  if (headings.length === 0) return []

  // Build nested structure using a stack
  const root: { level: number; children: Outline[] } = { level: 0, children: [] }
  const stack: Array<{ level: number; children: Outline[] }> = [root]

  for (const h of headings) {
    const item: Outline = { title: h.title, children: [] }

    // Pop until we find a parent with a lower level
    while (stack.length > 0 && stack[stack.length - 1].level >= h.level) {
      stack.pop()
    }

    const parent = stack[stack.length - 1]
    parent.children.push(item)

    // Push this heading as new current container
    stack.push({ level: h.level, children: item.children })
  }

  return root.children
}
