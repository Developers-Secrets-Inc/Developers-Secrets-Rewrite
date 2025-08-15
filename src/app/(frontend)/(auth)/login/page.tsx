import { LoginCard } from '@/core/auth/components/login-card'
import { SignedInRedirect } from '@/core/auth/components/signed-in-redirect'

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ redirectTo?: string }>
}) {
  const _ = await searchParams

  return (
    <SignedInRedirect redirectTo="/">
      <div className="flex min-h-full w-full items-center justify-center">
        <div className="w-full max-w-sm">
          <LoginCard />
        </div>
      </div>
    </SignedInRedirect>
  )
}
