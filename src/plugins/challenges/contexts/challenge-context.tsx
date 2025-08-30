'use client'

import React, { createContext, useContext } from 'react'

const ChallengeContext = createContext<ChallengeConfig | null>(null)

interface ChallengeProviderProps {
  children: React.ReactNode
  challenge: ChallengeConfig | null
}

export const ChallengeProvider = ({ children, challenge }: ChallengeProviderProps) => (
  <ChallengeContext.Provider value={challenge}>
    {children}
  </ChallengeContext.Provider>
)

export const useChallenge = (): ChallengeConfig | null => {
  const context = useContext(ChallengeContext)
  if (context === undefined) {
    throw new Error('useChallenge must be used within a ChallengeProvider')
  }
  return context
}