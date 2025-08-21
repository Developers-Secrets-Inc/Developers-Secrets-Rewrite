'use client'

import { Bot } from 'lucide-react'
import { motion } from 'motion/react'
import { usePearlBubble } from '../hooks/use-pearl-bubble'

export const PearlTriggerBubble = () => {
  const { side, x, yDisplay, constraints, onDragEnd } = usePearlBubble()

  return (
    <div
      className={`fixed bottom-4 z-50 ${side === 'right' ? 'right-4' : 'left-4'}`}
      style={{ touchAction: 'none' }}
    >
      <motion.button
        type="button"
        aria-label="AI Assistant"
        title="AI Assistant"
        className="size-11 rounded-full bg-background border border-border shadow-md flex items-center justify-center hover:shadow-lg transition-shadow"
        drag
        dragMomentum={false}
        dragElastic={0.2}
        dragConstraints={constraints}
        style={{ x, y: yDisplay }}
        onDragEnd={onDragEnd}
      >
        <Bot className="h-5 w-5" />
      </motion.button>
    </div>
  )
}