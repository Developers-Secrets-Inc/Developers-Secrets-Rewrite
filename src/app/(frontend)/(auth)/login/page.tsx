import { LoginCard } from '@/core/auth/components/login-card'

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ redirectTo?: string }>
}) {
  const _ = await searchParams

  return (
    <div className="flex min-h-full w-full items-center justify-center">
      <div className="w-full max-w-sm">
        <LoginCard />
      </div>
    </div>
  )
}
