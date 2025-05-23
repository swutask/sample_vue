<template>
  <div>
    <label class="flex flex-col">
      <div v-if="label" class="flex justify-between items-end" :class="labelClass">
        <slot name="label">
          <p>{{ label }}</p>
        </slot>
      </div>

      <div class="relative">

        <input
          ref="inputRef"
          v-model="value"
          v-focus="autofocus"
          :type="type"
          :placeholder="placeholder"
          class="w-full outline-none"
          :class="[
            inputClasses,
            {'!shadow-[0px_0px_0px_1.6px_#FF5252]': errorMessage}
          ]"
          :disabled="disabled"
          :readonly="readonly"
          :maxlength="maxLength"
          :max="maxLength"
          @blur="$emit('blur')"
          @focus="$emit('focus')"
          @input="$emit('input')"
        >

        <slot />

        <TransitionExpand>
          <span
            v-if="errorMessage"
            class="absolute -bottom-20 left-10 text-error text-12"
          >
            {{ errorMessage }}
            <slot name="errorLink" />
          </span>
        </TransitionExpand>
      </div>
    </label>
  </div>
</template>

<script setup lang="ts">
import TransitionExpand from '../TransitionExpand'

const props = withDefaults(defineProps<{
  modelValue?: string | number
  autofocus?: boolean
  disabled?: boolean
  errorMessage?: string
  inputClasses?: string
  label?: string
  labelClass?: string
  maxLength?: string
  name?: string
  placeholder?: string
  readonly?: boolean
  type?: string
}>(), {
  errorMessage: null,
  inputClasses: 'px-13 py-9 rounded-4',
  label: '',
  labelClass: 'md:mx-5 mb-10',
  name: '',
  placeholder: '',
  type: 'text'
})

const emit = defineEmits(['update:modelValue', 'clearErrorMessage', 'blur', 'focus', 'input'])

const inputRef = ref(null)

const value = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit('update:modelValue', val)
    emit('clearErrorMessage', props.name)
  }
})

function focus () {
  inputRef.value.focus()
}

defineExpose({
  focus
})
</script>
