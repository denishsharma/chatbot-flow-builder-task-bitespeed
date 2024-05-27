import { produce } from "immer";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { isEmpty } from "radash";
import { type ComponentPropsWithoutRef, type ComponentType, useCallback, useMemo } from "react";
import { type Node, useNodes, useReactFlow } from "reactflow";
import SplitPane, { Pane } from "split-pane-react";

import SidebarPanelHeading from "~/components/sidebar/sidebar-panel-heading.tsx";
import SidebarPanelWrapper from "~/components/sidebar/sidebar-panel-wrapper.tsx";
import { BuilderNode, type BuilderNodeType, getNodeDetail } from "~/constants/nodes.ts";
import TextMessageNodeProperties from "~/sidebar/builder/node-properties/text-message-node-properties.tsx";
import UnavailableNodeProperties from "~/sidebar/builder/node-properties/unavailable-node-properties.tsx";
import useFlowBuilderStore from "~/stores/flow-builder.tsx";
import { cn } from "~/utils/cn.ts";
import { defaultOverlayScrollbarsOptions } from "~/utils/overlayscrollbars.ts";
import { truncateMiddle } from "~/utils/string.ts";

type NodeListItemProps = Readonly<ComponentPropsWithoutRef<"button"> & {
    icon: string;
    title: string;
    id?: string;
    selected?: boolean;
    pseudoSelected?: boolean;
}>;

function NodeListItem({ id, title, className, icon, selected, pseudoSelected, ...props }: NodeListItemProps) {
    return (
        <button
            type="button"
            className={cn(
                "h-8 select-none flex items-center justify-between gap-4 border border-transparent rounded-lg bg-transparent px-2.5 text-sm outline-none transition",
                selected ? "border-teal-700 bg-teal-900" : "active:(bg-dark-400 border-dark-200) hover:(bg-dark-200)",
                pseudoSelected && !selected && "bg-dark-300/60",
                className,
            )}
            {...props}
        >
            <div className="flex items-center">
                <div className={cn(icon, "size-4.5")} />
                <div className="ml-2.5 flex items-center text-xs font-medium leading-none tracking-wide uppercase op-80">
                    <span className="translate-y-px">
                        {title}
                    </span>
                </div>
            </div>

            {(id && !isEmpty(id)) && (
                <div className="rounded-md bg-dark-100 px-2 py-1.5 text-2.5 text-gray-200/80 font-semibold leading-none tracking-wide">
                    {truncateMiddle(id, 12)}
                </div>
            )}
        </button>
    );
}

function useNodeList(nodes: Node[]) {
    return useMemo(() => {
        return nodes.sort((a, b) => {
            if (a.type === BuilderNode.START)
                return -1;
            if (b.type === BuilderNode.START)
                return 1;
            if (a.type === BuilderNode.END)
                return 1;
            if (b.type === BuilderNode.END)
                return -1;
            return 0;
        }).map(n => ({ ...n, detail: getNodeDetail(n.type) }));
    }, [nodes]);
}

type NodePropertyPanelProps = Readonly<{ id: string; type: BuilderNodeType; data: any }>;

const NODE_PROPERTY_PANEL_COMPONENTS: Partial<Record<BuilderNodeType, ComponentType<{ id: string; type: BuilderNodeType; data: any; updateData: (data: Partial<any>) => void }>>> = {
    [BuilderNode.TEXT_MESSAGE]: TextMessageNodeProperties,
};

function NodePropertyPanel({ id, type, data }: NodePropertyPanelProps) {
    const PanelComponent = NODE_PROPERTY_PANEL_COMPONENTS[type];

    const { setNodes } = useReactFlow();

    const nodeData = produce(data, () => {});

    const updateData = useCallback((newData: Partial<any>) => {
        setNodes(nds => produce(nds, (draft) => {
            const node = draft.find(n => n.id === id);
            if (node)
                node.data = { ...node.data, ...newData };
        }));
    }, [id, setNodes]);

    return (PanelComponent && nodeData) ? <PanelComponent id={id} type={type} data={nodeData} updateData={updateData} /> : <UnavailableNodeProperties />;
}

export default function NodePropertiesSidebarPanelBuilder() {
    const [paneSizes, setPaneSizes] = useFlowBuilderStore(state => [state.sidebar.panels.nodeProperties.paneSizes, state.sidebar.panels.nodeProperties.setPaneSizes]);
    const [selectedNode, setSelectedNode] = useFlowBuilderStore(state => [state.sidebar.panels.nodeProperties.selectedNode, state.sidebar.panels.nodeProperties.setSelectedNode]);

    const nodes = useNodes();

    const nodeList = useNodeList(nodes);

    const { setNodes } = useReactFlow();

    const onNodeClick = (id: string) => {
        setNodes(nds => produce(nds, (draft) => {
            draft.forEach((node) => {
                node.selected = node.id === id;
            });
        }));

        setSelectedNode({ id, type: nodeList.find(n => n.id === id)?.type as BuilderNode });
    };

    const selectedNodeData = useMemo(() => {
        return nodes.find(n => n.id === selectedNode?.id)?.data;
    }, [nodes, selectedNode?.id]);

    return (
        <SidebarPanelWrapper>
            <SplitPane
                sizes={paneSizes}
                sashRender={() => <div className="h-0.5 bg-dark-300 transition hover:(scale-y-200 bg-teal-800/50)" />}
                onChange={setPaneSizes}
                split="horizontal"
            >
                <Pane minSize={200}>
                    <div className="h-full flex flex-col">
                        <SidebarPanelHeading className="shrink-0">
                            <div className="i-mynaui:layers-three size-4.5" />
                            Nodes in Flow
                        </SidebarPanelHeading>

                        <OverlayScrollbarsComponent className="grow" defer options={defaultOverlayScrollbarsOptions}>
                            <div className="flex flex-col gap-1 p-1.5">
                                {nodeList.map(node => (
                                    <NodeListItem
                                        key={node.id}
                                        id={node.type === BuilderNode.START || node.type === BuilderNode.END ? undefined : node.id}
                                        title={node.detail.title}
                                        icon={`${node.detail.icon} ${node.type === BuilderNode.START || node.type === BuilderNode.END ? "scale-135" : ""}`}
                                        selected={selectedNode?.id === node.id}
                                        pseudoSelected={node.selected}
                                        onClick={() => onNodeClick(node.id)}
                                    />
                                ))}
                            </div>
                        </OverlayScrollbarsComponent>
                    </div>
                </Pane>

                <Pane minSize={300}>
                    <div className="h-full flex flex-col">
                        <SidebarPanelHeading className="shrink-0">
                            <div className="i-mynaui:cog size-4.5" />
                            Properties
                        </SidebarPanelHeading>

                        <OverlayScrollbarsComponent className="grow" defer options={defaultOverlayScrollbarsOptions}>
                            {selectedNode && (
                                <NodePropertyPanel id={selectedNode.id} type={selectedNode.type} data={selectedNodeData} />
                            )}
                        </OverlayScrollbarsComponent>
                    </div>
                </Pane>
            </SplitPane>
        </SidebarPanelWrapper>
    );
}
