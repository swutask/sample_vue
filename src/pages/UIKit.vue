<template>
  <div class="bg-primary h-full p-10 py-20">
    <div class="flex flex-wrap fixed top-0 left-0 w-full bg-primary p-20 z-[9999]">
      <router-link class="py-5 px-10 shadow mx-10 rounded-10" to="/"><i class="icon-" />Home</router-link>
      <a v-for="item in navigation" :key="item" class="py-5 px-10 shadow mx-10 rounded-10" :href="`#${item}`">
        <span class="capitalize">{{ item }}</span>
      </a>
    </div>

    <div id="colors" class="pt-[70px]">
      <h1>Colors:</h1>
      <div class="flex flex-wrap">
        <div
          v-for="(key, name, index) in colors"
          :key="name + index"
          :class="typeof key === 'string' ? '' : 'w-full'"
        >
          <div
            v-if="(typeof key === 'string')"
            class="flex items-center m-5 w-[333px] cursor-pointer shadow p-5 rounded-10"
            @click="copyColorName(name)"
          >
            <span class="w-30 h-30 mr-10 rounded-10" :style="`background-color: ${key}`" />-
            <div class="flex">
              {{ key }} - <p>{{ name }}</p>
            </div>
          </div>
          <div v-else class="w-full  shadow-chat-active p-5 m-5 rounded-10">
            <p class="text-25">{{ name }}:</p>
            <div class="flex flex-wrap items-center">
              <div
                v-for="(color, colorName) in key"
                :key="color"
                class="flex m-5 w-[215px] cursor-pointer shadow p-5 rounded-10"
                @click="copyColorName(`${name}-${colorName}`)"
              >
                <span class="w-30 h-30 mr-10 rounded-10" :style="`background-color: ${color}`" />-
                <div class="flex">{{ color }} - {{ colorName }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="icons" class="pt-[70px]">
      <h1>Icons:</h1>
      <div class="flex flex-wrap -m-5">
        <div
          v-for="icon in icomoon.icons"
          :key="icon.properties.name"
          class="flex items-center w-[200px] shadow p-5 rounded-10 cursor-pointer m-5"
          @click="copyIconName(`icon-${icon.properties.name}`)"
        >
          <i :class="`icon-${icon.properties.name} mr-10 text-20`" />
          <p class="truncate">{{ icon.properties.name }}</p>
        </div>
      </div>
    </div>

    <div id="shadows" class="pt-[70px]">
      <div class="hidden" />
      <h1>Shadows:</h1>
      <div class="flex flex-wrap -m-5">
        <div
          v-for="(key, shadowName) in shadows"
          :key="shadowName"
          class="flex items-center w-[200px] p-5 rounded-10 cursor-pointer m-5"
          :class="shadowName !== 'DEFAULT' ? `shadow-${shadowName}` : 'shadow'"
          @click="copyShadowName(`shadow-${shadowName}`)"
        >
          {{ shadowName }}
        </div>
      </div>
    </div>

    <div class="h-[100px]" />

    <div id="components" class="pb-[100px]">
      <h1>Components:</h1>

      <div class="flex flex-col flex-wrap gap-[30px]">
        <template v-for="(item, index) in existingComponents" :key="item.label">
          <div
            class="flex gap-[10px] flex-wrap p-20"
            :class="[item?.column ? 'flex-col items-start' : 'flex-row items-center', item?.bg]"
          >
            <h2>{{ item.label }}:</h2>

            <component :is="item.component" />
          </div>

          <div v-if="index !== existingComponents.length - 1" class="h-2 w-full bg-grey-20 my-5 opacity-40" />
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import icomoon from '@/assets/icons/selection.json'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import tailwind from 'tailwind-config'

import { copy } from '@/core/helper-functions'
const { setNotification } = useGeneral()

const shadows = computed<TIndexedObject<string>>(() => {
  return tailwind.theme.boxShadow
})

const colors = computed(() => {
  return tailwind.theme.colors
})

const navigation = ['colors', 'icons', 'shadows', 'components']

const existingComponents = ref([
  { label: 'ButtonModule', component: 'Buttons' },
  { label: 'CheckboxModule', component: 'CheckBoxes' },
  { label: 'RadioModule', component: 'RadioButtons' },
  { label: 'SelectModule', component: 'SelectModules' },
  { label: 'DropdownModule', component: 'Dropdowns', column: true },
  { label: 'InputModule', component: 'Inputs', column: true, bg: 'bg-selection' }
])

function copyColorName (name: string | number) {
  copy(name, () => setNotification({ uuid: window.crypto.randomUUID(), message: 'Color name copied' }))
}

function copyIconName (name: string) {
  copy(name, () => setNotification({ uuid: window.crypto.randomUUID(), message: 'Icon copied' }))
}

function copyShadowName (name: string) {
  copy(name, () => setNotification({ uuid: window.crypto.randomUUID(), message: 'Shadow copied' }))
}
</script>
