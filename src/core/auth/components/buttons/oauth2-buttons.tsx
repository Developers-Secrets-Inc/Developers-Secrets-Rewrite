'use client'

import { GoogleAuthButton } from './google-auth-button'
import { GitHubAuthButton } from './github-auth-button'
import type { Maybe } from '@/core/fn/maybe'

export const OAuth2Buttons = ({ redirectTo: _redirectTo }: { redirectTo: Maybe<string> }) => {
  return (
    <div className="flex flex-col space-y-3">
      <GoogleAuthButton />
      <GitHubAuthButton />
    </div>
  )
}
