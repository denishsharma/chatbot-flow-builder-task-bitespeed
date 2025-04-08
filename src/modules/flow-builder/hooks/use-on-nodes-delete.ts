import type { Node } from '@xyflow/react'

import { useCallback } from 'react'

import { useApplicationState } from '~/stores/application-state'
import { trackFlowBuilderDeleteNode } from '~/utils/ga4'

export function useOnNodesDelete(nodes: Node[]) {
  const { nodePropertiesSelectedNode, nodePropertiesSetSelectedNode } = useApplicationState(s => ({
    nodePropertiesSelectedNode: s.sidebar.panels.nodeProperties.selectedNode,
    nodePropertiesSetSelectedNode: s.actions.sidebar.panels.nodeProperties.setSelectedNode,
  }))

  return useCallback((_: Node[]) => {
    trackFlowBuilderDeleteNode()

    if (nodePropertiesSelectedNode && !nodes.find(node => node.id === nodePropertiesSelectedNode.id)) { nodePropertiesSetSelectedNode(null) }
  }, [
    nodePropertiesSelectedNode,
    nodePropertiesSetSelectedNode,
    nodes,
  ])
}
