


export default async function Page({
  params,
}: {
  params: Promise<{ tutorial_slug: string; article_slug: string; subarticle_slug: string }>
}) {
  const { tutorial_slug, article_slug, subarticle_slug } = await params

  return <div>{subarticle_slug}</div>
}