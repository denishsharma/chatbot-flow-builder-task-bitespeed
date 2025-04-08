import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'

type OnMountedProps = Readonly<{ children: ReactNode }>

export function OnMounted({ children }: OnMountedProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
    setMounted(true)
  }, [])

  return <>{mounted && children}</>
}
