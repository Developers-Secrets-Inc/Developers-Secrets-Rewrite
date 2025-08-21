'use client'

import { useMutation } from '@tanstack/react-query'
import { createFeedback } from '..'

type SubmitArgs = { message: string }

async function getClientIp(): Promise<string> {
  try {
    const res = await fetch('https://api.ipify.org?format=json')
    if (!res.ok) return 'unknown'
    const json = (await res.json()) as { ip?: string }
    return typeof json?.ip === 'string' ? json.ip : 'unknown'
  } catch {
    return 'unknown'
  }
}

export function useFeedback() {
  const mutation = useMutation({
    mutationFn: async (args: SubmitArgs) => {
      const ipAddress = await getClientIp()
      return await createFeedback({
        message: args.message,
        ipAddress,
      })
    },
  })

  const submit = (args: SubmitArgs) => mutation.mutateAsync(args)

  return {
    submit,
    isPending: mutation.isPending,
    isLoading: mutation.isPending,
    data: mutation.data,
    error: mutation.error,
  }
}
