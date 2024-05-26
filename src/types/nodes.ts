import type { MessageChannelType } from "~/constants/channels.ts";
import type { BuilderNode, BuilderNodeType } from "~/constants/nodes.ts";

export interface TextMessageNodeData {
    channel: MessageChannelType;
    message: string;
}

export type BuilderNodeData<T extends BuilderNodeType> = T extends `${BuilderNode.TEXT_MESSAGE}` ? TextMessageNodeData : Record<string, any>;
