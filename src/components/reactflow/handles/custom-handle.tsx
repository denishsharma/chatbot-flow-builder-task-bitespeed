import { useMemo } from "react";
import { type Edge, Handle, type HandleProps, type NodeInternals, getConnectedEdges, useNodeId, useStore } from "reactflow";

import { cn } from "~/utils/cn.ts";

function selector(s: { nodeInternals: NodeInternals; edges: Edge[] }) {
    return {
        nodeInternals: s.nodeInternals,
        edges: s.edges,
    };
}

function useIsHandleConnectable(isConnectable: Function | boolean | number | undefined, nodeId: string | null, nodeInternals: NodeInternals, edges: Edge[]): boolean | undefined {
    return useMemo(() => {
        if (!nodeId)
            return false;
        const node = nodeInternals.get(nodeId);
        if (!node)
            return false;
        const connectedEdges = getConnectedEdges([node], edges);

        if (typeof isConnectable === "function")
            return isConnectable({ node, connectedEdges });

        if (typeof isConnectable === "number")
            return connectedEdges.length < isConnectable;

        return isConnectable;
    }, [edges, isConnectable, nodeId, nodeInternals]);
}

type CustomHandleProps = Readonly<Omit<HandleProps, "isConnectable"> & { isConnectable: Function | boolean | number | undefined }>;

export default function CustomHandle({ isConnectable, ...props }: CustomHandleProps) {
    const { nodeInternals, edges } = useStore(selector);
    const nodeId = useNodeId();

    const isHandleConnectable = useIsHandleConnectable(isConnectable, nodeId, nodeInternals, edges);

    return (
        <Handle
            className={cn(
                "hover:(important:(ring-2 ring-teal-500/50))",
                "important:(size-2.5 border-1.25 border-light-500 transition bg-dark-500 shadow-sm)",
                "data-[handlepos=bottom]:(important:-bottom-1.25)",
                "data-[handlepos=left]:(important:-left-1.25)",
                "data-[handlepos=right]:(important:-right-1.25)",
                "data-[handlepos=top]:(important:-top-1.25)",
            )}
            isConnectable={isHandleConnectable}
            {...props}
        />
    );
}
