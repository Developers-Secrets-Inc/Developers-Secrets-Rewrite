import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type TwoColumnsLayoutProps = {
  children: ReactNode
  className?: string
}

export const TwoColumnsLayoutRoot = ({ children, className }: TwoColumnsLayoutProps) => {
  return (
    <div className={cn("flex flex-1 min-h-0 w-full items-stretch flex-col md:flex-row gap-8", className)}>
      {children}
    </div>
  )
}

export const TwoColumnsLayoutLeft = ({ children, className }: TwoColumnsLayoutProps) => {
  return <div className={cn("w-full min-w-0 md:w-1/2", className)}>{children}</div>
}

export const TwoColumnsLayoutRight = ({ children, className }: TwoColumnsLayoutProps) => {
  return <div className={cn("w-full min-w-0 md:w-1/2", className)}>{children}</div>
}

export const TwoColumnsLayoutSeparator = () => {
  return (
    <div
      className="bg-border h-px w-full shrink-0 md:h-auto md:w-px md:self-stretch"
      aria-hidden="true"
      role="separator"
    ></div>
  )
}

export const TwoColumnsLayout = {
  Root: TwoColumnsLayoutRoot,
  Left: TwoColumnsLayoutLeft,
  Right: TwoColumnsLayoutRight,
  Separator: TwoColumnsLayoutSeparator,
}
