import type { ComponentPropsWithoutRef } from 'react'

import { cn } from '~@/utils/cn'

type SidebarButtonItemProps = Readonly<ComponentPropsWithoutRef<'button'> & {
  active?: boolean;
}>

export default function SidebarButtonItem({ children, className, active, ...props }: SidebarButtonItemProps) {
  return (
    <button type="button" className={cn('size-8 flex items-center justify-center rounded-lg border border-transparent outline-none transition', [active ? 'border-teal-700 bg-teal-700' : 'bg-transparent hover:(bg-dark-200) active:(bg-dark-500 border-dark-300)'], className)} {...props}>
      {children}
    </button>
  )
}
