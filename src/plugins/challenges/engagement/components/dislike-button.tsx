'use client'

import { ThumbsDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useChallengeEngagement } from '../hooks/use-challenge-engagement'

interface DislikeButtonProps {
  isDisliked?: boolean
  onToggleDislike?: () => void
}

export function DislikeButton({ isDisliked = false, onToggleDislike }: DislikeButtonProps) {
  return (
    <Button
      variant={isDisliked ? 'default' : 'ghost'}
      size="sm"
      onClick={onToggleDislike}
      className={cn(
        'flex items-center gap-2 transition-colors duration-200',
        isDisliked
          ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20'
          : 'hover:border-red-500 hover:text-red-500',
      )}
      aria-pressed={isDisliked}
      aria-label={isDisliked ? 'Remove dislike' : 'Dislike'}
    >
      <ThumbsDown className="h-4 w-4" />
      <span className="text-sm">Dislike</span>
    </Button>
  )
}