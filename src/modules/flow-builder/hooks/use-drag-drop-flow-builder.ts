import { type Dispatch, type DragEvent, type SetStateAction, useCallback } from "react";

import type { Node, ReactFlowInstance } from "@xyflow/react";
import type { BuilderNode } from "~/modules/nodes/types";

import { NODE_TYPE_DRAG_DATA_FORMAT } from "~/constants/symbols.ts";
import { createNodeWithDefaultData } from "~/modules/nodes/utils";
import { trackFlowBuilderAddNode } from "~/utils/ga4";

export function useDragDropFlowBuilder(reactFlowInstance: ReactFlowInstance | null, setNodes: Dispatch<SetStateAction<Node[]>>) {
    const onDragOver = useCallback((e: DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    }, []);

    const onDrop = useCallback(
        (e: DragEvent) => {
            if (!reactFlowInstance)
                return;

            e.preventDefault();

            const type = e.dataTransfer.getData(NODE_TYPE_DRAG_DATA_FORMAT);
            if (typeof type === "undefined" || !type)
                return;

            const pos = reactFlowInstance.screenToFlowPosition({
                x: e.clientX,
                y: e.clientY,
            });

            const newNode = createNodeWithDefaultData(type as BuilderNode, { position: pos });

            setNodes(nodes => nodes.concat(newNode));

            trackFlowBuilderAddNode(type);
        },
        [reactFlowInstance, setNodes],
    );

    return [onDragOver, onDrop];
}
