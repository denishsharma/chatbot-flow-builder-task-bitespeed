import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { type Node, type NodeProps, Position, useReactFlow } from "@xyflow/react";
import { produce } from "immer";
import { nanoid } from "nanoid";
import { memo, useCallback, useMemo, useState } from "react";

import type { BuilderNode } from "~/constants/nodes";
import type { ConditionalPathNodeData } from "~/types/nodes";

import CustomHandle from "~/components/reactflow/handles/custom-handle";
import { BuilderNodeDetail } from "~/constants/nodes";
import { useDeleteNodeReactFlowBuilder } from "~/hooks/builder/reactflow-delete-node";
import { cn } from "~/utils/cn";

const conditionList = [
    { id: nanoid(), condition: "User ordered a product" },
    { id: nanoid(), condition: "User added a product to cart" },
    { id: nanoid(), condition: "User visited a page" },
    { id: nanoid(), condition: "User clicked a button" },
    { id: nanoid(), condition: "User submitted a form data" },
];

const caseList = [
    { id: nanoid(), value: "Allowed" },
    { id: nanoid(), value: "Denied" },
    { id: nanoid(), value: "Pending" },
    { id: nanoid(), value: "Approved" },
    { id: nanoid(), value: "Rejected" },
    { id: nanoid(), value: "Cancelled" },
    { id: nanoid(), value: "Completed" },
    { id: nanoid(), value: "Failed" },
];

type ConditionDropdownSelectorProps = Readonly<{
    value: { id: string; condition: string } | null;
    onChange: (value: { id: string; condition: string } | null) => void;
}>;

function ConditionDropdownSelector({ value, onChange }: ConditionDropdownSelectorProps) {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <button
                    type="button"
                    className="h-8 w-full flex items-center justify-between border border-dark-50 rounded-md bg-dark-300 px-2.5 outline-none transition active:(border-dark-200 bg-dark-400/50) data-[state=open]:(border-dark-200 bg-dark-500) data-[state=closed]:(hover:bg-dark-300)"
                >
                    <div className="flex items-center">
                        <div className="text-sm font-medium leading-none tracking-wide">
                            {value ? value.condition : "Select Condition"}
                        </div>
                    </div>

                    <div className="i-lucide:chevrons-up-down ml-1 size-3 op-50" />
                </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    align="start"
                    sideOffset={5}
                    className={cn(
                        "min-w-40 select-none border border-dark-100 rounded-lg bg-dark-200/90 p-0.5 text-light-50 shadow-xl backdrop-blur-lg transition",
                        "animate-in data-[side=top]:slide-in-bottom-0.5 data-[side=bottom]:slide-in-bottom--0.5 data-[side=bottom]:fade-in-40 data-[side=top]:fade-in-40",
                    )}
                >
                    {conditionList.map(({ id, condition }) => (
                        <DropdownMenu.Item
                            key={id}
                            className="h-8 flex cursor-pointer items-center border border-transparent rounded-lg p-1.5 pr-6 outline-none transition active:(border-dark-100 bg-dark-300) hover:bg-dark-100"
                            onSelect={() => onChange({ id, condition })}
                        >
                            <div className="flex items-center gap-x-2">
                                <div className="text-xs font-medium leading-none tracking-wide">
                                    {condition}
                                </div>
                            </div>
                        </DropdownMenu.Item>
                    ))}
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
}

type NodePathProps = Readonly<{
    id: string;
    path: { id: string; value: string };
    onRemove: (id: string) => void;
    isConnectable: boolean;
}>;

function NodePath({ id, onRemove, isConnectable, path }: NodePathProps) {
    return (
        <div className="relative h-10 flex items-center gap-x-2 px-4 -mx-4">
            <div className="flex shrink-0 items-center gap-x-0.5">
                <button
                    type="button"
                    className="size-8 flex items-center justify-center border border-dark-50 rounded-md bg-transparent text-red-400 outline-none transition active:(border-dark-200 bg-dark-400/50) hover:(bg-dark-100)"
                    onClick={() => onRemove(id)}
                >
                    <div className="i-mynaui:trash size-4" />
                </button>
            </div>

            <input type="text" value={path.value} readOnly className="h-8 w-full border border-dark-50 rounded-md bg-dark-400 px-2.5 text-sm font-medium shadow-sm outline-none transition hover:(bg-dark-300/60) read-only:(hover:bg-dark-300/30)" />

            <CustomHandle
                type="source"
                id={id}
                position={Position.Right}
                isConnectable={isConnectable}
                className="top-5! hover:(important:ring-2 important:ring-purple-500/50)"
            />
        </div>
    );
}

type ConditionalPathNodeProps = NodeProps<Node<ConditionalPathNodeData, BuilderNode.CONDITIONAL_PATH>>;

