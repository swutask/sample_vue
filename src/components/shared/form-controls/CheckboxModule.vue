<template>
  <label
    class="inline-flex items-center cursor-pointer select-none p-5 leading-tight w-full"
    :class="[{ 'cursor-not-allowed opacity-50': disabled }]"
  >
    <input
      :checked="modelValue"
      type="checkbox"
      class="hidden"
      :disabled="isDisabled"
      @input="onInput"
    >
    <span
      class="flex-shrink-0 relative h-17 w-17 border rounded-3 border-sidebar shadow-grey-700-05 dark:shadow-none"
      :class="[
        label ? customStyle.margin : null,
        customStyle.background]"
    />
    <p class="flex flex-grow items-center" :class="isTruncate ? 'truncate' : ''">
      <slot>
        <i v-if="icon" :class="icon" />

        <BookLabel
          v-if="bookIcon && bookId"
          :class="customBooksLabelStyle"
          :hasBorder="false"
          :bookId="bookId"
          :customStyle="customStyle"
        />
        <p v-if="!bookId">{{ label }}</p>

        <ButtonModule
          v-if="tooltip"
          border-width=""
          prefix="icon-info_outline text-20 text-grey-300 hover:text-app-color anim-color"
          :tooltipText="(tooltip as string)"
          showOnMobile
          :tooltipPosition="tooltipPosition"
          class="ml-auto"
          :has-hover="false"
        />
      </slot>
    </p>
  </label>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  label?: string
  disabled?: boolean
  modelValue?: boolean
  hasBg?: boolean
  disabledDeselect?: boolean
  icon?: string
  bookIcon?: string
  bookId?: number
  tooltip?: string | boolean
  isTruncate?: boolean
  tooltipPosition?: string
  customBooksLabelStyle?: string
  customStyle?: {
    fontSize?: string
    icon?: string
    defaultIcon?: string
    iconHover?: string
    background?: string
    margin?: string
  }
}>(), {
  isTruncate: true,
  bookId: null,
  tooltipPosition: 'absolute top-40 right-50',
  customStyle: () => ({
    fontSize: 'text-13 font-medium',
    icon: 'max-h-[80%] max-w-[80%]',
    defaultIcon: 'w-18 h-18',
    iconHover: '',
    background: 'bg-primary',
    margin: 'mr-10'
  })
})

const emit = defineEmits(['update:modelValue'])

const isDisabled = computed(() => (props.disabledDeselect && props.modelValue) || props.disabled)

function onInput (event) {
  emit('update:modelValue', event.target.checked)
}
</script>

<style lang="scss" scoped>
input:checked ~ span:after {
  @apply block;
}

span:after {
  @apply w-7 h-15 border-link-color origin-center rotate-45 scale-75 border-r-2 border-b-2 absolute hidden left-4;
  top: -1px;
  content: "";
}
</style>
