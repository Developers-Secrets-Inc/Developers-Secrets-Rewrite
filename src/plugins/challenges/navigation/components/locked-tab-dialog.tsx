import { Lock } from 'lucide-react'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

type LockedTabDialogProps = {
  label: string
  triggerText?: string
  title?: string
  description?: string
  onOpenChange?: (open: boolean) => void
  onConfirm: () => Promise<void> | void
  isLoading?: boolean
}

export function LockedTabDialog({ 
  label, 
  triggerText, 
  title, 
  description, 
  onOpenChange,
  onConfirm,
  isLoading
}: LockedTabDialogProps) {
  const className = [
    'flex flex-1 items-center justify-center text-base gap-1.5 h-full px-4 transition-colors',
    'text-muted-foreground hover:bg-accent opacity-50 cursor-pointer',
  ].join(' ')

  const content = (
    <>
      <Lock size={16} className="me-1.5 opacity-60" aria-hidden="true" />
      <span className='truncate'>{label}</span>
    </>
  )

  const dialogTitle = title || `Locked Content: ${label}`
  const dialogDescription = description || 'This content is currently locked and requires specific conditions to be unlocked.'

  const handleConfirm = async () => {
    const result = onConfirm()
    if (result instanceof Promise) {
      await result
    }
    onOpenChange?.(false)
  }

  return (
    <Dialog onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <button className={className} aria-disabled>
          {content}
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2 mt-4">
          <Button onClick={handleConfirm} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}