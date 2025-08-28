import { ChallengeTabs, ChallengeTab } from './challenge-tabs'

export const DefaultChallengeTabs = () => {
  return (
    <ChallengeTabs>
      <ChallengeTab id="description" isLocked={false} onUnlock={() => {}} href="#">
        Description
      </ChallengeTab>
      <ChallengeTab id="official-solution" isLocked={true} onUnlock={() => {}} href="#">
        Official Solution
      </ChallengeTab>
      <ChallengeTab id="solutions" isLocked={true} onUnlock={() => {}} href="#">
        Solutions
      </ChallengeTab>
      <ChallengeTab id="submissions" isLocked={false} onUnlock={() => {}} href="#">
        Submissions
      </ChallengeTab>
    </ChallengeTabs>
  )
}
