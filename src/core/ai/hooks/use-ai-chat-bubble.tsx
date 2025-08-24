'use client'

import { useEffect, useMemo, useState } from 'react'
import { useMotionValue } from 'motion/react'
import type { PanInfo } from 'motion'

export type PearlSide = 'left' | 'right'

export const useAIChatBubble = () => {
  const [side, setSide] = useState<PearlSide>('right')
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const yDisplay = useMotionValue(0)
  const [vw, setVw] = useState(0)
  const [vh, setVh] = useState(0)

  useEffect(() => {
    const update = () => {
      if (typeof window !== 'undefined') {
        setVw(window.innerWidth)
        setVh(window.innerHeight)
      }
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const bubbleSize = 44 // px (size-11)
  const edgePadding = 16 // px (right-4/left-4)
  const arcHeight = useMemo(() => (vh ? Math.min(vh * 0.4, 240) : 160), [vh])

  // Drag constraints: Allow horizontal drag across the whole viewport width
  const constraints = useMemo(() => {
    const top = -Math.max(0, vh * 0.5 - bubbleSize - edgePadding)
    const bottom = 0
    if (!vw) return { top, bottom, left: -2000, right: 2000 } as const
    const maxX = Math.max(0, vw - (edgePadding * 2 + bubbleSize))
    return side === 'left'
      ? { top, bottom, left: 0, right: maxX }
      : { top, bottom, left: -maxX, right: 0 }
  }, [vw, vh, side])

  // Progressively bias Y towards an arc that peaks at screen center and is 0 at edges
  useEffect(() => {
    const recompute = () => {
      const rawX = x.get()
      const rawY = y.get()

      if (!vw) {
        yDisplay.set(rawY)
        return
      }

      // Compute element center X in viewport space
      const anchorCenter =
        side === 'left'
          ? edgePadding + bubbleSize / 2
          : vw - (edgePadding + bubbleSize / 2)
      const centerX = anchorCenter + rawX

      const t = Math.min(1, Math.max(0, centerX / vw)) // normalize [0,1]
      const toCenter = 1 - Math.abs(2 * t - 1) // 0 at edges, 1 at center (triangle)
      const strength = toCenter * toCenter // ease-in quad for smoother strength

      const arcLift = -arcHeight * strength // negative to go up
      const blendedY = rawY * (1 - strength) + arcLift * strength
      yDisplay.set(blendedY)
    }

    const unsubX = x.on('change', recompute)
    const unsubY = y.on('change', recompute)
    return () => {
      unsubX()
      unsubY()
    }
  }, [vw, side, arcHeight, x, y, yDisplay])

  const onDragEnd = (
    _evt: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const cursorX = info?.point?.x ?? 0
    const width = typeof window !== 'undefined' ? window.innerWidth : vw
    if (width && cursorX < width / 2) {
      setSide('left')
    } else {
      setSide('right')
    }
    // Snap back transforms to anchor
    x.set(0)
    y.set(0)
    yDisplay.set(0)
  }

  return { side, x, yDisplay, constraints, onDragEnd } as const
}