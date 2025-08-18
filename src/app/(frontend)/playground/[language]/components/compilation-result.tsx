'use client'

import { useIDEStore } from '@/core/ide/store/use-ide-store'

export const CompilationResult = () => {
  const { compilationResult } = useIDEStore()

  return (
    <div className="flex flex-col h-full">
      <div className="flex-shrink-0 border-b h-12 flex items-center justify-between bg-muted/20 pr-2">
        <div className="px-2 text-muted-foreground">Output</div>
      </div>
      <div className="flex-1 overflow-y-auto p-2 bg-[#1e1e1e]">
        <div className="text-sm text-muted-foreground">
          {compilationResult
            ? compilationResult.success
              ? compilationResult.result
              : compilationResult.error
            : 'No output yet'}
        </div>
      </div>
    </div>
  )
}
