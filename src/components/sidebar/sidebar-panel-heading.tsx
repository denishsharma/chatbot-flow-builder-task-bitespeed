import type { ComponentPropsWithoutRef } from "react";

import { cn } from "~/utils/cn.ts";

type SidebarPanelHeadingProps = Readonly<ComponentPropsWithoutRef<"div">>;

export default function SidebarPanelHeading({ children, className, ...props }: SidebarPanelHeadingProps) {
    return (
        <div className={cn("flex items-center text-sm py-2.5 leading-none px-4 border-b select-none border-dark-300 bg-dark-400/50 text-center text-light-100/80 gap-x-2 font-medium", className)} {...props}>
            {children}
        </div>
    );
}
