<template>
  <label
    v-clickOutside="onBlur"
    class="relative flex items-center text-14 md:border bg-primary rounded-8 h-36 px-10 gap-x-8"
    :class="[isFocused ? '!border-black !shadow-black-05' : 'md:border-grey-250 dark:border-black card',
             isFocused || !isExpandable ? '!border-2' : 'cursor-pointer',
             isMobile && isFocused ? `!fixed left-0 top-0 !h-[52px] w-full max-w-full rounded-none !m-0 z-100` : ''
    ]"
    @click="onFocus"
  >
    <i class="icon-search text-14" />

    <input
      ref="inputRef"
      v-model="inputValue"
      type="text"
      :placeholder="placeholder"
      autocomplete="off"
      :class="isFocused || !isExpandable || inputValue ? '' : 'hidden'"
      class="h-full outline-none appearance-none flex-grow bg-transparent min-w-0"
      @input="onInput"
    >

    <i
      v-if="inputValue.length"
      class="icon-close-smooth text-grey-250 hover:text-grey-950 text-19 cursor-pointer"
      :class="isFocused || !isExpandable ? 'flex' : 'hidden'"
      @click="clear"
    />
  </label>
</template>

<script setup lang="ts">
import debounce from 'lodash/debounce'

const props = withDefaults(defineProps<{
  placeholder?: string
  debounce?: number
  isExpandable?: boolean
}>(), {
  placeholder: 'Search',
  debounce: 300
})

const emit = defineEmits(['onSearch', 'onFocus'])

const route = useRoute()
const { isMobile } = useGeneral()

const inputRef = ref(null)
const inputValue = ref('')
const isFocused = ref(false)

watch(() => route.params.id, () => {
  inputValue.value = ''
})

const onInput = debounce(() => {
  if (inputValue.value.length === 1) return
  emit('onSearch', inputValue.value)
}, props.debounce)

function clear () {
  inputValue.value = ''
  onInput()
}

function onFocus () {
  isFocused.value = true
  emit('onFocus')
  nextTick(() => {
    inputRef.value?.focus()
  })
}

function onBlur () {
  if (isMobile.value && inputValue.value.length) return
  isFocused.value = false
}
</script>
