import { fileURLToPath, URL } from 'node:url'
import { TanStackRouterVite as tanStackRouter } from '@tanstack/router-vite-plugin'
import unhead from '@unhead/addons/vite'
import react from '@vitejs/plugin-react'
import unocss from 'unocss/vite'
import autoImport from 'unplugin-auto-import/vite'

import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      { find: '~', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
      { find: '~@', replacement: fileURLToPath(new URL('./src/bootstrap', import.meta.url)) },
    ],
  },
  plugins: [
    unocss(),
    tanStackRouter({
      quoteStyle: 'double',
      routesDirectory: './src/pages',
      generatedRouteTree: './.generated/route-tree.gen.ts',
      semicolons: true,
    }),
    react(),
    unhead(),
    autoImport({
      dts: './.generated/auto-import.d.ts',
      include: [/\.[jt]sx?$/],
      imports: [
        {
          from: 'unhead',
          imports: [
            'getActiveHead',
            { name: 'useHead', as: 'withHead' },
            { name: 'useSeoMeta', as: 'withSeoMeta' },
            { name: 'useHeadSafe', as: 'withHeadSafe' },
          ],
        },
      ],
    }),
  ],
})
