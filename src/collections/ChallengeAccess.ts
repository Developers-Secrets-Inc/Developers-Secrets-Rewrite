import type { CollectionConfig } from 'payload'

export const ChallengeAccess: CollectionConfig = {
  slug: 'challenge-access',
  admin: {
    useAsTitle: 'userId',
    defaultColumns: ['userId', 'challenge', 'accessType', 'unlockedAt'],
    group: 'Challenges',
    description: 'Challenge solution access tracking',
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
      name: 'accessType',
      type: 'select',
      required: true,
      options: [
        { label: 'Completed Challenge', value: 'completed' },
        { label: 'Abandoned Challenge', value: 'abandoned' },
        { label: 'Admin Access', value: 'admin' },
      ],
      admin: {
        position: 'sidebar',
        description: 'How the user gained access to the solution',
      },
    },
    {
      name: 'unlockedAt',
      type: 'date',
      required: true,
      admin: {
        position: 'sidebar',
        description: 'When the solution was unlocked',
      },
    },
  ],
  indexes: [
    { fields: ['userId', 'challenge'] }, // Clé unique composite
    { fields: ['challenge', 'accessType'] }, // Pour les stats par challenge
    { fields: ['accessType'] }, // Pour les analyses globales
  ],
}