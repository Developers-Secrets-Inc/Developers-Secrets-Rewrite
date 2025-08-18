import { CompilationResult } from '../types'

export const isBrowser = typeof window !== 'undefined'

export const createJavaScriptWorker = (code: string): Promise<CompilationResult> => {
  if (!isBrowser) {
    return Promise.resolve({
      success: false,
      error: 'JavaScript execution is only available in the browser',
    })
  }

  return new Promise((resolve) => {
    // Create a new worker from the external file, specifying it's a module
    const worker = new Worker(new URL('./workers/eval-worker.mjs', import.meta.url), {
      type: 'module',
    })

    // Handle messages from the worker
    worker.onmessage = (e) => {
      worker.terminate()
      resolve(e.data)
    }

    // Handle errors
    worker.onerror = (e) => {
      worker.terminate()
      resolve({
        success: false,
        error: e.message,
      })
    }

    // Send the code to the worker
    worker.postMessage(code)
  })
}
