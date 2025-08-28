'use server'

import 'server-only'

import { query } from '@/core/fn'
import z from 'zod'
import { isNone, none, some } from '@/core/fn/maybe'
import { GamificationProfile } from '@/payload-types'
import { Maybe } from '@/core/fn/maybe'
import { dispatch } from '@/core/events'

export const getGamificationProfile = query({
  args: z.object({
    userId: z.string(),
  }),
  handler: async (ctx, args): Promise<Maybe<GamificationProfile>> => {
    const documents = await ctx.payload.find({
      collection: 'gamification-profiles',
      where: {
        userId: {
          equals: args.userId,
        },
      },
    })
    return documents.docs[0] ? some(documents.docs[0]) : none()
  },
})

export const getLevel = query({
  args: z.object({
    userId: z.string(),
  }),
  handler: async (ctx, args): Promise<Maybe<number>> => {
    const documents = await ctx.payload.find({
      collection: 'gamification-profiles',
      where: {
        userId: {
          equals: args.userId,
        },
      },
      select: {
        currentLevel: true,
      },
    })
    return documents.docs[0] ? some(documents.docs[0].currentLevel) : none()
  },
})

export const getXP = query({
  args: z.object({
    userId: z.string(),
  }),
  handler: async (ctx, args): Promise<Maybe<number>> => {
    const documents = await ctx.payload.find({
      collection: 'gamification-profiles',
      where: {
        userId: {
          equals: args.userId,
        },
      },
      select: {
        currentXP: true,
      },
    })
    return documents.docs[0] ? some(documents.docs[0].currentXP) : none()
  },
})

export const getTotalXP = query({
  args: z.object({
    userId: z.string(),
  }),
  handler: async (ctx, args): Promise<Maybe<number>> => {
    const documents = await ctx.payload.find({
      collection: 'gamification-profiles',
      where: {
        userId: {
          equals: args.userId,
        },
      },
      select: {
        totalXP: true,
      },
    })
    return documents.docs[0] ? some(documents.docs[0].totalXP) : none()
  },
})

export const addXP = query({
  args: z.object({
    userId: z.string(),
    xp: z.number(),
  }),
  handler: async (ctx, args): Promise<Maybe<number>> => {
    const currentXP = await getXP({ userId: args.userId })
    const totalXP = await getTotalXP({ userId: args.userId })

    if (isNone(currentXP) || isNone(totalXP)) return none()

    const documents = await ctx.payload.update({
      collection: 'gamification-profiles',
      where: {
        userId: {
          equals: args.userId,
        },
      },
      data: {
        currentXP: currentXP.value + args.xp,
        totalXP: totalXP.value + args.xp,
      },
    })

    dispatch('gamification.xpAdded', { userId: args.userId, xp: args.xp })

    return documents.docs[0] ? some(documents.docs[0].currentXP) : none()
  },
})

export const setXP = query({
  args: z.object({
    userId: z.string(),
    xp: z.number(),
  }),
  handler: async (ctx, args): Promise<Maybe<number>> => {
    const documents = await ctx.payload.update({
      collection: 'gamification-profiles',
      where: {
        userId: {
          equals: args.userId,
        },
      },
      data: {
        currentXP: args.xp,
      },
    })
    return documents.docs[0] ? some(documents.docs[0].currentXP) : none()
  },
})

export const levelUp = query({
  args: z.object({
    userId: z.string(),
  }),
  handler: async (ctx, args): Promise<Maybe<number>> => {
    const currentLevel = await getLevel({ userId: args.userId })

    if (isNone(currentLevel)) return none()

    const documents = await ctx.payload.update({
      collection: 'gamification-profiles',
      where: {
        userId: {
          equals: args.userId,
        },
      },
      data: {
        currentLevel: currentLevel.value + 1,
      },
    })

    dispatch('gamification.levelUp', { userId: args.userId, level: currentLevel.value + 1 })

    return documents.docs[0] ? some(documents.docs[0].currentLevel) : none()
  },
})