function ConditionalPathNodeRaw({ id, isConnectable, selected, data }: ConditionalPathNodeProps) {
    const meta = useMemo(() => BuilderNodeDetail["conditional-path"], []);

    const [sourceHandleId] = useState<string>(nanoid());

    const { setNodes, setEdges } = useReactFlow();
    const deleteNode = useDeleteNodeReactFlowBuilder();

    const onConditionChange = useCallback(
        (value: { id: string; condition: string } | null) => {
            setNodes(nodes => produce(nodes, (draft) => {
                const node = draft.find(n => n.id === id);

                if (node)
                    node.data.condition = value;
            }));
        },
        [id, setNodes],
    );

    const filteredCaseList = useMemo<Omit<ConditionalPathNodeData["paths"][number], "id">["case"][]>(() => {
        return caseList.filter(c => !data.paths.some(p => p.case.value === c.value));
    }, [data.paths]);

    const addNodePath = useCallback(
        (path: { id: string; value: string }) => {
            setNodes(nodes => produce(nodes, (draft) => {
                const node = draft.find(n => n.id === id);

                if (node) {
                    (node.data.paths as ConditionalPathNodeData["paths"]).push({
                        id: nanoid(),
                        case: path,
                    });
                }
            }));
        },
        [id, setNodes],
    );

    const removeNodePath = useCallback(
        (pathId: string) => {
            setNodes(nodes => produce(nodes, (draft) => {
                const node = draft.find(n => n.id === id);

                if (node) {
                    const paths = node.data.paths as ConditionalPathNodeData["paths"];
                    const pathIndex = paths.findIndex(p => p.id === pathId);
                    paths.splice(pathIndex, 1);
                }
            }));

            setEdges(edges => edges.filter(edge => edge.sourceHandle !== pathId));
        },
        [id, setEdges, setNodes],
    );

    return (
        <div
            data-selected={selected}
            className="w-xs border border-dark-200 rounded-xl bg-dark-300/50 shadow-sm backdrop-blur-xl transition divide-y divide-dark-200 data-[selected=true]:(border-purple-600 ring-1 ring-purple-600/50)"
        >
            <div className="relative overflow-clip rounded-t-xl bg-dark-300/50">
                <div className="absolute inset-0">
                    <div className="absolute h-full w-3/5 from-purple-800/20 to-transparent bg-gradient-to-r" />
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
                        <button
                            type="button"
                            className="size-7 flex items-center justify-center border border-transparent rounded-lg bg-transparent text-red-400 outline-none transition active:(border-dark-200 bg-dark-400/50) hover:(bg-dark-100)"
                            onClick={() => deleteNode(id)}
                        >
                            <div className="i-mynaui:trash size-4" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex flex-col divide-y divide-dark-200">
                <div className="relative min-h-10 flex flex-col">
                    <div className="flex flex-col p-4">
                        <div className="text-xs text-light-900/50 font-medium">
                            Condition Attribute
                        </div>

                        <div className="mt-2 flex">
                            <ConditionDropdownSelector value={data.condition} onChange={onConditionChange} />
                        </div>
                    </div>

                    <CustomHandle
                        type="target"
                        id={sourceHandleId}
                        position={Position.Left}
                        isConnectable={isConnectable}
                        className="top-6! hover:(important:ring-2 important:ring-purple-500/50)"
                    />
                </div>

                <div className="flex flex-col p-4">
                    <div className="text-xs text-light-900/50 font-medium">
                        Paths to Follow
                    </div>

                    {data.paths.length > 0 && (
                        <div className="mt-2 flex flex-col">
                            {data.paths.map(path => (
                                <NodePath
                                    key={path.id}
                                    id={path.id}
                                    path={path.case}
                                    onRemove={_id => removeNodePath(_id)}
                                    isConnectable={isConnectable}
                                />
                            ))}
                        </div>
                    )}

                    {filteredCaseList.length > 0 && (
                        <div className="mt-2 flex">
                            <DropdownMenu.Root>
                                <DropdownMenu.Trigger asChild>
                                    <button type="button" className="h-8 w-full flex items-center justify-center border border-dark-50 rounded-md bg-dark-300 px-2.5 outline-none transition active:(border-dark-200 bg-dark-400/50)">
                                        <div className="flex items-center">
                                            <div className="text-xs font-medium leading-none tracking-wide">
                                                Add Path
                                            </div>
                                        </div>

                                        <div className="i-lucide:plus ml-1 size-4.5 text-white op-50" />
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
                                        {filteredCaseList.map(path => (
                                            <DropdownMenu.Item
                                                key={path.id}
                                                className="h-8 flex cursor-pointer items-center border border-transparent rounded-lg p-1.5 pr-6 outline-none transition active:(border-dark-100 bg-dark-300) hover:bg-dark-100"
                                                onSelect={() => addNodePath({ id: path.id, value: path.value })}
                                            >
                                                <div className="flex items-center gap-x-2">
                                                    <div className="text-xs font-medium leading-none tracking-wide">
                                                        {path.value}
                                                    </div>
                                                </div>
                                            </DropdownMenu.Item>
                                        ))}
                                    </DropdownMenu.Content>
                                </DropdownMenu.Portal>
                            </DropdownMenu.Root>
                        </div>
                    )}
                </div>

                <div className="px-4 py-2">
                    <div className="text-xs text-light-900/50">
                        This is a dummy conditional path node. Has no functionality for matching conditions.
                    </div>

                </div>

                <div className="overflow-clip rounded-b-xl bg-dark-300/30 px-4 py-2 text-xs text-light-900/50">
                    Node:
                    {" "}
                    <span className="text-light-900/60 font-semibold">
                        #
                        {id}
                    </span>
                </div>
            </div>
        </div>
    );
}

export const ConditionalPathNode = memo(ConditionalPathNodeRaw);
