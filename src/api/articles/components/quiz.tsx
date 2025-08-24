'use client'

import * as React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

export type QuizProps = {
  question: string
  answers: string[]
  correctAnswerIndex?: number
  title?: string
  className?: string
} & React.HTMLAttributes<HTMLDivElement>

export function Quiz({
  question,
  answers,
  correctAnswerIndex = -1,
  title,
  className,
  ...rest
}: QuizProps) {
  const [selected, setSelected] = React.useState<number | null>(null)
  const [checked, setChecked] = React.useState(false)

  const hasValidCorrect = correctAnswerIndex >= 0 && correctAnswerIndex < answers.length
  const canCheck = selected !== null && hasValidCorrect

  const onCheck = () => setChecked(true)
  const onSelectOption = (idx: number) => {
    setSelected(idx)
    if (checked) setChecked(false)
  }

  return (
    <Card className={cn('relative', className)} {...rest}>
      <QuizHeader show={!!title} question={question} />
      <CardContent className="space-y-3">
        <AnswersBlock
          answers={answers}
          selected={selected}
          checked={checked}
          correctAnswerIndex={correctAnswerIndex}
          onSelect={onSelectOption}
        />
      </CardContent>

      <QuizFooter
        checked={checked}
        hasValidCorrect={hasValidCorrect}
        selected={selected}
        correctAnswerIndex={correctAnswerIndex}
        onCheck={onCheck}
        canCheck={canCheck}
      />
    </Card>
  )
}

// Subcomponents
type QuizHeaderProps = { show: boolean; question: string }
function QuizHeader({ show, question }: QuizHeaderProps) {
  if (!show) return null
  return (
    <CardHeader className="pb-0">
      <CardTitle className="text-center">{question}</CardTitle>
    </CardHeader>
  )
}

type AnswersBlockProps = {
  answers: string[]
  selected: number | null
  checked: boolean
  correctAnswerIndex: number
  onSelect: (idx: number) => void
}
function AnswersBlock({
  answers,
  selected,
  checked,
  correctAnswerIndex,
  onSelect,
}: AnswersBlockProps) {
  return (
    <Card className="p-0">
      <CardContent className="p-0">
        <ul role="listbox" aria-label="Quiz answers" className="flex flex-col">
          {answers.map((answer, idx) => (
            <AnswerRow
              key={idx}
              answer={answer}
              idx={idx}
              answersCount={answers.length}
              selected={selected}
              checked={checked}
              correctAnswerIndex={correctAnswerIndex}
              onSelect={onSelect}
            />
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

type AnswerRowProps = {
  answer: string
  idx: number
  answersCount: number
  selected: number | null
  checked: boolean
  correctAnswerIndex: number
  onSelect: (idx: number) => void
}
function AnswerRow({
  answer,
  idx,
  answersCount,
  selected,
  checked,
  correctAnswerIndex,
  onSelect,
}: AnswerRowProps) {
  const isSelected = selected === idx
  const isCorrect = checked && isSelected && idx === correctAnswerIndex
  const isIncorrectSelection = checked && isSelected && !isCorrect
  const previousIncorrect =
    checked && selected === idx - 1 && selected !== null && selected !== correctAnswerIndex
  const previousSelected = selected === idx - 1

  const base =
    'w-full text-left border p-4 text-muted-foreground transition-colors outline-none flex items-center gap-3'
  const hoverable = 'hover:bg-accent hover:text-accent-foreground'
  const focusable = 'focus-visible:ring-[3px] focus-visible:ring-ring/50'
  const selectable = checked ? focusable : cn(hoverable, focusable)
  const selectedCls = isSelected
    ? isIncorrectSelection
      ? 'border-primary relative z-10'
      : 'border-primary ring-1 ring-primary/30 relative z-10'
    : ''
  const correctCls = isCorrect ? 'border-primary/20 bg-primary/10 text-primary' : ''
  const incorrectCls = isIncorrectSelection
    ? 'relative z-10 border-red-500/20 bg-red-500/10 text-red-500'
    : ''
  const roundedCls = cn(
    idx === 0 ? 'rounded-t-md' : '',
    idx === answersCount - 1 ? 'rounded-b-md' : '',
    idx !== 0 && idx !== answersCount - 1 ? 'rounded-none' : '',
  )
  const stackMergeCls = idx !== 0 && !isIncorrectSelection && !previousIncorrect ? '-mt-px' : ''
  const adjacentFixCls = previousSelected ? 'border-t-transparent' : ''
  const label = String.fromCharCode(65 + idx)
  const labelBase =
    'inline-flex h-6 w-6 items-center justify-center rounded-full border text-xs font-medium shrink-0'
  const labelStateCls = isCorrect
    ? 'border-primary/20 bg-primary/10 text-primary'
    : isIncorrectSelection
      ? 'border-red-500/20 bg-red-500/10 text-red-500'
      : isSelected
        ? 'border-primary/20 bg-primary/5 text-primary'
        : 'bg-muted text-muted-foreground'

  return (
    <li role="option" aria-selected={isSelected} className="list-none">
      <button
        type="button"
        onClick={() => onSelect(idx)}
        className={cn(
          base,
          roundedCls,
          stackMergeCls,
          adjacentFixCls,
          selectable,
          selectedCls,
          correctCls,
          incorrectCls,
        )}
      >
        <span aria-hidden className={cn(labelBase, labelStateCls)}>
          {label}
        </span>
        <span className="leading-5">{answer}</span>
      </button>
    </li>
  )
}

type QuizFooterProps = {
  checked: boolean
  hasValidCorrect: boolean
  selected: number | null
  correctAnswerIndex: number
  onCheck: () => void
  canCheck: boolean
}
function QuizFooter({
  checked,
  hasValidCorrect,
  selected,
  correctAnswerIndex,
  onCheck,
  canCheck,
}: QuizFooterProps) {
  return (
    <CardFooter className="items-center">
      {checked && hasValidCorrect ? (
        <Badge
          className={cn(
            'text-sm gap-1.5',
            selected === correctAnswerIndex
              ? 'text-primary bg-primary/10 border-primary/20'
              : 'text-red-500 bg-red-500/10 border-red-500/20',
          )}
        >
          <span className={cn("size-1.5 rounded-full", selected === correctAnswerIndex ? 'bg-primary' : 'bg-red-500')} aria-hidden="true"></span>
          {selected === correctAnswerIndex ? 'Correct!' : 'Try again.'}
        </Badge>
      ) : null}
      <Button
        className="ml-auto"
        type="button"
        onClick={onCheck}
        disabled={!canCheck}
        title={!hasValidCorrect ? 'No correct answer configured' : undefined}
      >
        Check answer
      </Button>
    </CardFooter>
  )
}

export default Quiz
