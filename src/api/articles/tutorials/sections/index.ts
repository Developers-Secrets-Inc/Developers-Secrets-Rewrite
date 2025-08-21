'use server'

import { query } from '@/core/fn'
import { isNone, match, Maybe, none, some } from '@/core/fn/maybe'
import { Article, Tutorial } from '@/payload-types'
import 'server-only'
import z from 'zod'
import { convertPayloadSectionToSection, getSectionArticles, isSubsection } from './utils'
import { getArticlesSlugs } from '../../actions'

// Maybe we could create another action to get an article for a sub-section.

export const getTutorialSections = query({
  args: z.object({
    tutorial_slug: z.string(),
  }),
  handler: async (ctx, args): Promise<Maybe<NonNullable<Tutorial['sections']>>> => {
    const documents = await ctx.payload.find({
      collection: 'tutorials',
      where: {
        slug: {
          equals: args.tutorial_slug,
        },
      },
      depth: 0,
    })
    return documents.docs[0].sections ? some(documents.docs[0].sections) : none()
  },
})

export const getTutorialArticle = query({
  args: z.object({
    tutorial_slug: z.string(),
    article_slug: z.string(),
  }),
  handler: async (ctx, args): Promise<Maybe<Article>> => {
    const sections = await getTutorialSections({ tutorial_slug: args.tutorial_slug })

    if (isNone(sections)) return none()

    const articles = await Promise.all(
      sections.value.flatMap(async (section) => {
        const slugs = await getArticlesSlugs({ ids: getSectionArticles(section) })
        const articleSlug = slugs.find((slug) => slug.slug === args.article_slug)
        if (!articleSlug) return none()
        const article = await ctx.payload.findByID({
          collection: 'articles',
          id: articleSlug.id,
        })
        return article ? some(article) : none()
      }),
    )

    return articles[0]
  },
})
