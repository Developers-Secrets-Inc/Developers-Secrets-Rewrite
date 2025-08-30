'use client'

import { House } from 'lucide-react'
import { PearlToggleButton } from '../../ai/components/pearl-toggle-button'
import { DislikeButton } from '../../engagement/components/dislike-button'
import { LikeButton } from '../../engagement/components/like-button'
import { RatingButton } from '../../feedback/components/rating-button'
import { ChallengeTab } from '../../navigation/components/challenge-tab'
import { ChallengeTabs } from '../../navigation/components/challenge-tabs'
import { LockedTabDialog } from '../../navigation/components/locked-tab-dialog'
import { useChallengeEngagement } from '../../engagement/hooks/use-challenge-engagement'
import { useChallengeSolutionAccess } from '../../navigation/hooks/use-challenge-solution-access'

export const DefaultChallengeView = ({ children }: { children: React.ReactNode }) => {
  const { isLiked, isDisliked, toggleLike, toggleDislike } = useChallengeEngagement()
  const { hasAccess, unlockSolution } = useChallengeSolutionAccess()

  console.log(hasAccess)

  return (
    <>
      <ChallengeTabs.Root>
        <ChallengeTab label="Description" icon={House} href="#" isActive />
        {hasAccess ? (
          <ChallengeTab label="Official Solution" icon={House} href="#" />
        ) : (
          <LockedTabDialog label="Official Solution" onConfirm={unlockSolution} />
        )}
        <ChallengeTab label="Submissions" icon={House} href="#" />
      </ChallengeTabs.Root>
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto scrollbar-hide mt-0 min-h-0">{children}</div>

        <div className="flex-none bg-background bottom-0 shadow-[0_-1px_2px_rgba(0,0,0,0.1)] p-4 rounded-b-md relative z-50">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <LikeButton isLiked={isLiked} onToggleLike={toggleLike} />
              <DislikeButton isDisliked={isDisliked} onToggleDislike={toggleDislike} />
            </div>
            <RatingButton />
          </div>
          <PearlToggleButton />
        </div>
      </div>
    </>
  )
}
