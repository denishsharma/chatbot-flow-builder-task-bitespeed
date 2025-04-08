import type { FC, PropsWithChildren, ReactNode } from 'react'
import type { StateCreator } from 'zustand'
import type { DeepPartial } from '~@/types/generics'
import defu from 'defu'
import { createContext, useContext, useRef } from 'react'
import { create, useStore } from 'zustand'

import { immer } from 'zustand/middleware/immer'

/**
 * Define a store instance with default values and immer middleware.
 *
 * @param store Function that creates a store instance
 * @param defaults Default values for the store
 * @returns A function that creates a store instance with the provided defaults
 */
export function defineStoreInstance<T, M>(store: (init: T) => StateCreator<T & M, [], ['zustand/immer', never][]>, defaults?: DeepPartial<T>) {
  return (initial?: DeepPartial<T>) => {
    const state: T = defu(initial, defaults) as T

    return create<T & M>()(store(state))
  }
}

// ! Used for type inference only. Serves no other purpose.
immer(() => { })

export type DefineStoreInstance<T, M> = ReturnType<typeof defineStoreInstance<T, M>>
export type StoreInstance<T, M> = ReturnType<ReturnType<typeof defineStoreInstance<T, M>>>

/**
 * Create a store context with a provider and hook for consuming the store.
 *
 * @param instance Provide a store instance created with `defineStoreInstance`
 * @returns An array containing the StoreProvider, useStoreContext, withStoreProvider, and StoreContext
 */
export function createStoreContext<T, M>(instance: DefineStoreInstance<T, M>) {
  const StoreContext = createContext<StoreInstance<T, M> | null>(null)

    type StoreProviderProps = Readonly<{
      children: ReactNode;
      initial?: DeepPartial<T>;
    }>

    function StoreProvider({ children, initial }: StoreProviderProps) {
      const storeRef = useRef<StoreInstance<T, M>>()
      if (!storeRef.current) {
        storeRef.current = instance(initial) as StoreInstance<T, M>
      }

      return (
        <StoreContext.Provider value={storeRef.current}>
          {children}
        </StoreContext.Provider>
      )
    }

    function useStoreContext<K>(selector: (state: T & M) => K): K {
      const store = useContext(StoreContext)

      if (!store) {
        throw new Error('useStore must be used within a StoreProvider')
      }

      return useStore(store, selector)
    }

    function withStoreProvider<P extends PropsWithChildren>(component: FC<P>, initial?: DeepPartial<T>): FC<P> {
      const Component = component

      return props => (
        <StoreProvider initial={initial}>
          <Component {...props} />
        </StoreProvider>
      )
    }

    return [
      StoreProvider,
      useStoreContext,
      withStoreProvider,
      StoreContext,
    ] as const
}
