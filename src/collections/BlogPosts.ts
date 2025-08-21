import type { CollectionConfig } from 'payload'
import { lexicalEditor, BlocksFeature } from '@payloadcms/richtext-lexical'

export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'publishedAt'],
    description: 'Manage Blog Posts content.',
    group: 'Content',
  },
  timestamps: true,

  // Enable versions with drafts support (no access rules here as requested)
  versions: {
    drafts: true,
    maxPerDoc: 100,
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { description: 'Enter manually. Must be unique.' },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'admins',
      required: true,
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Engineering', value: 'engineering' },
        { label: 'Community', value: 'community' },
        { label: 'Company News', value: 'company-news' },
        { label: 'Customers', value: 'customers' },
        { label: 'Changelog', value: 'changelog' },
      ],
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: { position: 'sidebar' },
      index: true,
    },
  ],

  // Helpful indexes for common queries
  indexes: [{ fields: ['author', 'publishedAt'] }, { fields: ['_status', 'publishedAt'] }],

  hooks: {
    beforeChange: [
      // Auto-assign author to current user if not provided and set publishedAt when publishing
      async ({ data, req, originalDoc }) => {
        if (!data) return

        if (!data.author && req.user?.id) {
          data.author = req.user.id
        }

        // Set publishedAt when transitioning to published (_status comes from drafts)
        const wasPublished = originalDoc?._status === 'published'
        const nowPublished = data?._status === 'published'
        if (!wasPublished && nowPublished && !data.publishedAt) {
          data.publishedAt = new Date().toISOString()
        }
      },
    ],
  },
}
