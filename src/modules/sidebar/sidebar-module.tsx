import { Switch } from '~@/components/generics/switch-case'
import { DesktopSidebarFragment } from '~/modules/sidebar/fragments/desktop-sidebar-fragment'
import { MobileSidebarFragment } from '~/modules/sidebar/fragments/mobile-sidebar-fragment'

import { useApplicationState } from '~/stores/application-state'

export function SidebarModule() {
  const { isMobileView, activePanel, setActivePanel } = useApplicationState(s => ({
    isMobileView: s.view.mobile,
    activePanel: s.sidebar.active,
    setActivePanel: s.actions.sidebar.setActivePanel,
  }))

  return (
    <Switch match={isMobileView}>
      <Switch.Case value>
        <MobileSidebarFragment activePanel={activePanel} setActivePanel={setActivePanel} />
      </Switch.Case>
      <Switch.Default>
        <DesktopSidebarFragment isMobileView={isMobileView} activePanel={activePanel} setActivePanel={setActivePanel} />
      </Switch.Default>
    </Switch>
  )
}
