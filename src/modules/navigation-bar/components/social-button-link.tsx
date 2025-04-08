import type { ComponentPropsWithoutRef } from 'react'

import { cn } from '~@/utils/cn'

export function SocialButtonLink({ className, children, ...props }: ComponentPropsWithoutRef<'a'>) {
  return (
    <a
      target="_blank"
      className={cn('size-9 cursor-pointer flex items-center justify-center gap-x-2 border border-transparent rounded-lg bg-transparent text-sm transition active:(border-dark-300 bg-dark-400) hover:(bg-dark-200)', className)}
      {...props}
    >
      {children}
    </a>
  )
}
