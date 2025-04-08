import type { ComponentPropsWithoutRef } from 'react'

import { cn } from '~@/utils/cn'

type CustomControlButtonProps = Readonly<ComponentPropsWithoutRef<'button'>>

export default function CustomControlButton({ children, className, ...props }: CustomControlButtonProps) {
  return (
    <button type="button" className={cn('border-none flex disabled:(pointer-events-none op-30 cursor-not-allowed) items-center justify-center bg-transparent size-7 text-light-50 rounded-md transition active:(bg-dark-200) hover:(bg-dark-300)', className)} {...props}>
      {children}
    </button>
  )
}
