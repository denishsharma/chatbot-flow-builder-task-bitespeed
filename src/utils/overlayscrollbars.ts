import type { OverlayScrollbarsComponentProps } from 'overlayscrollbars-react'

export const defaultOverlayScrollbarsOptions: OverlayScrollbarsComponentProps['options'] = {
  overflow: {
    x: 'hidden',
  },
  scrollbars: {
    autoHide: 'move',
    clickScroll: true,
  },
}
