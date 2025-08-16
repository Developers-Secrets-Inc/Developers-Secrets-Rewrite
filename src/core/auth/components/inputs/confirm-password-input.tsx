'use client'

import type React from 'react'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { Eye, EyeOff, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { useFormContext, type Control } from 'react-hook-form'

interface ConfirmPasswordInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name'> {
  control?: Control<any>
}

export function ConfirmPasswordInput({ control: controlProp }: ConfirmPasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)
  const formCtx = useFormContext<any>()
  const control = controlProp ?? formCtx?.control

  const togglePasswordVisibility = () => {
    setShowPassword((s) => !s)
  }

  return (
    <FormField
      control={control}
      name={'confirmPassword'}
      render={({ field, fieldState }) => (
        <FormItem className={cn('grid gap-3')}>
          <FormLabel>Confirm Password</FormLabel>
          <FormControl>
            <div className="relative">
              <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                <Lock size={16} aria-hidden="true" />
              </div>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
                className={cn(
                  'pr-10 ps-9',
                  fieldState.invalid && 'border-destructive focus-visible:ring-destructive/50',
                )}
                {...field}
              />
              <Button
                type="button"
                onClick={togglePasswordVisibility}
                onMouseDown={(e) => e.preventDefault()}
                variant="ghost"
                className="absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
