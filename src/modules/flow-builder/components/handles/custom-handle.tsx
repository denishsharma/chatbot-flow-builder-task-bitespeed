import type { Edge, HandleProps, InternalNode, Node } from '@xyflow/react'
import { getConnectedEdges, Handle, useNodeId, useStore } from '@xyflow/react'
import { useMemo } from 'react'

import { cn } from '~@/utils/cn'

type CustomHandleProps = Readonly<Omit<HandleProps, 'isConnectable'> & { isConnectable: boolean | number | undefined | ((value: { node: InternalNode<Node>; connectedEdges: Edge[] }) => boolean) }>

export default function CustomHandle({ className, isConnectable, ...props }: CustomHandleProps) {
  const { nodeLookup, edges } = useStore(({ nodeLookup, edges }) => ({ nodeLookup, edges }))
  const nodeId = useNodeId()

  const isHandleConnectable = useMemo<boolean | undefined>(() => {
    if (!nodeId) { return false }

    const node = nodeLookup.get(nodeId)
    if (!node) { return false }

    const connectedEdges = getConnectedEdges([node], edges)

    if (typeof isConnectable === 'function') { return isConnectable({ node, connectedEdges }) }

    if (typeof isConnectable === 'number') { return connectedEdges.length < isConnectable }

    return isConnectable
  }, [
    edges,
    isConnectable,
    nodeId,
    nodeLookup,
  ])

  return (
    <Handle
      className={cn(
        'hover:(important:(ring-2 ring-teal-500/50))',
        'important:(size-2.5 border-1.25 border-light-500 transition bg-dark-500 shadow-sm)',
        className,
      )}
      isConnectable={isHandleConnectable}
      {...props}
    />
  )
}
