import { Background, ReactFlow } from "reactflow";

import CustomControls from "~/components/reactflow/controls/custom-controls.tsx";
import SidebarButtonItem from "~/components/sidebar/sidebar-button-item.tsx";
import NodesSidebarPanelBuilder from "~/sidebar/builder/nodes-sidebar-panel.tsx";

export default function HomeView() {
    return (
        <div className="flex flex-col text-light-50 h-dvh divide-y divide-dark-300">
            <div className="relative shrink-0 bg-dark-700 px-1.5 py-2">
                <div className="absolute inset-0">
                    <div className="absolute h-full w-4/12 from-teal-900/20 to-transparent bg-gradient-to-r" />
                </div>

                <div className="relative flex items-stretch justify-between gap-x-8">
                    <div className="flex items-center py-0.5 pl-2">
                        <div className="size-8 flex select-none items-center justify-center rounded-lg bg-teal-600 text-sm font-bold leading-none">
                            <span className="translate-y-px">
                                DS
                            </span>
                        </div>

                        <div className="ml-3 h-full flex flex-col select-none justify-center gap-y-1 leading-none">
                            <div className="text-sm font-medium leading-none">
                                Chatbot Flow Builder - BiteSpeed Frontend Task
                            </div>

                            <div className="text-xs text-light-50/60 leading-none">
                                By Denish Sharma
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-x-2">
                        <button type="button" className="h-full flex items-center justify-center gap-x-2 border border-dark-300 rounded-lg bg-dark-300/50 px-3 text-sm transition active:(bg-dark-400) hover:(bg-dark-200)">
                            <div className="i-mynaui:save size-4.5" />
                            <span className="pr-0.5">
                                Save Changes
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex grow divide-x divide-dark-300">
                <div className="grow bg-dark-500">
                    <ReactFlow proOptions={{ hideAttribution: true }}>
                        <Background gap={48} />
                        <CustomControls />
                    </ReactFlow>
                </div>

                <div className="flex shrink-0 divide-x divide-dark-300">
                    <div className="min-w-xs grow bg-dark-500">
                        <NodesSidebarPanelBuilder />
                    </div>

                    <div className="shrink-0 bg-dark-400 p-1.5">
                        <div className="h-full flex flex-col gap-2">
                            <SidebarButtonItem active>
                                <div className="i-mynaui:layers-three size-5" />
                            </SidebarButtonItem>

                            <div className="mx-a h-px w-4 bg-dark-100" />

                            <SidebarButtonItem>
                                <div className="i-mynaui:grid size-5" />
                            </SidebarButtonItem>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
