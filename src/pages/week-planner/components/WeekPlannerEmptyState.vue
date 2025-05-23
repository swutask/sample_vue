<template>
  <div class="group" :class="{'absolute lg:w-[275px] w-full pr-11': showNewTask}">
    <div
      v-for="(item, index) in itemsToShow"
      :key="item"
      class="h-40 cursor-pointer w-full border-b border-grey-850 flex items-center justify-start"
      :class="{'first:hidden pointer-events-none': showNewTask }"
      @click="addNewTask"
    >
      <ButtonModule
        v-if="index === 0"
        text="new task"
        class="text-14 md:text-13 font-normal text-grey-250
         opacity-100 md:opacity-0 md:group-hover/row:opacity-100 group-hover:text-app-color py-8 px-10 anim-color-200 ml-6"
        prefix="icon-add text-10 mr-7"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  showNewTask: boolean
  tasksLength: number
}>()

const emit = defineEmits(['newTask'])

const { isMobile } = useGeneral()

const itemsToShow = computed(() => {
  const limit = isMobile.value ? 2 : 7

  return Math.max(limit - props.tasksLength, 1)
})

function addNewTask () {
  setTimeout(() => {
    emit('newTask')
  }, 100)
}
</script>
