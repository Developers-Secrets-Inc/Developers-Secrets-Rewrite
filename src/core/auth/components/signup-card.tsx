'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const formSchema = z.object({
  username: z.string().min(3).max(20),
  email: z.email(),
  password: z.string(),
})

const formFields: {
  name: keyof z.infer<typeof formSchema>
  label: string
  type: 'text' | 'email' | 'password'
}[] = [
  {
    name: 'username',
    label: 'Username',
    type: 'text',
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
  },
]

export const SignupCard = ({ className, ...props }: React.ComponentProps<'div'>) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data)
  }

  return (
    <div {...props} className={cn('flex flex-col gap-6', className)}>
      <Card>
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>Sign up to create an account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                {formFields.map((cfg) => (
                  <FormField
                    key={cfg.name}
                    control={form.control}
                    name={cfg.name}
                    render={({ field }) => (
                      <FormItem className="grid gap-3">
                        <FormLabel>{cfg.label}</FormLabel>
                        <FormControl>
                          <Input type={cfg.type} placeholder={cfg.label} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
                <div className="flex flex-col gap-3">
                  <Button type="submit" className="w-full">
                    Sign up
                  </Button>
                </div>
              </div>
              <div className="mt-4 text-center text-sm">
                Already have an account?{' '}
                <Link href="/login" className="underline underline-offset-4">
                  Login
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
