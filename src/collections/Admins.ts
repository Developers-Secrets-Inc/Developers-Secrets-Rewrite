import type { CollectionConfig } from 'payload'

export const Admins: CollectionConfig = {
  slug: 'admins',
  admin: {
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true
    },
    {
      name: 'supabaseId',
      type: 'text',
      required: true
    },
    {
      name: 'avatarUrl',
      type: 'text',
      required: true
    }
  ],
}
