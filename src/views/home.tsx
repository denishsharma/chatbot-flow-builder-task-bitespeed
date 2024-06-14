import { useMedia } from "react-use";
import { ReactFlowProvider } from "reactflow";
import { Toaster } from "sonner";

import FlowBuilder from "~/builder/flow-builder.tsx";
import NavigationBarFragment from "~/fragments/navigation-bar.tsx";
import SidebarFragment from "~/fragments/sidebar.tsx";
import useFlowBuilderStore from "~/stores/flow-builder";

export default function HomeView() {
    const [setIsMobile] = useFlowBuilderStore(state => [state.setMobile]);

    const isMobile = useMedia("(max-width: 580px)");

    setIsMobile(isMobile);

    return (
        <ReactFlowProvider>
            <div className="flex flex-col text-light-50 h-dvh divide-y divide-dark-300">
                <NavigationBarFragment />

                <div className="flex grow of-y-hidden divide-x divide-dark-300">
                    <div className="grow bg-dark-500 <md:(bg-dark-700)">
                        <FlowBuilder />
                    </div>

                    <SidebarFragment />
                </div>
            </div>

            <Toaster
                richColors
                position={isMobile ? "top-center" : "bottom-center"}
                theme="dark"
                gap={12}
                closeButton
                toastOptions={{
                    classNames: {
                        toast: "rounded-xl w-full shadow-xl items-start gap-x-2",
                        title: "text-sm font-medium leading-none",
                        description: "op-80 leading-snug mt-1",
                        icon: "shrink-0",
                        success: "[--success-border:theme(colors.teal.900)] [--success-bg:theme(colors.dark.700)]",
                        error: "[--error-border:theme(colors.red.900)] [--error-bg:theme(colors.dark.800)]",
                    },
                }}
            />
        </ReactFlowProvider>
    );
}
