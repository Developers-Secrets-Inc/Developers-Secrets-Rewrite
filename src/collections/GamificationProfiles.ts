import type { CollectionConfig } from 'payload'

export const GamificationProfiles: CollectionConfig = {
  slug: 'gamification-profiles',
  admin: {
    useAsTitle: 'userId',
    defaultColumns: ['userId', 'currentLevel', 'totalXP', 'updatedAt'],
    description: 'Per-user gamification state (level and XP).',
    group: 'Gamification',
  },
  timestamps: true,
  fields: [
    {
      name: 'userId',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'currentLevel',
      type: 'number',
      required: true,
      defaultValue: 1,
      min: 1,
    },
    {
      name: 'currentXP',
      type: 'number',
      required: true,
      defaultValue: 0,
      min: 0,
    },
    {
      name: 'totalXP',
      type: 'number',
      required: true,
      defaultValue: 0,
      min: 0,
    },
  ],
  // Useful for reporting/queries
  indexes: [{ fields: ['currentLevel', 'totalXP'] }],
}
