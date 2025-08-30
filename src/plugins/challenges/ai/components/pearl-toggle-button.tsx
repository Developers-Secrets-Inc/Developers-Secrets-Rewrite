
import { Button } from '@/components/ui/button'
import { Bot, MessageSquareText } from 'lucide-react'

export function PearlToggleButton() {

  return (
    <Button variant="outline" className="w-full flex items-center gap-2 h-10">
      <Bot size={18} />
      <span>Ask Pearl for help</span>
      <MessageSquareText className="ml-auto" size={16} />
    </Button>
  )
}