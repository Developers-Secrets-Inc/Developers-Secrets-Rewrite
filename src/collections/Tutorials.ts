import type { CollectionConfig } from 'payload'

export const Tutorials: CollectionConfig = {
  slug: 'tutorials',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'updatedAt'],
    group: 'Content',
  },
  timestamps: true,
  versions: {
    drafts: true,
    maxPerDoc: 100,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
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
              unique: true,
              index: true,
              admin: { 
                description: 'Will be auto-generated if left empty.',
                position: 'sidebar',
              },
              hooks: {
                beforeValidate: [
                  ({ value, data }) => {
                    if (!value && data?.title) {
                      return data.title
                        .toLowerCase()
                        .replace(/[^a-z0-9 ]/g, '')
                        .replace(/\s+/g, '-')
                    }
                    return value
                  },
                ],
              },
            },
            {
              name: 'excerpt',
              type: 'textarea',
              required: true,
              label: 'Description / Excerpt',
              admin: {
                description: 'A brief description of the tutorial that will be displayed in lists.',
              },
            },
            {
              name: 'difficulty',
              type: 'select',
              options: [
                { label: 'Beginner', value: 'beginner' },
                { label: 'Intermediate', value: 'intermediate' },
                { label: 'Advanced', value: 'advanced' },
              ],
              admin: {
                position: 'sidebar',
                description: 'Tutorial difficulty level',
              },
            },
            {
              name: 'readingTime',
              type: 'number',
              admin: {
                position: 'sidebar',
                description: 'Estimated reading time in minutes',
              },
            },
            {
              name: 'publishedAt',
              type: 'date',
              admin: { 
                position: 'sidebar',
                description: 'Publication date of the tutorial',
              },
              index: true,
            },
          ],
        },
        {
          name: 'seo',
          label: 'SEO',
          fields: [
            {
              name: 'meta',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  maxLength: 60,
                  admin: {
                    description: 'Title for search engines (50-60 characters)'
                  }
                },
                {
                  name: 'description',
                  type: 'textarea',
                  maxLength: 160,
                  admin: {
                    description: 'Description for search engines (120-160 characters)'
                  }
                },
                {
                  name: 'keywords',
                  type: 'text',
                  admin: {
                    description: 'Comma-separated keywords for SEO (e.g., python, tutorial, web development)'
                  }
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    description: 'Image for social sharing (1200x630px recommended)'
                  }
                },
                {
                  name: 'canonicalUrl',
                  type: 'text',
                  admin: {
                    description: 'Canonical URL (if different from default)'
                  }
                }
              ]
            },
            {
              name: 'structuredData',
              type: 'code',
              admin: {
                language: 'json',
                description: 'Custom JSON-LD structured data (optional)'
              }
            }
          ]
        }
      ]
    }
  ],
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (operation === 'create' && !data.publishedAt) {
          return { ...data, publishedAt: new Date().toISOString() }
        }
        return data
      },
    ],
  },
}
