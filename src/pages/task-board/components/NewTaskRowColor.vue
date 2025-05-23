<template>
  <div v-clickOutside="close" class="relative">
    <div class="cursor-pointer" :class="{ 'mr-5': withMargin }" @click="open">
      <slot>
        <svg :width="width" :height="height" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="22.5" cy="22.5" r="18.5" :stroke="`#${computedColor}`" stroke-width="8" />
        </svg>
      </slot>
    </div>
    <div
      v-if="showDropdown"
      class="absolute z-50 top-30 rounded-8 flex flex-wrap justify-between w-[185px] p-7 -m-7 shadow-dropdown bg-primary"
      :class="position"
    >
      <div
        v-for="c in colors"
        :key="c"
        class="rounded-6 anim-color-200 p-7 cursor-pointer hover:bg-menu-hover"
        @click="save(c)"
      >
        <svg class="w-18 h-18" width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="22.5" cy="22.5" r="18.5" :stroke="`#${c.toString(16)}`" stroke-width="8" />
        </svg>
      </div>

      <div
        v-if="color"
        class="flex items-center p-7 pb-0 text-12 text-app-color opacity-50
                 hover:opacity-100 cursor-pointer transition duration-50"
        @click="save(null)"
      >
        <i class="icon-remove mr-5" />
        <p>Remove color</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  color: number
  position?: string
  withMargin?: boolean
  disabled?: boolean
  width?: number
  height?: number
}>(), {
  position: 'left-1/2 -translate-x-1/2',
  withMargin: true,
  disabled: false,
  width: 14,
  height: 14
})

const emit = defineEmits(['updateColor'])

const showDropdown = ref(false)

const colors = [6250495, 16772959, 16736095, 6291359, 6284031, 8947848, 12148735, 6291426, 16758111, 16736239]

const computedColor = computed(() => props.color?.toString(16) || 'ccc')

function open (e: Event) {
  if (props.disabled) return
  e.stopPropagation()
  showDropdown.value = !showDropdown.value
}

function close () {
  showDropdown.value = false
}

function save (value: number) {
  emit('updateColor', value)
  close()
}
</script>
