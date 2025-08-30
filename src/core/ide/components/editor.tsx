'use client'

import { Editor, OnMount } from '@monaco-editor/react'
import { useEffect, useMemo, useRef } from 'react'
import * as monaco from 'monaco-editor'
import type { editor } from 'monaco-editor'
import { useIDEStore } from '../store/use-ide-store'
import { findFileById, getLanguageFromExtension } from '../utils'
import { IDETab } from '../types'
import { Language } from '@/core/compiler/types'
import { Code, FileText, FolderOpen } from 'lucide-react'
import { NoFileOpen } from './no-file-open'
import { registerPythonCompletion } from '../intellisense/python-completion'

const editorOptions = (language: string) => ({
  minimap: { enabled: true },
  scrollBeyondLastLine: false,
  fontSize: 14,
  tabSize: language === 'python' ? 4 : 2,
  automaticLayout: true,
  wordWrap: 'on' as 'on' | 'off' | 'wordWrapColumn' | 'bounded',
  lineNumbers: 'on' as const,
  glyphMargin: true,
  folding: true,
  lineDecorationsWidth: 10,
  bracketPairColorization: { enabled: true },
  suggestOnTriggerCharacters: true,
  quickSuggestions: { other: true, comments: true, strings: true },
  suggestSelection: 'first' as const,
  parameterHints: { enabled: true },
  autoIndent: 'advanced' as const,
  formatOnPaste: true,
  formatOnType: true,
})

const editorTheme = {
  name: 'custom-dark',
  options: {
    base: 'vs-dark' as const,
    inherit: true,
    rules: [],
    colors: {
      'editor.background': '#1e1e1e',
    },
  } as editor.IStandaloneThemeData,
}

export const IDEEditor = ({ onChange }: { onChange?: (value: string | undefined) => void }) => {
  const {
    fileTree,
    activeFileId,
    updateNodeContent,
    setActiveFileId,
    openTabs,
    activeTab,
    setActiveTab,
  } = useIDEStore()

  const editorRef = useRef<unknown>(null)
  const editorInstance = useRef<editor.IStandaloneCodeEditor | null>(null)

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor
    editorInstance.current = editor
    
    monaco.editor.defineTheme(editorTheme.name, editorTheme.options)
    monaco.editor.setTheme(editorTheme.name)
    editor.focus()

    // Register Python completion provider after Monaco is initialized
    registerPythonCompletion(monaco)
  }

  const activeFile = useMemo(() => {
    if (!activeFileId || !fileTree) return null
    return findFileById(fileTree, activeFileId)
  }, [activeFileId, fileTree])

  // Synchroniser l'onglet actif avec le fichier actif
  useEffect(() => {
    if (activeFileId) {
      const correspondingTab = openTabs.find((tab) => tab.fileId === activeFileId)
      if (correspondingTab) {
        setActiveTab(correspondingTab.id)
      } else {
        // Si le fichier n'a pas de tab correspondant, créer automatiquement un tab
        const file = findFileById(fileTree, activeFileId)
        if (file && file.type === 'file') {
          const fileExtension = file.name.split('.').pop() || ''
          const language = getLanguageFromExtension(fileExtension)
          
          // Créer un nouveau tab pour ce fichier
          const newTab = {
            id: crypto.randomUUID(),
            fileId: activeFileId,
            fileName: file.name,
            language: language as Language
          }
          
          // Ajouter le tab et l'activer
          openTabs.push(newTab)
          setActiveTab(newTab.id)
        }
      }
    }
  }, [activeFileId, openTabs, setActiveTab, fileTree])

  // Synchroniser le fichier actif avec l'onglet actif
  useEffect(() => {
    if (!activeTab) {
      setActiveFileId(null)
    }
  }, [activeTab, setActiveFileId])

  // Ensure language is properly set for Python files
  useEffect(() => {
    if (editorInstance.current && activeFile?.language === 'python') {
      const model = editorInstance.current.getModel()
      if (model) {
        monaco.editor.setModelLanguage(model, 'python')
      }
    }
  }, [activeFile, fileTree])

  const handleCodeChange = (value: string | undefined) => {
    if (value !== undefined) {
      // Update the content in the store if there's an active file
      if (activeFileId) {
        updateNodeContent(activeFileId, value)
      }
      onChange?.(value)
    }
  }

  if (activeFile?.type !== 'file' || !activeFile) {
    return (
      <div className="flex h-full items-center justify-center p-2">
        <NoFileOpen
          title="No file selected"
          description="Select a file from the explorer to start editing"
          icons={[FileText, Code, FolderOpen]}
        />
      </div>
    )
  }

  
  
  return (
    <Editor
      height="100%"
      language={activeFile?.language || 'plaintext'}
      value={activeFile?.content || ''}
      onChange={handleCodeChange}
      theme={editorTheme.name}
      onMount={handleEditorDidMount}
      options={editorOptions(activeFile?.language || 'plaintext')}
    />
  )
}
