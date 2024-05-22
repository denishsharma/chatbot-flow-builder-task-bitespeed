import type { ComponentPropsWithoutRef } from "react";

import { cn } from "~/utils/cn.ts";

type SidebarPanelWrapperProps = Readonly<ComponentPropsWithoutRef<"div">>;

export default function SidebarPanelWrapper({ children, className, ...props }: SidebarPanelWrapperProps) {
    return (
        <div className={cn("flex flex-col h-full", className)} {...props}>
            {children}
        </div>
    );
}
