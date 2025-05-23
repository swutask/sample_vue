<template>
  <teleport to="#main_section">
    <transition name="slide-fade" mode="out-in">
      <div v-if="show" class="fixed z-101 top-0 h-full w-full">
        <div v-clickOutside="close" class="fixed top-0 right-0 h-full w-full max-w-[450px] bg-primary shadow-dropdown flex flex-col">
          <!-- H E A D E R -->
          <div class="relative p-30">
            <div class="flex justify-between items-center">
              <h1 class="text-18 md:text-24 font-extrabold text-app-color leading-normal">Change design</h1>
              <ButtonModule
                prefix="icon-close"
                :has-hover="true"
                class="text-14 md:text-18 text-app-color cursor-pointer p-5"
                @click="close"
              />
            </div>
          </div>
          <div class="border-b border-grey-400" />
          <!-- Design -->
          <div v-if="settings" class="h-full w-full flex flex-col justify-between overflow-y-auto text-app-color">
            <div class="w-full max-w-[300px] mx-auto md:max-w-full p-30">
              <!-- T Y P O G R A P H Y  P R E V I E W -->
              <div class="px-15 py-10 md:px-35 md:py-25 rounded-8 bg-grey-450">
                <p class="font-semibold">Typography preview</p>
                <p class="pt-5 text-[1rem]" :style="fontFamily">Then came the night, the side of the gibbous moon was in shadow.</p>
                <p class="pt-5 text-[1rem]" :style="fontFamily">The quick brown fox jumps over the lazy dog.</p>
              </div>

              <!-- Font Family -->
              <div id="font-family" class="py-30 w-full">
                <p class="text-17 font-bold">Font family</p>
                <div class="flex flex-wrap -mx-5">
                  <ButtonModule
                    v-for="family in designData.fontFamilies"
                    :key="family"
                    :text="family"
                    border-width=""
                    class="mt-20 mx-5 border-2 rounded-8 h-40 px-15 hover:border-main-color hover:text-main-color transition-all duration-50"
                    :class="{ 'border-main-color text-main-color border-3': settings.fontFamily === family }"
                    :icon-has-margin="false"
                    :prefix="settings.fontFamily === family ? 'icon-check mr-3 text-21' : ''"
                    @click="update('fontFamily', family)"
                  />
                </div>
              </div>

              <!-- Font Sizes -->
              <div id="font-size" class="pt-30 pb-30">
                <p class="text-17 font-bold">Font size</p>
                <div class="flex flex-wrap -mx-5">
                  <ButtonModule
                    v-for="(size, index) in designData.fontSizes"
                    :key="size"
                    :text="size"
                    border-width=""
                    class="mt-20 mx-5 border-2 rounded-8 h-40 px-15 hover:border-main-color hover:text-main-color transition-all duration-50"
                    :class="[`text-${14 + index}`, { 'border-main-color text-main-color border-3': settings.fontSize === size }]"
                    :icon-has-margin="false"
                    :prefix="settings.fontSize === size ? 'icon-check mr-3 text-21' : ''"
                    @click="update('fontSize', size)"
                  />
                </div>
              </div>

              <!-- Column width -->
              <p class="hidden md:block font-bold mt-30 text-17">Column width</p>
              <div class="hidden md:flex flex-wrap -mx-10 pb-30 border-b border-hover">
                <RadioModule
                  v-for="(column) in designData.columns" :key="column" :value="settings.columnWidth" :has-border="true"
                  class="mt-20 mx-10"
                  :input-value="column" :label="column" group="test"
                  :label-class="[
                    'text-14 mt-5 ml-15',
                    `${settings.columnWidth === column ? 'font-bold' : ''}`,
                    `${ column === 'Wide' ? 'ml-30' : ''}`
                  ]"
                  @input="v => update('columnWidth', v)"
                >
                  <div class="cursor-pointer">
                    <div class="h-[105px] w-[140px]">
                      <DesignImage :image="column" />
                    </div>
                  </div>
                </RadioModule>
              </div>

              <!-- Default icon for new projects -->
              <div v-if="!isTeamAccount" class="mt-30 pb-30 w-full">
                <p class="text-17 font-bold">Default icon for new notes</p>
                <div
                  class="flex items-center justify-center h-[105px] w-[140px] rounded-6 cursor-pointer mt-20 bg-grey-450"
                  @click="openIconsComponent"
                >
                  <Icons
                    ref="iconsRef"
                    class="cursor-pointer"
                    :optionalTop="50"
                    :optionalCoefficient="isMobile ? 50 : 0 "
                    disableModalToggle
                    @setIcon="setIcon"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import designConfig from '@/core/design-config'

const { settings, updateSettings, updateDefaultIcon } = useSettings()
const { isMobile } = useGeneral()
const { isTeamAccount } = useTeam()

const iconsRef = ref(null)
const show = ref(false)
const designData = reactive({
  modes: Object.keys(designConfig.modes),
  columns: Object.keys(designConfig.columns),
  fontSizes: Object.keys(designConfig.fontSizes),
  fontFamilies: Object.keys(designConfig.fontFamilies),
  themes: Object.keys(designConfig.themes),
  marks: Object.keys(designConfig.lineHeights),
  lineHeight: 1.5
})

const fontFamily = computed(() => `font-family: ${settings.value.fontFamily}`)

onMounted(() => {
  designData.lineHeight = +settings.value.lineHeight
})

function update (type: string, value) {
  const design = { ...settings.value }
  design[type] = value

  updateSettings(design)
  settingsService.update({ [type]: value })
}

function openIconsComponent () {
  setTimeout(() => {
    iconsRef.value.toggleModal()
  }, 0)
}

function setIcon (iconName: string) {
  updateDefaultIcon(iconName)
}

function open () {
  show.value = true
}

function close () {
  show.value = false
}

defineExpose({
  open
})
</script>
