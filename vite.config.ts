import { fileURLToPath, URL } from 'node:url'

import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { IconsPluginCustom } from './vite.config.icons'
import { ComponentsBuilder } from './vite.config.components'
import { ImportsBuilder } from './vite.config.imports'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    visualizer({
      open: true
    }),
    IconsPluginCustom(),
    ComponentsBuilder(),
    ImportsBuilder()
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      colors: fileURLToPath(new URL('./tailwind/tailwind.colors.cjs', import.meta.url)),
      spacing: fileURLToPath(new URL('./tailwind/tailwind.spacing.cjs', import.meta.url)),
      fontSize: fileURLToPath(new URL('./tailwind/tailwind.spacing.cjs', import.meta.url)),
      'tailwind-config': fileURLToPath(new URL('./tailwind/tailwind.config.cjs', import.meta.url))
    }
  },

  optimizeDeps: {
    include: ['colors',
      'spacing',
      'fontSize',
      'tailwind-config',
      '@fullcalendar/rrule',
      '@fullcalendar/vue3',
      '@fullcalendar/daygrid',
      '@fullcalendar/timegrid',
      '@fullcalendar/interaction',
      'dayjs/plugin/weekOfYear'
    ]
  }
})
