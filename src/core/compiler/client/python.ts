import { CompilationResult } from "../types"

const isBrowser = typeof window !== 'undefined'

export const compilePython = async (code: string): Promise<CompilationResult> => {
    if (!isBrowser) {
      return {
        success: false,
        error: 'Python execution is only available in the browser',
      }
    }
  
    try {
      // Load a new Pyodide instance for each run to ensure a clean state
      // @ts-expect-error - loadPyodide is not defined on globalThis in TS context, but it will be at runtime
      const pyodide = await globalThis.loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.23.4/full/',
      })
  
      // Redirect stdout to capture print statements
      pyodide.setStdout({
        batched: (output: string) => {
          // In this simplified version, we just capture the final output as a string.
          // If we needed rich output (like images), this is where the logic would go.
          ;(pyodide as any)._capturedOutput = (pyodide as any)._capturedOutput
            ? (pyodide as any)._capturedOutput + output + '\n'
            : output + '\n'
        },
      })
  
      // Run the Python code
      await pyodide.runPythonAsync(code)
  
      // Get the captured stdout
      let output: string = (pyodide as any)._capturedOutput || ''
      output = output.trim()
  
      // Terminate Pyodide instance (optional, but good for memory if not reusing)
      // pyodide.destroy(); // Uncomment if you want to explicitly destroy the worker
  
      return {
        success: true,
        result: output,
      }
    } catch (error) {
      let errorMessage = error instanceof Error ? error.message : String(error)
  
      if (errorMessage.includes('PythonError:')) {
        const errorLines = errorMessage.split('\n')
        const pythonErrorLine = errorLines.find(
          (line) => line.includes('PythonError:') && !line.includes('Traceback'),
        )
        if (pythonErrorLine) {
          errorMessage = pythonErrorLine.replace('PythonError:', '').trim()
        }
      }
  
      return {
        success: false,
        error: errorMessage,
      }
    }
  }