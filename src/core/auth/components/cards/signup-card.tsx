'use client'

import { Maybe } from '@/core/fn/maybe'
import { AuthCard } from '.'
import { SignupForm } from '../forms/signup-form'

type SignupCardProps = React.ComponentProps<'div'> & {
  redirectTo: Maybe<string>
}

export const SignupCard: React.FC<SignupCardProps> = ({ className, redirectTo, ...props }) => {
  return (
    <AuthCard.Root {...props} className={className}>
      <AuthCard.Header>
        <AuthCard.Title>Create an account</AuthCard.Title>
        <AuthCard.Description>Sign up to create an account</AuthCard.Description>
      </AuthCard.Header>
      <div>
        <SignupForm redirectTo={redirectTo} />
      </div>
    </AuthCard.Root>
  )
}
