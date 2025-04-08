import type { XYPosition } from '@xyflow/react'
import type { BuilderNodeType } from '~/modules/nodes/types'
import { useReactFlow } from '@xyflow/react'

import { useCallback } from 'react'

import { createNodeWithDefaultData } from '~/modules/nodes/utils'
import { trackFlowBuilderAddNode } from '~/utils/ga4'

export function useInsertNode() {
  const { addNodes, screenToFlowPosition, getNodes, updateNode } = useReactFlow()

  return useCallback(
    (type: BuilderNodeType, pos?: XYPosition) => {
      const _pos = pos || screenToFlowPosition({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      })

      getNodes().forEach((node) => {
        if (node.selected) {
          updateNode(node.id, { selected: false })
        }
      })

      const newNode = createNodeWithDefaultData(type, { position: _pos, selected: true })
      addNodes(newNode)

      trackFlowBuilderAddNode(type)

      return newNode
    },
    [
      screenToFlowPosition,
      getNodes,
      addNodes,
      updateNode,
    ],
  )
}
