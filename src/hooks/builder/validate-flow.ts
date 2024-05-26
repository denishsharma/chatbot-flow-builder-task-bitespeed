import { useCallback, useState } from "react";
import { type Edge, type Node, getConnectedEdges, useReactFlow } from "reactflow";

import { BuilderNode, type BuilderNodeType } from "~/constants/nodes.ts";

function findEdges(node: Node, connectedEdges: Edge[]) {
    const outgoingEdges = connectedEdges.filter(edge => edge.source === node.id);
    const incomingEdges = connectedEdges.filter(edge => edge.target === node.id);
    return { outgoingEdges, incomingEdges };
}

function checkNode(outgoingEdges: Edge[], incomingEdges: Edge[], type: string) {
    switch (type) {
        case BuilderNode.START:
            return outgoingEdges.length > 0;
        case BuilderNode.END:
            return incomingEdges.length > 0;
        default:
            return incomingEdges.length === 0;
    }
}

export function useFlowValidator(onValidate?: (isValid: boolean) => void): [boolean, () => void] {
    const [isValidating, setIsValidating] = useState(false);
    const { getNodes, getEdges } = useReactFlow();

    const validate = useCallback(async () => {
        setIsValidating(true);

        await new Promise(resolve => setTimeout(resolve, 300));

        const nodes = getNodes();
        const edges = getEdges();
        const connectedEdges = getConnectedEdges(nodes, edges);

        let isStartConnected = false;
        let isEndConnected = false;
        const nodesWithEmptyTarget: Node[] = [];

        for (const node of nodes) {
            const { outgoingEdges, incomingEdges } = findEdges(node, connectedEdges);

            switch (node.type) {
                case BuilderNode.START:
                    isStartConnected = checkNode(outgoingEdges, incomingEdges, node.type);
                    break;
                case BuilderNode.END:
                    isEndConnected = checkNode(outgoingEdges, incomingEdges, node.type);
                    break;
                default:
                    if (checkNode(outgoingEdges, incomingEdges, node.type as BuilderNodeType))
                        nodesWithEmptyTarget.push(node);

                    break;
            }
        }

        const hasAnyLoneNode = nodes.length > 1 && nodesWithEmptyTarget.length > 0;
        const isFlowComplete = isStartConnected && isEndConnected && !hasAnyLoneNode;

        onValidate?.(isFlowComplete);

        setIsValidating(false);
    }, [getNodes, getEdges, onValidate]);

    return [isValidating, validate];
}
