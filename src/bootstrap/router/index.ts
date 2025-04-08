import { createRouter } from '@tanstack/react-router'

import { RouteNotFound } from '~@/router/components/route-not-found'

import { routeTree } from '~/../.generated/route-tree.gen'

export const router = createRouter({
  routeTree,
  defaultNotFoundComponent: RouteNotFound,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
