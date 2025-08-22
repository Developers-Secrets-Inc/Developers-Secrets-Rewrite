import {
  PopularCategoriesTutorials,
  RecentCategoriesTutorials
} from '@/api/articles/tutorials/categories/components'

export default function Page() {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-4xl font-semibold tracking-tight">Articles</h1>
        <p className="text-muted-foreground mt-1">
          Browse the latest tutorials and popular categories.
        </p>
      </div>
      <div className="space-y-6">
        <PopularCategoriesTutorials />
        <RecentCategoriesTutorials />
      </div>
    </>
  )
}
