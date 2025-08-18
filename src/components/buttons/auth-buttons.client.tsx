'use client'

import { match } from '@/core/fn/result'
import { useUser } from '@/core/auth/hooks/use-user'
import { AuthButtons } from './auth-buttons'
import { Skeleton } from '@/components/ui/skeleton'
import { UserMenu } from '@/core/users/components/user-menu'
import { DashboardButton } from './dashboard-button'
import { cn } from '@/lib/utils'

const AuthButtonsSkeleton = () => {
  return <Skeleton className="h-8 w-8 rounded-full" />
}

export const AuthButtonsClient = ({ className }: { className?: string }) => {
  const { data: user, isLoading } = useUser()

  if (isLoading) return <AuthButtonsSkeleton />
  if (!user) return <AuthButtons />

  return match(
    user,
    (user) => {
      return (
        <div className={cn('flex items-center gap-2', className)}>
          <DashboardButton />
          <UserMenu user={user} />
        </div>
      )
    },
    () => <AuthButtons className={className} />,
  )
}
