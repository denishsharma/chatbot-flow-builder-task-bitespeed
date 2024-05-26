import type { ComponentType } from "react";
import type { SidebarState } from "~/types/flow-builder-store.ts";

import SidebarButtonItem from "~/components/sidebar/sidebar-button-item.tsx";
import AvailableNodesSidebarPanelBuilder from "~/sidebar/builder/available-nodes-sidebar-panel.tsx";
import NodePropertiesSidebarPanelBuilder from "~/sidebar/builder/node-properties-sidebar-panel.tsx";
import useFlowBuilderStore from "~/stores/flow-builder.tsx";

type SwitchSidebarPanelProps = Readonly<{ active: SidebarState["active"] }>;

const PANEL_COMPONENTS: Record<SidebarState["active"], ComponentType> = {
    "available-nodes": AvailableNodesSidebarPanelBuilder,
    "node-properties": NodePropertiesSidebarPanelBuilder,
};

function SwitchSidebarPanel({ active }: SwitchSidebarPanelProps) {
    const PanelComponent = PANEL_COMPONENTS[active];
    return PanelComponent ? <PanelComponent /> : null;
}

export default function SidebarFragment() {
    const [activePanel, setActivePanel] = useFlowBuilderStore(state => [state.sidebar.active, state.sidebar.setActivePanel]);

    return (
        <div className="max-w-sm w-sm flex shrink-0 divide-x divide-dark-300">
            <div className="min-w-xs grow bg-dark-500">
                <SwitchSidebarPanel active={activePanel} />
            </div>

            <div className="shrink-0 bg-dark-400 p-1.5">
                <div className="h-full flex flex-col gap-2">
                    <SidebarButtonItem active={activePanel === "available-nodes"} onClick={() => setActivePanel("available-nodes")}>
                        <div className="i-mynaui:grid size-5" />
                    </SidebarButtonItem>

                    <div className="mx-a h-px w-4 bg-dark-100" />

                    <SidebarButtonItem active={activePanel === "node-properties"} onClick={() => setActivePanel("node-properties")}>
                        <div className="i-mynaui:layers-three size-5" />
                    </SidebarButtonItem>
                </div>
            </div>
        </div>
    );
}
