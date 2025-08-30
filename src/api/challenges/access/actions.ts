'use server'

import { mutation, query } from '@/core/fn'
import 'server-only'
import z, { ZodBoolean } from 'zod'
import { getChallengeAccess, upsertChallengeAccess } from '.'
import { isSome } from '@/core/fn/maybe'

export const abandonChallenge = mutation({
  args: z.object({
    userId: z.uuid(),
    challengeId: z.number(),
  }),
  handler: async (ctx, args): Promise<void> => {
    await upsertChallengeAccess({
      userId: args.userId,
      challengeId: args.challengeId,
      accessType: 'abandoned',
    })
  },
})

export const isSolutionUnlocked = query({
    args: z.object({
      userId: z.uuid(),
      challengeId: z.number(),
    }),
    handler: async (ctx, args): Promise<boolean> => {
      const access = await getChallengeAccess(args)
      return isSome(access)
    },
  })