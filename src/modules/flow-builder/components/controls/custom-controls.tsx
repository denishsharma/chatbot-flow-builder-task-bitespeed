import type { ReactFlowState } from '@xyflow/react'
import { Controls, useReactFlow, useStore } from '@xyflow/react'
import { shallow } from 'zustand/shallow'

import CustomControlButton from '~/modules/flow-builder/components/controls/custom-control-button'
import { useApplicationState } from '~/stores/application-state'

const ZOOM_DURATION = 500

function selector(s: ReactFlowState) {
  return {
    minZoomReached: s.transform[2] <= s.minZoom,
    maxZoomReached: s.transform[2] >= s.maxZoom,
  }
}

export default function CustomControls() {
  const [isMobile] = useApplicationState(s => [s.view.mobile])

  const { maxZoomReached, minZoomReached } = useStore(selector, shallow)
  const { zoomIn, zoomOut, fitView } = useReactFlow()

  return (
    <Controls
      showFitView={false}
      showZoom={false}
      showInteractive={false}
      position={!isMobile ? 'bottom-left' : 'top-right'}
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
  )
}
