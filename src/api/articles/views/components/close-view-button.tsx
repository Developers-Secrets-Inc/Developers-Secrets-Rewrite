import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { useArticleViewsStore } from '../store/use-article-views-store'

export const CloseViewButton = () => {
  const { toDefault } = useArticleViewsStore()

  return (
    <Button variant="ghost" size="icon" onClick={toDefault}>
      <X className="h-4 w-4" />
    </Button>
  )
}
