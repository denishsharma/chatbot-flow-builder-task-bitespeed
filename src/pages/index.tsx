import { createFileRoute } from '@tanstack/react-router'
import { ReactFlowProvider } from '@xyflow/react'

import { FlowBuilderModule } from '~/modules/flow-builder/flow-builder-module'
import { NavigationBarModule } from '~/modules/navigation-bar/navigation-bar-module'
import { SidebarModule } from '~/modules/sidebar/sidebar-module'
import { ToasterModule } from '~/modules/toaster/toaster-module'
import { AddNodeOnEdgeDropStateProvider } from '~/stores/add-node-on-edge-drop-state'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <ReactFlowProvider>
      <div className="flex flex-col text-light-50 h-dvh divide-y divide-dark-300">
        <NavigationBarModule />

        <div className="flex grow of-y-hidden divide-x divide-dark-300">
          <div className="grow bg-dark-500 <md:(bg-dark-700)">
            <AddNodeOnEdgeDropStateProvider>
              <FlowBuilderModule />
            </AddNodeOnEdgeDropStateProvider>
          </div>

          <SidebarModule />
        </div>
      </div>

      <ToasterModule />
    </ReactFlowProvider>
  )
}
