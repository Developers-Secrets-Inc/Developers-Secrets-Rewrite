import type { CollectionConfig } from 'payload'

export const UserSubmissions: CollectionConfig = {
  slug: 'user-submissions',
  admin: {
    useAsTitle: 'id',
    description: 'User submissions storage',
    defaultColumns: ['authorId', 'createdAt'],
    group: 'User Content',
  },
  timestamps: true,
  fields: [
    {
      name: 'authorId',
      type: 'text',
      required: true,
      index: true,
      admin: {
        description: 'User who made this submission',
      },
    },
  ],
}