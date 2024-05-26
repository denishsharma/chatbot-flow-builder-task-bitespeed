import type { BuilderNodeType } from "~/constants/nodes.ts";

export interface NodePropertiesSidebarPanelState {
    selectedNode: { id: string; type: BuilderNodeType } | null | undefined;
    setSelectedNode: (node: { id: string; type: BuilderNodeType }) => void;
    paneSizes: (string | number)[];
    setPaneSizes: (sizes: (string | number)[]) => void;
}

export interface SidebarState {
    active: "node-properties" | "available-nodes";
    setActivePanel: (panel: "node-properties" | "available-nodes") => void;
    showNodePropertiesOf: (node: { id: string; type: BuilderNodeType }) => void;
    panels: {
        nodeProperties: NodePropertiesSidebarPanelState;
    };
}

export interface FlowBuilderStore {
    sidebar: SidebarState;
}
