import { useReactFlow } from "@xyflow/react";
import { nanoid } from "nanoid";
import { useEffect } from "react";

import { BuilderNode } from "~/modules/nodes/types";
import { createNodeWithDefaultData } from "~/modules/nodes/utils";
import { useApplicationState } from "~/stores/application-state";

export function useDefaultBuilderNodeInitializer() {
    const { setNodes, setEdges, fitView } = useReactFlow();
    const [nodePropertiesSetSelectedNode] = useApplicationState(state => [state.actions.sidebar.panels.nodeProperties.setSelectedNode]);

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

        fitView().then();
    }, [setNodes, nodePropertiesSetSelectedNode, fitView, setEdges]);
}
