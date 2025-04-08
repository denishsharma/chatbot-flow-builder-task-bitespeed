import type { Edge, Node } from '@xyflow/react'
import type { BuilderNodeType } from '~/modules/nodes/types'
import { getConnectedEdges, useReactFlow } from '@xyflow/react'

import { useCallback, useState } from 'react'
import { BuilderNode } from '~/modules/nodes/types'
import { trackFlowBuilderValidate } from '~/utils/ga4'

function findEdges(node: Node, connectedEdges: Edge[]) {
  const outgoingEdges = connectedEdges.filter(edge => edge.source === node.id)
  const incomingEdges = connectedEdges.filter(edge => edge.target === node.id)
  return { outgoingEdges, incomingEdges }
}

function checkFlowTerminalNode(outgoingEdges: Edge[], incomingEdges: Edge[], type: string) {
  switch (type) {
    case BuilderNode.START:
      return outgoingEdges.length >= 1
    case BuilderNode.END:
      return incomingEdges.length >= 1
    default:
      return false
  }
}

function checkLoneNode(outgoingEdges: Edge[], incomingEdges: Edge[], type: string) {
  switch (type) {
    case BuilderNode.START:
      return outgoingEdges.length === 0
    default:
      return incomingEdges.length === 0
  }
}

export function useFlowValidator(onValidate?: (isValid: boolean) => void): [boolean, () => void] {
  const [isValidating, setIsValidating] = useState(false)
  const { getNodes, getEdges } = useReactFlow()

  const validate = useCallback(async () => {
    trackFlowBuilderValidate()

    setIsValidating(true)

    await new Promise(resolve => setTimeout(resolve, 300))

    const nodes = getNodes()
    const edges = getEdges()
    const connectedEdges = getConnectedEdges(nodes, edges)

    let isStartConnected = false
    let isEndConnected = false
    const nodesWithEmptyTarget: Node[] = []

    for (const node of nodes) {
      const { outgoingEdges, incomingEdges } = findEdges(node, connectedEdges)

      if (node.type === BuilderNode.START) {
        isStartConnected = checkFlowTerminalNode(outgoingEdges, incomingEdges, BuilderNode.START)
      } else if (node.type === BuilderNode.END) {
        isEndConnected = checkFlowTerminalNode(outgoingEdges, incomingEdges, BuilderNode.END)
      }

      if (checkLoneNode(outgoingEdges, incomingEdges, node.type as BuilderNodeType)) { nodesWithEmptyTarget.push(node) }
    }

    const hasAnyLoneNode = nodesWithEmptyTarget.length > 0
    const isFlowComplete = isStartConnected && isEndConnected && !hasAnyLoneNode

    onValidate?.(isFlowComplete)

    setIsValidating(false)
  }, [
    getNodes,
    getEdges,
    onValidate,
  ])

  return [isValidating, validate]
}
