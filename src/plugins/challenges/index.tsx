import { ChallengeIDE } from '@/plugins/challenges/components/challenge-ide'
import {
  ChallengeLeft,
  ChallengeRight,
  ChallengeRoot,
  ChallengeSeparator,
} from '@/plugins/challenges/components/layout'
import { ChallengeProvider } from '@/plugins/challenges/contexts/challenge-context'
import { ChallengeViews } from '@/plugins/challenges/views/components/challenge-views'

export const Challenge = ({
  children,
  config,
}: {
  children: React.ReactNode
  config: ChallengeConfig
}) => {
  return (
    <ChallengeProvider challenge={config}>
    <div className="flex-1 min-h-0 md:flex overflow-hidden">
      <ChallengeRoot>
        <ChallengeLeft>
          <ChallengeViews>{children}</ChallengeViews>
        </ChallengeLeft>
        <ChallengeSeparator />
        <ChallengeRight className="border-none">
          <div className="flex flex-col h-full min-h-0">
            <ChallengeIDE />
          </div>
        </ChallengeRight>
      </ChallengeRoot>
    </div>
    </ChallengeProvider>
  )
}
