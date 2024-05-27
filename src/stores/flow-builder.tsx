import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import type { FlowBuilderStore } from "~/types/flow-builder-store.ts";

const useFlowBuilderStore = create<FlowBuilderStore>()(
    immer(set => ({
        sidebar: {
            active: "available-nodes",
            setActivePanel: panel => set((state) => {
                state.sidebar.active = panel;
            }),
            showNodePropertiesOf: node => set((state) => {
                state.sidebar.active = "node-properties";
                state.sidebar.panels.nodeProperties.selectedNode = node;
            }),
            panels: {
                nodeProperties: {
                    selectedNode: null,
                    setSelectedNode: node => set((state) => {
                        state.sidebar.panels.nodeProperties.selectedNode = node;
                    }),
                    paneSizes: ["40%", "auto"],
                    setPaneSizes: sizes => set((state) => {
                        state.sidebar.panels.nodeProperties.paneSizes = sizes;
                    }),
                },
            },
        },
    })),
);

export default useFlowBuilderStore;
