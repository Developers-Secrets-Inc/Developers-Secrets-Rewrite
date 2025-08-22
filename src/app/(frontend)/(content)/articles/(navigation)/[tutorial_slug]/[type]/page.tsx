


export default async function Page({
  params,
}: {
  params: Promise<{ tutorial_slug: string; type: string }>
}) {
  const { tutorial_slug, type } = await params

  return <div>{type}</div>
}