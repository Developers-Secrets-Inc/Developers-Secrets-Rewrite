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
  const [currentCommandInput, setCurrentCommandInput] = useState('')
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

  const handleCommandSubmit = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentCommandInput.trim()) {
      const command = currentCommandInput.trim()
      const [cmd, ...args] = command.split(' ')

      setTerminalHistory((prev) => [...prev, { type: 'command', command }])
      setCurrentCommandInput('')

      switch (cmd) {
        case 'clear':
          setTerminalHistory([])
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
            onKeyDown={handleCommandSubmit}
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
