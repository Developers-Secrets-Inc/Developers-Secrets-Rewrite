import { ChangelogTimeline } from '@/api/blog/changelog/components/changelog-timeline'
import { CategoriesTabs } from '@/api/blog/posts/categories/components/categories-tabs'

export default function Page() {
  return (
    <div className="mt-16">
      <CategoriesTabs />
      <ChangelogTimeline />
    </div>
  )
}
