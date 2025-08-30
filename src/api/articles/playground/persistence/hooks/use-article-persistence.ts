import { useLocalPersistence } from '@/core/ide/persistence/hooks/use-local-persistence'

export interface ArticleSaveContext {
  tutorialSlug: string
  articleType: string
  articleSlug: string
}

export const useArticlePersistence = (context: ArticleSaveContext) => {
  const key = `article-${context.tutorialSlug}-${context.articleType}-$    
  {context.articleSlug}`
  return useLocalPersistence({ key, autoSave: true })
}
