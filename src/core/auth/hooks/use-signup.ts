'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { signUp } from '@/core/auth'
import { toast } from 'sonner'
import { isFailure } from '@/core/fn/result'
import { AuthError, type User } from '@supabase/supabase-js'
import { isNone } from '@/core/fn/maybe'

export function useSignUp() {
  const qc = useQueryClient()
  const mutation = useMutation<User, AuthError, { email: string; password: string; options: { data: { username: string; }; }; }>({
    mutationFn: async (args) => {
      const r = await signUp(args)
      if (isFailure(r)) throw r.error
      if (isNone(r.value)) throw new AuthError('Email confirmation required')
      return r.value.value
    },
    onSuccess: async (user) => {
      await qc.invalidateQueries({ queryKey: ['user'] })
      toast.success(`You are successfully logged as ${user.email}`)
    },
    onError: (err) => toast.error(err.message),
  })

  const signup = (args: { email: string; password: string; options: { data: { username: string; }; }; }) => mutation.mutateAsync(args)

  return {
    signup,
    isPending: mutation.isPending,
    isLoading: mutation.isPending,
    error: mutation.error,
  }
}
