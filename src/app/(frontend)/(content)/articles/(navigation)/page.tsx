import {
  PopularCategoriesTutorials,
  RecentCategoriesTutorials,
} from '@/api/articles/tutorials/categories/components'

export default function Page() {
  return (
    <>
      <div className="mb-8 space-y-6">
        <h1 className="text-4xl font-semibold tracking-tight">Articles</h1>
        <p className="text-muted-foreground text-sm mt-1 max-w-2xl">
          Explore a wide range of articles, from the latest tutorials to in-depth guides across
          popular categories. Discover new programming languages, frameworks, and best practices to
          enhance your development skills.
        </p>
      </div>
      <div className="space-y-12">
        <PopularCategoriesTutorials />
        <RecentCategoriesTutorials />
      </div>
    </>
  )
}
