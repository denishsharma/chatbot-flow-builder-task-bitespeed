import type { ComponentType } from 'react'
import type { BuilderNodeType } from '~/modules/nodes/types'

import { NODES } from '~/modules/nodes'

export const NODE_PROPERTY_PANEL_COMPONENTS: Partial<Record<BuilderNodeType, ComponentType<{
  id: string;
  type: BuilderNodeType;
  data: any;
  updateData: (data: Partial<any>) => void;
}>>> = NODES.reduce((acc, node) => {
  acc[node.type] = node.propertyPanel
  return acc
}, {} as any)
