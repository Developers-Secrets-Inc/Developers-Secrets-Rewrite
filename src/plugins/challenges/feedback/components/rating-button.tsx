import { Button } from '@/components/ui/button'

export const RatingButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button
      variant="link"
      className="text-xs text-muted-foreground cursor-pointer hover:text-primary transition-colors"
      onClick={onClick}
    >
      Rate this challenge
    </Button>
  )
}
