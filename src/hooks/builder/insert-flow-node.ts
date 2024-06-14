import { useCallback } from "react";
import { useReactFlow } from "reactflow";

import type { BuilderNodeType } from "~/constants/nodes";

import { createNodeWithDefaultData } from "~/utils/node";

export function useInsertFlowNodeToBuilder() {
    const { setNodes, screenToFlowPosition } = useReactFlow();

    const insert = useCallback((type: BuilderNodeType) => {
        const pos = screenToFlowPosition({
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
        });

        const newNode = createNodeWithDefaultData(type, { position: pos });
        setNodes(nodes => nodes.concat(newNode));
    }, [screenToFlowPosition, setNodes]);

    return insert;
}
