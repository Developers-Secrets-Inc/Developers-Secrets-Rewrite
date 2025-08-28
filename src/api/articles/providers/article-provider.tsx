'use client'
import React, { createContext, useContext } from 'react'
import type { ArticleType } from '@/api/articles/types'

type Article = {
  tutorialSlug: string
  type: ArticleType
  articleSlug: string
}

const ArticleContext = createContext<Article | undefined>(undefined)

type ProviderWithValueProps = {
  children: React.ReactNode
  value: Article
}

type ProviderWithPropsProps = {
  children: React.ReactNode
  tutorialSlug: string
  type: ArticleType
  articleSlug: string
}

type ArticleProviderProps = ProviderWithValueProps | ProviderWithPropsProps

export function ArticleProvider(props: ArticleProviderProps) {
  const { children } = props as any
  const value: Article =
    'value' in props
      ? props.value
      : {
          tutorialSlug: (props as ProviderWithPropsProps).tutorialSlug,
          type: (props as ProviderWithPropsProps).type,
          articleSlug: (props as ProviderWithPropsProps).articleSlug,
        }

  return <ArticleContext.Provider value={value}>{children}</ArticleContext.Provider>
}

export function useArticle(): Article {
  const ctx = useContext(ArticleContext)
  if (!ctx) {
    throw new Error('useArticle must be used within an ArticleProvider')
  }
  return ctx
}
