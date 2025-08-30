import type { CollectionConfig } from 'payload'

export const ChallengeRating: CollectionConfig = {
  slug: 'challenge-rating',
  admin: {
    useAsTitle: 'userId',
    defaultColumns: ['userId', 'challenge', 'rating', 'createdAt'],
    group: 'Challenges',
    description: 'User ratings for challenges',
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
      name: 'rating',
      type: 'number',
      required: true,
      min: 1,
      max: 5,
      admin: {
        position: 'sidebar',
        description: 'User rating (1-5 stars)',
      },
    },
  ],
  indexes: [
    { fields: ['userId', 'challenge'] }, // Clé unique (un rating par utilisateur/challenge)
    { fields: ['challenge', 'rating'] }, // Pour les moyennes par challenge
    { fields: ['rating'] }, // Pour les analyses globales
  ],
}