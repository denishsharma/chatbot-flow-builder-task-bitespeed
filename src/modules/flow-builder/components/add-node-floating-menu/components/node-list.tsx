import type { AVAILABLE_NODES, NODES_METADATA } from '~/modules/nodes'
import type { BuilderNodeType } from '~/modules/nodes/types'

import { cn } from '~@/utils/cn'

type NodeListProps = Readonly<{
  nodes: (typeof AVAILABLE_NODES[number] & { __meta: typeof NODES_METADATA[BuilderNodeType]; __enabled: boolean })[];
  onNodeAdd: (type: BuilderNodeType) => void;
}>

export default function NodeList({ nodes, onNodeAdd }: NodeListProps) {
  return (
    <div className="flex flex-col gap-y-0.5 p-1">
      {nodes.map(node => (
        <button
          onClick={() => {
            onNodeAdd(node.type)
          }}
          type="button"
          disabled={!node.__enabled}
          key={node.type}
          className="flex cursor-pointer items-center rounded-xl bg-transparent p-1 transition disabled:(pointer-events-none cursor-not-allowed op-20) active:(bg-dark-300/40) hover:(bg-dark-300)"
        >
          <div className="size-7 flex shrink-0 items-center justify-center border border-dark-100/60 rounded-lg bg-dark-200">
            <div className={cn(node.icon, 'text-white', node.icon === 'i-mynaui:stop' ? 'size-5.5' : 'size-4')} />
          </div>

          <div className="ml-2 text-sm text-light-800">
            {node.title}
          </div>
        </button>
      ))}
    </div>
  )
}
