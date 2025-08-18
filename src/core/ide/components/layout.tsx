import { cn } from '@/lib/utils'

export const IDERoot = ({ children, className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div className={cn('h-full flex flex-col min-h-0', className)} {...props}>
      {children}
    </div>
  )
}

export const IDEEditorRoot = ({ children, className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div className={cn('flex-1 h-full min-h-0 overflow-hidden relative', className)} {...props}>
      {children}
    </div>
  )
}

export const IDEHeaderRoot = ({ children, className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div
      className={cn(
        'flex-shrink-0 border-b h-12 flex items-center justify-between bg-muted/20 pr-2',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
export const IDEHeaderLeftPart = ({
  children,
  className,
  ...props
}: React.ComponentProps<'div'>) => {
  return (
    <div className={cn('flex items-center', className)} {...props}>
      {children}
    </div>
  )
}
export const IDEHeaderRightPart = ({
  children,
  className,
  ...props
}: React.ComponentProps<'div'>) => {
  return (
    <div className={cn('flex items-center gap-2', className)} {...props}>
      {children}
    </div>
  )
}
