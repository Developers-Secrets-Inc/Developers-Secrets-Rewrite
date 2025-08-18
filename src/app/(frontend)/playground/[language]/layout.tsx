import { AppHeader } from '@/components/headers/app-header'

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ language: string }>
}) {
  const { language } = await params

  return (
    <div className="h-screen flex flex-col min-h-0">
      <AppHeader />
      <div className="flex-1 min-h-0">{children}</div>
    </div>
  )
}
