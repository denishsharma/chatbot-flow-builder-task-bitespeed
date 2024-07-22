import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Suspense, lazy, useEffect } from "react";
import { useMedia } from "react-use";
import { isProduction } from "std-env";

import { useApplicationState } from "~/stores/application-state";

import { Whenever } from "~@/components/generics/whenever";

const TanStackRouterDevtools = import.meta.env.PROD ? () => null : lazy(() => import("@tanstack/router-devtools").then(res => ({ default: res.TanStackRouterDevtools })));

export const Route = createRootRoute({
    beforeLoad: () => {
        withHead({
            htmlAttrs: {
                lang: "en",
            },
        });
    },
    component: RootLayout,
});

function RootLayout() {
    const [setMobileView] = useApplicationState(s => [s.actions.view.setMobileView]);

    const isMobile = useMedia("(max-width: 580px)");
    useEffect(() => {
        setMobileView(isMobile);
    }, [isMobile]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <Outlet />

            <Whenever condition={isProduction}>
                <Suspense>
                    <TanStackRouterDevtools />
                </Suspense>
            </Whenever>
        </>
    );
}
