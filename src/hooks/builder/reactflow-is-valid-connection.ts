import { useCallback } from "react";
import { type Connection, type Edge, type Node, getOutgoers } from "reactflow";

function findTargetNode(nodes: Node[], connection: Connection) {
    return nodes.find(node => node.id === connection.target);
}

function hasCycle(node: Node, connection: Connection, nodes: Node[], edges: Edge[], visited: Set<string> = new Set<string>()) {
    if (visited.has(node.id))
        return false;

    visited.add(node.id);

    for (const outgoer of getOutgoers(node, nodes, edges)) {
        if (outgoer.id === connection.source)
            return true;
        if (hasCycle(outgoer, connection, nodes, edges, visited))
            return true;
    }
}

export function useIsValidConnectionReactFlowBuilder(nodes: Node[], edges: Edge[]) {
    return useCallback(
        (connection: Connection) => {
            const target = findTargetNode(nodes, connection);

            if (target?.id === connection.source)
                return false;
            return target ? !hasCycle(target, connection, nodes, edges) : true;
        },
        [nodes, edges],
    );
}
