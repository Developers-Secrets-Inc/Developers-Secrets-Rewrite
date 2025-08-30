'use client'

import { ThumbsUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useChallengeEngagement } from '../hooks/use-challenge-engagement'

interface LikeButtonProps {
  isLiked?: boolean
  onToggleLike?: () => void
}

export function LikeButton({ isLiked = false, onToggleLike }: LikeButtonProps) {
  return (
    <Button
      variant={isLiked ? 'default' : 'ghost'}
      size="sm"
      onClick={onToggleLike}
      className={cn(
        'flex items-center gap-2 transition-colors duration-200',
        isLiked
          ? 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
          : 'hover:border-green-500 hover:text-green-500',
      )}
      aria-pressed={isLiked}
      aria-label={isLiked ? 'Unlike' : 'Like'}
    >
      <ThumbsUp className="h-4 w-4" />
      <span className="text-sm">Like</span>
    </Button>
  )
}
