import type { CollectionConfig } from 'payload'

export const Exercises: CollectionConfig = {
  slug: 'exercises',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'updatedAt'],
    group: 'Exercices',
  },
  timestamps: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Exercise Name',
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      label: 'Exercise Type',
      options: [
        { label: 'Classic', value: 'classic' },
        { label: 'AI', value: 'ai' },
        { label: 'SQL', value: 'sql' },
      ],
      admin: {
        description: 'Type of exercise determines the specific fields available',
      },
    },
    {
      name: 'exerciseData',
      type: 'group',
      label: 'Exercise Specific Data',
      fields: [
        {
          name: 'classic',
          type: 'group',
          label: 'Classic Exercise Data',
          fields: [],
          admin: {
            condition: ({ type }) => type === 'classic',
          },
        },
        {
          name: 'ai',
          type: 'group',
          label: 'AI Exercise Data',
          fields: [],
          admin: {
            condition: ({ type }) => type === 'ai',
          },
        },
        {
          name: 'sql',
          type: 'group',
          label: 'SQL Exercise Data',
          fields: [],
          admin: {
            condition: ({ type }) => type === 'sql',
          },
        },
      ],
    },
    {
      name: 'initialFileSystem',
      type: 'json',
      label: 'Initial File System',
    },
  ],
}
