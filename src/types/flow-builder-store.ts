import type { BuilderNodeType } from "~/constants/nodes.ts";

export interface NodePropertiesSidebarPanelState {
    selectedNode: { id: string; type: BuilderNodeType } | null | undefined;
    setSelectedNode: (node: { id: string; type: BuilderNodeType } | undefined | null) => void;
    paneSizes: (string | number)[];
    setPaneSizes: (sizes: (string | number)[]) => void;
}

export interface SidebarState {
    active: "node-properties" | "available-nodes" | "none";
    setActivePanel: (panel: "node-properties" | "available-nodes" | "none") => void;
    showNodePropertiesOf: (node: { id: string; type: BuilderNodeType }) => void;
    panels: {
        nodeProperties: NodePropertiesSidebarPanelState;
    };
}

export interface FlowBuilderStore {
    isMobile: boolean;
    setMobile: (isMobile: boolean) => void;
    sidebar: SidebarState;
}
