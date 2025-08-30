import { getChallengeBySlug } from '@/api/challenges'
import { abandonChallenge, isSolutionUnlocked } from '@/api/challenges/access/actions'
import { dislikeChallenge, likeChallenge } from '@/api/challenges/engagement/actions'
import { isNone } from '@/core/fn/maybe'
import { Challenge } from '@/plugins/challenges'
import { notFound } from 'next/navigation'

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ challenge_slug: string }>
}) {
  const { challenge_slug: challengeSlug } = await params
  const challenge = await getChallengeBySlug({ challengeSlug })

  if (isNone(challenge)) return notFound()

  return <Challenge config={{
    challenge: challenge.value,
    isSolutionUnlocked: isSolutionUnlocked,
    onLike: likeChallenge,
    onDislike: dislikeChallenge,
    onSolutionUnlock: abandonChallenge
  }}>
    {children}
  </Challenge>
}


/* 

<ChallengeViews>
  <ContentChallengeView>
    <ChallengeTabs>
      <ChallengeTab label="Description" icon={House} href="#" isActive />
      <LockedTabDialog label="Official Solution" />
      <ChallengeTab label="Submissions" icon={House} href="#" />
    <ChallengeTabs>
    <ChallengeContentRoot>
      <ChallengeContent>{children}<ChallengeContent>
      <ChallengeFooter>
        <ChallengeFooterLeft>
          <LikeButton />
          <DislikeButton />
        </ChallengeFooterLeft>
        <ChallengeFooterRight>
          <RatingButton />
        </ChallengeFooterRight>
        <PearlToogleButton />
      <ChallengeFooter>
    <ChallengeContentRoot>
  </ContentChallengeView>

  <ChatChallengeView>
    <PearlChat
  </ChatChallengeView>
<ChallengeViews>

*/