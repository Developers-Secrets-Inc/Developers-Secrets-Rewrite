'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AlertCircle, CheckCircle, HelpCircle, Loader2 } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useSupportMessage } from '../hooks/use-support-message'


export function SupportDialog({ children, ...props }: React.ComponentProps<typeof Dialog>) {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)
  const { submit, isPending } = useSupportMessage()
  const supportStatus = { status: 'online', message: 'Support is available' }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!message.trim()) {
      setResult({ success: false, message: 'Please enter a message.' })
      return
    }

    try {
      const payload = email.trim() ? { message, email: email.trim() } : { message }
      await submit(payload)
      setResult({ success: true, message: 'Thanks for your feedback!' })
      setMessage('')
    } catch (err: any) {
      setResult({
        success: false,
        message: err?.message ?? 'An error occurred while sending your feedback.',
      })
    }
  }

  // Determine the status indicator color
  const getStatusColor = () => {
    switch (supportStatus.status) {
      case 'online':
        return 'bg-emerald-500'
      case 'maintenance':
        return 'bg-amber-500'
      case 'offline':
        return 'bg-red-500'
      default:
        return 'bg-emerald-500'
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
            <HelpCircle className="h-5 w-5" />
            Support
            <span className={`ml-2 h-2.5 w-2.5 rounded-full ${getStatusColor()}`} />
          </DialogTitle>
          <DialogDescription>
            Send us a message and we&apos;ll get back to you as soon as possible.
          </DialogDescription>
        </DialogHeader>

        {supportStatus.status !== 'online' && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>
              Support is {supportStatus.status === 'maintenance' ? 'under maintenance' : 'offline'}
            </AlertTitle>
            <AlertDescription>{supportStatus.message}</AlertDescription>
          </Alert>
        )}

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
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isPending || supportStatus.status !== 'online'}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="How can we help you?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[120px]"
              disabled={isPending || supportStatus.status !== 'online'}
            />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isPending || supportStatus.status !== 'online'}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Send message
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
