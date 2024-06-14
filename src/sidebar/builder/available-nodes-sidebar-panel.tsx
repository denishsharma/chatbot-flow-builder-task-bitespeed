import { type DragEvent, type ReactNode, useCallback } from "react";

import type { SidebarState } from "~/types/flow-builder-store";

import SidebarPanelWrapper from "~/components/sidebar/sidebar-panel-wrapper";
import { AvailableNodes, type BuilderNodeType } from "~/constants/nodes.ts";
import { NODE_TYPE_DRAG_DATA_FORMAT } from "~/constants/symbols.ts";
import { useInsertFlowNodeToBuilder } from "~/hooks/builder/insert-flow-node";
import useFlowBuilderStore from "~/stores/flow-builder";
import { cn } from "~/utils/cn.ts";

type NodePreviewDraggableProps = Readonly<{
    icon: string | ReactNode;
    title: string;
    description: string;
    type: string;
    children?: never;
    isMobile: boolean;
    setActivePanel: SidebarState["setActivePanel"];
    insertNode: ReturnType<typeof useInsertFlowNodeToBuilder>;
}>;

function NodePreviewDraggable({ icon, title, description, type, isMobile, setActivePanel, insertNode }: NodePreviewDraggableProps) {
    const onDragStart = useCallback((e: DragEvent, type: string) => {
        if (isMobile)
            return;

        e.dataTransfer.setData(NODE_TYPE_DRAG_DATA_FORMAT, type);
        e.dataTransfer.effectAllowed = "move";
    }, [isMobile]);

    const onClick = useCallback(() => {
        if (!isMobile)
            return;

        insertNode(type as BuilderNodeType);
        setActivePanel("none");
    }, [insertNode, isMobile, setActivePanel, type]);

    return (
        <div
            className={cn(
                "flex cursor-grab select-none gap-2 border border-dark-300 rounded-xl bg-dark-400 p-2.5 shadow-sm transition hover:(ring-2 ring-teal-600/50)",
                isMobile && "active:(op-70 scale-98)",
            )}
            onClick={onClick}
            onDragStart={e => onDragStart(e, type)}
            draggable
            data-vaul-no-drag
        >
            <div className="shrink-0">
                <div className="size-10 flex items-center justify-center border border-dark-200 rounded-xl bg-dark-300">
                    {typeof icon === "string" ? <div className={cn(icon, "size-6 text-white")} /> : icon}
                </div>
            </div>

            <div className="ml-1 flex grow flex-col">
                <div className="mt-px text-sm font-medium leading-normal">
                    {title}
                </div>

                <div className="line-clamp-3 mt-1 text-xs text-light-50/40 leading-normal">
                    {description}
                </div>
            </div>
        </div>
    );
}

export default function AvailableNodesSidebarPanelBuilder() {
    const [isMobile, setActivePanel] = useFlowBuilderStore(state => [state.isMobile, state.sidebar.setActivePanel]);
    const insertNode = useInsertFlowNodeToBuilder();

    return (
        <SidebarPanelWrapper>
            <div className="mt-4 flex flex-col items-center p-4 text-center">
                <div className="size-12 flex items-center justify-center rounded-full bg-teal-800">
                    <div className="i-mynaui:grid size-6 text-white" />
                </div>

                <div className="mt-4 text-balance font-medium">Available Nodes</div>

                <div className="mt-1 w-2/3 text-xs text-light-50/40 font-medium leading-normal">
                    {isMobile ? "Tap on a node to add it to yout chatbot flow" : "Drag and drop nodes to build your chatbot flow"}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 p-4">
                {AvailableNodes.map(node => (
                    <NodePreviewDraggable
                        key={node.type}
                        type={node.type}
                        icon={node.icon}
                        title={node.title}
                        description={node.description}
                        isMobile={isMobile}
                        setActivePanel={setActivePanel}
                        insertNode={insertNode}
                    />
                ))}
            </div>
        </SidebarPanelWrapper>
    );
}
