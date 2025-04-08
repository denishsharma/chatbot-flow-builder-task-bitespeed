import { RouterProvider } from '@tanstack/react-router'

import { Analytics } from '@vercel/analytics/react'
import { setAutoFreeze } from 'immer'
import { ClickScrollPlugin, OverlayScrollbars } from 'overlayscrollbars'
import React from 'react'
import ReactDOM from 'react-dom/client'
import ReactGA from 'react-ga4'
import { router } from '~@/router'

import { ApplicationStateProvider } from '~/stores/application-state'

import 'virtual:uno.css'
import '~/assets/styles/global.scss'

ReactGA.initialize('G-CJM5ZGWSKN')

OverlayScrollbars.plugin(ClickScrollPlugin)

setAutoFreeze(false)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApplicationStateProvider>
      <RouterProvider router={router} />

      <Analytics />
    </ApplicationStateProvider>
  </React.StrictMode>,
)
