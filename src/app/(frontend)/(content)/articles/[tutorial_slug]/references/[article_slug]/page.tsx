export default async function Page({
  params,
}: {
  params: Promise<{ tutorial_slug: string; article_slug: string }>
}) {
  const { tutorial_slug, article_slug } = await params

  return <></>
}
