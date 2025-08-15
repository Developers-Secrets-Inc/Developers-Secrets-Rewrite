import { AppHeader } from '@/components/headers/app-header'
import { TwoColumnsLayout } from '@/components/layouts/two-columns'
import { DotPattern } from '@/components/dot-pattern'
import { cn } from '@/lib/utils'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppHeader />
      <main className="flex min-h-0 min-w-0 flex-col overflow-auto">
        <TwoColumnsLayout.Root className="h-full w-full">
          <TwoColumnsLayout.Left>{children}</TwoColumnsLayout.Left>
          <TwoColumnsLayout.Separator />
          <TwoColumnsLayout.Right>
            <div className="relative flex size-full items-center justify-center overflow-hidden bg-background">
              <DotPattern
                width={20}
                height={20}
                cx={1}
                cy={1}
                cr={1}
                className={cn('[mask-image:linear-gradient(to_bottom_left,white,transparent)] ')}
              />
            </div>
          </TwoColumnsLayout.Right>
        </TwoColumnsLayout.Root>
      </main>
    </>
  )
}
