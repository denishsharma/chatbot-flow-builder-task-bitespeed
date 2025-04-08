import type { Node, NodeProps } from '@xyflow/react'
import type { BaseNodeData, RegisterNodeMetadata } from '~/modules/nodes/types'
import { Position } from '@xyflow/react'
import { nanoid } from 'nanoid'

import { memo, useMemo, useState } from 'react'
import { cn } from '~@/utils/cn'
import CustomHandle from '~/modules/flow-builder/components/handles/custom-handle'
import { BuilderNode } from '~/modules/nodes/types'

import { getNodeDetail } from '~/modules/nodes/utils'

export interface StartNodeData extends BaseNodeData {
  label?: string;
}

const NODE_TYPE = BuilderNode.START

type StartNodeProps = NodeProps<Node<StartNodeData, typeof NODE_TYPE>>

export function StartNode({ data, selected, isConnectable }: StartNodeProps) {
  const meta = useMemo(() => getNodeDetail(NODE_TYPE), [])

  const [sourceHandleId] = useState<string>(nanoid())

  return (
    <>
      <div
        data-selected={selected}
        className="flex items-center border border-dark-100 rounded-full bg-dark-300 px-4 py-2 shadow-sm transition data-[selected=true]:(border-teal-600 ring-1 ring-teal-600/50)"
      >
        <div className={cn(meta.icon, 'size-4.5 shrink-0 mr-2 scale-130')} />

        <span className="mr-1">
          {data.label || meta.title}
        </span>
      </div>

      <CustomHandle
        type="source"
        id={sourceHandleId}
        position={Position.Right}
        isConnectable={isConnectable}
      />
    </>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: RegisterNodeMetadata<StartNodeData> = {
  type: NODE_TYPE,
  node: memo(StartNode),
  detail: {
    icon: 'i-mynaui:play',
    title: 'Start',
    description: 'Start the chatbot flow',
  },
  connection: {
    inputs: 0,
    outputs: 1,
  },
  available: false,
  defaultData: {
    label: 'Start',
    deletable: false,
  },
}
