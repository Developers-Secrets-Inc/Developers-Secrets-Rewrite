import type { CollectionConfig } from 'payload'

export const UserChallengeProgress: CollectionConfig = {
  slug: 'user-challenge-progress',
  admin: {
    useAsTitle: 'userId',
    defaultColumns: ['userId', 'challenge', 'status', 'updatedAt'],
    group: 'Challenges',
    description: 'Per-user challenge progress tracking',
  },
  timestamps: true,
  fields: [
    {
      name: 'userId',
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'challenge',
      type: 'relationship',
      relationTo: 'challenges',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'not_started',
      options: [
        { label: 'Not Started', value: 'not_started' },
        { label: 'In Progress', value: 'in_progress' },
        { label: 'Completed', value: 'completed' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Current status of the challenge for this user',
      },
    },
  ],
  indexes: [
    { fields: ['userId', 'challenge'] },
  ],
}