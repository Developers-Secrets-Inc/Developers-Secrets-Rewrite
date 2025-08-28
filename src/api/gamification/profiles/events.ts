'use server'

import 'server-only'

import { EventMap } from '@/core/events/types'
import { register } from '@/core/events/bus'
import { getExperienceToNextLevel } from './utils'
import { levelUp, setXP } from '.'

export const onXPAdded = async (payload: EventMap['gamification.xpAdded']) => {
  const experienceToNextLevel = getExperienceToNextLevel(payload.xp)

  if (payload.xp >= experienceToNextLevel) {
    await levelUp({ userId: payload.userId })
    await setXP({ userId: payload.userId, xp: payload.xp - experienceToNextLevel })
  }
}

export const onLevelUp = async (payload: EventMap['gamification.levelUp']) => {
  console.log(`Level up: ${payload.level}`)
}

register('gamification.xpAdded', onXPAdded)
register('gamification.levelUp', onLevelUp)
