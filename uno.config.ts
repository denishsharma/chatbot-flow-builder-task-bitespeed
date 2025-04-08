import { defineConfig, presetIcons, presetUno, presetWebFonts, transformerDirectives, transformerVariantGroup } from 'unocss'
import presetAnimations from 'unocss-preset-animations'
import { presetUseful } from 'unocss-preset-useful'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons(),
    presetWebFonts({
      fonts: {
        sans: [
          {
            name: 'Inter',
            weights: [
              '400',
              '500',
              '600',
              '700',
              '800',
              '900',
            ],
            italic: true,
          },
        ],
      },
    }),
    presetAnimations(),
    presetUseful() as any,
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
