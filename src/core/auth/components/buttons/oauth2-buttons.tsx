'use client'

import { GoogleAuthButton } from './google-auth-button'
import { GitHubAuthButton } from './github-auth-button'

export const OAuth2Buttons = () => {
  return (
    <div className="flex flex-col space-y-3">
      <GoogleAuthButton />
      <GitHubAuthButton />
    </div>
  )
}
