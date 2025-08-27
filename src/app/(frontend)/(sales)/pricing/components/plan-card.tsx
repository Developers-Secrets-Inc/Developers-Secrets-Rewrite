import type { LucideIcon } from 'lucide-react'
import { BadgeCheck } from 'lucide-react'
import React from 'react'

export type PlanCardProps = {
  Icon: LucideIcon
  title: string
  price: number | string
  priceSuffix?: string
  yearlyNote?: string
  features: string[]
  ctaVariant?: 'primary' | 'secondary'
  ctaText?: string
}

export function PlanCard({
  Icon,
  title,
  price,
  priceSuffix = '/mo',
  yearlyNote,
  features,
  ctaVariant = 'secondary',
  ctaText = 'Get started',
}: PlanCardProps) {
  const buttonBase =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-9 px-4 py-2 has-[&>svg]:px-3 mt-12"
  const buttonVariant =
    ctaVariant === 'primary'
      ? 'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90'
      : 'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80'

  return (
    <div className="flex flex-col justify-between p-6">
      <div className="space-y-2 border-b pb-6">
        <div className="flex items-center gap-2.5 text-muted-foreground">
          <Icon className="size-4" aria-hidden="true" />
          <h3 className="text-xl tracking-[-0.8px]">{title}</h3>
        </div>
        <div className="flex items-baseline font-medium">
          <span className="text-[3.5rem] leading-[120%] tracking-[-3.92px]">${String(price)}</span>
          {priceSuffix ? (
            <span className="text-muted-foreground-subtle text-2xl tracking-[-0.96px]">{priceSuffix}</span>
          ) : null}
        </div>
        {yearlyNote ? <p className="text-muted-foreground">{yearlyNote}</p> : null}
      </div>

      <div className="pt-6">
        <h4 className="text-muted-foreground-subtle">Features Included</h4>
        <ul className="mt-4 space-y-4">
          {features.map((feature) => (
            <li className="flex items-center gap-4" key={feature}>
              <BadgeCheck className="size-6 text-muted-foreground" aria-hidden="true" />
              <span className="tracking-[-0.32px] text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <button data-slot="button" className={`${buttonBase} ${buttonVariant}`}>
        {ctaText}
      </button>
    </div>
  )
}
