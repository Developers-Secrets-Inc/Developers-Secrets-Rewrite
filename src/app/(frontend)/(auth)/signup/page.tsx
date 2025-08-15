import { SignupCard } from '@/core/auth/components/signup-card'
import { SignedInRedirect } from '@/core/auth/components/signed-in-redirect'

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ redirectTo?: string; referer?: string }>
}) {
  const _ = await searchParams

  return (
    <SignedInRedirect redirectTo="/">
      <div className="flex min-h-full w-full items-center justify-center">
        <div className="w-full max-w-sm">
          <SignupCard />
        </div>
      </div>
    </SignedInRedirect>
  )
}
