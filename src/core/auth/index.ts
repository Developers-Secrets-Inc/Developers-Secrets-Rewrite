'use server'

import 'server-only'

import { createClient } from '@/utils/supabase/server'
import { mutation, query } from '../fn'
import z from 'zod'
import { success, failure, type Result } from '../fn/result'
import type { AuthError, User } from '@supabase/supabase-js'
import { type Maybe, none, some } from '../fn/maybe'

export const getUser = query({
  handler: async (): Promise<Result<User, AuthError>> => {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.getUser()

    if (error) return failure(error)

    return success(data.user)
  },
})

export const getUserById = query({
  args: z.object({
    id: z.uuid(),
  }),
  handler: async ({ id }): Promise<Result<User, AuthError>> => {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.admin.getUserById(id)

    if (error) return failure(error)

    return success(data.user)
  },
})

export const signUp = mutation({
  args: z.object({
    email: z.email(),
    password: z.string(),
    options: z.object({
      data: z.object({
        username: z.string(),
      }),
    }),
  }),
  handler: async ({ email, password, options }): Promise<Result<Maybe<User>, AuthError>> => {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options,
    })

    if (error) return failure(error)

    return success(data.user ? some(data.user) : none())
  },
})

export const signInWithPassword = mutation({
  args: z.object({
    email: z.email(),
    password: z.string(),
  }),
  handler: async ({ email, password }): Promise<Result<User, AuthError>> => {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) return failure(error)

    return success(data.user)
  },
})

export const signOut = mutation({
  handler: async (): Promise<Result<null, AuthError>> => {
    const supabase = await createClient()
    const { error } = await supabase.auth.signOut()

    if (error) return failure(error)

    return success(null)
  },
})
