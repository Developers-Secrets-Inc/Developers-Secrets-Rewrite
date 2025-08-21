import { CodeBlock, CodeBlockCode } from '@/components/code-block'
import { OpenPlaygroundButton } from '../views/components/open-playground-button';

export const ArticleCodeBlock = ({ language, code }: { language: string; code: string }) => {
  return (
    <CodeBlock>
      <CodeBlockCode className="pl-2" language={language} code={code} />
      <OpenPlaygroundButton language={language} code={code} />
    </CodeBlock>
  )
}
