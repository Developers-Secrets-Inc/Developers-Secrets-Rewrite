'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

const LoginButton = () => {
  return (
    <Button variant="outline" size="sm" asChild>
      <Link href="/login">Log in</Link>
    </Button>
  )
}

const RegisterButton = () => {
  return (
    <Button size="sm" asChild>
      <Link href="/signup">Sign up</Link>
    </Button>
  )
}

export const AuthButtons = () => {
  return (
    <>
      <LoginButton />
      <RegisterButton />
    </>
  )
}
