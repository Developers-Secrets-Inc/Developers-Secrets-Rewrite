'use server'

import 'server-only'

import type { EventMap } from '../events/types'
import { register } from '../events/bus'

export const onUserCreated = async (payload: EventMap['user.created']) => {
  console.log(`User created: ${payload.email}`)
}

export const onUserLoggedIn = async (payload: EventMap['user.loggedIn']) => {
  console.log(`User logged in: ${payload.userId}`)
}

register('user.created', onUserCreated)
register('user.loggedIn', onUserLoggedIn)
