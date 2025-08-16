import { getUser } from '..'
import { isSuccess } from '@/core/fn/result'
import { redirect } from 'next/navigation'

export const SignedInRedirect = async ({
  children,
  redirectTo,
}: {
  children: React.ReactNode
  redirectTo: string
}) => {
  const user = await getUser()

  return isSuccess(user) ? redirect(redirectTo) : children
}
