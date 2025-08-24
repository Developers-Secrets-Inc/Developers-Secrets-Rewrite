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
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { useEffect, useState } from 'react'
import { useChatSessionStore } from '@/core/ai/store/use-chat-session-store'

export const AIChat = () => {
  const { messages: initialMessages, setMessages } = useChatSessionStore()

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
    messages: initialMessages,
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
    <div className="flex flex-col h-full">
      <Conversation>
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
        className="mt-4 w-full max-w-2xl mx-auto relative"
      >
        <PromptInputTextarea
          value={prompt}
          placeholder="Say something..."
          onChange={(e) => setPrompt(e.currentTarget.value)}
          className="pr-12"
        />
        <PromptInputSubmit
          status={status === 'streaming' ? 'streaming' : 'ready'}
          disabled={!prompt.trim()}
          className="absolute bottom-1 right-1"
        />
      </PromptInput>
    </div>
  )
}
