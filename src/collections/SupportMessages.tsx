import type { CollectionConfig } from 'payload'

export const SupportMessages: CollectionConfig = {
  slug: 'support-messages',
  admin: {
    useAsTitle: 'message',
    defaultColumns: ['email', 'message', 'createdAt', 'ipAddress'],
  },
  fields: [
    {
      name: 'email',
      label: 'Email',
      type: 'text',
      required: true,
    },
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
        description: 'IP address of the user who submitted the message (for rate limiting)',
      },
    },
  ],
}
