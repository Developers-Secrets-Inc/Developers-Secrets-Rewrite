
export default async function Page({ params }: { params: Promise<{ tutorial_slug: string }> }) {
  const { tutorial_slug } = await params

  return (
    <div className="mb-6">
      <h1 className="text-4xl font-semibold tracking-tight">Articles</h1>
      <p className="text-muted-foreground mt-1">
        Browse the latest tutorials and popular categories.dqz
      </p>
    </div>
  )
}
