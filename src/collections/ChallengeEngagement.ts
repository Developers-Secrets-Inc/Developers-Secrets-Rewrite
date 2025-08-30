import type { CollectionConfig } from 'payload'

export const ChallengeEngagement: CollectionConfig = {
  slug: 'challenge-engagement',
  admin: {
    useAsTitle: 'userId',
    defaultColumns: ['userId', 'challenge', 'engagementType', 'createdAt'],
    group: 'Challenges',
    description: 'User engagement tracking for challenges',
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
      index: true,
    },
    {
      name: 'engagementType',
      type: 'select',
      required: true,
      options: [
        { label: 'Like', value: 'like' },
        { label: 'Dislike', value: 'dislike' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Type of user engagement',
      },
    },
  ],
  indexes: [
    { fields: ['userId', 'challenge'] }, // Clé unique composite pour éviter les doublons
    { fields: ['challenge', 'engagementType'] }, // Pour les stats de popularité
    { fields: ['engagementType'] }, // Pour les analyses globales
  ],
}
