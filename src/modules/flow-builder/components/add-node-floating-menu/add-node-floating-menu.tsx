import type { BuilderNodeType } from '~/modules/nodes/types'
import * as Propover from '@radix-ui/react-popover'

import { useCallback, useMemo } from 'react'
import NodeList from '~/modules/flow-builder/components/add-node-floating-menu/components/node-list'
import { AVAILABLE_NODES, NODES_METADATA } from '~/modules/nodes'
import { BuilderNode } from '~/modules/nodes/types'
import { useAddNodeOnEdgeDropState } from '~/stores/add-node-on-edge-drop-state'

type AddNodeFloatingMenuProps = Readonly<{
  onNodeAdd: (type: BuilderNodeType) => void;
}>

export default function AddNodeFloatingMenu({ onNodeAdd }: AddNodeFloatingMenuProps) {
  const [
    showMenu,
    setShowMenu,
    anchorPosition,
    _incomingNodeMetadetails,
  ] = useAddNodeOnEdgeDropState(s => [
    s.showMenu,
    s.actions.setShowMenu,
    s.anchorPosition,
    s.incomingNodeMetadetails,
  ])

  const onOutsideClick = useCallback(
    () => {
      setShowMenu(false)
    },
    [setShowMenu],
  )

  const handleOnNodeAdd = useCallback(
    (type: BuilderNodeType) => {
      setShowMenu(false)
      onNodeAdd(type)
    },
    [onNodeAdd, setShowMenu],
  )

  const incomingNodeMetadetails = useMemo(() => _incomingNodeMetadetails, [_incomingNodeMetadetails])

  const nodesWithMetadata = useMemo(
    () => {
      const mapNodesWithMetadata = (types: BuilderNodeType[]): (typeof AVAILABLE_NODES[number] & { __meta: typeof NODES_METADATA[BuilderNodeType]; __enabled: boolean })[] => types.map((type) => {
        const meta = NODES_METADATA[type]
        const isFromSource = incomingNodeMetadetails?.fromHandle?.type === 'source'
        const isFromTarget = incomingNodeMetadetails?.fromHandle?.type === 'target'

        const enabled = (isFromSource && meta.connection.inputs > 0) || (isFromTarget && meta.connection.outputs > 0) || (!incomingNodeMetadetails)

        return {
          type,
          title: meta.detail.title,
          icon: meta.detail.icon,
          description: meta.detail.description,
          __meta: meta,
          __enabled: enabled,
        }
      })

      return {
        availableNodes: mapNodesWithMetadata(AVAILABLE_NODES.map(node => node.type)),
        additionalNodes: mapNodesWithMetadata([BuilderNode.END]),
      }
    },
    [incomingNodeMetadetails],
  )

  return (
    <Propover.Root open={showMenu}>
      <Propover.Anchor asChild>
        <div className="left absolute size-0 bg-amber" style={{ left: `${anchorPosition.x}px`, top: `${anchorPosition.y}px` }} />
      </Propover.Anchor>
      <Propover.Portal>
        <Propover.Content
          className="isolate z-10 transform-origin-[var(--radix-popover-content-transform-origin)] data-[state=closed]:(animate-out fade-out zoom-out-90%) data-[state=open]:(animate-in zoom-in-95%) animate-duration-200 select-none overflow-clip border border-dark-300 rounded-xl bg-dark-300/40 shadow-2xl shadow-dark-900/30 backdrop-blur-2xl"
          side="bottom"
          align="start"
          tabIndex={-1}
          updatePositionStrategy="always"
          onFocusOutside={() => onOutsideClick()}
          onInteractOutside={() => onOutsideClick()}
          onEscapeKeyDown={() => onOutsideClick()}
        >
          <div tabIndex={-1} className="w-60 flex flex-col outline-none">
            <NodeList nodes={nodesWithMetadata.availableNodes} onNodeAdd={handleOnNodeAdd} />

            <div className="my-0.5 h-px bg-dark-300" />

            <NodeList nodes={nodesWithMetadata.additionalNodes} onNodeAdd={handleOnNodeAdd} />
          </div>
        </Propover.Content>
      </Propover.Portal>
    </Propover.Root>
  )
}
