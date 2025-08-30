'use client'

import { useIDEStore } from '../store/use-ide-store'
import React, { useEffect, useRef, useState } from 'react'
import { useCompile } from '@/core/compiler/client/react/hooks/use-compile'
import { transformFileTreeToExecutionStructure } from '../utils'

type CommandEntry = {
  type: 'command'
  command: string
}

type OutputEntry = {
  type: 'output'
  output: string
  success: boolean
}

type TerminalEntry = CommandEntry | OutputEntry

export const OutputContent = () => {
  const { compilationResult, fileTree } = useIDEStore()
  const { compileFileStructure, isLoading } = useCompile()
  const [terminalHistory, setTerminalHistory] = useState<TerminalEntry[]>([])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [currentCommandInput, setCurrentCommandInput] = useState('')
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(-1)
  const terminalEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Add compilation result to terminal history
  useEffect(() => {
    if (compilationResult) {
      setTerminalHistory((prev) => [
        ...prev,
        {
          type: 'output',
          output: compilationResult.success ? compilationResult.result : compilationResult.error,
          success: compilationResult.success,
        },
      ])
    }
  }, [compilationResult])

  // Scroll to bottom and focus input on new history entries or component mount
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    inputRef.current?.focus()
  }, [terminalHistory])

  
  const handleNavigation = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const command = currentCommandInput.trim()
    const commandHistoryLength = commandHistory.length

    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistoryLength === 0) return

      const newIndex = currentHistoryIndex === -1 
        ? commandHistoryLength - 1 
        : Math.max(0, currentHistoryIndex - 1)
      
      setCurrentHistoryIndex(newIndex)
      setCurrentCommandInput(commandHistory[newIndex])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (commandHistoryLength === 0 || currentHistoryIndex === -1) return

      const newIndex = currentHistoryIndex < commandHistoryLength - 1 
        ? currentHistoryIndex + 1 
        : -1
      
      setCurrentHistoryIndex(newIndex)
      setCurrentCommandInput(newIndex === -1 ? '' : commandHistory[newIndex])
    }
  }

  const handleCommandSubmit = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentCommandInput.trim()) {
      const command = currentCommandInput.trim()
      const [cmd, ...args] = command.split(' ')

      // Ajouter à l'historique des commandes (stocké séparément)
      setCommandHistory((prev) => [...prev, command])
      
      // Ajouter à l'affichage terminal
      setTerminalHistory((prev) => [...prev, { type: 'command', command }])
      setCurrentCommandInput('')
      setCurrentHistoryIndex(-1)

      switch (cmd) {
        case 'clear':
          setTerminalHistory([])
          setCurrentHistoryIndex(-1)
          break
        case 'run':
          setTerminalHistory((prev) => [
            ...prev,
            { type: 'output', output: 'Running...', success: true },
          ])
          const executionStructure = transformFileTreeToExecutionStructure(fileTree)
          const compileResult = await compileFileStructure({
            files: executionStructure.files,
            mainFile: executionStructure.mainFile!,
          })
          setTerminalHistory((prev) => [
            ...prev.slice(0, prev.length - 1), // Remove "Running..." message
            {
              type: 'output',
              output: compileResult.success ? compileResult.result : compileResult.error,
              success: compileResult.success,
            },
          ])
          break
        case 'help':
          setTerminalHistory((prev) => [
            ...prev,
            {
              type: 'output',
              output: 'Available commands: clear, run, help',
              success: true,
            },
          ])
          break
        default:
          setTerminalHistory((prev) => [
            ...prev,
            { type: 'output', output: `Command not found: ${cmd}`, success: false },
          ])
          break
      }
    }
  }

  return (
    <div className="flex flex-col rounded-b-md h-full border-t border-border">
      <div className="flex-1 overflow-y-auto p-2 font-mono text-sm bg-background text-foreground">
        {terminalHistory.map((entry, idx) => (
          <div key={idx} className="flex items-center gap-2">
            {entry.type === 'command' ? (
              <>
                <span className="text-muted-foreground">$</span>
                <span>{entry.command}</span>
              </>
            ) : (
              <span className={entry.success ? 'text-primary' : 'text-red-500'}>
                {entry.output}
              </span>
            )}
          </div>
        ))}
        {/* Integrated command input */}
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">$</span>
          <input
            ref={inputRef}
            type="text"
            value={currentCommandInput}
            onChange={(e) => setCurrentCommandInput(e.target.value)}
            onKeyDown={(e) => {
    handleNavigation(e)
    handleCommandSubmit(e)
  }}
            className="bg-transparent outline-none flex-1 font-mono text-sm"
            aria-label="Terminal command input"
            autoFocus
            disabled={isLoading}
          />
        </div>
        <div ref={terminalEndRef} />
      </div>
    </div>
  )
}
