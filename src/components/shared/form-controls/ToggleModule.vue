<template>
  <label
    class="inline-flex items-center cursor-pointer select-none leading-none"
    :class="{ 'cursor-not-allowed opacity-25': disabled }"
  >
    <div class="flex items-center">
      <input v-model="toggle" type="checkbox" class="hidden" :disabled="disabled">

      <div
        class="inline-block relative rounded-full transition-all"
        :class="[
          { 'mr-10': label },
          isBlue ? 'bg-link-color' : value ? 'bg-main-color' : 'bg-grey-700',
          sizeClass,
          duration
        ]"
      />

      <p>{{ label }}</p>
    </div>
  </label>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  label?: string
  disabled?: boolean
  value: boolean
  isBlue?: boolean
  duration?: string
  size?: 'base' | 'medium' | 'plan'
}>(), {
  duration: 'duration-50',
  size: 'base'
})

const emit = defineEmits(['input'])

const toggle = computed({
  get: () => props.value,
  set: (val: boolean) => {
    emit('input', val)
  }
})

const sizeClass = computed(() => {
  switch (props.size) {
    case 'medium':
      return 'medium-toggle'
    case 'plan':
      return 'plan-toggle'
    default:
      return 'base-toggle'
  }
})
</script>

<style lang="scss" scoped>
div.base-toggle {
  @apply w-27 h-15;
  &:after {
    content: '';
    @apply absolute top-2 right-14 w-11 h-11 bg-primary rounded-full transition-all duration-50;
  }
}

input:checked + div.base-toggle:after {
  @apply bg-primary right-2;
}

div.medium-toggle {
  @apply w-35 h-20;
  &:after {
    content: '';
    @apply absolute right-19 top-4 w-12 h-12 bg-primary rounded-full transition-all duration-50;
  }
}

input:checked + div.medium-toggle:after {
  @apply bg-primary right-3;
}

div.plan-toggle {
  @apply w-45 h-26;
  @screen md {
    @apply w-50;
  }
  &:after {
    content: '';
    @apply absolute right-24 top-6 w-14 h-14 bg-primary rounded-full transition-all duration-50;
    @screen md {
      @apply right-29;
    }
  }
}

input:checked + div.plan-toggle:after {
  @apply bg-primary right-7;
}
</style>
