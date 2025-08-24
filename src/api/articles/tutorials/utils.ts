'use server'

import 'server-only'

import { isNone } from '@/core/fn/maybe'
import { getArticlesSlugs, getArticleOutline } from '@/api/articles/actions'
import { getTutorialSections } from './sections'

export type FlatArticle = { id: number }

export async function flattenTutorialArticlesOrdered(args: {
  tutorialSlug: string
  type: 'tutorial' | 'examples' | 'references'
}): Promise<FlatArticle[]> {
  const sections = await getTutorialSections({ tutorial_slug: args.tutorialSlug, type: args.type })
  if (isNone(sections)) return []

  const orderedIds: number[] = []

  for (const section of sections.value) {
    for (const item of section.items ?? []) {
      if (item.blockType === 'article') {
        const art = item.article
        orderedIds.push(typeof art === 'number' ? art : art.id)
      } else if (item.blockType === 'subSection') {
        const main = item.mainArticle
        if (main) orderedIds.push(typeof main === 'number' ? main : main.id)
        for (const a of item.articles ?? []) {
          orderedIds.push(typeof a === 'number' ? a : a.id)
        }
      }
    }
  }

  // Deduplicate while preserving order
  const seen = new Set<number>()
  const unique = orderedIds.filter((id) => {
    if (seen.has(id)) return false
    seen.add(id)
    return true
  })

  return unique.map((id) => ({ id }))
}

export async function mapIdsToSlugs(ids: number[]): Promise<Map<number, string>> {
  if (ids.length === 0) return new Map()
  const rows = await getArticlesSlugs({ ids })
  return new Map(rows.map((r) => [r.id, r.slug]))
}

// Parent-aware flatten: keeps the parent main-article association for subsection children
export type FlatArticleWithParent = { id: number; parentId?: number }

export async function flattenTutorialArticlesWithParent(args: {
  tutorialSlug: string
  type: 'tutorial' | 'examples' | 'references'
}): Promise<FlatArticleWithParent[]> {
  const sections = await getTutorialSections({ tutorial_slug: args.tutorialSlug, type: args.type })
  if (isNone(sections)) return []

  const ordered: FlatArticleWithParent[] = []

  for (const section of sections.value) {
    for (const item of section.items ?? []) {
      if (item.blockType === 'article') {
        const art = item.article
        const id = typeof art === 'number' ? art : art.id
        ordered.push({ id })
      } else if (item.blockType === 'subSection') {
        const main = item.mainArticle
        const mainId = main ? (typeof main === 'number' ? main : main.id) : undefined
        // include main first if present
        if (mainId) ordered.push({ id: mainId })
        // then children, carrying parentId if main exists
        for (const a of item.articles ?? []) {
          const id = typeof a === 'number' ? a : a.id
          ordered.push({ id, parentId: mainId })
        }
      }
    }
  }

  // Deduplicate by first occurrence (preserve the first parentId association)
  const seen = new Set<number>()
  const unique: FlatArticleWithParent[] = []
  for (const it of ordered) {
    if (seen.has(it.id)) continue
    seen.add(it.id)
    unique.push(it)
  }

  return unique
}

// Map each article id to its parent's slug (if any)
export async function computeArticleParentSlugMap(args: {
  tutorialSlug: string
  type: 'tutorial' | 'examples' | 'references'
}): Promise<Map<number, string | undefined>> {
  const flat = await flattenTutorialArticlesWithParent(args)
  const parentIds = Array.from(new Set(flat.map((f) => f.parentId).filter((v): v is number => !!v)))
  if (parentIds.length === 0) return new Map()
  const idToSlug = await mapIdsToSlugs(parentIds)
  const map = new Map<number, string | undefined>()
  for (const it of flat) {
    map.set(it.id, it.parentId ? idToSlug.get(it.parentId) : undefined)
  }
  return map
}

// Fully resolved flat list including href and title for components
export type FlatResolvedArticle = {
  id: number
  slug: string
  title: string
  icon?: string | null | undefined
  href: string
}

export async function flattenTutorialArticlesResolved(args: {
  tutorialSlug: string
  type: 'tutorial' | 'examples' | 'references'
  buildHref: (p: {
    tutorialSlug: string
    type: 'tutorial' | 'examples' | 'references'
    articleSlug: string
    parentSlug?: string
  }) => string
}): Promise<FlatResolvedArticle[]> {
  const flat = await flattenTutorialArticlesWithParent(args)
  const parentSlugMap = await computeArticleParentSlugMap(args)

  // Fetch outlines (title, slug, icon) per id
  const outlines = await Promise.all(flat.map((f) => getArticleOutline({ id: f.id })))

  return outlines.map((o, i) => {
    const parentSlug = parentSlugMap.get(flat[i].id)
    return {
      id: o.id,
      slug: o.slug,
      title: o.title,
      icon: o.icon,
      href: args.buildHref({
        tutorialSlug: args.tutorialSlug,
        type: args.type,
        articleSlug: o.slug,
        parentSlug,
      }),
    }
  })
}
