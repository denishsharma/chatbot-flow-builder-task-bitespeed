import { useEffect } from "react";
import { toast } from "sonner";
import { Drawer } from "vaul";

import type { ApplicationState } from "~/stores/application-state";

import { useFlowValidator } from "~/modules/flow-builder/hooks/use-flow-validator";
import { SwitchSidebarPanel } from "~/modules/sidebar/components/sidebar-switch-panel";
import { trackSocialLinkClick } from "~/utils/ga4";

import { OnMounted } from "~@/components/generics/on-mounted";
import { Switch } from "~@/components/generics/switch-case";
import { cn } from "~@/utils/cn";

type MobileSidebarFragmentProps = Readonly<{
    activePanel: ApplicationState["sidebar"]["active"];
    setActivePanel: (panel: ApplicationState["sidebar"]["active"]) => void;
}>;

export function MobileSidebarFragment({ activePanel, setActivePanel }: MobileSidebarFragmentProps) {
    const [isValidating, validateFlow] = useFlowValidator((isValid) => {
        if (isValid) {
            toast.success("Flow is valid", { description: "You can now proceed to the next step", dismissible: true });
        } else {
            toast.error("Flow is invalid", { description: "Please check if the flow is complete and has no lone nodes" });
        }
    });

    useEffect(() => {
        setActivePanel("none");
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
                        <Switch match={isValidating}>
                            <Switch.Case value>
                                <div className="i-svg-spinners:180-ring size-5" />
                            </Switch.Case>
                            <Switch.Case value={false}>
                                <div className="i-mynaui:check-circle size-5" />
                            </Switch.Case>
                        </Switch>
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

            <OnMounted>
                <Drawer.Root
                    noBodyStyles
                    open={activePanel !== "none"}
                    onOpenChange={(open) => {
                        if (!open) setActivePanel("none");
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
            </OnMounted>
        </>
    );
}
