'use client'

import { Button } from '@/components/ui/button'
import { Loader2, Play } from 'lucide-react'
import { useCompile } from '@/core/compiler/client/react/hooks/use-compile'
import { useIDEStore } from '@/core/ide/store/use-ide-store'
import { transformFileTreeToExecutionStructure } from '../utils'

export const RunButton = ({ onClick }: { onClick?: () => void }) => {
  const { compileFileStructure, isLoading } = useCompile()
  const { setCompilationResult, fileTree } = useIDEStore()

  const handleClick = async () => {
    if (onClick) {
      onClick()
    }
    const executionStructure = transformFileTreeToExecutionStructure(fileTree)

    const compileResult = await compileFileStructure({
      files: executionStructure.files,
      mainFile: executionStructure.mainFile!,
    })

    console.log(compileResult)
    setCompilationResult(compileResult)
  }

  return (
    <Button variant="outline" size="sm" className="h-8" onClick={handleClick}>
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Play className="mr-2 h-4 w-4" />
      )}
      Run
    </Button>
  )
}
