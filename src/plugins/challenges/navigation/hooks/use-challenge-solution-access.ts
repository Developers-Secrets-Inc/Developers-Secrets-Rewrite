'use client'

import { useUser } from '@/core/auth/hooks/use-user'
import { useChallenge } from '../../contexts/challenge-context'
import { useMutation, useQuery } from '@tanstack/react-query'
import { isFailure } from '@/core/fn/result'

export function useChallengeSolutionAccess() {
  const challenge = useChallenge()
  const { data: user } = useUser()

  if (isFailure(user)) throw new Error()

  // Query pour l'état initial depuis le context
  const { data: hasAccess = false } = useQuery({
    queryKey: ['challengeSolutionAccess'],
    queryFn: () =>
      challenge?.isSolutionUnlocked({
        userId: user.value.id,
        challengeId: challenge.challenge.id,
      }),
  })

  // Mutation pour actionner le unlock
  const { mutate: unlockSolution } = useMutation({
    mutationFn: () =>
      challenge?.onSolutionUnlock?.({
        userId: user.value.id,
        challengeId: challenge.challenge.id,
      }) ?? Promise.resolve(),
    mutationKey: ['unlockSolution'],
    onSuccess: () => {
      // Optionnel: invalider le query pour mettre à jour l'UI
      queryClient.invalidateQueries({ queryKey: ['challengeSolutionAccess'] })
    },
  })

  return {
    hasAccess,
    unlockSolution,
  }
}
