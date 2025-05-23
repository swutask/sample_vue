<template>
  <div
    role="radio" tabindex="0"
    :aria-checked="value === inputValue"
    class="focus:outline-none"
    :class="disabled ? 'cursor-not-allowed' : 'cursor-pointer'"
    @click="toggle"
    @keydown.space.prevent="toggle"
    @focus="hasFocus = true"
    @blur="hasFocus = false"
  >
    <slot />

    <label class="flex items-center" :class="[labelClass, disabled ? 'cursor-not-allowed' : 'cursor-pointer']">
      <div v-if="value === inputValue" class="h-16 w-16 rounded-full flex flex-shrink-0 justify-center items-center border border-grey-700">
        <div class="w-12 h-12 rounded-full bg-main-color" />
      </div>
      <div v-else class="h-16 w-16 rounded-full border border-grey-700 flex-shrink-0" />
      <slot name="label" />
      <span class="ml-8">{{ label }}</span>
    </label>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  value: string
  inputValue: string
  label: string
  labelClass: string | string[]
  hasBorder?: boolean
  disabled?: boolean
}>()

const emit = defineEmits(['input'])

const hasFocus = ref(false)

function toggle () {
  emit('input', props.inputValue)
}
</script>
