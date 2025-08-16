'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { GoogleIcon } from '@/components/icons/google'

export function GoogleAuthButton() {
  return (
    <Button className={cn('flex items-center gap-2 w-full')} variant="outline" disabled={true}>
      <GoogleIcon />
      Continue with Google
    </Button>
  )
}
