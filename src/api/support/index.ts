'use server'

import { mutation } from '@/core/fn'
import 'server-only'
import z from 'zod'

export const createSupportMessage = mutation({
  args: z.object({
    name: z.string(),
    email: z.string(),
    message: z.string(),
    ipAddress: z.string(),
  }),
  handler: async (ctx, args) => {
    const documents = await ctx.payload.create({
      collection: 'support-messages',
      data: args,
    })
    return documents
  },
})
