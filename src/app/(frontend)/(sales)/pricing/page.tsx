import { Briefcase, Building, Rocket, Check, X, Info } from 'lucide-react'
import { PlanCard } from './components/plan-card'
import { Badge } from '@/components/ui/badge'

const cardInfo = [
    {
        icon: Rocket,
        title: 'Basic plan',
        price: 19,
        yearlyNote: 'or $199 yearly',
        features: [
            'Basic task management tools',
            'Calendar sync with limited integrations',
            'Access to 1 dashboard for tracking tasks',
            'Limited AI suggestions and insights',
            'Basic support and community access',
        ],
        ctaVariant: 'secondary',
    },
    {
        icon: Briefcase,
        title: 'Business plan',
        price: 29,
        yearlyNote: 'or $299 yearly',
        features: [
            'All Free Plan features, plus:',
            'Unlimited task lists',
            'Advanced calendar sync',
            'AI-driven insights',
            'Access to custom dashboards',
            'Priority email support',
        ],
        ctaVariant: 'primary',
    },
    {
        icon: Building,
        title: 'Enterprise plan',
        price: 49,
        yearlyNote: 'or $499 yearly',
        features: [
            'All Pro Plan features, plus:',
            'Dedicated account manager',
            'Custom integrations',
            'Real-time collaboration',
            'Role-based permissions',
            '24/7 priority support',
        ],
        ctaVariant: 'secondary',
    },
]


