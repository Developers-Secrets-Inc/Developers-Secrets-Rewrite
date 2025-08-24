import { UIMessage } from 'ai'
import { create } from 'zustand'

export type ChatSessionState = {
  messages: UIMessage[]
  addMessage: (message: UIMessage) => void
  setMessages: (messages: UIMessage[]) => void
}

export const useChatSessionStore = create<ChatSessionState>()((set) => ({
  messages: [],
  addMessage: (message: UIMessage) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
  setMessages: (messages: UIMessage[]) =>
    set((state) => ({
      messages,
    })),
}))
