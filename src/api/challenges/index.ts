'use server'

import { query } from '@/core/fn'
import { Maybe, none, some } from '@/core/fn/maybe'
import { Challenge } from '@/payload-types'
import 'server-only'
import z from 'zod'

export const getChallengeBySlug = query({
  args: z.object({
    challengeSlug: z.string(),
  }),
  handler: async (ctx, args): Promise<Maybe<Challenge>> => {
    const documents = await ctx.payload.find({
      collection: 'challenges',
      where: { slug: { equals: args.challengeSlug } },
    })

    return documents.docs[0] ? some(documents.docs[0]) : none()
  },
})
