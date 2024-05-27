import { useCallback } from "react";
import { getConnectedEdges, useReactFlow } from "reactflow";

export function useDeleteNodeReactFlowBuilder() {
    const { getNode, getEdges, deleteElements } = useReactFlow();

    return useCallback(
        (id: string) => {
            const node = getNode(id);
            if (!node)
                return;

            const edges = getEdges();
            const connectedEdges = getConnectedEdges([node], edges);

            deleteElements({ nodes: [node], edges: connectedEdges });
        },
        [deleteElements, getEdges, getNode],
    );
}
