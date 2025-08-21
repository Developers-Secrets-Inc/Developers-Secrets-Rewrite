import type { CollectionConfig } from 'payload'

export const Feedbacks: CollectionConfig = {
  slug: 'feedbacks',
  admin: {
    useAsTitle: 'message',
    defaultColumns: ['message', 'createdAt', 'ipAddress'],
  },
  fields: [
    {
      name: 'message',
      label: 'Message',
      type: 'textarea',
      required: true,
    },
    {
      name: 'ipAddress',
      label: 'IP Address',
      type: 'text',
      admin: {
        description: 'IP address of the user who submitted the feedback (for rate limiting)',
      },
    },
  ],
}
