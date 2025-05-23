<template>
  <teleport to="#main_section">
    <transition name="fade">
      <div
        v-if="isModalOpen"
        class="fixed top-0 left-0 p-15 w-full h-full bg-backdrop flex justify-center items-center z-[105]"
        @click.self="close"
      >
        <div
          class="rounded-10 relative w-full h-full bg-primary md:rounded-20 shadow-modal dark:shadow-event-dark overflow-hidden"
          :class="size"
        >
          <ButtonModule
            v-if="showCloseIcon"
            prefix="icon-close text-13"
            class="hover:bg-menu-hover p-10 rounded-8 absolute top-20 right-20 cursor-pointer"
            teleportTooltip
            tooltipText="Close"
            tooltipBottom
            @click="close"
          />

          <div class="h-full">
            <slot />
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { preventBodyScroll } from '@/core/helper-functions'

const props = withDefaults(defineProps<{
  isModalOpen: boolean
  showCloseIcon?: boolean
  size?: string
}>(), {
  size: 'max-w-[1220px] md:max-h-[850px]',
  showCloseIcon: true
})

const emit = defineEmits(['close'])

const close = () => {
  emit('close')
}

watch(() => props.isModalOpen, (value) => {
  preventBodyScroll(value)
})
</script>
