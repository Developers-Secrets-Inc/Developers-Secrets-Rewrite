'use client'

import { AuthCard } from '.'
import { LoginForm } from '../forms/login-form'
import type { Maybe } from '@/core/fn/maybe'

type LoginCardProps = React.ComponentProps<'div'> & {
  redirectTo: Maybe<string>
}

export const LoginCard: React.FC<LoginCardProps> = ({ className, redirectTo, ...props }) => {
  return (
    <AuthCard.Root {...props} className={className}>
      <AuthCard.Header>
        <AuthCard.Title>Login</AuthCard.Title>
        <AuthCard.Description>
          Sign in to your account to access your personal dashboard
        </AuthCard.Description>
      </AuthCard.Header>
      <LoginForm redirectTo={redirectTo} />
    </AuthCard.Root>
  )
}
