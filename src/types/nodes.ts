import type { MessageChannelType } from "~/constants/channels.ts";
import type { BuilderNode, BuilderNodeType } from "~/constants/nodes.ts";

export interface BaseNodeData extends Record<string, any> {
    deletable?: boolean;
}

export interface StartNodeData extends BaseNodeData {
    label?: string;
}

export interface EndNodeData extends BaseNodeData {
    label?: string;
}

export interface TextMessageNodeData extends BaseNodeData {
    channel: MessageChannelType;
    message: string;
}

export interface ConditionalPathNodeData extends BaseNodeData {
    condition: {
        id: string;
        condition: string;
    } | null;
    paths: { id: string; case: { id: string; value: string } }[];
}

export type BuilderNodeData<T extends BuilderNodeType> =
    T extends `${BuilderNode.TEXT_MESSAGE}` ? TextMessageNodeData
        : T extends `${BuilderNode.CONDITIONAL_PATH}` ? ConditionalPathNodeData
            : Record<string, any>;
