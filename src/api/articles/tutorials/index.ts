'use server'

import 'server-only'
import { query } from '@/core/fn'
import z from 'zod'
import { Maybe, none, some } from '@/core/fn/maybe'
import { Tutorial } from '@/payload-types'

export const getTutorialBySlug = query({
  args: z.object({
    slug: z.string(),
  }),
  handler: async (ctx, args): Promise<Maybe<Tutorial>> => {
    const documents = await ctx.payload.find({
      collection: 'tutorials',
      where: {
        slug: {
          equals: args.slug,
        },
      },
    })
    return documents.docs[0] ? some(documents.docs[0]) : none()
  },
})
