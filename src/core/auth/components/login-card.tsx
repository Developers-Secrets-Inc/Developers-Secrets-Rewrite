'use client'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Separator } from '@/components/ui/separator'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { OAuth2Buttons } from './buttons/oauth2-buttons'
import { EmailInput } from './inputs/email-input'
import { PasswordInput } from './inputs/password-input'
import { signInWithPassword } from '..'
import { toast } from 'sonner'
import { isFailure } from '@/core/fn/result'

const formSchema = z.object({
  email: z.email(),
  password: z.string(),
})

export const LoginCard = ({ className, ...props }: React.ComponentProps<'div'>) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const result = await signInWithPassword({ email: data.email, password: data.password })

    if (isFailure(result)) {
      toast.error(result.error.message)
    } else {
      toast.success(`You are successfully logged as ${result.value.email}`)
    }

  }

  return (
    <div {...props} className={className}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Login</h1>
        <p className="text-muted-foreground">
          Sign in to your account to access your personal dashboard
        </p>
      </div>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <EmailInput control={form.control} />
            <PasswordInput control={form.control} />
            <div className="flex flex-col gap-3">
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
            <div className="relative my-6">
              <Separator />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-background px-2 text-muted-foreground text-sm">
                  Or continue with
                </span>
              </div>
            </div>

            <OAuth2Buttons />
            <div className="flex justify-center pt-6">
              <p className="text-sm text-muted-foreground">
                Don&apos;t have an account?{' '}
                <Link href="/signup" className="font-medium text-primary hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
