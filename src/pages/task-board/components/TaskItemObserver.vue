<template>
  <div
    :id="`${task.id}`"
    ref="wrapperRef"
    class="drag-handler"
    :class="[
      {'mb-6 rounded-8': isCardView && !weekPlanner},
      {'mb-1': weekPlanner},
      {'no-drag': weekPlanner && task.integrationType === 'google'}
    ]"
    :data-height="height"
    :style="height"
  >
    <component
      :is="isCardView ? components.TaskCard : components.TaskList"
      v-if="isTaskShown"
      :task="task"
      :sortedBy="groupedBy"
      :index="idx"
      :isPerspective="isPerspective"
      :showOnTask="showOnTask"
      :weekPlanner="weekPlanner"
      :completedFilter="completedFilter"
      :membersFilter="membersFilter"
      :name="name"
      @updateHeight="(val: string) => height = val"
      @getTasks="$emit('getTasks')"
    />
  </div>
</template>

<script setup lang="ts">
import TaskCard from '@/pages/task-board/components/TaskCard.vue'
import TaskList from '@/pages/task-board/components/TaskList.vue'

const props = defineProps<{
  task: ITask
  isCardView: boolean
  rowId: string | number
  groupedBy?: string
  completedFilter?: IShowCompletedFilter
  membersFilter?: ITeamMember[]
  showOnTask?: IShowOnTaskObj
  name?: string | number | object | null
  idx?: number
  weekPlanner?: boolean
  isPerspective?: boolean
}>()

defineEmits(['getTasks'])

const components = {
  TaskCard,
  TaskList
}

const wrapperRef = ref(null)
const isTaskShown = ref(false)
const height = ref('min-height: 40px')
const route = useRoute()

const observer = new IntersectionObserver(([entry]) => {
  isTaskShown.value = entry && entry.isIntersecting

  if (+route.query?.taskId === props.task.id || +route.query?.highlight === props.task.id) {
    isTaskShown.value = true
  }
}, { root: document.getElementById(props.rowId as string) })

onUpdated(() => {
  observer.disconnect()

  nextTick(() => {
    observer.observe(wrapperRef.value)
  })
})

onMounted(() => {
  observer.observe(wrapperRef.value)
})

onBeforeUnmount(() => {
  observer.disconnect()
})

onUnmounted(() => {
  observer.disconnect()
})
</script>
