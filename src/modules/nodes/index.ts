import type { BuilderNodeType, RegisterNodeMetadata } from '~/modules/nodes/types'

export const NODES: RegisterNodeMetadata[] = Object.values(import.meta.glob('~/modules/nodes/nodes/**/*.node.tsx', { eager: true })).map((module: any) => module.metadata).filter(Boolean)

export const NODE_TYPES = NODES.reduce((acc, { type, node }) => {
  acc[type] = node
  return acc
}, {} as Record<string, any>)

export const NODES_METADATA = NODES.reduce((acc, current) => {
  acc[current.type] = { ...current, __details: { type: current.type, ...current.detail } }
  return acc
}, {} as Record<BuilderNodeType, RegisterNodeMetadata & { __details: { type: RegisterNodeMetadata['type'] } & RegisterNodeMetadata['detail'] }>)

export const AVAILABLE_NODES = NODES.filter(node => node.available === undefined || node.available).map(node => ({
  type: node.type,
  icon: node.detail.icon,
  title: node.detail.title,
  description: node.detail.description,
}))
