import { Background, ReactFlow, addEdge, useEdgesState, useNodesState } from "@xyflow/react";
import { nanoid } from "nanoid";
import { useCallback, useState } from "react";

import type { Connection, Edge, EdgeTypes, Node, NodeTypes, ReactFlowInstance } from "@xyflow/react";

import { ConditionalPathNode } from "~/builder/nodes/conditional-path-node";
import EndNode from "~/builder/nodes/end-node.tsx";
import StartNode from "~/builder/nodes/start-node.tsx";
import TextMessageNode from "~/builder/nodes/text-message-node.tsx";
import CustomControls from "~/components/reactflow/controls/custom-controls.tsx";
import CustomDeletableEdge from "~/components/reactflow/edges/custom-deletable-edge.tsx";
import { BuilderNode } from "~/constants/nodes.ts";
import { useDefaultBuilderNodeInitializer } from "~/hooks/builder/initialize-default-nodes.ts";
import { useDeleteKeyCodeReactFlowBuilder } from "~/hooks/builder/reactflow-delete-key-code.ts";
import { useDragDropReactFlowBuilder } from "~/hooks/builder/reactflow-drag-drop.ts";
import { useIsValidConnectionReactFlowBuilder } from "~/hooks/builder/reactflow-is-valid-connection.ts";
import { useOnNodesDeleteReactFlowBuilder } from "~/hooks/builder/reactflow-on-nodes-delete.ts";
import useFlowBuilderStore from "~/stores/flow-builder";

const nodeTypes: NodeTypes = {
    [BuilderNode.START]: StartNode,
    [BuilderNode.END]: EndNode,
    [BuilderNode.TEXT_MESSAGE]: TextMessageNode,
    [BuilderNode.CONDITIONAL_PATH]: ConditionalPathNode,
};

const edgeTypes: EdgeTypes = {
    deletable: CustomDeletableEdge,
};

export default function FlowBuilder() {
    const [isMobile] = useFlowBuilderStore(state => [state.isMobile]);

    const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);

    useDefaultBuilderNodeInitializer();
    const deleteKeyCode = useDeleteKeyCodeReactFlowBuilder();
    const onNodesDelete = useOnNodesDeleteReactFlowBuilder(nodes);

    const [onDragOver, onDrop] = useDragDropReactFlowBuilder(reactFlowInstance, setNodes);
    const isValidConnection = useIsValidConnectionReactFlowBuilder(nodes, edges);

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
            nodeTypes={nodeTypes}
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
            <Background color={isMobile ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.25)"} gap={32} />
            <CustomControls />
        </ReactFlow>
    );
}
