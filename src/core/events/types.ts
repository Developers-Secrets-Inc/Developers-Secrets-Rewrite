
export interface EventMap {
  'user.created': { userId: string; email: string; name: string }
  'user.loggedIn': { userId: string; ipAddress: string }
  'gamification.xpAdded': { userId: string; xp: number }
  'gamification.levelUp': { userId: string; level: number }
}

export type EventName = keyof EventMap
export type Listener<K extends EventName> = (payload: EventMap[K]) => void | Promise<void>
