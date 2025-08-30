'use server'

import 'server-only'

import { mutation, query } from '@/core/fn'
import { Maybe, none, some } from '@/core/fn/maybe'
import { ChallengeRating } from '@/payload-types'
import z from 'zod'

export const getChallengeRating = query({
  args: z.object({
    userId: z.uuid(),
    challengeId: z.number(),
  }),
  handler: async (ctx, args): Promise<Maybe<ChallengeRating>> => {
    const documents = await ctx.payload.find({
      collection: 'challenge-rating',
      where: { userId: { equals: args.userId }, challenge: { equals: args.challengeId } },
    })

    return documents.docs[0] ? some(documents.docs[0]) : none()
  },
})

export const createChallengeRating = mutation({
  args: z.object({
    userId: z.uuid(),
    challengeId: z.number(),
    rating: z.number().min(1).max(5),
  }),
  handler: async (ctx, args) => {
    const existing = await ctx.payload.find({
      collection: 'challenge-rating',
      where: { userId: { equals: args.userId }, challenge: { equals: args.challengeId } },
    })

    if (existing.docs[0]) {
      throw new Error('Rating already exists for this user and challenge')
    }

    return ctx.payload.create({
      collection: 'challenge-rating',
      data: {
        userId: args.userId,
        challenge: args.challengeId,
        rating: args.rating,
      },
    })
  },
})

export const updateChallengeRating = mutation({
  args: z.object({
    userId: z.uuid(),
    challengeId: z.number(),
    rating: z.number().min(1).max(5),
  }),
  handler: async (ctx, args) => {
    const existing = await ctx.payload.find({
      collection: 'challenge-rating',
      where: { userId: { equals: args.userId }, challenge: { equals: args.challengeId } },
    })

    if (!existing.docs[0]) {
      throw new Error('Rating not found for this user and challenge')
    }

    return ctx.payload.update({
      collection: 'challenge-rating',
      id: existing.docs[0].id,
      data: {
        rating: args.rating,
      },
    })
  },
})