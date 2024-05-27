import { nanoid } from "nanoid";
import { memo, useState } from "react";
import { type NodeProps, Position } from "reactflow";

import type { EndNodeData } from "~/types/nodes.ts";

import CustomHandle from "~/components/reactflow/handles/custom-handle.tsx";
import { BuilderNode, BuilderNodeDetail } from "~/constants/nodes.ts";
import { cn } from "~/utils/cn.ts";

type EndNodeProps = NodeProps<EndNodeData>;

function EndNodeRaw({ data, selected }: EndNodeProps) {
    const meta = BuilderNodeDetail[BuilderNode.END];

    const [sourceHandleId] = useState<string>(nanoid());

    return (
        <>
            <div
                data-selected={selected}
                data-deletable={false}
                className="flex items-center border border-dark-100 rounded-full bg-dark-300 px-4 py-2 shadow-sm transition data-[selected=true]:(border-teal-600 ring-1 ring-teal-600/50)"
            >
                <div className={cn(meta.icon, "size-4.5 shrink-0 mr-2 scale-130")} />

                <span className="mr-1">
                    {data.label || meta.title}
                </span>
            </div>

            <CustomHandle
                type="target"
                id={sourceHandleId}
                position={Position.Left}
                isConnectable={1}
            />
        </>
    );
}

const EndNode = memo(EndNodeRaw);

export default EndNode;
