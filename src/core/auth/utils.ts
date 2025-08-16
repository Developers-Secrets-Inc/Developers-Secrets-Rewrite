import type { Maybe } from "../fn/maybe"
import { none, some } from "../fn/maybe"

/**
 * Returns a safe same-origin path for redirects.
 * - Must start with '/'
 * - Must not start with '//'
 * - Must not be in the disallow list (e.g., '/login', '/signup')
 * Returns undefined if unsafe or absent.
 */
export function safeRedirectPath(
  input?: string,
  disallow: string[] = ['/login', '/signup'],
): Maybe<string> {
  if (!input) return none()
  if (!input.startsWith('/') || input.startsWith('//')) return none()
  if (disallow.includes(input)) return none()
  return some(input)
}
