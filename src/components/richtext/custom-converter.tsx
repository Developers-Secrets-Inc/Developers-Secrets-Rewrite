import { JSXConverters } from '@payloadcms/richtext-lexical/react'
import { SerializedHeadingNode } from '@payloadcms/richtext-lexical'
import Quiz from '@/api/articles/components/quiz'

type QuizAnswer = { text?: string }
type QuizFields = {
  question?: string
  answers?: QuizAnswer[]
  correctAnswerIndex?: number
}

export const customConverter: JSXConverters<SerializedHeadingNode> = {
  blocks: {
    Quiz: ({ node }) => {
      const fields: QuizFields = ((node as any)?.fields ?? {}) as QuizFields
      const question = fields.question ?? 'Quiz'
      const answers = Array.isArray(fields.answers)
        ? fields.answers.map((a) => a?.text ?? '').filter((t) => t && t.length > 0)
        : []
      const correctIndex =
        typeof fields.correctAnswerIndex === 'number' ? fields.correctAnswerIndex : -1

      return (
        <Quiz
          title="Quiz"
          question={question}
          answers={answers}
          correctAnswerIndex={correctIndex}
          className="my-4"
        />
      )
    },
  },
}