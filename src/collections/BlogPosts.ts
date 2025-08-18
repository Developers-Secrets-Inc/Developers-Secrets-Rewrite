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
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          BlocksFeature({
            blocks: [
              {
                slug: 'Code',
                fields: [
                  {
                    name: 'language',
                    type: 'select',
                    options: [
                      { label: 'TypeScript', value: 'ts' },
                      { label: 'TSX', value: 'tsx' },
                      { label: 'JavaScript', value: 'js' },
                      { label: 'JSX', value: 'jsx' },
                      { label: 'JSON', value: 'json' },
                      { label: 'HTML', value: 'html' },
                      { label: 'CSS', value: 'css' },
                      { label: 'Bash', value: 'bash' },
                      { label: 'Plain Text', value: 'plaintext' },
                    ],
                    defaultValue: 'ts',
                  },
                  {
                    name: 'code',
                    type: 'code',
                  },
                ],
              },
              {
                slug: 'Alert',
                fields: [
                  {
                    name: 'variant',
                    type: 'select',
                    options: [
                      { label: 'Default', value: 'default' },
                      { label: 'Destructive', value: 'destructive' },
                    ],
                    defaultValue: 'default',
                    required: true,
                    admin: { description: 'Choose the visual style of the alert.' },
                  },
                  {
                    name: 'content',
                    type: 'text',
                    required: true,
                    admin: { description: 'Alert message content.' },
                  },
                ],
              },
              {
                slug: 'CTA',
                fields: [
                  {
                    name: 'title',
                    type: 'text',
                    required: true,
                  },
                  {
                    name: 'description',
                    type: 'text',
                    admin: { description: 'Optional supporting text.' },
                  },
                  {
                    name: 'buttonLabel',
                    type: 'text',
                    required: true,
                  },
                  {
                    name: 'href',
                    type: 'text',
                    required: true,
                    admin: { description: 'Relative path (/pricing) or full URL (https://...).' },
                  },
                  {
                    name: 'newTab',
                    type: 'checkbox',
                    label: 'Open in new tab?',
                    defaultValue: false,
                  },
                ],
              },
            ],
            inlineBlocks: [],
          }),
        ],
      }),
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
