import { Cross } from '@/components/icons/cross'
import { TimelineStep } from './timeline-step'
import { getChangelogPage } from '../'

export const ChangelogTimeline = async () => {
  const changelog = await getChangelogPage()

  return (
    <div className="mx-auto relative flex max-w-5xl flex-col gap-4 lg:px-16 border border-border">
      <Cross className="absolute left-0 top-0 -translate-y-1/2 -translate-x-1/2 z-0" />

      {changelog.docs.map((s, i) => {
        const isFirst = i === 0
        const isLast = i === changelog.docs.length - 1
        return <TimelineStep key={s.title} index={i} post={s} isFirst={isFirst} isLast={isLast} />
      })}
    </div>
  )
}
