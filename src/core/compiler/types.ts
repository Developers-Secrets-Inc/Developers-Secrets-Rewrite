export type Language = 'python' | 'javascript' | 'typescript'
export type CompileType = 'client' | 'server'

export type CompilationResult =
  | {
      success: true
      result: string
    }
  | {
      success: false
      error: string
    }
