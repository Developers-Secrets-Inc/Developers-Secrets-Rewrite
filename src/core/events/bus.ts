import type { EventMap, EventName, Listener } from './types'

type Registry = Map<EventName, Listener<any>[]>

function createEventBus() {
  const registry: Registry = new Map()

  const register = <K extends EventName>(eventName: K, listener: Listener<K>) => {
    if (!registry.has(eventName)) {
      registry.set(eventName, [])
    }
    registry.get(eventName)!.push(listener)
    console.log(`[EventBus] Listener registered for "${eventName}"`)
  }

  const dispatch = async <K extends EventName>(eventName: K, payload: EventMap[K]) => {
    const listeners = registry.get(eventName)

    if (!listeners || listeners.length === 0) {
      return
    }

    console.log(`[EventBus] Dispatching "${eventName}" to ${listeners.length} listener(s).`)

    const promises = listeners.map((listener) =>
      Promise.resolve(listener(payload)).catch((error) => {
        console.error(`[EventBus] Error in a listener for event "${eventName}":`, error)
      }),
    )

    await Promise.all(promises)
  }

  return { register, dispatch }
}

export const { register, dispatch } = createEventBus()
