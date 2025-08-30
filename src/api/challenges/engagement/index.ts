'use server'

import 'server-only'

import { mutation, query } from '@/core/fn'
import { Maybe, none, some } from '@/core/fn/maybe'
import { ChallengeEngagement } from '@/payload-types'
import z from 'zod'

export const getChallengeEngagement = query({
  args: z.object({
    userId: z.uuid(),
    challengeId: z.number(),
  }),
  handler: async (ctx, args): Promise<Maybe<ChallengeEngagement>> => {
    const documents = await ctx.payload.find({
      collection: 'challenge-engagement',
      where: { userId: { equals: args.userId }, challenge: { equals: args.challengeId } },
    })

    return documents.docs[0] ? some(documents.docs[0]) : none()
  },
})

export const createChallengeEngagement = mutation({
  args: z.object({
    userId: z.uuid(),
    challengeId: z.number(),
    engagementType: z.enum(['like', 'dislike']),
  }),
  handler: async (ctx, args) => {
    const existing = await ctx.payload.find({
      collection: 'challenge-engagement',
      where: { userId: { equals: args.userId }, challenge: { equals: args.challengeId } },
    })

    if (existing.docs[0]) {
      throw new Error('Engagement already exists for this user and challenge')
    }

    return ctx.payload.create({
      collection: 'challenge-engagement',
      data: {
        userId: args.userId,
        challenge: args.challengeId,
        engagementType: args.engagementType,
      },
    })
  },
})

export const updateChallengeEngagement = mutation({
  args: z.object({
    userId: z.uuid(),
    challengeId: z.number(),
    engagementType: z.enum(['like', 'dislike']),
  }),
  handler: async (ctx, args) => {
    const existing = await ctx.payload.find({
      collection: 'challenge-engagement',
      where: { userId: { equals: args.userId }, challenge: { equals: args.challengeId } },
    })

    if (!existing.docs[0]) {
      throw new Error('Engagement not found for this user and challenge')
    }

    return ctx.payload.update({
      collection: 'challenge-engagement',
      id: existing.docs[0].id,
      data: {
        engagementType: args.engagementType,
      },
    })
  },
})
