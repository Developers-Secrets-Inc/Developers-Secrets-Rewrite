'use server'

import { query } from '@/core/fn'
import 'server-only'
import z from 'zod'
import { getPayload, Where } from 'payload'
import config from '@payload-config'

// 1. Get timeline with pagination for show more button 
// 2. Get a specific changelog article


export const getChangelogPage = query({
  args: z.object({
    page: z.number().optional().default(1),
    limit: z.number().optional().default(15),
  }),
  handler: async ({ page, limit }) => {
    const payload = await getPayload({ config })

    const where: Where = {
      _status: {
        equals: 'published',
      },
      category: {
        equals: 'changelog',
      },
    }

    const changelog = await payload.find({
      collection: 'blog-posts',
      where,
      page,
      limit,
    })

    return changelog
  },
})