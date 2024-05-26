import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { produce } from "immer";
import { nanoid } from "nanoid";
import { isEmpty, listify } from "radash";
import { memo, useCallback, useMemo, useState } from "react";
import { type NodeProps, Position, useReactFlow } from "reactflow";

import type { TextMessageNodeData } from "~/types/nodes.ts";

import CustomHandle from "~/components/reactflow/handles/custom-handle.tsx";
import { type MessageChannelDetail, MessageChannelDetails, type MessageChannelType, getMessageChannelDetails } from "~/constants/channels.ts";
import { BuilderNode, BuilderNodeDetail } from "~/constants/nodes.ts";
import useFlowBuilderStore from "~/stores/flow-builder.tsx";
import { cn } from "~/utils/cn.ts";

type MessageChannelSelectorProps = Readonly<{
    detail: MessageChannelDetail;
    onSelect: (channel: MessageChannelDetail & { type: MessageChannelType }) => void;
}>;

function MessageChannelSelector({ detail, onSelect }: MessageChannelSelectorProps) {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <button
                    type="button"
                    className="h-7 flex items-center justify-center border border-transparent rounded-lg bg-transparent px-1.2 outline-none transition active:(border-dark-200 bg-dark-400/50) data-[state=open]:(border-dark-200 bg-dark-500) data-[state=closed]:(hover:bg-dark-100)"
                >
                    <div className={cn(detail.icon, "size-4")} />

                    <div className="i-lucide:chevrons-up-down ml-1 size-3 op-50" />
                </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    sideOffset={5}
                    className={cn(
                        "min-w-40 select-none border border-dark-100 rounded-lg bg-dark-200/90 p-0.5 text-light-50 shadow-xl backdrop-blur-lg transition",
                        "animate-in data-[side=top]:slide-in-bottom-0.5 data-[side=bottom]:slide-in-bottom--0.5 data-[side=bottom]:fade-in-40 data-[side=top]:fade-in-40",
                    )}
                >
                    {listify(MessageChannelDetails, (k, v) => (
                        <DropdownMenu.Item
                            key={k}
                            className="cursor-pointer border border-transparent rounded-lg p-1.5 outline-none transition active:(border-dark-100 bg-dark-300) hover:bg-dark-100"
                            onSelect={() => onSelect({ ...v, type: k })}
                        >
                            <div className="flex items-center gap-x-2">
                                <div className={cn(v.icon, "size-4")} />

                                <div className="text-xs font-medium leading-none tracking-wide">
                                    {v.name}
                                </div>
                            </div>
                        </DropdownMenu.Item>
                    ))}
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
}

type TextMessageNodeProps = NodeProps<TextMessageNodeData>;

function TextMessageNodeRaw({ id, isConnectable, selected, data }: TextMessageNodeProps) {
    const meta = useMemo(() => BuilderNodeDetail["text-message"], []);

    const [showNodePropertiesOf] = useFlowBuilderStore(state => [state.sidebar.showNodePropertiesOf]);
    const [sourceHandleId] = useState<string>(nanoid());

    const { setNodes } = useReactFlow();

    const messageChannelDetail = useMemo(() => {
        return getMessageChannelDetails(data.channel);
    }, [data.channel]);

    const onMessageChannelSelect = useCallback(
        (channel: MessageChannelDetail & { type: MessageChannelType }) => {
            setNodes(nodes => produce(nodes, (draft) => {
                const node = draft.find(node => node.id === id);

                if (node)
                    node.data.channel = channel.type;
            }));
        },
        [id, setNodes],
    );

    const showNodeProperties = useCallback(() => {
        showNodePropertiesOf({ id, type: BuilderNode.TEXT_MESSAGE });
    }, [id, showNodePropertiesOf]);

    return (
        <>
            <div
                data-selected={selected}
                className="w-xs overflow-clip border border-dark-200 rounded-xl bg-dark-300/50 shadow-sm backdrop-blur-xl transition divide-y divide-dark-200 data-[selected=true]:(border-teal-600 ring-1 ring-teal-600/50)"
                onDoubleClick={showNodeProperties}
            >
                <div className="relative bg-dark-300/50">
                    <div className="absolute inset-0">
                        <div className="absolute h-full w-3/5 from-teal-900/20 to-transparent bg-gradient-to-r" />
                    </div>

                    <div className="relative h-9 flex items-center justify-between gap-x-4 px-0.5 py-0.5">
                        <div className="flex grow items-center pl-0.5">
                            <div className="size-7 flex items-center justify-center">
                                <div className="size-6 flex items-center justify-center rounded-lg">
                                    <div className={cn(meta.icon, "size-4")} />
                                </div>
                            </div>

                            <div className="ml-1 text-xs font-medium leading-none tracking-wide uppercase op-80">
                                <span className="translate-y-px">
                                    {meta.title}
                                </span>
                            </div>
                        </div>

                        <div className="flex shrink-0 items-center gap-x-0.5 pr-0.5">
                            <MessageChannelSelector detail={messageChannelDetail} onSelect={onMessageChannelSelect} />

                            <div className="mx-1 h-4 w-px bg-dark-100" />

                            <button
                                type="button"
                                className="size-7 flex items-center justify-center border border-transparent rounded-lg bg-transparent outline-none transition active:(border-dark-200 bg-dark-400/50) hover:(bg-dark-100)"
                                onClick={() => showNodeProperties()}
                            >
                                <div className="i-mynaui:cog size-4" />
                            </button>

                            <button
                                type="button"
                                className="size-7 flex items-center justify-center border border-transparent rounded-lg bg-transparent text-red-400 outline-none transition active:(border-dark-200 bg-dark-400/50) hover:(bg-dark-100)"
                                onClick={() => setNodes(nodes => nodes.filter(node => node.id !== id))}
                            >
                                <div className="i-mynaui:trash size-4" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col divide-y divide-dark-200">
                    <div className="flex flex-col p-4">
                        <div className="text-xs text-light-900/50 font-medium">
                            Message Content
                        </div>

                        <div className="line-clamp-4 mt-2 text-sm leading-snug">
                            {
                                isEmpty(data.message)
                                    ? <span className="text-light-900/80 italic">No message yet...</span>
                                    : data.message
                            }
                        </div>
                    </div>

                    <div className="px-4 py-2">
                        <div className="text-xs text-light-900/50">
                            This message will be sent to the user using the
                            {" "}
                            <b className="text-light-900/60 font-semibold">
                                "
                                {messageChannelDetail.name}
                                "
                            </b>
                            {" "}
                            channel.
                        </div>

                    </div>

                    <div className="bg-dark-300/30 px-4 py-2 text-xs text-light-900/50">
                        Node:
                        {" "}
                        <span className="text-light-900/60 font-semibold">
                            #
                            {id}
                        </span>
                    </div>
                </div>
            </div>

            <CustomHandle
                type="target"
                id={sourceHandleId}
                position={Position.Left}
                isConnectable={isConnectable}
            />

            <CustomHandle
                type="source"
                id={sourceHandleId}
                position={Position.Right}
                isConnectable={isConnectable}
            />
        </>
    );
}

const TextMessageNode = memo(TextMessageNodeRaw);

export default TextMessageNode;
