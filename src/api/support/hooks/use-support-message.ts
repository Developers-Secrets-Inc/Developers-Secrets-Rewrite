'use client'

import { useMutation } from '@tanstack/react-query'
import { createSupportMessage } from '..'

type SubmitArgs = { message: string; name?: string; email?: string }

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

export function useSupportMessage() {
  const mutation = useMutation({
    mutationFn: async (args: SubmitArgs) => {
      const ipAddress = await getClientIp()
      return await createSupportMessage({
        name: args.name ?? 'Anonymous',
        email: args.email ?? 'anonymous@unknown',
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
