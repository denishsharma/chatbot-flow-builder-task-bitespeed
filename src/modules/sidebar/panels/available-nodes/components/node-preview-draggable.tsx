import type { DragEvent, ReactNode } from 'react'

import type { useInsertNode } from '~/modules/flow-builder/hooks/use-insert-node'
import type { BuilderNodeType } from '~/modules/nodes/types'
import type { ApplicationState } from '~/stores/application-state'
import { useCallback } from 'react'

import { cn } from '~@/utils/cn'

import { NODE_TYPE_DRAG_DATA_FORMAT } from '~/constants/symbols'

type NodePreviewDraggableProps = Readonly<{
  icon: string | ReactNode;
  title: string;
  description: string;
  type: string;
  children?: never;
  isMobileView: boolean;
  setActivePanel: (panel: ApplicationState['sidebar']['active']) => void;
  insertNode: ReturnType<typeof useInsertNode>;
}>

export function NodePreviewDraggable({ icon, title, description, type, isMobileView, setActivePanel, insertNode }: NodePreviewDraggableProps) {
  const onDragStart = useCallback((e: DragEvent, type: string) => {
    if (isMobileView) { return }

    e.dataTransfer.setData(NODE_TYPE_DRAG_DATA_FORMAT, type)
    e.dataTransfer.effectAllowed = 'move'
  }, [isMobileView])

  const onClick = useCallback(() => {
    if (!isMobileView) { return }

    insertNode(type as BuilderNodeType)
    setActivePanel('none')
  }, [
    insertNode,
    isMobileView,
    setActivePanel,
    type,
  ])

  return (
    <div
      className={cn(
        'flex cursor-grab select-none gap-2 border border-dark-300 rounded-xl bg-dark-400 p-2.5 shadow-sm transition hover:(ring-2 ring-teal-600/50)',
        isMobileView && 'active:(op-70 scale-98)',
      )}
      onClick={onClick}
      onDragStart={e => onDragStart(e, type)}
      draggable
      data-vaul-no-drag
    >
      <div className="shrink-0">
        <div className="size-10 flex items-center justify-center border border-dark-200 rounded-xl bg-dark-300">
          {typeof icon === 'string' ? <div className={cn(icon, 'size-6 text-white')} /> : icon}
        </div>
      </div>

      <div className="ml-1 flex grow flex-col">
        <div className="mt-px text-sm font-medium leading-normal">
          {title}
        </div>

        <div className="line-clamp-3 mt-1 text-xs text-light-50/40 leading-normal">
          {description}
        </div>
      </div>
    </div>
  )
}
