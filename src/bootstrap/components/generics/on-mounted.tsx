import { type ReactNode, useEffect, useState } from "react";

type OnMountedProps = Readonly<{ children: ReactNode }>;

export function OnMounted({ children }: OnMountedProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return <>{mounted && children}</>;
}
