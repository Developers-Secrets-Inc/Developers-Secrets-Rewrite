'use client'

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation'
import { Message, MessageContent } from '@/components/ai-elements/message'
import {
  PromptInput,
  PromptInputSubmit,
  PromptInputTextarea,
} from '@/components/ai-elements/prompt-input'
import { Response } from '@/components/ai-elements/response'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { PanelsTopLeftIcon, XIcon } from 'lucide-react'
import { useArticleViewsStore } from '../../views/store/use-article-views-store'
import { AIChatBubble } from '@/core/ai/components/ai-chat-bubble'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { useEffect, useState } from 'react'
import { useChatSessionStore } from '@/core/ai/store/use-chat-session-store'

export const ArticleAIChatMenu = () => {
  const { current, toChat } = useArticleViewsStore()
  const { messages: initialMessages, setMessages } = useChatSessionStore()

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat'
    }),
    messages: initialMessages
  })

  useEffect(() => {
    setMessages(messages)
  }, [messages])

  const [prompt, setPrompt] = useState('')

  const onSend = () => {
    if (!prompt.trim()) return
    sendMessage({
      text: prompt,
    })
    setPrompt('')

  }

  return (
    current !== 'chat' && (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <AIChatBubble />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[28rem] h-[34rem] overflow-hidden p-0" align="start">
          <div className="flex flex-col h-full">
            <header className="shrink-0 border-b h-10 flex items-center justify-end p-2">
              <Button variant="ghost" size="icon" aria-label="Header action" onClick={toChat}>
                <PanelsTopLeftIcon className="h-4 w-4" />
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
  )
}
