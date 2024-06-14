import { useCallback } from "react";

import type { Node } from "reactflow";

import useFlowBuilderStore from "~/stores/flow-builder.tsx";
import { trackFlowBuilderDeleteNode } from "~/utils/ga4";

export function useOnNodesDeleteReactFlowBuilder(nodes: Node[]) {
    const [nodePropertiesSelectedNode, nodePropertiesSetSelectedNode] = useFlowBuilderStore(state => [state.sidebar.panels.nodeProperties.selectedNode, state.sidebar.panels.nodeProperties.setSelectedNode]);

    return useCallback((_: Node[]) => {
        trackFlowBuilderDeleteNode();

        if (nodePropertiesSelectedNode && !nodes.find(node => node.id === nodePropertiesSelectedNode.id))
            nodePropertiesSetSelectedNode(null);
    }, [nodePropertiesSelectedNode, nodePropertiesSetSelectedNode, nodes]);
}
