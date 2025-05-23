import type { Plugin } from 'vue'
import mitt from 'mitt'

export const EmitterPlugin: Plugin = {
  install: (app) => {
    const emitter = mitt()
    app.config.globalProperties.emitter = emitter

    app.provide('emitter', emitter)
  }
}
