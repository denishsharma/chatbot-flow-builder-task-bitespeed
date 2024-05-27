import { nanoid } from "nanoid";
import { memo, useState } from "react";
import { type NodeProps, Position } from "reactflow";

import type { StartNodeData } from "~/types/nodes.ts";

import CustomHandle from "~/components/reactflow/handles/custom-handle.tsx";
import { BuilderNode, BuilderNodeDetail } from "~/constants/nodes.ts";
import { cn } from "~/utils/cn.ts";

type StartNodeProps = NodeProps<StartNodeData>;

function StartNodeRaw({ data, selected, isConnectable }: StartNodeProps) {
    const meta = BuilderNodeDetail[BuilderNode.START];

    const [sourceHandleId] = useState<string>(nanoid());

    return (
        <>
            <div
                data-selected={selected}
                className="flex items-center border border-dark-100 rounded-full bg-dark-300 px-4 py-2 shadow-sm transition data-[selected=true]:(border-teal-600 ring-1 ring-teal-600/50)"
            >
                <div className={cn(meta.icon, "size-4.5 shrink-0 mr-2 scale-130")} />

                <span className="mr-1">
                    {data.label || meta.title}
                </span>
            </div>

            <CustomHandle
                type="source"
                id={sourceHandleId}
                position={Position.Right}
                isConnectable={isConnectable}
            />
        </>
    );
}

const StartNode = memo(StartNodeRaw);

export default StartNode;
