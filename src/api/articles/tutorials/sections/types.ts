import { Maybe } from '@/core/fn/maybe'
import { Article } from '@/payload-types'
import { ArticleOutline } from '../../types'

export type Subsection = {
  title: string
  mainArticle: Maybe<Article>
  articles: Article[]
}

export type Section = {
  id: string
  title: string
  items: (Article | Subsection)[]
}

export type SubsectionOutline = {
  id: string
  title: string
  slug: string
  mainArticle: Maybe<ArticleOutline>
  articles: ArticleOutline[]
}

export type SectionOutline = {
  id: string
  title: string
  items: (ArticleOutline | SubsectionOutline)[]
}
