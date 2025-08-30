'use server'

import { mutation } from '@/core/fn'
import 'server-only'
import z from 'zod'
import { updateChallengeEngagement } from '.'

export const likeChallenge = mutation({
  args: z.object({
    userId: z.uuid(),
    challengeId: z.number(),
  }),
  handler: async (_, args) => {
    return updateChallengeEngagement({
      userId: args.userId,
      challengeId: args.challengeId,
      engagementType: 'like',
    })
  },
})


export const dislikeChallenge = mutation({
    args: z.object({
      userId: z.uuid(),
      challengeId: z.number(),
    }),
    handler: async (_, args) => {
      return updateChallengeEngagement({
        userId: args.userId,
        challengeId: args.challengeId,
        engagementType: 'dislike',
      })
    },
  })