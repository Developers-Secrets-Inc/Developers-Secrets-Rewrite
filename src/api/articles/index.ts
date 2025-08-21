'use server'

import 'server-only'
import { query } from '@/core/fn'
import { Article } from '@/payload-types'
import z from 'zod'
import { Maybe, none, some } from '@/core/fn/maybe'

export const getArticle = query({
  args: z.object({
    id: z.number(),
  }),
  handler: async (ctx, args): Promise<Maybe<Article>> => {
    const documents = await ctx.payload.findByID({
      collection: 'articles',
      id: args.id,
    })
    return documents ? some(documents) : none()
  },
})
