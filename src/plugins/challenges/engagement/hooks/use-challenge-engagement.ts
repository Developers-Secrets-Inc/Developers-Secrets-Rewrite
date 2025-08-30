'use client'

import { useState } from 'react'

export type EngagementState = {
  like: 'active' | 'inactive'
  dislike: 'active' | 'inactive'
}

export function useChallengeEngagement() {
  const [engagement, setEngagement] = useState<EngagementState>({
    like: 'inactive',
    dislike: 'inactive'
  })

  const toggleLike = () => {
    setEngagement(prev => ({
      like: prev.like === 'active' ? 'inactive' : 'active',
      dislike: 'inactive' // Force dislike inactive when like is toggled
    }))
  }

  const toggleDislike = () => {
    setEngagement(prev => ({
      dislike: prev.dislike === 'active' ? 'inactive' : 'active',
      like: 'inactive' // Force like inactive when dislike is toggled
    }))
  }

  const isLiked = engagement.like === 'active'
  const isDisliked = engagement.dislike === 'active'

  return {
    engagement,
    toggleLike,
    toggleDislike,
    isLiked,
    isDisliked
  }
}