'use client'

import { useMutation } from '@tanstack/react-query'
import { type Language, type CompilationResult } from '@/core/compiler/types'
import {
  compile as compileFn,
  compileFileStructure as compileFileStructureFn,
} from '@/core/compiler/client/index'
import { File } from '@/core/compiler/client/types'

type UseCompileReturn = {
  compile: (params: { code: string; language: Language }) => Promise<CompilationResult>
  compileFileStructure: (params: { files: File[]; mainFile: File }) => Promise<CompilationResult>
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

  const { mutateAsync: compileFileStructure, isPending: isFileStructurePending } = useMutation<
    CompilationResult,
    Error,
    { files: File[]; mainFile: File }
  >({
    mutationFn: async ({ files, mainFile }) => {
      const result = await compileFileStructureFn(files, mainFile)
      return result
    },
  })

  return {
    compile: mutateAsync,
    compileFileStructure,
    isLoading: isPending || isFileStructurePending,
  }
}
