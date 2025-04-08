import type { FinalConnectionState } from '@xyflow/react'
import type { BuilderNodeType } from '~/modules/nodes/types'
import { useReactFlow } from '@xyflow/react'
import { nanoid } from 'nanoid'

import { useCallback, useEffect, useRef } from 'react'

import { useInsertNode } from '~/modules/flow-builder/hooks/use-insert-node'
import { useAddNodeOnEdgeDropState } from '~/stores/add-node-on-edge-drop-state'
import { useApplicationState } from '~/stores/application-state'

export function useAddNodeOnEdgeDrop() {
  const [setBuilderBlur] = useApplicationState(s => [s.actions.builder.setBlur])

  const {
    showMenu,
    dropPosition,
    incomingNodeMetadetails,
    setAnchorPosition,
    setDropPosition,
    setShowMenu,
    setIncomingNodeMetadetails,
  } = useAddNodeOnEdgeDropState(s => ({
    showMenu: s.showMenu,
    dropPosition: s.dropPosition,
    incomingNodeMetadetails: s.incomingNodeMetadetails,
    setAnchorPosition: s.actions.setAnchorPosition,
    setDropPosition: s.actions.setDropPosition,
    setShowMenu: s.actions.setShowMenu,
    setIncomingNodeMetadetails: s.actions.setIncomingNodeMetadetails,
  }))

  const { screenToFlowPosition, addEdges } = useReactFlow()
  const insertNode = useInsertNode()

  const floatingMenuWrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!showMenu) {
      setBuilderBlur(false)
    }
  }, [showMenu, setBuilderBlur])

  const handleAddConnectedNode = useCallback(
    (type: BuilderNodeType) => {
      if (!incomingNodeMetadetails || !incomingNodeMetadetails.fromHandle || !incomingNodeMetadetails.fromNode) { return }
      const newNode = insertNode(type, dropPosition)

      if (incomingNodeMetadetails.fromHandle.type === 'source') {
        addEdges({ id: nanoid(), type: 'deletable', target: newNode.id, sourceHandle: incomingNodeMetadetails.fromHandle.id, source: incomingNodeMetadetails.fromNode.id })
      } else if (incomingNodeMetadetails.fromHandle.type === 'target') {
        addEdges({ id: nanoid(), type: 'deletable', target: incomingNodeMetadetails.fromNode.id, targetHandle: incomingNodeMetadetails.fromHandle.id, source: newNode.id })
      }

      setShowMenu(false)
      setIncomingNodeMetadetails(null)
    },
    [
      insertNode,
      addEdges,
      setShowMenu,
      setIncomingNodeMetadetails,
      incomingNodeMetadetails,
      dropPosition,
    ],
  )

  const onConnectEnd = useCallback(
    (e: MouseEvent | TouchEvent, connectionState: FinalConnectionState) => {
      if (!connectionState.isValid && floatingMenuWrapperRef.current) {
        const { clientX, clientY } = 'changedTouches' in e ? e.changedTouches[0] : e

        const _anchorPositionPadding = 20
        const _floatingMenuWrapperRect = floatingMenuWrapperRef.current.getBoundingClientRect()
        const _addNodeFloatingMenuAnchorPosition = {
          x: (clientX > _floatingMenuWrapperRect.width + _anchorPositionPadding ? _floatingMenuWrapperRect.width - _anchorPositionPadding : clientX < _anchorPositionPadding ? _anchorPositionPadding : clientX) - _floatingMenuWrapperRect.x,
          y: clientY > _floatingMenuWrapperRect.height + _anchorPositionPadding ? _floatingMenuWrapperRect.height - _anchorPositionPadding : clientY < _anchorPositionPadding ? _anchorPositionPadding : clientY - _floatingMenuWrapperRect.y,
        }

        setAnchorPosition(_addNodeFloatingMenuAnchorPosition)
        setBuilderBlur(true)
        setShowMenu(true)
        setIncomingNodeMetadetails(connectionState)
        setDropPosition(screenToFlowPosition({ x: clientX, y: clientY }))
      }
    },
    [
      setAnchorPosition,
      setBuilderBlur,
      setShowMenu,
      setIncomingNodeMetadetails,
      screenToFlowPosition,
      floatingMenuWrapperRef,
      setDropPosition,
    ],
  )

  return {
    handleOnEdgeDropConnectEnd: onConnectEnd,
    floatingMenuWrapperRef,
    handleAddConnectedNode,
  }
}
