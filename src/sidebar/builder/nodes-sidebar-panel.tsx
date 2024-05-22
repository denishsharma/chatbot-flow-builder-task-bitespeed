import SidebarPanelHeading from "~/components/sidebar/sidebar-panel-heading.tsx";
import SidebarPanelWrapper from "~/components/sidebar/sidebar-panel-wrapper.tsx";

export default function NodesSidebarPanelBuilder() {
    return (
        <SidebarPanelWrapper>
            <SidebarPanelHeading>
                <div>Nodes</div>
            </SidebarPanelHeading>
        </SidebarPanelWrapper>
    );
}
