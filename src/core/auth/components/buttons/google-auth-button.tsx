'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { GoogleIcon } from '@/components/icons/google'
import { signInWithGoogle } from '@/core/auth'
import { redirect } from 'next/navigation'
import { isFailure } from '@/core/fn/result'

export function GoogleAuthButton() {
  const handleClick = async () => {
    const result = await signInWithGoogle()
    if (isFailure(result)) {
      console.error(result.error)
      return
    }
    redirect(result.value.url)
  }

  return (
    <Button
      className={cn('flex items-center gap-2 w-full cursor-pointer')}
      variant="outline"
      onClick={handleClick}
    >
      <GoogleIcon />
      Continue with Google
    </Button>
  )
}
