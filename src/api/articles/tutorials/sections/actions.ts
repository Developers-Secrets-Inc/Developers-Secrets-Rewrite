'use server'

import 'server-only'

import { query } from '@/core/fn'
import z from 'zod'
import { getTutorialSections } from './index'
import { SectionOutline } from './types'
import { isNone, none, some } from '@/core/fn/maybe'
import { slugifySubsectionTitle } from './utils'
import { getArticleOutline } from '../../actions'

export const getTutorialSectionOutline = query({
  args: z.object({
    tutorialSlug: z.string(),
    articleSlug: z.string(),
  }),
  handler: async (_, { tutorialSlug, articleSlug }): Promise<SectionOutline[]> => {
    const sections = await getTutorialSections({ tutorial_slug: tutorialSlug })

    if (isNone(sections)) return []

    return Promise.all(
      sections.value.map(async (section) => ({
        id: section.id ?? '',
        title: section.title,
        items: await Promise.all(
          (section.items ?? []).map(async (item) => {
            if (item.blockType === 'subSection') {
              return {
                id: String(item.id ?? slugifySubsectionTitle(item.title)),
                title: item.title,
                slug: slugifySubsectionTitle(item.title),
                mainArticle: item.mainArticle
                  ? some(
                      await (async () => {
                        const id =
                          typeof item.mainArticle === 'number'
                            ? item.mainArticle
                            : item.mainArticle.id
                        const outline = await getArticleOutline({ id })
                        return outline
                      })(),
                    )
                  : none(),
                articles: await Promise.all(
                  (item.articles ?? []).map(async (article) => {
                    const id = typeof article === 'number' ? article : article.id
                    const outline = await getArticleOutline({ id })
                    return outline
                  }),
                ),
              }
            }
            return await (async () => {
              const id = typeof item.article === 'number' ? item.article : item.article.id
              const outline = await getArticleOutline({ id })
              return outline
            })()
          }),
        ),
      })),
    )
  },
})
