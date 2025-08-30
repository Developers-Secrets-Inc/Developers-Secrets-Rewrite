import type { CollectionConfig } from 'payload'

export const Challenges: CollectionConfig = {
  slug: 'challenges',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    group: 'Challenges',
  },
  timestamps: true,
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Information',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              label: 'Title',
            },
            {
              name: 'slug',
              type: 'text',
              required: true,
              index: true,
              admin: {
                description: 'Enter manually. Must be unique.',
                position: 'sidebar',
              },
            },
            {
              name: 'difficulty',
              type: 'select',
              required: true,
              label: 'Difficulty',
              options: [
                { label: 'Very Easy', value: 'very_easy' },
                { label: 'Easy', value: 'easy' },
                { label: 'Medium', value: 'medium' },
                { label: 'Hard', value: 'hard' },
                { label: 'Horrible', value: 'horrible' },
              ],
              admin: {
                position: 'sidebar',
                description: 'Challenge difficulty level',
              },
            },
          ],
        },
        {
          label: 'Content',
          fields: [
            {
              name: 'description',
              type: 'richText',
              required: true,
              label: 'Description',
            },
            {
              name: 'hints',
              type: 'array',
              label: 'Hints',
              fields: [
                {
                  name: 'hint',
                  type: 'text',
                  required: true,
                },
              ],
              admin: {
                description: 'Step-by-step hints for the challenge',
              },
            },
            {
              name: 'officialSolution',
              type: 'richText',
              required: true,
              label: 'Official Solution',
              admin: {
                description: 'Official solution for the challenge',
              },
            },
          ],
        },
        {
          label: 'Relationships',
          fields: [
            {
              name: 'similarChallenges',
              type: 'relationship',
              relationTo: 'challenges',
              hasMany: true,
              label: 'Similar Challenges',
              admin: {
                description: 'Related challenges that users might also enjoy',
              },
              maxDepth: 0
            },
          ],
        },
      ],
    },
  ],
}
