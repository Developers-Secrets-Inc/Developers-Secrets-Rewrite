import { DefaultChallengeView } from "./default-challenge-view"


export const ChallengeViews = ({ children }: { children: React.ReactNode }) => {
    return <DefaultChallengeView>{children}</DefaultChallengeView>
}