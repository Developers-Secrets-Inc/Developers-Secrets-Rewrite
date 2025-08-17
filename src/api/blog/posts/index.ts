'use server'

import { query } from '@/core/fn'
import 'server-only'
import z from 'zod'
import { getPayload, Where } from 'payload'
import config from '@payload-config'
import { Maybe, none, some } from '@/core/fn/maybe'
import { BlogPost } from '@/payload-types'

export const getBlogPostBySlug = query({
  args: z.object({
    slug: z.string(),
  }),
  handler: async ({ slug }): Promise<Maybe<BlogPost>> => {
    const payload = await getPayload({ config })

    const where: Where = {
      slug: {
        equals: slug,
      },
    }

    const post = await payload.find({
      collection: 'blog-posts',
      where,
    })

    return post.docs[0] ? some(post.docs[0]) : none()
  },
})

export const getBlogPostPage = query({
  args: z.object({
    page: z.number().optional().default(1),
    limit: z.number().optional().default(15),
    category: z.string().optional(),
  }),
  handler: async ({ page, limit, category }) => {
    const payload = await getPayload({ config })

    const where: Where = {
      _status: {
        equals: 'published',
      },
    }

    if (category) {
      where.category = {
        equals: category,
      }
    }

    const posts = await payload.find({
      collection: 'blog-posts',
      page,
      limit,
      where,
    })
    return posts
  },
})
