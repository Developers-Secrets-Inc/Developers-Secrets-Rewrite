'use client'

import { Editor, OnMount } from '@monaco-editor/react'
import { useEffect, useMemo, useRef } from 'react'
import type { editor } from 'monaco-editor'
import { useIDEStore } from '../store/use-ide-store'
import { findFileById } from '../utils'
import { Code, FileText, FolderOpen } from 'lucide-react'
import { NoFileOpen } from './no-file-open'

const editorOptions = (language: string) => {
  return {
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
  }
}

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
    activeTabId,
    setActiveTab,
  } = useIDEStore()

  const editorRef = useRef<unknown>(null)

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor
    monaco.editor.defineTheme(editorTheme.name, editorTheme.options)
    monaco.editor.setTheme(editorTheme.name)
    editor.focus()
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
      }
    }
  }, [activeFileId, openTabs, setActiveTab])

  // Synchroniser le fichier actif avec l'onglet actif
  useEffect(() => {
    if (activeTabId === null) {
      setActiveFileId(null)
    }
  }, [activeTabId, setActiveFileId])

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
      options={editorOptions('python')}
    />
  )
}
