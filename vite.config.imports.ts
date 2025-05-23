import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

/* CONFIGURATION FOR SCRIPTS AUTO-IMPORT */
export const ImportsBuilder = () => AutoImport({
  dts: './dts/auto-imports.d.ts',

  dirs: [
    './src/composables',
    './src/stores',
    './src/services',
    './src/pages/**/*.store.ts',
    './src/pages/**/*.service.ts',
    './src/widgets/**/*.store.ts',
    './src/widgets/**/*.service.ts'
  ],

  eslintrc: {
    enabled: true
  },

  imports: [
    'vue',
    'vue-router',
    'pinia',
    {
      '@onesignal/onesignal-vue3': ['useOneSignal'],
      '@hocuspocus/provider': ['TiptapCollabProvider']
    }
  ],
  resolvers: [ElementPlusResolver()]
})
