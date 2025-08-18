import { CompilationResult, Language } from '../types'
import { createJavaScriptWorker } from './javascript'
import { createTypeScriptWorker } from './typescript'
import { compilePython } from './python'

export const compile = async (code: string, language: Language): Promise<CompilationResult> => {
  switch (language) {
    case 'javascript':
      return await createJavaScriptWorker(code)
    case 'typescript':
      return await createTypeScriptWorker(code)
    case 'python':
      return await compilePython(code)
    default:
      return {
        success: false,
        error: 'Unsupported language',
      }
  }
}
