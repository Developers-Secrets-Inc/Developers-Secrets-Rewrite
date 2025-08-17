'use server'

import 'server-only'

import { query } from '@/core/fn'
import z from 'zod'

import { getPayload } from 'payload'
import config from '@payload-config'
import { Maybe, none, some } from '@/core/fn/maybe'
import { Admin } from '@/payload-types'

export const getAdminById = query({
  args: z.object({
    id: z.uuid(),
  }),
  handler: async ({ id }): Promise<Maybe<Admin>> => {
    const payload = await getPayload({ config })
    const admin = await payload.find({
      collection: 'admins',
      where: {
        id: {
          equals: id,
        },
      },
    })
    return admin.docs[0] ? some(admin.docs[0]) : none()
  },
})
