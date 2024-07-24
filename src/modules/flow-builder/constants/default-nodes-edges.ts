import { nanoid } from "nanoid";

import { BuilderNode } from "~/modules/nodes/types";
import { createNodeWithDefaultData } from "~/modules/nodes/utils";

const startNode = createNodeWithDefaultData(BuilderNode.START, { position: { x: 0, y: 100 } });
const textMessageNode = createNodeWithDefaultData(BuilderNode.TEXT_MESSAGE, { position: { x: 300, y: 50 } });
const endNode = createNodeWithDefaultData(BuilderNode.END, { position: { x: 900, y: 100 } });

const nodes = [startNode, textMessageNode, endNode];

const edges = [
    { id: nanoid(), source: startNode.id, target: textMessageNode.id, type: "deletable" },
    { id: nanoid(), source: textMessageNode.id, target: endNode.id, type: "deletable" },
];

export {
    nodes as defaultNodes,
    edges as defaultEdges,
};
