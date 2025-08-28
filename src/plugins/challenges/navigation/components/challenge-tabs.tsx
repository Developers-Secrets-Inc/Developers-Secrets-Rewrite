type ChallengeTabProps = {
  id: string
  isLocked: boolean
  onUnlock: () => void
  href: string
}

export const ChallengeTabs = ({ children }: { children: React.ReactNode }) => {
  return <></>
}

export const ChallengeTab = ({
  children,
  ...props
}: { children: React.ReactNode } & ChallengeTabProps) => {
  return <></>
}
