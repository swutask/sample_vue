import '@/core/init'

import { createApp } from 'vue'
import VueGtag from 'vue-gtag-next'
import PortalVue from 'portal-vue'
import App from '@/App.vue'
import router from '@/router'
import { createPinia } from 'pinia'
import VCalendar from 'v-calendar'
import 'v-calendar/style.css'

import directives from '@/plugins/directives'
import dragAndDrop from '@/plugins/dragAndDrop'
import { EmitterPlugin } from '@/plugins/emitter'

import '@/assets/scss/main.scss'

const pinia = createPinia()
const app = createApp(App)

app.use(PortalVue)
app.use(pinia)
app.use(router)
app.use(directives)
app.use(dragAndDrop)
app.use(VCalendar, {})
app.use(EmitterPlugin)
app.use(VueGtag, {
  property: [
    { id: 'G-S34J56N7DP' },
    { id: 'AW-16561328233' }
  ]
})

app.config.unwrapInjectedRef = true // this config is temporary and will not be needed in the future.

app.mount('#app')
