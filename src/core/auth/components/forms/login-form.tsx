'use client'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { useSignIn } from '../../hooks/use-signin'
import { OAuth2Buttons } from '../buttons/oauth2-buttons'
import { AuthCard } from '../cards'
import { EmailInput } from '../inputs/email-input'
import { PasswordInput } from '../inputs/password-input'
import { useRouter } from 'next/navigation'
import { isNone, Maybe } from '@/core/fn/maybe'

const formSchema = z.object({
  email: z.email(),
  password: z.string(),
})

type LoginFormProps = {
  redirectTo: Maybe<string>
}

export const LoginForm: React.FC<LoginFormProps> = ({ redirectTo }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })
  const { signin, isLoading } = useSignIn()
  const router = useRouter()

  const onSubmit = form.handleSubmit(async (data: z.infer<typeof formSchema>) => {
    await signin(data)
    router.replace(isNone(redirectTo) ? '/' : redirectTo.value)
    router.refresh()
  })

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4">
        <EmailInput control={form.control} />
        <PasswordInput control={form.control} />
        <div className="flex flex-col gap-3">
          <Button type="submit" className="w-full">
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </div>
        <AuthCard.ContinueWithSeparator />
        <OAuth2Buttons redirectTo={redirectTo} />
        <DontHaveAccount redirectTo={redirectTo} />
      </form>
    </Form>
  )
}

const DontHaveAccount: React.FC<{ redirectTo: Maybe<string> }> = ({ redirectTo }) => {
  const href = isNone(redirectTo)
    ? '/signup'
    : `/signup?redirectTo=${encodeURIComponent(redirectTo.value)}`
  return (
    <div className="flex justify-center pt-6">
      <p className="text-sm text-muted-foreground">
        Don&apos;t have an account?{' '}
        <Link href={href} className="font-medium text-primary hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  )
}
