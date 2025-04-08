import type { ApplicationState } from '~/stores/application-state'

import { PANEL_COMPONENTS } from '~/modules/sidebar/constants/panels'

type SwitchSidebarPanelProps = Readonly<{ active: ApplicationState['sidebar']['active'] }>

export function SwitchSidebarPanel({ active }: SwitchSidebarPanelProps) {
  const PanelComponent = PANEL_COMPONENTS[active]
  return PanelComponent ? <PanelComponent /> : null
}
