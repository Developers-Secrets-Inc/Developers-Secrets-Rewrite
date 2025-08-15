'use client'

import React from 'react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { AtSignIcon, Lock } from 'lucide-react'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { useFormContext, type Control } from 'react-hook-form'

interface EmailInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name'> {
  control?: Control<any>
}

export function EmailInput({ control: controlProp }: EmailInputProps) {
  const formCtx = useFormContext<any>()
  const control = controlProp ?? formCtx?.control

  return (
    <FormField
      control={control}
      name={'email'}
      render={({ field, fieldState }) => (
        <FormItem className={cn('grid gap-3')}>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <div className="relative">
              <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                <AtSignIcon size={16} aria-hidden="true" />
              </div>
              <Input
                type="email"
                placeholder="Email"
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
