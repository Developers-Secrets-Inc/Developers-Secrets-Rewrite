import { getUser } from '..'
import { isFailure } from '@/core/fn/result'
import { redirect } from 'next/navigation'

export const SignedOutRedirect = async ({
  children,
  redirectTo,
}: {
  children: React.ReactNode
  redirectTo: string
}) => {
  const user = await getUser()

  return isFailure(user) ? redirect(redirectTo) : children
}
