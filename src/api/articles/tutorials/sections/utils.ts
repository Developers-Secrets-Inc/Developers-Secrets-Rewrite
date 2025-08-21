import { Article, Tutorial } from '@/payload-types'
import { Section, Subsection } from './types'
import { none, some } from '@/core/fn/maybe'

export const convertPayloadSectionToSection = (
  payloadSection: NonNullable<Tutorial['sections']>[number],
): Section => {
  const items: Section['items'] = []

  for (const item of payloadSection.items ?? []) {
    if (item.blockType === 'article') {
      const art = item.article
      if (typeof art !== 'number') {
        items.push(art)
      }
    } else if (item.blockType === 'subSection') {
      const main = item.mainArticle
      const mainMaybe = main && typeof main !== 'number' ? some(main) : none<Article>()
      const articles: Article[] = (item.articles ?? []).filter(
        (a): a is Article => typeof a !== 'number',
      )
      items.push({
        title: item.title,
        mainArticle: mainMaybe,
        articles,
      })
    }
  }

  return {
    id: payloadSection.id ?? '',
    title: payloadSection.title,
    items,
  }
}

export const slugifySubsectionTitle = (title: string) => {
  return title.toLowerCase().replace(/\s+/g, '-')
}

export const isSubsection = (item: Section['items'][number]): item is Subsection => {
  return 'mainArticle' in item
}

export const getSectionArticles = (section: NonNullable<Tutorial['sections']>[number]): number[] => {
  return (
    section.items
      ?.filter((item) => item.blockType === 'article')
      .map((item) => (typeof item.article === 'number' ? item.article : item.article.id)) ?? []
  )
}
