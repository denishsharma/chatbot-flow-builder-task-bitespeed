import { useCallback, useState } from "react";
import { Background, ReactFlow, addEdge, useEdgesState, useNodesState } from "reactflow";

import type { Connection, EdgeTypes, NodeTypes, ReactFlowInstance } from "reactflow";

import EndNode from "~/builder/nodes/end-node.tsx";
import StartNode from "~/builder/nodes/start-node.tsx";
import TextMessageNode from "~/builder/nodes/text-message-node.tsx";
import CustomControls from "~/components/reactflow/controls/custom-controls.tsx";
import CustomDeletableEdge from "~/components/reactflow/edges/custom-deletable-edge.tsx";
import { BuilderNode } from "~/constants/nodes.ts";
import { useDefaultBuilderNodeInitializer } from "~/hooks/builder/initialize-default-nodes.ts";
import { useDragDropReactFlowBuilder } from "~/hooks/builder/reactflow-drag-drop.ts";
import { useIsValidConnectionReactFlowBuilder } from "~/hooks/builder/reactflow-is-valid-connection.ts";

const nodeTypes: NodeTypes = {
    [BuilderNode.START]: StartNode,
    [BuilderNode.END]: EndNode,
    [BuilderNode.TEXT_MESSAGE]: TextMessageNode,
};

const edgeTypes: EdgeTypes = {
    deletable: CustomDeletableEdge,
};

export default function FlowBuilder() {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);

    useDefaultBuilderNodeInitializer();

    const [onDragOver, onDrop] = useDragDropReactFlowBuilder(reactFlowInstance, setNodes);
    const isValidConnection = useIsValidConnectionReactFlowBuilder(nodes, edges);

    const onConnect = useCallback(
        (connection: Connection) => {
            const edge = { ...connection, id: `${connection.source}-${connection.target}`, type: "deletable" };
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
            isValidConnection={isValidConnection}
            snapGrid={[16, 16]}
            snapToGrid
            fitView
        >
            <Background color="rgba(255,255,255,0.25)" gap={32} />
            <CustomControls />
        </ReactFlow>
    );
}
