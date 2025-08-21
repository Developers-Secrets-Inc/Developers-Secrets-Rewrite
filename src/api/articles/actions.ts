'use server'

import { query } from '@/core/fn'
import 'server-only'
import z from 'zod'
import { ArticleOutline } from './types'

export const getArticlesSlugs = query({
  args: z.object({
    ids: z.array(z.number()),
  }),
  handler: async (ctx, args): Promise<{ id: number; slug: string }[]> => {
    const documents = await ctx.payload.find({
      collection: 'articles',
      where: {
        id: {
          in: args.ids,
        },
      },
      select: {
        slug: true,
      },
    })
    return documents.docs
  },
})

export const getArticleOutline = query({
  args: z.object({
    id: z.number(),
  }),
  handler: async (ctx, args): Promise<ArticleOutline> => {
    const documents = await ctx.payload.findByID({
      collection: 'articles',
      id: args.id,
      select: {
        icon: true,
        title: true,
        slug: true,
      },
    })
    return documents
  },
})
