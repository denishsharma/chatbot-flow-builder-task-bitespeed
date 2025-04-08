import { getConnectedEdges, useReactFlow } from '@xyflow/react'
import { useCallback } from 'react'

export function useDeleteNode() {
  const { getNode, getEdges, deleteElements } = useReactFlow()

  return useCallback(
    (id: string) => {
      const node = getNode(id)
      if (!node) { return }

      const edges = getEdges()
      const connectedEdges = getConnectedEdges([node], edges)

      deleteElements({ nodes: [node], edges: connectedEdges }).then()
    },
    [
      deleteElements,
      getEdges,
      getNode,
    ],
  )
}
