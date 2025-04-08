import type { Node, NodeProps } from '@xyflow/react'
import type { BaseNodeData, RegisterNodeMetadata } from '~/modules/nodes/types'
import { Position } from '@xyflow/react'
import { nanoid } from 'nanoid'

import { memo, useMemo, useState } from 'react'
import { cn } from '~@/utils/cn'
import CustomHandle from '~/modules/flow-builder/components/handles/custom-handle'
import { BuilderNode } from '~/modules/nodes/types'

import { getNodeDetail } from '~/modules/nodes/utils'

export interface EndNodeData extends BaseNodeData {
  label?: string;
}

const NODE_TYPE = BuilderNode.END

type EndNodeProps = NodeProps<Node<EndNodeData, typeof NODE_TYPE>>

export function EndNode({ data, selected, isConnectable }: EndNodeProps) {
  const meta = useMemo(() => getNodeDetail(NODE_TYPE), [])

  const [sourceHandleId] = useState<string>(nanoid())

  return (
    <>
      <div
        data-selected={selected}
        data-deletable={false}
        className="flex items-center border border-dark-100 rounded-full bg-dark-300 px-4 py-2 shadow-sm transition data-[selected=true]:(border-teal-600 ring-1 ring-teal-600/50)"
      >
        <div className={cn(meta.icon, 'size-4.5 shrink-0 mr-2 scale-130')} />

        <span className="mr-1">
          {data.label || meta.title}
        </span>
      </div>

      <CustomHandle
        type="target"
        id={sourceHandleId}
        position={Position.Left}
        isConnectable={isConnectable}
      />
    </>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: RegisterNodeMetadata<EndNodeData> = {
  type: NODE_TYPE,
  node: memo(EndNode),
  detail: {
    icon: 'i-mynaui:stop',
    title: 'End',
    description: 'End the chatbot flow',
  },
  connection: {
    inputs: 1,
    outputs: 0,
  },
  available: false,
  defaultData: {
    label: 'End',
    deletable: false,
  },
}
