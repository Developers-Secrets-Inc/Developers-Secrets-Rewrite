import { LoginCard } from '@/core/auth/components/cards/login-card'
import { SignedInRedirect } from '@/core/auth/components/signed-in-redirect'
import { safeRedirectPath } from '@/core/auth/utils'

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ redirectTo?: string }>
}) {
  const { redirectTo } = await searchParams
  const safeRedirectTo = safeRedirectPath(redirectTo)

  return (
    <SignedInRedirect redirectTo="/">
      <div className="flex min-h-full w-full items-center justify-center">
        <div className="w-full max-w-sm">
          <LoginCard redirectTo={safeRedirectTo} />
        </div>
      </div>
    </SignedInRedirect>
  )
}
