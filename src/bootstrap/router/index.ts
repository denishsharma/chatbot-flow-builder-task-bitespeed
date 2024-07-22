import { createRouter } from "@tanstack/react-router";

import { routeTree } from "~/../.generated/route-tree.gen";

import { RouteNotFound } from "~@/router/components/route-not-found";

export const router = createRouter({
    routeTree,
    defaultNotFoundComponent: RouteNotFound,
});

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}
