'use client'

import { useMutation } from '@tanstack/react-query'
import { type Language, type CompilationResult } from '@/core/compiler/types'
import { compile as compileFn } from '@/core/compiler/client/index'

type UseCompileReturn = {
  compile: (params: { code: string; language: Language }) => Promise<CompilationResult>
  isLoading: boolean
}

export function useCompile(): UseCompileReturn {
  const { mutateAsync, isPending } = useMutation<
    CompilationResult,
    Error,
    { code: string; language: Language }
  >({
    mutationFn: async ({ code, language }) => {
      const result = await compileFn(code, language)
      return result
    },
  })

  return {
    compile: mutateAsync,
    isLoading: isPending,
  }
}
