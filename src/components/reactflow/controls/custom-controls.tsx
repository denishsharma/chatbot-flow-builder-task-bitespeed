import { Controls, type ReactFlowState, useReactFlow, useStore } from "reactflow";
import { shallow } from "zustand/shallow";

import CustomControlButton from "~/components/reactflow/controls/custom-control-button.tsx";

const ZOOM_DURATION = 500;

function selector(s: ReactFlowState) {
    return {
        minZoomReached: s.transform[2] <= s.minZoom,
        maxZoomReached: s.transform[2] >= s.maxZoom,
    };
}

export default function CustomControls() {
    const { maxZoomReached, minZoomReached } = useStore(selector, shallow);
    const { zoomIn, zoomOut, fitView } = useReactFlow();

    return (
        <Controls
            showFitView={false}
            showZoom={false}
            showInteractive={false}
        >
            <CustomControlButton onClick={() => zoomIn({ duration: ZOOM_DURATION })} disabled={maxZoomReached}>
                <div className="i-mynaui:plus size-5" />
            </CustomControlButton>

            <CustomControlButton onClick={() => zoomOut({ duration: ZOOM_DURATION })} disabled={minZoomReached}>
                <div className="i-mynaui:minus size-5" />
            </CustomControlButton>

            <CustomControlButton onClick={() => fitView({ duration: ZOOM_DURATION })}>
                <div className="i-mynaui:maximize size-4" />
            </CustomControlButton>
        </Controls>
    );
}
