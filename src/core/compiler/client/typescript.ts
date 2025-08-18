import { CompilationResult } from "../types"

export const isBrowser = typeof window !== 'undefined'

export const createTypeScriptWorker = (code: string): Promise<CompilationResult> => {
    if (!isBrowser) {
      return Promise.resolve({
        success: false,
        error: 'TypeScript execution is only available in the browser',
      })
    }
  
    return new Promise((resolve) => {
      // Create a new worker from the external file, specifying it's a module
      const worker = new Worker(new URL('./workers/eval-worker.mjs', import.meta.url), {
        type: 'module',
      })
  
      worker.onmessage = (e) => {
        worker.terminate()
        resolve(e.data)
      }
  
      worker.onerror = (e) => {
        worker.terminate()
        resolve({
          success: false,
          error: e.message,
        })
      }
  
      worker.postMessage(code)
    })
  }
  