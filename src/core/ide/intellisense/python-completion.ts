/**
 * Enregistre le provider de complétion pour Python globalement
 * @param monaco Monaco instance from the editor
 * @returns Fonction de cleanup
 */
export const registerPythonCompletion = (monaco: any) => {

  // Mots clés Python
  const pythonKeywords = [
    'if', 'else', 'elif', 'for', 'while', 'def', 'class', 'import',
    'from', 'as', 'return', 'pass', 'break', 'continue', 'try',
    'except', 'finally', 'with', 'async', 'await', 'lambda',
    'assert', 'del', 'global', 'nonlocal', 'raise', 'yield',
    'and', 'or', 'not', 'in', 'is', 'None', 'True', 'False'
  ]

  // Fonctions Python courantes
  const pythonBuiltins = [
    'print', 'len', 'range', 'list', 'dict', 'tuple', 'set', 'str',
    'int', 'float', 'bool', 'type', 'isinstance', 'hasattr', 'getattr',
    'setattr', 'delattr', 'callable', 'iter', 'next', 'repr', 'sorted',
    'enumerate', 'zip', 'map', 'filter', 'reduce', 'sum', 'max', 'min',
    'abs', 'round', 'pow', 'open', 'input', 'eval', 'exec', 'compile'
  ]

  // Modules Python standards courants
  const pythonModules = [
    'math', 'os', 'sys', 'json', 'datetime', 'time', 'random',
    'collections', 'itertools', 'functools', 'operator', 'pathlib',
    'typing', 'dataclasses', 'enum', 'abc', 'contextlib'
  ]

  // Stockage global du provider pour cleanup
  let registeredProviders: any[] = []

  const provider: any = {
    provideCompletionItems: (model: any, position: any) => {
      const currentLine = model.getLineContent(position.lineNumber)
      const word = model.getWordUntilPosition(position)
      const range = new monaco.Range(position.lineNumber, word.startColumn, position.lineNumber, word.endColumn)

      // Détecter le contexte pour fournir des suggestions pertinentes
      const suggestions: any[] = []

      // Complétion de base avec mots clés et fonctions built-in
      suggestions.push(
        ...pythonKeywords.map(keyword => ({
          label: keyword,
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: keyword,
          documentation: `Mot clé Python: ${keyword}`,
          range: range
        })),
        
        ...pythonBuiltins.map(builtin => ({
          label: builtin,
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: builtin,
          documentation: `Fonction built-in Python: ${builtin}`,
          range: range
        }))
      )

      // Complétion de modules si on est dans un import
      if (currentLine.includes('import ') || currentLine.includes('from ')) {
        suggestions.push(
          ...pythonModules.map(module => ({
            label: module,
            kind: monaco.languages.CompletionItemKind.Module,
            insertText: module,
            documentation: `Module Python: ${module}`,
            range: range
          }))
        )
      }

      // Complétion avec . pour les méthodes d'objets
      if (currentLine.includes('.')) {
        const objectMethods = [
          'append', 'pop', 'extend', 'insert', 'remove', 'index',
          'keys', 'values', 'items', 'get', 'setdefault', 'update',
          'split', 'strip', 'join', 'replace', 'find', 'format',
          'read', 'write', 'close', 'startswith', 'endswith'
        ]
        
        suggestions.push(
          ...objectMethods.map(method => ({
            label: method,
            kind: monaco.languages.CompletionItemKind.Method,
            insertText: method,
            documentation: `Méthode courante: ${method}`,
            range: range
          }))
        )
      }

      return { suggestions }
    }
  }

  // Enregistrer seulement pour 'python' (pas besoin de ['py', 'python'] qui créait des conflits)
  const disposables = [
    monaco.languages.registerCompletionItemProvider('python', provider)
  ]
  
  registeredProviders = registeredProviders.concat(disposables)
  
  // Retourner fonction de cleanup
  return () => {
    disposables.forEach((disposable: any) => disposable.dispose())
    registeredProviders = registeredProviders.filter(d => !disposables.includes(d))
  }
}

/**
 * Nettoie tous les providers de complétion Python
 */
export const disposePythonCompletion = () => {
  // Cette fonction peut être étendue si on veut un nettoyage global
}