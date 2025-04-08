import type { FinalConnectionState } from '@xyflow/react'

import { immer } from 'zustand/middleware/immer'

import { createStoreContext, defineStoreInstance } from '~@/store'

interface State {
  anchorPosition: {
    x: number;
    y: number;
  };
  dropPosition: {
    x: number;
    y: number;
  };
  showMenu: boolean;
  incomingNodeMetadetails: FinalConnectionState | null;
}

interface Actions {
  actions: {
    setAnchorPosition: (position: { x: number; y: number }) => void;
    setDropPosition: (position: { x: number; y: number }) => void;
    setShowMenu: (show: boolean) => void;
    setIncomingNodeMetadetails: (detail: FinalConnectionState | null) => void;
  };
}

const addNodeOnEdgeDropStateInstance = defineStoreInstance<State, Actions>((init) => {
  return immer(set => ({
    ...init,
    actions: {
      setAnchorPosition: position => set((state) => {
        state.anchorPosition = position
      }),
      setDropPosition: position => set((state) => {
        state.dropPosition = position
      }),
      setShowMenu: show => set((state) => {
        state.showMenu = show
      }),
      setIncomingNodeMetadetails: detail => set((state) => {
        state.incomingNodeMetadetails = detail
      }),
    },
  }))
}, {
  anchorPosition: {
    x: 0,
    y: 0,
  },
  dropPosition: {
    x: 0,
    y: 0,
  },
  showMenu: false,
  incomingNodeMetadetails: null,
})

export const [AddNodeOnEdgeDropStateProvider, useAddNodeOnEdgeDropState] = createStoreContext<State, Actions>(addNodeOnEdgeDropStateInstance)

export type AddNodeOnEdgeDropState = State
