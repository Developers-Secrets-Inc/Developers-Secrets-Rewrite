'use client'

import { Editor, OnMount } from '@monaco-editor/react'
import { useRef } from 'react'
import type { editor } from 'monaco-editor'

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
  const editorRef = useRef<unknown>(null)

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor
    monaco.editor.defineTheme(editorTheme.name, editorTheme.options)
    monaco.editor.setTheme(editorTheme.name)
    editor.focus()
  }

  const handleChange = (value: string | undefined) => {
    if (onChange) {
      onChange(value)
    }
  }

  return (
    <Editor
      height="100%"
      language="python"
      value=""
      onChange={handleChange}
      theme={editorTheme.name}
      onMount={handleEditorDidMount}
      options={editorOptions('python')}
    />
  )
}
