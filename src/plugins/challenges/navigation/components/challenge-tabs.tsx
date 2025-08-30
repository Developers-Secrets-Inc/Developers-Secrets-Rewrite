import { House } from 'lucide-react'
import { ChallengeTab } from './challenge-tab'
import { LockedTabDialog } from './locked-tab-dialog'
import React from 'react'

export const ChallengeTabsRoot = ({ children }: { children: React.ReactNode }) => {
  return (
    <nav className="h-12 flex-none border-b bg-background rounded-t-md">
      <div className="flex h-full divide-x divide-border">
        {children}
      </div>
    </nav>
  )
}



export const ChallengeTabs = {
  Root: ChallengeTabsRoot
}