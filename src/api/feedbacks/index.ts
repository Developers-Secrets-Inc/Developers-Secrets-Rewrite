'use server'

import { query } from '@/core/fn'
import 'server-only'
import z from 'zod'


export const createFeedback = query({
    args: z.object({
        message: z.string(),
        ipAddress: z.string(),
    }),
    handler: async (ctx, args) => {
        const documents = await ctx.payload.create({
            collection: 'feedbacks',
            data: args,
        })
        return documents
    }
})