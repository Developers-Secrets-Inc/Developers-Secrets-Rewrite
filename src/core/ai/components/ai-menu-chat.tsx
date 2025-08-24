'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { AIChatBubble } from './ai-chat-bubble'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation'
import { Message, MessageContent } from '@/components/ai-elements/message'
import { Response } from '@/components/ai-elements/response'
import { PromptInput, PromptInputSubmit, PromptInputTextarea } from '@/components/ai-elements/prompt-input'
import { XIcon } from 'lucide-react'

export const AIMenuChat = () => {
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
  })

  const [prompt, setPrompt] = useState('')

  const onSend = () => {
    if (!prompt.trim()) return
    sendMessage({
      text: prompt,
    })
    setPrompt('')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <AIChatBubble />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[28rem] h-[34rem] overflow-hidden p-0" align="start">
        <div className="flex flex-col h-full">
          <header className="shrink-0 border-b h-10 flex items-center justify-end p-2">
            <Button variant="ghost" size="icon" aria-label="Header action">
              <XIcon className="h-4 w-4" />
            </Button>
          </header>
          <Conversation className="flex-1 min-h-0">
            <ConversationContent>
              {messages.map((message) => (
                <Message from={message.role} key={message.id}>
                  <MessageContent>
                    {message.parts.map((part, i) => {
                      switch (part.type) {
                        case 'text': // we don't use any reasoning or tool calls in this example
                          return <Response key={`${message.id}-${i}`}>{part.text}</Response>
                        default:
                          return null
                      }
                    })}
                  </MessageContent>
                </Message>
              ))}
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>

          <PromptInput
            onSubmit={(e) => {
              e.preventDefault()
              onSend()
            }}
            className="border-t w-full relative shrink-0 border-md"
          >
            <PromptInputTextarea
              value={prompt}
              placeholder="Say something..."
              onChange={(e) => setPrompt(e.currentTarget.value)}
              className="pr-12 rounded-md"
            />
            <PromptInputSubmit
              status={status === 'streaming' ? 'streaming' : 'ready'}
              disabled={!prompt.trim()}
              className="absolute bottom-1 right-1"
            />
          </PromptInput>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}



