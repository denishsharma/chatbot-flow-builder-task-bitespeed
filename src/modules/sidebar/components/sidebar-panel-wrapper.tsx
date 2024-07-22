import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

import type { ComponentPropsWithoutRef } from "react";

import { defaultOverlayScrollbarsOptions } from "~/utils/overlayscrollbars.ts";

import { cn } from "~@/utils/cn";

type SidebarPanelWrapperProps = Readonly<ComponentPropsWithoutRef<"div">>;

export default function SidebarPanelWrapper({ children, className, ...props }: SidebarPanelWrapperProps) {
    return (
        <div className={cn("flex flex-col h-full", className)} {...props}>
            <OverlayScrollbarsComponent className="grow" defer options={defaultOverlayScrollbarsOptions}>
                {children}
            </OverlayScrollbarsComponent>
        </div>
    );
}
