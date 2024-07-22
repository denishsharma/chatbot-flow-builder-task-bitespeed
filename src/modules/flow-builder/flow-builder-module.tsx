import { Background, type Connection, type Edge, type EdgeTypes, type Node, ReactFlow, type ReactFlowInstance, addEdge, useEdgesState, useNodesState } from "@xyflow/react";
import { nanoid } from "nanoid";
import { useCallback, useState } from "react";

import CustomControls from "~/modules/flow-builder/components/controls/custom-controls";
import CustomDeletableEdge from "~/modules/flow-builder/components/edges/custom-deletable-edge";
import { useDefaultBuilderNodeInitializer } from "~/modules/flow-builder/hooks/use-default-builder-node-initializer";
import { useDeleteKeyCode } from "~/modules/flow-builder/hooks/use-delete-key-code";
import { useDragDropFlowBuilder } from "~/modules/flow-builder/hooks/use-drag-drop-flow-builder";
import { useIsValidConnection } from "~/modules/flow-builder/hooks/use-is-valid-connection";
import { useOnNodesDelete } from "~/modules/flow-builder/hooks/use-on-nodes-delete";
import { NODE_TYPES } from "~/modules/nodes";
import { useApplicationState } from "~/stores/application-state";

const edgeTypes: EdgeTypes = {
    deletable: CustomDeletableEdge,
};

export function FlowBuilderModule() {
    const [isMobileView] = useApplicationState(s => [s.view.mobile]);

    const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);

    useDefaultBuilderNodeInitializer();
    const deleteKeyCode = useDeleteKeyCode();
    const onNodesDelete = useOnNodesDelete(nodes);

    const [onDragOver, onDrop] = useDragDropFlowBuilder(reactFlowInstance, setNodes);
    const isValidConnection = useIsValidConnection(nodes, edges);

    const onConnect = useCallback(
        (connection: Connection) => {
            const edge = { ...connection, id: nanoid(), type: "deletable" } as Edge;
            setEdges(edges => addEdge(edge, edges));
        },
        [setEdges],
    );

    return (
        <ReactFlow
            proOptions={{ hideAttribution: true }}
            onInit={setReactFlowInstance}
            nodeTypes={NODE_TYPES}
            nodes={nodes}
            onNodesChange={onNodesChange}
            edgeTypes={edgeTypes}
            edges={edges}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodesDelete={onNodesDelete}
            isValidConnection={isValidConnection}
            multiSelectionKeyCode={null}
            deleteKeyCode={deleteKeyCode}
            snapGrid={[16, 16]}
            snapToGrid
            fitView
        >
            <Background color={isMobileView ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.25)"} gap={32} />
            <CustomControls />
        </ReactFlow>
    );
}
