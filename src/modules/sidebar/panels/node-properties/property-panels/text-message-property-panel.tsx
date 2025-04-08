import type { TextMessageNodeData } from '~/modules/nodes/nodes/text-message-node/text-message.node'
import type { BuilderNodeType } from '~/modules/nodes/types'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import { listify } from 'radash'
import { useMemo } from 'react'

import { cn } from '~@/utils/cn'

import { MessageChannelDetails } from '~/modules/nodes/nodes/text-message-node/constants/channels'

type TextMessageNodePropertyPanelProps = Readonly<{
  id: string;
  type: BuilderNodeType;
  data: TextMessageNodeData;
  updateData: (data: Partial<TextMessageNodeData>) => void;
}>

export default function TextMessageNodePropertyPanel({ id, data, updateData }: TextMessageNodePropertyPanelProps) {
  const currentMessageChannelDetail = useMemo(() => {
    return MessageChannelDetails[data.channel]
  }, [data.channel])

  return (
    <div className="flex flex-col gap-4.5 p-4">
      <div className="flex flex-col">
        <div className="text-xs text-light-900/60 font-semibold">
          Unique Identifier
        </div>

        <div className="mt-2 flex">
          <input type="text" value={id} readOnly className="h-8 w-full border border-dark-200 rounded-md bg-dark-400 px-2.5 text-sm font-medium shadow-sm outline-none transition hover:(bg-dark-300/60) read-only:(text-light-900/80 op-80 hover:bg-dark-300/30)" />
        </div>
      </div>

      <div className="flex flex-col">
        <div className="text-xs text-light-900/60 font-semibold">
          Channel
        </div>

        <div className="mt-2 flex">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button
                type="button"
                className="h-8 w-full flex items-center justify-between border border-dark-200 rounded-md bg-dark-400 px-2.5 shadow-sm outline-none transition active:(border-dark-200 bg-dark-400/50) data-[state=open]:(border-dark-200 bg-dark-500) data-[state=closed]:(hover:bg-dark-300/60)"
              >
                <div className="flex items-center">
                  <div className={cn(currentMessageChannelDetail.icon, 'size-4')} />

                  <div className="ml-2 text-sm font-medium leading-none tracking-wide">
                    {currentMessageChannelDetail.name}
                  </div>
                </div>

                <div className="i-lucide:chevrons-up-down ml-1 size-3 op-50" />
              </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content
                sideOffset={5}
                align="start"
                className={cn(
                  '[width:var(--radix-popper-anchor-width)] select-none border border-dark-100 rounded-lg bg-dark-200/90 p-0.5 text-light-50 shadow-xl backdrop-blur-lg transition',
                  'animate-in data-[side=top]:slide-in-bottom-0.5 data-[side=bottom]:slide-in-bottom--0.5 data-[side=bottom]:fade-in-40 data-[side=top]:fade-in-40',
                )}
              >
                {listify(MessageChannelDetails, (k, v) => (
                  <DropdownMenu.Item
                    key={k}
                    className="cursor-pointer border border-transparent rounded-lg p-1.5 outline-none transition active:(border-dark-100 bg-dark-300/60) hover:bg-dark-100"
                    onSelect={() => updateData({ channel: k })}
                  >
                    <div className="flex items-center gap-x-2">
                      <div className={cn(v.icon, 'size-4')} />

                      <div className="text-xs font-medium leading-none tracking-wide">
                        {v.name}
                      </div>
                    </div>
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="text-xs text-light-900/60 font-semibold">
          Message
        </div>

        <div className="mt-2 flex">
          <textarea
            value={data.message}
            onChange={e => updateData({ message: e.target.value })}
            placeholder="Type your message here..."
            className="min-h-30 w-full resize-none border border-dark-200 rounded-md bg-dark-400 px-2.5 py-2 text-sm font-medium shadow-sm outline-none transition focus:(border-teal-800 bg-dark-500 ring-2 ring-teal-800/50) hover:(bg-dark-300/60) placeholder:(text-light-900/50 font-normal italic) read-only:(text-light-900/80)"
          />
        </div>
      </div>
    </div>
  )
}
