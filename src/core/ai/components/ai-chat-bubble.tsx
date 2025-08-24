'use client'

import React, { forwardRef } from 'react'
import { Bot } from 'lucide-react'
import { motion } from 'motion/react'
import { useAIChatBubble } from '../hooks/use-ai-chat-bubble'

export const AIChatBubble = forwardRef<
  HTMLButtonElement,
  Omit<React.ComponentProps<typeof motion.button>, 'ref' | 'onDrag' | 'onDragStart' | 'onDragEnd'>
>(({ className, ...rest }, ref) => {
  const { side, x, yDisplay, constraints, onDragEnd } = useAIChatBubble()

  return (
    <motion.button
      ref={ref}
      type="button"
      aria-label="AI Assistant"
      title="AI Assistant"
      className={`fixed bottom-4 z-50 ${side === 'right' ? 'right-4' : 'left-4'} size-11 rounded-full bg-background border border-border shadow-md flex items-center justify-center hover:shadow-lg transition-shadow ${className ?? ''}`}
      drag
      dragMomentum={false}
      dragElastic={0.2}
      dragConstraints={constraints}
      style={{ x, y: yDisplay, touchAction: 'none' as any }}
      onDragEnd={onDragEnd}
      {...rest}
    >
      <Bot className="h-5 w-5" />
    </motion.button>
  )
})

AIChatBubble.displayName = 'AIChatBubble'
