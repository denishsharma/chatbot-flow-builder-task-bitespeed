import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";

import type { BuilderNodeType } from "~/modules/nodes/types";

import { createNodeWithDefaultData } from "~/modules/nodes/utils";
import { trackFlowBuilderAddNode } from "~/utils/ga4";

export function useInsertNode() {
    const { setNodes, screenToFlowPosition } = useReactFlow();

    return useCallback((type: BuilderNodeType) => {
        const pos = screenToFlowPosition({
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
        });

        const newNode = createNodeWithDefaultData(type, { position: pos });
        setNodes(nodes => nodes.concat(newNode));

        trackFlowBuilderAddNode(type);
    }, [screenToFlowPosition, setNodes]);
}
