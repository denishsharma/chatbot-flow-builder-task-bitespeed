import type { ComponentType } from 'react'
import type { ApplicationState } from '~/stores/application-state'

import AvailableNodesPanel from '~/modules/sidebar/panels/available-nodes/available-nodes-panel'
import { NodePropertiesPanel } from '~/modules/sidebar/panels/node-properties/node-properties-panel'

export const PANEL_COMPONENTS: Record<ApplicationState['sidebar']['active'], ComponentType> = {
  'available-nodes': AvailableNodesPanel,
  'node-properties': NodePropertiesPanel,
  'none': () => null,
}
