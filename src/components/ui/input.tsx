'use client'

import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { cn } from '@/lib/utils'

/**
 * Componente de Input premium con efectos de focus
 */
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'glass' | 'underlined'
  icon?: React.ReactNode
  error?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant = 'default', icon, error, ...props }, ref) => {
    const variants = {
      default: 'bg-background border-input',
      glass: 'bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-white/20',
      underlined: 'bg-transparent border-b-2 border-t-0 border-x-0 rounded-none',
    }

    return (
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {icon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            'flex h-11 w-full rounded-xl border bg-background px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300',
            variants[variant],
            icon && 'pl-10',
            error && 'border-destructive focus-visible:ring-destructive',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="text-xs text-destructive mt-1 ml-1">{error}</p>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

/**
 * Área de texto premium
 */
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: 'default' | 'glass'
  error?: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant = 'default', error, ...props }, ref) => {
    const variants = {
      default: 'bg-background border-input',
      glass: 'bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-white/20',
    }

    return (
      <div className="relative">
        <textarea
          className={cn(
            'flex min-h-[80px] w-full rounded-xl border bg-background px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 resize-none',
            variants[variant],
            error && 'border-destructive focus-visible:ring-destructive',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="text-xs text-destructive mt-1 ml-1">{error}</p>
        )}
      </div>
    )
  }
)
Textarea.displayName = 'Textarea'

/**
 * Etiqueta con soporte para Radix UI
 */
const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block',
      className
    )}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

/**
 * Campo de formulario con Label y Input integrados
 */
interface FormFieldProps {
  label: string
  placeholder?: string
  type?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  icon?: React.ReactNode
  required?: boolean
  className?: string
}

const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, placeholder, type = 'text', value, onChange, error, icon, required, className }, ref) => {
    return (
      <div className={cn('space-y-2', className)}>
        <Label>
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
        <Input
          ref={ref}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          variant="glass"
          icon={icon}
          error={error}
        />
      </div>
    )
  }
)
FormField.displayName = 'FormField'

/**
 * Campo de búsqueda con botón integrado
 */
interface SearchInputProps extends Omit<InputProps, 'variant'> {
  onSearch?: () => void
  onClear?: () => void
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, onSearch, onClear, value, ...props }, ref) => {
    return (
      <div className="relative flex items-center">
        <Input
          ref={ref}
          className={cn('pr-20', className)}
          variant="glass"
          icon={<SearchIcon className="w-4 h-4" />}
          value={value}
          {...props}
        />
        <div className="absolute right-2 flex items-center gap-1">
          {value && (
            <button
              type="button"
              onClick={onClear}
              className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors"
            >
              <XIcon className="w-3 h-3 text-muted-foreground" />
            </button>
          )}
          {onSearch && (
            <button
              type="button"
              onClick={onSearch}
              className="p-1.5 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              <SearchIcon className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    )
  }
)
SearchInput.displayName = 'SearchInput'

// Iconos SVG
const SearchIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
)

const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
)

export { Input, Textarea, Label, FormField, SearchInput }
