'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { signInWithPassword } from '@/core/auth'
import { toast } from 'sonner'
import { isFailure } from '@/core/fn/result'
import type { AuthError, User } from '@supabase/supabase-js'

export function useSignIn() {
  const qc = useQueryClient()
  const mutation = useMutation<User, AuthError, { email: string; password: string }>({
    mutationFn: async (args) => {
      const r = await signInWithPassword(args)
      if (isFailure(r)) throw r.error
      return r.value
    },
    onSuccess: async (user) => {
      await qc.invalidateQueries({ queryKey: ['user'] })
      toast.success(`You are successfully logged as ${user.email}`)
    },
    onError: (err) => toast.error(err.message),
  })

  const signin = (args: { email: string; password: string }) => mutation.mutateAsync(args)

  return {
    signin,
    isPending: mutation.isPending,
    isLoading: mutation.isPending,
    error: mutation.error,
  }
}
