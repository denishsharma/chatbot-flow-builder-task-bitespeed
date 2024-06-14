import { type ComponentType, useEffect, useState } from "react";
import { toast } from "sonner";
import { Drawer } from "vaul";

import type { SidebarState } from "~/types/flow-builder-store.ts";

import SidebarButtonItem from "~/components/sidebar/sidebar-button-item.tsx";
import { useFlowValidator } from "~/hooks/builder/validate-flow";
import AvailableNodesSidebarPanelBuilder from "~/sidebar/builder/available-nodes-sidebar-panel.tsx";
import NodePropertiesSidebarPanelBuilder from "~/sidebar/builder/node-properties-sidebar-panel.tsx";
import useFlowBuilderStore from "~/stores/flow-builder.tsx";
import { cn } from "~/utils/cn";
import { trackSocialLinkClick } from "~/utils/ga4";

type SwitchSidebarPanelProps = Readonly<{ active: SidebarState["active"] }>;

const PANEL_COMPONENTS: Record<SidebarState["active"], ComponentType> = {
    "available-nodes": AvailableNodesSidebarPanelBuilder,
    "node-properties": NodePropertiesSidebarPanelBuilder,
    "none": () => null,
};

function SwitchSidebarPanel({ active }: SwitchSidebarPanelProps) {
    const PanelComponent = PANEL_COMPONENTS[active];
    return PanelComponent ? <PanelComponent /> : null;
}

type DesktopSidebarFragmentProps = Readonly<{
    activePanel: SidebarState["active"];
    setActivePanel: SidebarState["setActivePanel"];
    isMobile: boolean;
}>;

function DesktopSidebarFragment({ activePanel, setActivePanel, isMobile }: DesktopSidebarFragmentProps) {
    useEffect(() => {
        if (!isMobile && activePanel === "none")
            setActivePanel("available-nodes");
    }, [activePanel, setActivePanel, isMobile]);

    return (
        <div className="relative max-w-sm w-fit flex shrink-0 divide-x divide-dark-300">
            {activePanel !== "none" && (
                <div className="min-w-xs grow bg-dark-500">
                    <SwitchSidebarPanel active={activePanel} />
                </div>
            )}

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

type MobileSidebarFragmentProps = Readonly<{
    activePanel: SidebarState["active"];
    setActivePanel: SidebarState["setActivePanel"];
}>;

function MobileSidebarFragment({ activePanel, setActivePanel }: MobileSidebarFragmentProps) {
    const [isMounted, setIsMounted] = useState(false);

    const [isValidating, validateFlow] = useFlowValidator((isValid) => {
        if (isValid)
            toast.success("Flow is valid", { description: "You can now proceed to the next step", dismissible: true });
        else
            toast.error("Flow is invalid", { description: "Please check if the flow is complete and has no lone nodes" });
    });

    useEffect(() => {
        setActivePanel("none");
        setIsMounted(true);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>

            <div className="pointer-events-none absolute bottom-0 left-0 right-0 flex touch-none items-center justify-center p-4">
                <div className="pointer-events-auto flex touch-auto items-center gap-x-0.5 border border-dark-300 rounded-full bg-dark-900/80 p-1 shadow-black/20 shadow-xl backdrop-blur-2xl">
                    <button
                        onClick={() => setActivePanel("available-nodes")}
                        type="button"
                        className="size-10 flex shrink-0 items-center justify-center border border-transparent rounded-full bg-transparent outline-none transition active:(border-dark-300 bg-dark-600)"
                    >
                        <div className="i-mynaui:grid size-5" />
                    </button>

                    <button
                        onClick={() => setActivePanel("node-properties")}
                        type="button"
                        className="size-10 flex shrink-0 items-center justify-center border border-transparent rounded-full bg-transparent outline-none transition active:(border-dark-300 bg-dark-600)"
                    >
                        <div className="i-mynaui:layers-three size-5" />
                    </button>

                    <div className="h-4 w-px shrink-0 bg-dark-300" />

                    <button
                        onClick={() => validateFlow()}
                        type="button"
                        data-is-validating={isValidating}
                        className="size-10 flex shrink-0 items-center justify-center border border-transparent rounded-full bg-transparent outline-none transition data-[is-validating=true]:(pointer-events-none cursor-not-allowed op-50) active:(border-dark-300 bg-dark-600)"
                    >
                        {isValidating
                            ? <div className="i-svg-spinners:180-ring size-5" />
                            : <div className="i-mynaui:check-circle size-5" />}
                    </button>

                    <div className="h-4 w-px shrink-0 bg-dark-300" />

                    <a
                        href="https://www.linkedin.com/in/denishsharma/"
                        onClick={() => trackSocialLinkClick("linkedin")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="size-10 flex shrink-0 items-center justify-center border border-transparent rounded-full bg-transparent outline-none transition active:(border-dark-300 bg-dark-600)"
                    >
                        <div className="i-mynaui:brand-linkedin size-5" />
                    </a>

                    <a
                        href="https://github.com/denishsharma/chatbot-flow-builder-task-bitespeed"
                        onClick={() => trackSocialLinkClick("github")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="size-10 flex shrink-0 items-center justify-center border border-transparent rounded-full bg-transparent outline-none transition active:(border-dark-300 bg-dark-600)"
                    >
                        <div className="i-mynaui:brand-github size-5" />
                    </a>
                </div>
            </div>

            {isMounted && (
                <Drawer.Root
                    noBodyStyles
                    open={activePanel !== "none"}
                    onOpenChange={(open) => {
                        if (!open)
                            setActivePanel("none");
                    }}
                >
                    <Drawer.Portal>
                        <Drawer.Overlay className="fixed inset-0 bg-black/60" />
                        <Drawer.Content className={cn(
                            "fixed bottom-0 left-0 right-0 mt-24 max-h-90% flex flex-col rounded-t-3xl overflow-clip bg-dark-500 text-light-50 shadow-[0px_-20px_40px_0px_rgba(0,0,0,0.2)] shadow-2xl outline-none ring-1 ring-dark-300",
                            activePanel === "node-properties" && "h-90%",
                        )}
                        >
                            <SwitchSidebarPanel active={activePanel} />
                        </Drawer.Content>
                    </Drawer.Portal>
                </Drawer.Root>
            )}
        </>
    );
}

export default function SidebarFragment() {
    const [activePanel, setActivePanel] = useFlowBuilderStore(state => [state.sidebar.active, state.sidebar.setActivePanel]);
    const [isMobile] = useFlowBuilderStore(state => [state.isMobile]);

    return isMobile ? <MobileSidebarFragment activePanel={activePanel} setActivePanel={setActivePanel} /> : <DesktopSidebarFragment activePanel={activePanel} setActivePanel={setActivePanel} isMobile={isMobile} />;
}
