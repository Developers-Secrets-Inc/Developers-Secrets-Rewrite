'use client'

import { useIDEStore } from '../store/use-ide-store'
import React, { useEffect, useState } from 'react'

export const OutputContent = () => {
  const { compilationResult } = useIDEStore()
  const [command, setCommand] = useState('')
  const [commands, setCommands] = useState<string[]>([''])

  const resultText = compilationResult
    ? compilationResult.success
      ? compilationResult.result
      : compilationResult.error
    : ''

  // Sync the input with the latest compilation result, but let the user edit freely
  useEffect(() => {
    setCommand(resultText)
  }, [resultText])

  // Keep an array of commands, each newline becomes one command (including empty ones)
  useEffect(() => {
    setCommands(command.split(/\r?\n/))
  }, [command])

  return (
    <div className="flex flex-col rounded-b-md" style={{ height: 'calc(100% - 24px)' }}>
      <div className="border-t border-border p-2 rounded-b-md">
        <div className="flex items-start gap-2">
          <div className="text-muted-foreground font-mono text-sm select-none text-right pt-1">
            {(commands.length ? commands : ['']).map((_, idx) => (
              <div key={idx}>$</div>
            ))}
          </div>
          <textarea
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            placeholder="Output loaded here. Edit freely (no commands yet)."
            className="bg-transparent outline-none w-full font-mono text-sm resize-none"
            rows={Math.min(10, Math.max(1, command.split('\n').length))}
            aria-label="Terminal input"
          />
        </div>
      </div>
    </div>
  )
}
