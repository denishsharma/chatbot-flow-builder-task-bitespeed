import { nanoid } from "nanoid";
import { useEffect } from "react";
import { useReactFlow } from "reactflow";

import { BuilderNode } from "~/constants/nodes.ts";
import useFlowBuilderStore from "~/stores/flow-builder.tsx";
import { createNodeWithDefaultData } from "~/utils/node.ts";

export function useDefaultBuilderNodeInitializer() {
    const { setNodes, setEdges, fitView } = useReactFlow();
    const [nodePropertiesSetSelectedNode] = useFlowBuilderStore(state => [state.sidebar.panels.nodeProperties.setSelectedNode]);

    useEffect(() => {
        const startNode = createNodeWithDefaultData(BuilderNode.START, { position: { x: 0, y: 100 } });
        const textMessageNode = createNodeWithDefaultData(BuilderNode.TEXT_MESSAGE, { position: { x: 300, y: 50 } });
        const endNode = createNodeWithDefaultData(BuilderNode.END, { position: { x: 900, y: 100 } });

        setNodes([startNode, textMessageNode, endNode]);
        setEdges([
            { id: nanoid(), source: startNode.id, target: textMessageNode.id, type: "deletable" },
            { id: nanoid(), source: textMessageNode.id, target: endNode.id, type: "deletable" },
        ]);

        nodePropertiesSetSelectedNode({ id: startNode.id, type: BuilderNode.START });

        fitView();
    }, [setNodes, nodePropertiesSetSelectedNode, fitView, setEdges]);
}
