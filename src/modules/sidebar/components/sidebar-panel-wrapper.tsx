import type { ComponentPropsWithoutRef } from 'react'

import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'

import { cn } from '~@/utils/cn'

import { defaultOverlayScrollbarsOptions } from '~/utils/overlayscrollbars.ts'

type SidebarPanelWrapperProps = Readonly<ComponentPropsWithoutRef<'div'>>

export default function SidebarPanelWrapper({ children, className, ...props }: SidebarPanelWrapperProps) {
  return (
    <div className={cn('flex flex-col h-full', className)} {...props}>
      <OverlayScrollbarsComponent className="grow" defer options={defaultOverlayScrollbarsOptions}>
        {children}
      </OverlayScrollbarsComponent>
    </div>
  )
}
