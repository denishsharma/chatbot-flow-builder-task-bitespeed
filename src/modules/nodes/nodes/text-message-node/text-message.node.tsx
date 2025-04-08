import type { Node, NodeProps } from '@xyflow/react'
import type { MessageChannelDetail, MessageChannelType } from '~/modules/nodes/nodes/text-message-node/constants/channels'
import type { BaseNodeData, RegisterNodeMetadata } from '~/modules/nodes/types'
import { Position, useReactFlow } from '@xyflow/react'
import { produce } from 'immer'
import { nanoid } from 'nanoid'

import { isEmpty } from 'radash'
import { memo, useCallback, useMemo, useState } from 'react'
import { cn } from '~@/utils/cn'
import CustomHandle from '~/modules/flow-builder/components/handles/custom-handle'
import { useDeleteNode } from '~/modules/flow-builder/hooks/use-delete-node'
import { MessageChannelSelector } from '~/modules/nodes/nodes/text-message-node/components/message-channel-selector'
import { getMessageChannelDetails } from '~/modules/nodes/nodes/text-message-node/constants/channels'
import { BuilderNode } from '~/modules/nodes/types'
import { getNodeDetail } from '~/modules/nodes/utils'
import TextMessageNodePropertyPanel from '~/modules/sidebar/panels/node-properties/property-panels/text-message-property-panel'

import { useApplicationState } from '~/stores/application-state'

const NODE_TYPE = BuilderNode.TEXT_MESSAGE

export interface TextMessageNodeData extends BaseNodeData {
  channel: MessageChannelType;
  message: string;
}

type TextMessageNodeProps = NodeProps<Node<TextMessageNodeData, typeof NODE_TYPE>>

export function TextMessageNode({ id, isConnectable, selected, data }: TextMessageNodeProps) {
  const meta = useMemo(() => getNodeDetail(NODE_TYPE), [])

  const [showNodePropertiesOf] = useApplicationState(s => [s.actions.sidebar.showNodePropertiesOf])
  const [sourceHandleId] = useState<string>(nanoid())

  const { setNodes } = useReactFlow()
  const deleteNode = useDeleteNode()

  const messageChannelDetail = useMemo(() => {
    return getMessageChannelDetails(data.channel)
  }, [data.channel])

  const onMessageChannelSelect = useCallback(
    (channel: MessageChannelDetail & { type: MessageChannelType }) => {
      setNodes(nodes => produce(nodes, (draft) => {
        const node = draft.find(node => node.id === id)

        if (node) { node.data.channel = channel.type }
      }))
    },
    [id, setNodes],
  )

  const showNodeProperties = useCallback(() => {
    showNodePropertiesOf({ id, type: NODE_TYPE })
  }, [id, showNodePropertiesOf])

  return (
    <>
      <div
        data-selected={selected}
        className="w-xs overflow-clip border border-dark-200 rounded-xl bg-dark-300/50 shadow-sm backdrop-blur-xl transition divide-y divide-dark-200 data-[selected=true]:(border-teal-600 ring-1 ring-teal-600/50)"
        onDoubleClick={showNodeProperties}
      >
        <div className="relative bg-dark-300/50">
          <div className="absolute inset-0">
            <div className="absolute h-full w-3/5 from-teal-900/20 to-transparent bg-gradient-to-r" />
          </div>

          <div className="relative h-9 flex items-center justify-between gap-x-4 px-0.5 py-0.5">
            <div className="flex grow items-center pl-0.5">
              <div className="size-7 flex items-center justify-center">
                <div className="size-6 flex items-center justify-center rounded-lg">
                  <div className={cn(meta.icon, 'size-4')} />
                </div>
              </div>

              <div className="ml-1 text-xs font-medium leading-none tracking-wide uppercase op-80">
                <span className="translate-y-px">
                  {meta.title}
                </span>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-x-0.5 pr-0.5">
              <MessageChannelSelector detail={messageChannelDetail} onSelect={onMessageChannelSelect} />

              <div className="mx-1 h-4 w-px bg-dark-100" />

              <button
                type="button"
                className="size-7 flex items-center justify-center border border-transparent rounded-lg bg-transparent outline-none transition active:(border-dark-200 bg-dark-400/50) hover:(bg-dark-100)"
                onClick={() => showNodeProperties()}
              >
                <div className="i-mynaui:cog size-4" />
              </button>

              <button
                type="button"
                className="size-7 flex items-center justify-center border border-transparent rounded-lg bg-transparent text-red-400 outline-none transition active:(border-dark-200 bg-dark-400/50) hover:(bg-dark-100)"
                onClick={() => deleteNode(id)}
              >
                <div className="i-mynaui:trash size-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col divide-y divide-dark-200">
          <div className="flex flex-col p-4">
            <div className="text-xs text-light-900/50 font-medium">
              Message Content
            </div>

            <div className="line-clamp-4 mt-2 text-sm leading-snug">
              {
                isEmpty(data.message)
                  ? <span className="text-light-900/80 italic">No message yet...</span>
                  : data.message
              }
            </div>
          </div>

          <div className="px-4 py-2">
            <div className="text-xs text-light-900/50">
              This message will be sent to the user using the
              {' '}
              <b className="text-light-900/60 font-semibold">
                "
                {messageChannelDetail.name}
                "
              </b>
              {' '}
              channel.
            </div>

          </div>

          <div className="bg-dark-300/30 px-4 py-2 text-xs text-light-900/50">
            Node:
            {' '}
            <span className="text-light-900/60 font-semibold">
              #
              {id}
            </span>
          </div>
        </div>
      </div>

      <CustomHandle
        type="target"
        id={sourceHandleId}
        position={Position.Left}
        isConnectable={isConnectable}
      />

      <CustomHandle
        type="source"
        id={sourceHandleId}
        position={Position.Right}
        isConnectable={isConnectable}
      />
    </>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: RegisterNodeMetadata<TextMessageNodeData> = {
  type: NODE_TYPE,
  node: memo(TextMessageNode),
  detail: {
    icon: 'i-mynaui:chat',
    title: 'Text Message',
    description: 'Send a text message to the user using different messaging platforms like WhatsApp, Messenger, etc.',
  },
  connection: {
    inputs: 1,
    outputs: 1,
  },
  defaultData: {
    channel: 'sms',
    message: '',
  },
  propertyPanel: TextMessageNodePropertyPanel,
}
