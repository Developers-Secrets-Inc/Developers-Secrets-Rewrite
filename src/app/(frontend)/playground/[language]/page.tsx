import { Language } from '@/core/compiler/types'
import { PlaygroundIDE } from './components/playground-ide'

export default async function Page({ params }: { params: Promise<{ language: string }> }) {
  const { language } = await params

  return <PlaygroundIDE language={language as Language} />
}
