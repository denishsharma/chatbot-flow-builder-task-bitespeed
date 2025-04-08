import { InferSeoMetaPlugin } from '@unhead/addons'
import { createHead } from 'unhead/client'

export function initializeHead() {
  const head = createHead()
  head.use(InferSeoMetaPlugin())
  return head
}

export const unheadInstance = initializeHead()
