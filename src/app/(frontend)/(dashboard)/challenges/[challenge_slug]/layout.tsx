import { ChallengeIDE } from '@/plugins/challenges/components/challenge-ide'
import {
  ChallengeRoot,
  ChallengeLeft,
  ChallengeSeparator,
  ChallengeRight,
} from '@/plugins/challenges/components/layout'
import { ChallengeViews } from '@/plugins/challenges/views/components/challenge-views'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs' // NEW
import { cn } from '@/lib/utils'

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ challenge_slug: string }>
}) {
  const { challenge_slug } = await params

  return (
    <>
      <ResponsiveMD className="flex-1 min-h-0 md:flex overflow-hidden">
        <ChallengeRoot>
          <ChallengeLeft>
            <ChallengeViews>{children}</ChallengeViews>
          </ChallengeLeft>
          <ChallengeSeparator />
          <ChallengeRight className="border-none">
            <div className="flex flex-col h-full min-h-0 rounded-md">
              <ChallengeIDE />
            </div>
          </ChallengeRight>
        </ChallengeRoot>
      </ResponsiveMD>

      <ResponsiveSM className="h-full">
        <div className="flex flex-col h-full">
          <Tabs className="flex-1 min-h-0 gap-0">
            <TabsContent value="challenge" className="flex-1 min-h-0 flex overflow-hidden">
              <div className="flex-1 min-h-0 w-full"></div>
            </TabsContent>

            <TabsContent value="exercice" className="flex-1 min-h-0 flex flex-col p-1">
              <div className="flex flex-col h-full min-h-0 rounded-md">
                <ChallengeIDE />
              </div>
            </TabsContent>

            <div className="p-1 border-t border-border">
              <TabsList className="w-full">
                <TabsTrigger value="challenge">Challenge</TabsTrigger>
                <TabsTrigger value="exercice">Exercice</TabsTrigger>
              </TabsList>
            </div>
          </Tabs>
        </div>
      </ResponsiveSM>
    </>
  )
}

const ResponsiveRoot = ({ children, ...props }: React.ComponentProps<'div'>) => {
  return <div {...props}>{children}</div>
}

const ResponsiveMD = ({ children, className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div className={cn('hidden md:block', className)} {...props}>
      {children}
    </div>
  )
}

const ResponsiveSM = ({ children, className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div className={cn('md:hidden', className)} {...props}>
      {children}
    </div>
  )
}
