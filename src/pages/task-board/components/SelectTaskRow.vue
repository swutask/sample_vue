<template>
  <DropdownModule
    ref="dropdownRef"
    :width="180"
    background="bg-primary dark:bg-grey-110"
    class="cursor-default !border-none"
    :class="[{ '!border-transparent': rowColor }, {'pointer-events-none': disabled}]"
    :positionMenu="positionMenu"
    :isTeleported="isTeleported"
    :dropdownClasses="dropdownClasses"
    :positionDirection="positionDirection"
    defaultStyles
    top-position="100%"
    :disabled="disabled"
  >
    <template #button="{ isOpen }">
      <slot name="button" :isOpen="isOpen">
        <div
          class="flex items-center truncate px-12 py-6
        text-12  anim-color text-app-color max-w-[130px] cursor-pointer attribute"
          :class="[customClasses, { '!border-grey-250 dark:border-black': isOpen }]"
        >
          <NewTaskRowColor
            v-if="task?.taskRow?.color"
            class="mr-2"
            :color="task?.taskRow?.color"
            disabled
          />
          <p class="truncate">{{ task.taskRow.title }}</p>
        </div>
      </slot>
    </template>

    <div
      v-for="item in computedRows"
      :key="item.id"
      class="flex items-center truncate anim-color px-10 py-7"
      :class="{'bg-menu-hover': item.id === task.taskRow.id}"
      @click.stop="toggleRow(item)"
    >
      <NewTaskRowColor
        v-if="item.color"
        class="mr-5"
        :color="item.color"
        disabled
      />
      <p class="font-normal truncate text-13">{{ item.title }}</p>
    </div>
  </DropdownModule>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  task: ITask
  rows: ITaskRow[]
  disabled?: boolean
  bookId?: number
  positionMenu?: string
  customClasses?: string
  isTeleported?: boolean
  positionDirection?: string
  dropdownClasses?: string
}>(), {
  disabled: false,
  customClasses: 'rounded-[16px] h-30',
  positionMenu: 'left'
})

const emit = defineEmits(['select'])

const dropdownRef = ref()

const rowColor = computed(() => props.task?.taskRow?.color ? `#${props.task?.taskRow?.color.toString(16)}10` : null)

const computedRows = computed(() => {
  const localRows = props.rows

  return localRows.sort((a, b) => {
    if (a.order > b.order) return 1
    if (a.order < b.order) return -1
    return 0
  })
})

function toggleRow (value) {
  emit('select', value)
}

function close () {
  dropdownRef.value.close()
}

defineExpose({
  close
})
</script>
