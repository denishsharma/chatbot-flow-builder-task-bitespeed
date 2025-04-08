import type { Connection, Edge, EdgeTypes, Node, NodeChange } from '@xyflow/react'
import { addEdge, Background, ReactFlow, useEdgesState, useNodesState, useReactFlow } from '@xyflow/react'
import { nanoid } from 'nanoid'
import { useCallback } from 'react'
import { cn } from '~@/utils/cn'
import AddNodeFloatingMenu from '~/modules/flow-builder/components/add-node-floating-menu/add-node-floating-menu'
import CustomControls from '~/modules/flow-builder/components/controls/custom-controls'
import CustomDeletableEdge from '~/modules/flow-builder/components/edges/custom-deletable-edge'
import { defaultEdges, defaultNodes } from '~/modules/flow-builder/constants/default-nodes-edges'
import { useAddNodeOnEdgeDrop } from '~/modules/flow-builder/hooks/use-add-node-on-edge-drop'
import { useDeleteKeyCode } from '~/modules/flow-builder/hooks/use-delete-key-code'
import { useDragDropFlowBuilder } from '~/modules/flow-builder/hooks/use-drag-drop-flow-builder'
import { useIsValidConnection } from '~/modules/flow-builder/hooks/use-is-valid-connection'
import { useNodeAutoAdjust } from '~/modules/flow-builder/hooks/use-node-auto-adjust'
import { useOnNodesDelete } from '~/modules/flow-builder/hooks/use-on-nodes-delete'
import { NODE_TYPES } from '~/modules/nodes'
import { useApplicationState } from '~/stores/application-state'

const edgeTypes: EdgeTypes = {
  deletable: CustomDeletableEdge,
}

export function FlowBuilderModule() {
  const [isMobileView, isBuilderBlurred] = useApplicationState(s => [s.view.mobile, s.builder.blurred])

  const [
    nodes,
    _,
    onNodesChange,
  ] = useNodesState<Node>(defaultNodes)
  const [
    edges,
    setEdges,
    onEdgesChange,
  ] = useEdgesState<Edge>(defaultEdges)

  const { getNodes } = useReactFlow()

  const deleteKeyCode = useDeleteKeyCode()
  const onNodesDelete = useOnNodesDelete(nodes)

  const autoAdjustNode = useNodeAutoAdjust()

  const [onDragOver, onDrop] = useDragDropFlowBuilder()
  const isValidConnection = useIsValidConnection(nodes, edges)
  const { handleOnEdgeDropConnectEnd, floatingMenuWrapperRef, handleAddConnectedNode } = useAddNodeOnEdgeDrop()

  const onConnect = useCallback(
    (connection: Connection) => {
      const edge = { ...connection, id: nanoid(), type: 'deletable' } as Edge
      setEdges(edges => addEdge(edge, edges))
    },
    [setEdges],
  )

  const handleAutoAdjustNodeAfterNodeMeasured = useCallback(
    (id: string) => {
      setTimeout(() => {
        const node = getNodes().find(n => n.id === id)
        if (!node) { return }

        if (node.measured === undefined) {
          handleAutoAdjustNodeAfterNodeMeasured(id)
          return
        }

        autoAdjustNode(node)
      })
    },
    [autoAdjustNode, getNodes],
  )

  const handleNodesChange = useCallback(
    (changes: NodeChange[]) => {
      onNodesChange(changes)

      changes.forEach((change) => {
        if (change.type === 'dimensions') {
          const node = getNodes().find(n => n.id === change.id)
          if (node) {
            autoAdjustNode(node)
          }
        }

        if (change.type === 'add') {
          handleAutoAdjustNodeAfterNodeMeasured(change.item.id)
        }
      })
    },
    [
      autoAdjustNode,
      getNodes,
      handleAutoAdjustNodeAfterNodeMeasured,
      onNodesChange,
    ],
  )

  return (
    <div className="relative size-full">
      <ReactFlow
        proOptions={{ hideAttribution: true }}
        nodeTypes={NODE_TYPES}
        onInit={({ fitView }) => fitView().then()}
        nodes={nodes}
        onNodesChange={handleNodesChange}
        edgeTypes={edgeTypes}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectEnd={handleOnEdgeDropConnectEnd}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeDragStop={(_, node) => { autoAdjustNode(node) }}
        onNodesDelete={onNodesDelete}
        isValidConnection={isValidConnection}
        multiSelectionKeyCode={null}
        deleteKeyCode={deleteKeyCode}
        snapGrid={[16, 16]}
        snapToGrid
        fitView
      >
        <Background color={isMobileView ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.25)'} gap={32} />
        <CustomControls />
      </ReactFlow>

      <div
        className={cn(
          'pointer-events-none absolute inset-0 backdrop-blur-5 transition-all',
          isBuilderBlurred && 'op-100 bg-dark-500/30 backdrop-saturate-80 pointer-events-auto',
          !isBuilderBlurred && 'op-0 bg-dark-800/0 backdrop-saturate-100 pointer-events-none',
        )}
      >
        <div ref={floatingMenuWrapperRef} className="relative size-full">
          <AddNodeFloatingMenu onNodeAdd={handleAddConnectedNode} />
        </div>
      </div>
    </div>
  )
}
