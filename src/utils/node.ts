import { nanoid } from "nanoid";

import type { Node } from "@xyflow/react";
import type { BuilderNodeType } from "~/constants/nodes.ts";
import type { BuilderNodeData } from "~/types/nodes.ts";

export function createNodeData<T extends BuilderNodeType>(type: T, data: BuilderNodeData<T>) {
    return {
        id: nanoid(),
        type,
        data,
    };
}

const DEFAULT_NODE_DATA: Record<BuilderNodeType, Record<string, any>> = {
    "start": { label: "Start", deletable: false },
    "end": { label: "End", deletable: false },
    "text-message": { channel: "sms", message: "" },
};

export function createNodeWithDefaultData(type: BuilderNodeType, data?: Partial<Node>) {
    const defaultData = DEFAULT_NODE_DATA[type];
    if (!defaultData)
        throw new Error(`No default data found for node type "${type}"`);

    return Object.assign(createNodeData(type, defaultData), data) as Node;
}
