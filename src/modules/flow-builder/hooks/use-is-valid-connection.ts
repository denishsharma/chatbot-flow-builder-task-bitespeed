import type { Connection, Edge, Node } from '@xyflow/react'
import { getOutgoers } from '@xyflow/react'
import { useCallback } from 'react'

function findTargetNode(nodes: Node[], connection: Edge | Connection) {
  return nodes.find(node => node.id === connection.target)
}

function hasCycle(node: Node, connection: Edge | Connection, nodes: Node[], edges: Edge[], visited: Set<string> = new Set<string>()) {
  if (visited.has(node.id)) { return false }

  visited.add(node.id)

  for (const outgoer of getOutgoers(node, nodes, edges)) {
    if (outgoer.id === connection.source) { return true }
    if (hasCycle(outgoer, connection, nodes, edges, visited)) { return true }
  }
}

export function useIsValidConnection(nodes: Node[], edges: Edge[]) {
  return useCallback(
    (connection: Edge | Connection) => {
      const target = findTargetNode(nodes, connection)

      if (target?.id === connection.source) { return false }
      return target ? !hasCycle(target, connection, nodes, edges) : true
    },
    [nodes, edges],
  )
}
