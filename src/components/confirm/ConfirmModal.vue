<template>
  <teleport to="#main_section">
    <transition name="fade">
      <div
        v-if="isModalOpen" class="fixed top-0 left-0 p-15 w-full h-full bg-backdrop flex justify-center items-center z-[1005]"
        @click.self="close"
      >
        <div class="relative bg-primary max-w-[420px] w-full rounded-10 pl-20 pt-20 pr-16 pb-12 shadow-modal dark:shadow-event-dark">
          <div class="text-app-color">
            <p :class="titleClasses">{{ title }}</p>
            <slot />
          </div>
          <div class="flex justify-end items-center">
            <ButtonModule
              :has-hover="true"
              :text="confirmBtnCancel"
              class="text-app-color text-15 mr-12 p-5"
              :class="confirmBtnCancelClass"
              @click="close"
            />
            <ButtonModule
              :text="confirmBtnTitle"
              :class="confirmBtnClass"
              type="black"
              class="rounded-10 px-35 py-12 text-white text-15"
              @click="confirm"
            />
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { preventBodyScroll } from '@/core/helper-functions'

withDefaults(defineProps<{
  confirmBtnTitle?: string
  confirmBtnCancel?: string
  confirmBtnCancelClass?: string
  confirmBtnClass?: string
  title?: string
  titleClasses?: string
}>(), {
  confirmBtnTitle: '',
  confirmBtnCancel: 'Cancel',
  confirmBtnClass: '',
  title: '',
  titleClasses: 'text-22 font-black'
})

const emit = defineEmits(['confirm'])

const isModalOpen = ref(false)

function open () {
  preventBodyScroll(true)
  isModalOpen.value = true
}

function close () {
  preventBodyScroll(false)
  isModalOpen.value = false
}

function confirm () {
  emit('confirm')
}

defineExpose({
  close,
  open
})
</script>
