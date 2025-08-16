'use client'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useSignUp } from '../../hooks/use-signup'
import { OAuth2Buttons } from '../buttons/oauth2-buttons'
import { AuthCard } from '../cards'
import { ConfirmPasswordInput } from '../inputs/confirm-password-input'
import { EmailInput } from '../inputs/email-input'
import { PasswordInput } from '../inputs/password-input'
import { UsernameInput } from '../inputs/username-input'
import { useRouter } from 'next/navigation'
import { isNone, Maybe } from '@/core/fn/maybe'

const formSchema = z.object({
  username: z.string().min(3).max(20),
  email: z.email(),
  password: z.string(),
})

type SignupFormProps = {
  redirectTo: Maybe<string>
}

export const SignupForm: React.FC<SignupFormProps> = ({ redirectTo }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const { signup, isLoading } = useSignUp()
  const router = useRouter()

  const onSubmit = form.handleSubmit(async (data: z.infer<typeof formSchema>) => {
    await signup({
      email: data.email,
      password: data.password,
      options: {
        data: {
          username: data.username,
        },
      },
    })
    router.replace(isNone(redirectTo) ? '/' : redirectTo.value)
    router.refresh()
  })

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4">
        <UsernameInput control={form.control} />
        <EmailInput control={form.control} />
        <PasswordInput control={form.control} />
        <ConfirmPasswordInput control={form.control} />
        <Button type="submit" className="w-full flex flex-col gap-3">
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          {isLoading ? 'Signing up...' : 'Sign up'}
        </Button>
        <AuthCard.ContinueWithSeparator />
        <OAuth2Buttons redirectTo={redirectTo} />
        <AlreadyHaveAccount redirectTo={redirectTo} />
      </form>
    </Form>
  )
}

const AlreadyHaveAccount: React.FC<{ redirectTo: Maybe<string> }> = ({ redirectTo }) => {
  const href = isNone(redirectTo)
    ? '/login'
    : `/login?redirectTo=${encodeURIComponent(redirectTo.value)}`
  return (
    <div className="flex justify-center pt-6">
      <p className="text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link href={href} className="font-medium text-primary hover:underline">
          Login
        </Link>
      </p>
    </div>
  )
}
