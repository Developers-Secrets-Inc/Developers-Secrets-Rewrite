'use client'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { AlertCircle, CheckCircle, Loader2, MessageSquare } from 'lucide-react'
import { useFeedback } from '@/api/feedbacks/hooks/use-feedback'
import { useState } from 'react'

export const FeedbackDialog = ({ children, ...props }: React.ComponentProps<typeof Dialog>) => {
  const [message, setMessage] = useState('')
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)
  const { submit, isPending } = useFeedback()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!message.trim()) {
      setResult({ success: false, message: 'Please enter a message.' })
      return
    }

    try {
      await submit({ message })
      setResult({ success: true, message: 'Thanks for your feedback!' })
      setMessage('')
    } catch (err: any) {
      setResult({
        success: false,
        message: err?.message ?? 'An error occurred while sending your feedback.',
      })
    }
  }

  return (
    <Dialog {...props}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Feedback
          </DialogTitle>
          <DialogDescription>
            Share your thoughts or suggestions about this article. Your feedback helps us improve.
          </DialogDescription>
        </DialogHeader>

        {result && (
          <Alert variant={result.success ? 'default' : 'destructive'} className="mt-4">
            {result.success ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            <AlertTitle>{result.success ? 'Success' : 'Error'}</AlertTitle>
            <AlertDescription>{result.message}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="What do you think about this article? Any suggestions for improvement?"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[120px]"
            disabled={isPending}
          />

          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit feedback
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
