import { CompilationResult } from '../types'
import { File } from './types'

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

export const compilePythonFileStructure = async (
  files: File[],
  mainFile: File,
): Promise<CompilationResult> => {
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
        ;(pyodide as any)._capturedOutput = (pyodide as any)._capturedOutput
          ? (pyodide as any)._capturedOutput + output + '\n'
          : output + '\n'
      },
    })

    // Create all files in the virtual file system
    for (const file of files) {
      // Ensure directory exists
      const pathParts = file.path.split('/')
      const fileName = pathParts.pop()
      const dirPath = pathParts.join('/')

      if (dirPath && dirPath !== '/') {
        try {
          // Create directory recursively
          pyodide.FS.mkdirTree(dirPath)
        } catch (e) {
          // Directory might already exist, ignore error
        }
      }

      // Write file content
      pyodide.FS.writeFile(file.path, file.content)
    }

    // List files to verify they were created

    // Change to root directory to ensure modules can be found
    pyodide.FS.chdir('/')

    // Execute the main file
    if (mainFile) {
      // Execute the main file using exec with proper file context
      const mainFileContent = pyodide.FS.readFile(mainFile.path, { encoding: 'utf8' })

      // Set __file__ variable to help Python resolve imports
      await pyodide.runPythonAsync(`
import sys
sys.path.insert(0, '/')
__file__ = '${mainFile.path}'
exec('''${mainFileContent.replace(/\\/g, '\\\\')}''')
`)
    } else {
      // If no main file, execute the first Python file
      const firstPythonFile = files.find((f) => f.path.endsWith('.py'))
      if (firstPythonFile) {
        await pyodide.runPythonAsync(firstPythonFile.content)
      } else {
        throw new Error('No Python files found to execute')
      }
    }

    // Get the captured stdout
    let output: string = (pyodide as any)._capturedOutput || ''
    output = output.trim()

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
