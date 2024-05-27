import { useCallback } from "react";

import type { Node } from "reactflow";

import useFlowBuilderStore from "~/stores/flow-builder.tsx";

export function useOnNodesDeleteReactFlowBuilder(nodes: Node[]) {
    const [nodePropertiesSelectedNode, nodePropertiesSetSelectedNode] = useFlowBuilderStore(state => [state.sidebar.panels.nodeProperties.selectedNode, state.sidebar.panels.nodeProperties.setSelectedNode]);

    return useCallback((_: Node[]) => {
        if (nodePropertiesSelectedNode && !nodes.find(node => node.id === nodePropertiesSelectedNode.id))
            nodePropertiesSetSelectedNode(null);
    }, [nodePropertiesSelectedNode, nodePropertiesSetSelectedNode, nodes]);
}
