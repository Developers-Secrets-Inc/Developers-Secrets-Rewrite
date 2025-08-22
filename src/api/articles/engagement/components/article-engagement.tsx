'use client'

import { useState, useId } from 'react'

import { Button } from '@/components/ui/button'
import { ThumbsDown, ThumbsUp } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export const ArticleEngagement = () => {
  const [isTextAreaVisible, setIsTextAreaVisible] = useState(false)
  const [activeButton, setActiveButton] = useState<'good' | 'bad'>('good')
  const id = useId()

  return (
    <div className="flex flex-col gap-2 border-y border-border py-2">
      <div className="flex gap-2 items-center">
        <span className="text-sm">How is this article?</span>
        <Button
          variant={activeButton === 'good' ? 'outline' : 'ghost'}
          className="rounded-full"
          onClick={() => {
            setActiveButton('good')
            setIsTextAreaVisible(true)
          }}
        >
          <ThumbsUp className="h-4 w-4" />
          Good
        </Button>
        <Button
          variant={activeButton === 'bad' ? 'outline' : 'ghost'}
          className="rounded-full"
          onClick={() => {
            setActiveButton('bad')
            setIsTextAreaVisible(true)
          }}
        >
          <ThumbsDown className="h-4 w-4" />
          Bad
        </Button>
      </div>

      {isTextAreaVisible && (
        <div className="*:not-first:mt-2">
          <Textarea id={id} placeholder="Leave a comment" />
          <Button variant="outline" onClick={() => setIsTextAreaVisible(false)}>
            Send
          </Button>
        </div>
      )}
    </div>
  )
}
