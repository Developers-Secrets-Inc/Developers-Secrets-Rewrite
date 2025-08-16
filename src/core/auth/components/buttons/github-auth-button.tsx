'use client'

import { GithubIcon } from '@/components/icons/github'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { signInWithGithub } from '@/core/auth'
import { redirect } from 'next/navigation'
import { isFailure } from '@/core/fn/result'

export function GitHubAuthButton() {
  const handleClick = async () => {
    const result = await signInWithGithub()
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
      <GithubIcon />
      Continue with GitHub
    </Button>
  )
}
