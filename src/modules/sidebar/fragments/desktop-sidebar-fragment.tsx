import type { ApplicationState } from '~/stores/application-state'

import { useEffect } from 'react'

import SidebarButtonItem from '~/modules/sidebar/components/sidebar-button-item'
import { SwitchSidebarPanel } from '~/modules/sidebar/components/sidebar-switch-panel'

type DesktopSidebarFragmentProps = Readonly<{
  isMobileView: ApplicationState['view']['mobile'];
  activePanel: ApplicationState['sidebar']['active'];
  setActivePanel: (panel: ApplicationState['sidebar']['active']) => void;
}>

export function DesktopSidebarFragment({ isMobileView, activePanel, setActivePanel }: DesktopSidebarFragmentProps) {
  useEffect(() => {
    if (!isMobileView && activePanel === 'none') {
      setActivePanel('available-nodes')
    }
  }, [
    activePanel,
    setActivePanel,
    isMobileView,
  ])

  return (
    <div className="relative max-w-sm w-fit flex shrink-0 divide-x divide-dark-300">
      {activePanel !== 'none' && (
        <div className="min-w-xs grow bg-dark-500">
          <SwitchSidebarPanel active={activePanel} />
        </div>
      )}

      <div className="shrink-0 bg-dark-400 p-1.5">
        <div className="h-full flex flex-col gap-2">
          <SidebarButtonItem active={activePanel === 'available-nodes'} onClick={() => setActivePanel('available-nodes')}>
            <div className="i-mynaui:grid size-5" />
          </SidebarButtonItem>

          <div className="mx-a h-px w-4 bg-dark-100" />

          <SidebarButtonItem active={activePanel === 'node-properties'} onClick={() => setActivePanel('node-properties')}>
            <div className="i-mynaui:layers-three size-5" />
          </SidebarButtonItem>
        </div>
      </div>
    </div>
  )
}
