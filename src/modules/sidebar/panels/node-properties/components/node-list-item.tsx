import type { ComponentPropsWithoutRef } from 'react'

import { isEmpty } from 'radash'

import { cn } from '~@/utils/cn'

import { truncateMiddle } from '~/utils/string'

type NodeListItemProps = Readonly<ComponentPropsWithoutRef<'button'> & {
  icon: string;
  title: string;
  id?: string;
  selected?: boolean;
  pseudoSelected?: boolean;
}>

export function NodeListItem({ id, title, className, icon, selected, pseudoSelected, ...props }: NodeListItemProps) {
  return (
    <button
      type="button"
      className={cn(
        'h-8 select-none flex items-center justify-between gap-4 border border-transparent rounded-lg bg-transparent px-2.5 text-sm outline-none transition',
        selected ? 'border-teal-700 bg-teal-900' : 'active:(bg-dark-400 border-dark-200) hover:(bg-dark-200)',
        pseudoSelected && !selected && 'bg-dark-300/60',
        className,
      )}
      {...props}
    >
      <div className="flex items-center">
        <div className={cn(icon, 'size-4.5')} />
        <div className="ml-2.5 flex items-center text-xs font-medium leading-none tracking-wide uppercase op-80">
          <span className="translate-y-px">
            {title}
          </span>
        </div>
      </div>

      {(id && !isEmpty(id)) && (
        <div className="rounded-md bg-dark-100 px-2 py-1.5 text-2.5 text-gray-200/80 font-semibold leading-none tracking-wide">
          {truncateMiddle(id, 12)}
        </div>
      )}
    </button>
  )
}