export default function Page() {
  return (
    <section className="py-32">
      {/* <div className="border-y">
        <div className="mx-auto w-full max-w-7xl flex flex-col gap-6 border-x py-4 px-4 sm:px-6 lg:px-8 max-lg:border-x lg:py-8">
          <span
            data-slot="badge"
            className="inline-flex items-center justify-center rounded-md border py-0.5 whitespace-nowrap shrink-0 [&>svg]:size-3 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground w-fit gap-1 bg-card px-3 text-sm font-normal tracking-tight shadow-sm"
          >
            <span className="sr-only">Pricing badge</span>
            <span>Spenders Lounge</span>
          </span>
          <h2 className="text-3xl leading-tight tracking-tight md:text-4xl lg:text-6xl">
            Pricing for everyone
          </h2>
          <p className="max-w-[600px] tracking-[-0.32px] text-muted-foreground">
            Choose the Plan that Fits Your Productivity Need
          </p>
        </div>
      </div> */}

      <div className="mx-auto w-full max-w-7xl mt-10 lg:mt-14 px-4 sm:px-6 lg:px-8">
        <section className="grid border max-lg:divide-y lg:grid-cols-3 lg:divide-x">
          {cardInfo.map((card) => (
            <PlanCard
              key={card.title}
              Icon={card.icon}
              title={card.title}
              price={card.price}
              yearlyNote={card.yearlyNote}
              features={card.features}
              ctaVariant={card.ctaVariant}
            />
          ))}
        </section>
      </div>

      <div className="mt-12 h-8 w-full border-y md:h-12 lg:h-[112px]">
        <div className="mx-auto h-full w-full max-w-7xl border-x px-4 sm:px-6 lg:px-8"></div>
      </div>

      {/* Pricing comparison table */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-8 lg:space-y-14">
          <div>
            <h3 className="mb-6 text-lg font-medium lg:mb-3">Learn</h3>
            <div className="space-y-4 lg:space-y-0">
              {/* Row: Courses */}
              <dl className="hidden lg:grid grid-cols-5 gap-6 border-b border-border">
                <dt className="col-span-2 justify-between py-4 pb-4">
                  <h4 className="group flex min-h-6 items-center gap-x-1 font-medium">Courses</h4>
                </dt>
                <dd className="hidden py-4 text-sm text-muted-foreground lg:block"><Check className="size-4 lg:size-5" aria-hidden="true" /></dd>
                <dd className="hidden py-4 text-sm text-muted-foreground lg:block"><Check className="size-4 lg:size-5" aria-hidden="true" /></dd>
                <dd className="hidden py-4 text-sm text-muted-foreground lg:block"><Check className="size-4 lg:size-5" aria-hidden="true" /></dd>
              </dl>

              {/* Row: AI Courses */}
              <dl className="hidden lg:grid grid-cols-5 gap-6 border-b border-border">
                <dt className="col-span-2 justify-between py-4 pb-4">
                  <h4 className="group flex min-h-6 items-center gap-x-1 font-medium">AI Courses</h4>
                </dt>
                <dd className="hidden py-4 text-sm text-muted-foreground lg:block"><Check className="size-4 lg:size-5" aria-hidden="true" /></dd>
                <dd className="hidden py-4 text-sm text-muted-foreground lg:block"><Check className="size-4 lg:size-5" aria-hidden="true" /></dd>
                <dd className="hidden py-4 text-sm text-muted-foreground lg:block"><Check className="size-4 lg:size-5" aria-hidden="true" /></dd>
              </dl>

              {/* Row: Learning paths */}
              <dl className="hidden lg:grid grid-cols-5 gap-6 border-b border-border">
                <dt className="col-span-2 justify-between py-4 pb-4">
                  <h4 className="group flex min-h-6 items-center gap-x-1 font-medium">Learning paths</h4>
                </dt>
                <dd className="hidden py-4 text-sm text-muted-foreground lg:block"><Check className="size-4 lg:size-5" aria-hidden="true" /></dd>
                <dd className="hidden py-4 text-sm text-muted-foreground lg:block"><Check className="size-4 lg:size-5" aria-hidden="true" /></dd>
                <dd className="hidden py-4 text-sm text-muted-foreground lg:block"><Check className="size-4 lg:size-5" aria-hidden="true" /></dd>
              </dl>

              {/* Row: Pearl */}
              <dl className="hidden lg:grid grid-cols-5 gap-6 border-b border-border">
                <dt className="col-span-2 justify-between py-4 pb-4">
                  <h4 className="group flex min-h-6 items-center gap-x-1 font-medium">Pearl</h4>
                </dt>
                <dd className="hidden py-4 text-sm text-muted-foreground lg:block"><Check className="size-4 lg:size-5" aria-hidden="true" /></dd>
                <dd className="hidden py-4 text-sm text-muted-foreground lg:block"><Check className="size-4 lg:size-5" aria-hidden="true" /></dd>
                <dd className="hidden py-4 text-sm text-muted-foreground lg:block"><Check className="size-4 lg:size-5" aria-hidden="true" /></dd>
              </dl>

              {/* Row: Mobile app */}
              <dl className="hidden lg:grid grid-cols-5 gap-6 border-b border-border">
                <dt className="col-span-2 justify-between py-4 pb-4">
                  <h4 className="group flex min-h-6 items-center gap-x-1 font-medium">Mobile app</h4>
                </dt>
                <dd className="hidden py-4 text-sm text-muted-foreground lg:block"><Check className="size-4 lg:size-5" aria-hidden="true" /></dd>
                <dd className="hidden py-4 text-sm text-muted-foreground lg:block"><Check className="size-4 lg:size-5" aria-hidden="true" /></dd>
                <dd className="hidden py-4 text-sm text-muted-foreground lg:block"><Check className="size-4 lg:size-5" aria-hidden="true" /></dd>
              </dl>
            </div>
          </div>

          <div>
            <h3 className="mb-6 text-lg font-medium lg:mb-3">Practice</h3>
            <div className="space-y-4 lg:space-y-0">
              {/* Row: Challenges */}
              <dl className="hidden lg:grid grid-cols-5 gap-6 border-b border-border">
                <dt className="col-span-2 justify-between py-4 pb-4">
                  <h4 className="group flex min-h-6 items-center gap-x-1 font-medium">Challenges</h4>
                </dt>
                <dd className="hidden py-4 text-sm text-muted-foreground lg:block"><Check className="size-4 lg:size-5" aria-hidden="true" /></dd>
                <dd className="hidden py-4 text-sm text-muted-foreground lg:block"><Check className="size-4 lg:size-5" aria-hidden="true" /></dd>
                <dd className="hidden py-4 text-sm text-muted-foreground lg:block"><Check className="size-4 lg:size-5" aria-hidden="true" /></dd>
              </dl>

              {/* Row: AI Challenges */}
              <dl className="hidden lg:grid grid-cols-5 gap-6 border-b border-border">
                <dt className="col-span-2 justify-between py-4 pb-4">
                  <h4 className="group flex min-h-6 items-center gap-x-1 font-medium">AI Challenges</h4>
                </dt>
                <dd className="hidden py-4 text-sm text-muted-foreground lg:block"><Check className="size-4 lg:size-5" aria-hidden="true" /></dd>
                <dd className="hidden py-4 text-sm text-muted-foreground lg:block"><Check className="size-4 lg:size-5" aria-hidden="true" /></dd>
                <dd className="hidden py-4 text-sm text-muted-foreground lg:block"><Check className="size-4 lg:size-5" aria-hidden="true" /></dd>
              </dl>

              {/* Row: PRO Challenges */}
              <dl className="hidden lg:grid grid-cols-5 gap-6 border-b border-border">
                <dt className="col-span-2 justify-between py-4 pb-4">
                  <h4 className="group flex min-h-6 items-center gap-x-1 font-medium">PRO Challenges</h4>
                </dt>
                <dd className="hidden py-4 text-sm text-muted-foreground lg:block"><Check className="size-4 lg:size-5" aria-hidden="true" /></dd>
                <dd className="hidden py-4 text-sm text-muted-foreground lg:block"><Check className="size-4 lg:size-5" aria-hidden="true" /></dd>
                <dd className="hidden py-4 text-sm text-muted-foreground lg:block"><Check className="size-4 lg:size-5" aria-hidden="true" /></dd>
              </dl>

              {/* Row: SQL Challenges */}
              <dl className="hidden lg:grid grid-cols-5 gap-6 border-b border-border">
                <dt className="col-span-2 justify-between py-4 pb-4">
                  <h4 className="group flex min-h-6 items-center gap-x-1 font-medium">SQL Challenges</h4>
                </dt>
                <dd className="hidden py-4 text-sm text-muted-foreground lg:block"><Check className="size-4 lg:size-5" aria-hidden="true" /></dd>
                <dd className="hidden py-4 text-sm text-muted-foreground lg:block"><Check className="size-4 lg:size-5" aria-hidden="true" /></dd>
                <dd className="hidden py-4 text-sm text-muted-foreground lg:block"><Check className="size-4 lg:size-5" aria-hidden="true" /></dd>
              </dl>

              {/* Row: React Challenges */}
              <dl className="hidden lg:grid grid-cols-5 gap-6 border-b border-border">
                <dt className="col-span-2 justify-between py-4 pb-4">
                  <h4 className="group flex min-h-6 items-center gap-x-1 font-medium">React Challenges</h4>
                </dt>
                <dd className="hidden py-4 text-sm text-muted-foreground lg:block"><Check className="size-4 lg:size-5" aria-hidden="true" /></dd>
                <dd className="hidden py-4 text-sm text-muted-foreground lg:block"><Check className="size-4 lg:size-5" aria-hidden="true" /></dd>
                <dd className="hidden py-4 text-sm text-muted-foreground lg:block"><Check className="size-4 lg:size-5" aria-hidden="true" /></dd>
              </dl>

              {/* Row: Projects */}
              <dl className="hidden lg:grid grid-cols-5 gap-6 border-b border-border">
                <dt className="col-span-2 justify-between py-4 pb-4">
                  <h4 className="group flex min-h-6 items-center gap-x-1 font-medium">Projects</h4>
                </dt>
                <dd className="hidden py-4 text-sm text-muted-foreground lg:block"><Check className="size-4 lg:size-5" aria-hidden="true" /></dd>
                <dd className="hidden py-4 text-sm text-muted-foreground lg:block"><Check className="size-4 lg:size-5" aria-hidden="true" /></dd>
                <dd className="hidden py-4 text-sm text-muted-foreground lg:block"><Check className="size-4 lg:size-5" aria-hidden="true" /></dd>
              </dl>

              {/* Row: Quizzes */}
              <dl className="hidden lg:grid grid-cols-5 gap-6 border-b border-border">
                <dt className="col-span-2 justify-between py-4 pb-4">
                  <h4 className="group flex min-h-6 items-center gap-x-1 font-medium">Quizzes</h4>
                </dt>
                <dd className="hidden py-4 text-sm text-muted-foreground lg:block"><Check className="size-4 lg:size-5" aria-hidden="true" /></dd>
                <dd className="hidden py-4 text-sm text-muted-foreground lg:block"><Check className="size-4 lg:size-5" aria-hidden="true" /></dd>
                <dd className="hidden py-4 text-sm text-muted-foreground lg:block"><Check className="size-4 lg:size-5" aria-hidden="true" /></dd>
              </dl>
            </div>
          </div>
          {/* New sections: Improve learning, Improve your profile */}
          <div>
            <h3 className="mb-6 text-lg font-medium lg:mb-3">Improve learning</h3>
            <div className="space-y-4 lg:space-y-0">
              {/* Row: Skill tree */}
              <dl className="hidden lg:grid grid-cols-5 gap-6 border-b border-border">
                <dt className="col-span-2 justify-between py-4 pb-4">
                  <h4 className="group flex min-h-6 items-center gap-x-1 font-medium">Skill tree</h4>
                </dt>
                <dd className="hidden py-4 text-sm text-muted-foreground lg:block"><Check className="size-4 lg:size-5" aria-hidden="true" /></dd>
                <dd className="hidden py-4 text-sm text-muted-foreground lg:block"><Check className="size-4 lg:size-5" aria-hidden="true" /></dd>
                <dd className="hidden py-4 text-sm text-muted-foreground lg:block"><Check className="size-4 lg:size-5" aria-hidden="true" /></dd>
              </dl>

              {/* Row: Gamification */}
              <dl className="hidden lg:grid grid-cols-5 gap-6 border-b border-border">
                <dt className="col-span-2 justify-between py-4 pb-4">
                  <h4 className="group flex min-h-6 items-center gap-x-1 font-medium">Gamification</h4>
                </dt>
                <dd className="hidden py-4 text-sm text-muted-foreground lg:block"><Check className="size-4 lg:size-5" aria-hidden="true" /></dd>
                <dd className="hidden py-4 text-sm text-muted-foreground lg:block"><Check className="size-4 lg:size-5" aria-hidden="true" /></dd>
                <dd className="hidden py-4 text-sm text-muted-foreground lg:block"><Check className="size-4 lg:size-5" aria-hidden="true" /></dd>
              </dl>

              {/* Row: Advanced recommendation system */}
              <dl className="hidden lg:grid grid-cols-5 gap-6 border-b border-border">
                <dt className="col-span-2 justify-between py-4 pb-4">
                  <h4 className="group flex min-h-6 items-center gap-x-1 font-medium">Advanced recommendation system</h4>
                </dt>
                <dd className="hidden py-4 text-sm text-muted-foreground lg:block"><Check className="size-4 lg:size-5" aria-hidden="true" /></dd>
                <dd className="hidden py-4 text-sm text-muted-foreground lg:block"><Check className="size-4 lg:size-5" aria-hidden="true" /></dd>
                <dd className="hidden py-4 text-sm text-muted-foreground lg:block"><Check className="size-4 lg:size-5" aria-hidden="true" /></dd>
              </dl>
            </div>
          </div>

          <div>
            <h3 className="mb-6 text-lg font-medium lg:mb-3">Improve your profile</h3>
            <div className="space-y-4 lg:space-y-0">
              {/* Row: Completion certificates */}
              <dl className="hidden lg:grid grid-cols-5 gap-6 border-b border-border">
                <dt className="col-span-2 justify-between py-4 pb-4">
                  <h4 className="group flex min-h-6 items-center gap-x-1 font-medium">Completion certificates</h4>
                </dt>
                <dd className="hidden py-4 text-sm text-muted-foreground lg:block"><Badge>Coming soon</Badge></dd>
                <dd className="hidden py-4 text-sm text-muted-foreground lg:block"><Badge>Coming soon</Badge></dd>
                <dd className="hidden py-4 text-sm text-muted-foreground lg:block"><Badge>Coming soon</Badge></dd>
              </dl>

              {/* Row: Advanced profile system */}
              <dl className="hidden lg:grid grid-cols-5 gap-6 border-b border-border">
                <dt className="col-span-2 justify-between py-4 pb-4">
                  <h4 className="group flex min-h-6 items-center gap-x-1 font-medium">Advanced profile system</h4>
                </dt>
                <dd className="hidden py-4 text-sm text-muted-foreground lg:block"><Badge>Coming soon</Badge></dd>
                <dd className="hidden py-4 text-sm text-muted-foreground lg:block"><Badge>Coming soon</Badge></dd>
                <dd className="hidden py-4 text-sm text-muted-foreground lg:block"><Badge>Coming soon</Badge></dd>
              </dl>
            </div>
          </div>
        </div>

        <p className="mt-4 hidden text-xs text-muted-foreground md:block">* Caveats and other conditions</p>
      </div>
    </section>
  )
}
