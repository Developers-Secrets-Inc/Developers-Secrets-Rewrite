// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { BlocksFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Admins } from './collections/Admins'
import { Media } from './collections/Media'
import { BlogPosts } from './collections/BlogPosts'
import { Tutorials } from './collections/Tutorials'
import { Articles } from './collections/Articles'
import { Feedbacks } from './collections/Feedbacks'
import { SupportMessages } from './collections/SupportMessages'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Admins.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Admins, Media, BlogPosts, Tutorials, Articles, Feedbacks, SupportMessages],
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
            slug: 'Quiz',
            fields: [
              {
                name: 'question',
                type: 'text',
                required: true,
              },
              {
                name: 'answers',
                type: 'array',
                required: true,
                labels: { singular: 'Answer', plural: 'Answers' },
                minRows: 2,
                fields: [
                  {
                    name: 'text',
                    type: 'text',
                    required: true,
                  },
                ],
              },
              {
                name: 'correctAnswerIndex',
                type: 'number',
                required: true,
                defaultValue: 0,
                admin: {
                  description: 'Zero-based index of the correct answer',
                },
              },
            ],
          },
        ],
        inlineBlocks: [],
      }),
    ],
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})
