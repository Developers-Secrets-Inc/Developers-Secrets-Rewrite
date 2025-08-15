import { AppHeader } from '@/components/headers/app-header'
import { TwoColumnsLayout } from '@/components/layouts/two-columns'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid h-dvh grid-rows-[auto_1fr]">
      <AppHeader />
      <main className="flex min-h-0 min-w-0 flex-col overflow-auto">
        <TwoColumnsLayout.Root className="h-full w-full">
          <TwoColumnsLayout.Left>{children}</TwoColumnsLayout.Left>
          <TwoColumnsLayout.Separator />
          <TwoColumnsLayout.Right>{''}</TwoColumnsLayout.Right>
        </TwoColumnsLayout.Root>
      </main>
    </div>
  )
}
