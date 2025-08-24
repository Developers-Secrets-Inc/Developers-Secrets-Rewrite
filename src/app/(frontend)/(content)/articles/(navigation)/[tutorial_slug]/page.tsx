import { redirect } from "next/navigation"

export default async function Page({ params }: { params: Promise<{ tutorial_slug: string }> }) {
  const { tutorial_slug } = await params

  return redirect(`/articles/${tutorial_slug}/tutorial`)
}
