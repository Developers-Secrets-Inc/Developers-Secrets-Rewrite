'use client'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { UserIcon } from 'lucide-react'
import type React from 'react'
import { useFormContext, type Control } from 'react-hook-form'

interface UsernameInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name'> {
  control?: Control<any>
}

export function UsernameInput({ control: controlProp }: UsernameInputProps) {
  const formCtx = useFormContext<any>()
  const control = controlProp ?? formCtx?.control

  return (
    <FormField
      control={control}
      name={'username'}
      render={({ field, fieldState }) => (
        <FormItem className={cn('grid gap-3')}>
          <FormLabel>Username</FormLabel>
          <FormControl>
            <div className="relative">
              <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                <UserIcon size={16} aria-hidden="true" />
              </div>
              <Input
                type="text"
                placeholder="Username"
                className={cn(
                  'pr-10 ps-9',
                  fieldState.invalid && 'border-destructive focus-visible:ring-destructive/50',
                )}
                {...field}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
