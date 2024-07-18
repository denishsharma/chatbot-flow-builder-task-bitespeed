import { listify } from "radash";

export enum BuilderNode {
    START = "start",
    END = "end",
    TEXT_MESSAGE = "text-message",
    CONDITIONAL_PATH = "conditional-path",
}

// @unocss-include
export const BuilderNodeDetail: Record<BuilderNode, { icon: string; title: string; description: string }> = {
    [BuilderNode.START]: {
        icon: "i-mynaui:play",
        title: "Start",
        description: "Start the chatbot flow",
    },
    [BuilderNode.END]: {
        icon: "i-mynaui:stop",
        title: "End",
        description: "End the chatbot flow",
    },
    [BuilderNode.TEXT_MESSAGE]: {
        icon: "i-mynaui:chat",
        title: "Text Message",
        description: "Send a text message to the user using different messaging platforms like WhatsApp, Messenger, etc.",
    },
    [BuilderNode.CONDITIONAL_PATH]: {
        icon: "i-mynaui:git-branch",
        title: "Conditional Path",
        description: "Check a condition and take different paths based on the result.",
    },
};

export const AvailableNodes = listify(BuilderNodeDetail, (key, value) => ({ ...value, type: key as BuilderNode }))
    .sort((a, b) => a.title.localeCompare(b.title))
    .filter(node => node.type !== BuilderNode.START && node.type !== BuilderNode.END);

export type BuilderNodeType = `${BuilderNode}`;

export function getNodeDetail(nodeType: BuilderNodeType | string | undefined) {
    return BuilderNodeDetail[nodeType as BuilderNode] ?? { icon: "", title: "", description: "" };
}
