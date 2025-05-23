<template>
  <div
    v-clickOutside="close"
    class="border-grey-400"
    :class="{ 'border shadow-[0px_0px_0px_0.5px_#F2F2F2] dark:shadow-event-dark': showBorder }"
  >
    <div class="relative selector" @click="toggle()">
      <div class="px-12 py-8 flex justify-between items-center cursor-pointer" :class="[selectedClass, {'!cursor-default': disabled}]">
        <slot name="selected" :item="modelValue">
          <span v-if="modelValue" class="truncate">{{ modelValue.name }}</span>

          <span v-else class="text-[#ccc]">{{ placeholder }}</span>
        </slot>
        <i
          v-if="!disabled && showArrow"
          class="icon-keyboard-arrow-down text-12 text-grey-11"
          :class="[{ 'expanded': visible }, arrowIconClasses]"
        />
      </div>

      <div
        class="absolute top-40 left-0 z-10 bg-primary shadow rounded-4 max-h-[300px] overflow-y-auto"
        :class="[{ hidden : !visible, visible }, width]"
      >
        <p
          v-for="(item, index) in options"
          :key="item.id"
          class="border-t p-12 cursor-pointer hover:bg-selection leading-normal border-grey-500"
          :class="[
            { 'font-semibold' : item.name === modelValue?.name },
            { 'border-none': index === 0 },
            itemClass
          ]"
          @click="select(item)"
        >
          <!-- O P T I O N  N A M E -->
          <slot name="option" :item="item">
            <span>{{ item.name }}</span>
          </slot>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue: any
  options: any[] // TODO: add interface
  itemClass?: string
  selectedClass?: string
  width?: string
  disabled?: boolean
  placeholder?: string
  activeUnselect?: boolean
  arrowIconClasses?: string
  showArrow?: boolean
  showBorder?: boolean
}>(), {
  width: 'w-full',
  placeholder: '',
  arrowIconClasses: '',
  showArrow: true,
  showBorder: true
})

const emit = defineEmits(['update:modelValue', 'change', 'visible'])

const visible = ref(false)

function toggle () {
  if (!props.disabled) {
    visible.value = !visible.value
    emit('visible', { visible: visible.value })
  }
}

function close () {
  visible.value = false
  emit('visible', { visible: visible.value })
}

function select (option) {
  if (props.activeUnselect && props.modelValue.id === option.id) {
    emit('update:modelValue', {})

    return emit('change', {})
  }

  emit('update:modelValue', option)

  emit('change', option)
}
</script>
