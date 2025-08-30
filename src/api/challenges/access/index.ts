'use server'

import { mutation, query } from '@/core/fn'
import { isSome, Maybe, none, some } from '@/core/fn/maybe'
import { ChallengeAccess } from '@/payload-types'
import 'server-only'
import z from 'zod'

export const getChallengeAccess = query({
  args: z.object({
    userId: z.uuid(),
    challengeId: z.number(),
  }),
  handler: async (ctx, args): Promise<Maybe<ChallengeAccess>> => {
    const documents = await ctx.payload.find({
      collection: 'challenge-access',
      where: { userId: { equals: args.userId }, challenge: { equals: args.challengeId } },
    })

    return documents.docs[0] ? some(documents.docs[0]) : none()
  },
})

export const createChallengeAccess = mutation({
  args: z.object({
    userId: z.uuid(),
    challengeId: z.number(),
    accessType: z.enum(['completed', 'abandoned', 'admin']),
  }),
  handler: async (ctx, args): Promise<ChallengeAccess> => {
    const document = await ctx.payload.create({
      collection: 'challenge-access',
      data: {
        userId: args.userId,
        challenge: args.challengeId,
        accessType: args.accessType,
        unlockedAt: new Date().toISOString(),
      },
    })

    return document
  },
})

export const updateChallengeAccess = mutation({
  args: z.object({
    userId: z.uuid(),
    challengeId: z.number(),
    accessType: z.enum(['completed', 'abandoned', 'admin']),
  }),
  handler: async (ctx, args): Promise<Maybe<ChallengeAccess>> => {
    const result = await ctx.payload.update({
      collection: 'challenge-access',
      where: {
        userId: { equals: args.userId },
        challenge: { equals: args.challengeId },
      },
      data: {
        accessType: args.accessType,
      },
    })

    if (result.docs.length > 0) {
      return some(result.docs[0])
    } else {
      return none()
    }
  },
})

export const upsertChallengeAccess = mutation({
  args: z.object({
    userId: z.uuid(),
    challengeId: z.number(),
    accessType: z.enum(['completed', 'abandoned', 'admin']),
  }),
  handler: async (ctx, args): Promise<Maybe<ChallengeAccess>> => {
    const existingAccess = await getChallengeAccess(args)

    if (isSome(existingAccess)) {
      return await updateChallengeAccess(args)
    } else {
      return some(await createChallengeAccess(args))
    }
  },
})
