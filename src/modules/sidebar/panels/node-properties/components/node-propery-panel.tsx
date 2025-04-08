import type { BuilderNodeType } from '~/modules/nodes/types'
import { useReactFlow } from '@xyflow/react'
import { produce } from 'immer'

import { useCallback } from 'react'

import { NODE_PROPERTY_PANEL_COMPONENTS } from '~/modules/sidebar/panels/node-properties/constants/property-panels'
import UnavailableNodePropertyPanel from '~/modules/sidebar/panels/node-properties/property-panels/unavailable-property-panel'
import { trackSomethingInNodeProperties } from '~/utils/ga4'

type NodePropertyPanelProps = Readonly<{ id: string; type: BuilderNodeType; data: any }>

export function NodePropertyPanel({ id, type, data }: NodePropertyPanelProps) {
  const PanelComponent = NODE_PROPERTY_PANEL_COMPONENTS[type]

  const { setNodes } = useReactFlow()

  const nodeData = produce(data, () => {})

  const updateData = useCallback((newData: Partial<any>) => {
    setNodes(nds => produce(nds, (draft) => {
      const node = draft.find(n => n.id === id)
      if (node) { node.data = { ...node.data, ...newData } }
    }))

    trackSomethingInNodeProperties(`update-node-properties-of-${type}`)
  }, [
    id,
    setNodes,
    type,
  ])

  return (PanelComponent && nodeData) ? <PanelComponent id={id} type={type} data={nodeData} updateData={updateData} /> : <UnavailableNodePropertyPanel />
}
