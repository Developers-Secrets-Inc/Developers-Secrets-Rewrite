export type ArticleOutline = {
  id: number
  icon?: string | null | undefined
  title: string
  slug: string
}


export type ArticleType = 'tutorial' | 'examples' | 'references'


export type ArticleMetadata = {
  tutorialSlug: string 
  type: ArticleType 
  articleSlug: string
}