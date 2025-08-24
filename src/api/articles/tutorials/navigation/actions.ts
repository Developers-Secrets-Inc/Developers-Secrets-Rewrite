'use server'

import 'server-only'

import { query } from '@/core/fn'
import z from 'zod'
import { Maybe, none, some } from '@/core/fn/maybe'
import { ArticleOutline, ArticleType } from '@/api/articles/types'
import { flattenTutorialArticlesOrdered, mapIdsToSlugs } from '@/api/articles/tutorials/utils'
import { findPrevNextIndices } from './utils'
import { getArticleOutline } from '@/api/articles/actions'

const TypeEnum = z.enum(['tutorial', 'examples', 'references'])

export const getPreviousArticle = query({
  args: z.object({
    tutorialSlug: z.string(),
    articleSlug: z.string(),
    type: TypeEnum,
  }),
  handler: async (_ctx, { tutorialSlug, articleSlug, type }): Promise<Maybe<ArticleOutline>> => {
    // Build ordered list of { id, slug }
    const flat = await flattenTutorialArticlesOrdered({ tutorialSlug, type })
    const idToSlug = await mapIdsToSlugs(flat.map((f) => f.id))
    const list = flat
      .map((f) => ({ id: f.id, slug: idToSlug.get(f.id) }))
      .filter((x): x is { id: number; slug: string } => typeof x.slug === 'string')

    const { prev } = findPrevNextIndices(list, articleSlug)
    if (prev === -1) return none()

    const outline = await getArticleOutline({ id: list[prev].id })
    return some(outline)
  },
})

export const getNextArticle = query({
  args: z.object({
    tutorialSlug: z.string(),
    articleSlug: z.string(),
    type: TypeEnum,
  }),
  handler: async (_ctx, { tutorialSlug, articleSlug, type }): Promise<Maybe<ArticleOutline>> => {
    const flat = await flattenTutorialArticlesOrdered({ tutorialSlug, type })
    const idToSlug = await mapIdsToSlugs(flat.map((f) => f.id))
    const list = flat
      .map((f) => ({ id: f.id, slug: idToSlug.get(f.id) }))
      .filter((x): x is { id: number; slug: string } => typeof x.slug === 'string')

    const { next } = findPrevNextIndices(list, articleSlug)
    if (next === -1) return none()

    const outline = await getArticleOutline({ id: list[next].id })
    return some(outline)
  },
})

export const getRecommendedArticles = query({
  args: z.object({
    tutorialSlug: z.string(),
    articleSlug: z.string(),
    type: TypeEnum,
    limit: z.number().default(3),
  }),
  handler: async (
    _ctx,
    { tutorialSlug, articleSlug, type, limit },
  ): Promise<ArticleOutline[]> => {
    const flat = await flattenTutorialArticlesOrdered({ tutorialSlug, type })
    const idToSlug = await mapIdsToSlugs(flat.map((f) => f.id))
    const pool = flat
      .map((f) => ({ id: f.id, slug: idToSlug.get(f.id) }))
      .filter((x): x is { id: number; slug: string } => typeof x.slug === 'string')
      .filter((x) => x.slug !== articleSlug)

    // Shuffle (Fisher-Yates)
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[pool[i], pool[j]] = [pool[j], pool[i]]
    }

    const picked = pool.slice(0, Math.max(0, Math.min(limit, pool.length)))
    const outlines = await Promise.all(picked.map((p) => getArticleOutline({ id: p.id })))
    return outlines
  },
})
