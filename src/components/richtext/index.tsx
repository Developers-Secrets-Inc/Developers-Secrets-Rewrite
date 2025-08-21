import { RichText as RichTextConverter } from '@payloadcms/richtext-lexical/react'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { createJsxConverter, type RichTextOverrides } from '@/components/richtext/converters'
import { useMemo } from 'react'

type Props = {
  data: SerializedEditorState
  overrides?: RichTextOverrides
} & React.HTMLAttributes<HTMLDivElement>

export function RichText({ data, className, overrides, ...rest }: Props) {
  const converters = useMemo(() => createJsxConverter(overrides), [overrides])
  return (
    <div className={className}>
      <RichTextConverter {...rest} data={data} converters={converters} />
    </div>
  )
}
