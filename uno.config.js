import { defineConfig, presetUno, presetAttributify, presetIcons } from 'unocss'
import { presetDaisy } from 'unocss-preset-daisy'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetDaisy({
      themes: ['light'],
    }),
    presetIcons({
      scale: 1.2,
      cdn: 'https://esm.sh/',
    }),
  ],
})
