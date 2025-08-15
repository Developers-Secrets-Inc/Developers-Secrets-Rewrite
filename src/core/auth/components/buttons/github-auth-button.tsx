'use client'

import { GithubIcon } from '@/components/icons/github'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function GitHubAuthButton() {
  return (
    <Button className={cn('flex items-center gap-2 w-full')} variant="outline" disabled={true}>
      <GithubIcon />
      Continue with GitHub
    </Button>
  )
}
