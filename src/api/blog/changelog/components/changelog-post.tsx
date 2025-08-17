import { BlogPost } from '@/api/blog/components/blog-post'
import { ChangelogBreadcrumb } from '@/api/blog/changelog/components/changelog-breadcrumb'
import { PostTitle } from '@/api/blog/components/post-title'
import { AdminAvatar } from '@/core/users/admins/components/admin-avatar'
import { PostMetadata } from '@/api/blog/components/post-metadata'
import { RichText } from '@/components/richtext'
import { BlogPost as BlogPostType } from '@/payload-types'

export const ChangelogPost = ({ post }: { post: BlogPostType }) => {
  return (
    <BlogPost.Root>
      <BlogPost.Hero>
        <BlogPost.Header>
          <ChangelogBreadcrumb />
        </BlogPost.Header>
        <PostTitle>{post.title}</PostTitle>
        {typeof post.author === 'object' && post.author && (
          <div className="flex justify-center mt-2">
            <AdminAvatar admin={post.author} />
          </div>
        )}
      </BlogPost.Hero>
      <BlogPost.Content>
        <PostMetadata content={post.content} publishedAt={post.publishedAt} />
        <RichText data={post.content} />
      </BlogPost.Content>
    </BlogPost.Root>
  )
}
