import { useCallback } from "react";
import { useReactFlow } from "reactflow";

import type { BuilderNodeType } from "~/constants/nodes";

import { trackFlowBuilderAddNode } from "~/utils/ga4";
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

        trackFlowBuilderAddNode(type);
    }, [screenToFlowPosition, setNodes]);

    return insert;
}
