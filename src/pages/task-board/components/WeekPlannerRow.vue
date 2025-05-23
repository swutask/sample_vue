<template>
  <div
    class="relative flex-1 first:ml-1 last:mr-1 lg:min-w-[290px] lg:w-[290px] lg:min-h-[360px] min-h-[145px]"
    :style="`z-index: ${1000 - rowIndex}`"
  >
    <div class="max-h-min pb-10 pt-5 rounded-12 px-6">
      <div
        class="group prevent-drag-scroll px-3 mb-6 flex justify-between items-center md:items-end pb-10 border-b-2"
        :class="isTodayRow ? 'border-brand-new' : 'border-dark-600'"
      >
        <div class="flex items-center text-15 font-semibold leading-small max-md:text-15 flex-grow pl-3 pr-5">
          <p :class="{'text-brand-new': isTodayRow}">{{ weekPlannerTitle.day }}</p>

          <p
            class="ml-5 font-normal"
            :class="isTodayRow ? 'text-brand-new' : 'text-grey-11'"
          >
            {{ computedTasks.length }}
          </p>
        </div>

        <div class="flex md:flex-col items-center md:items-end flex-shrink-0 ml-auto">
          <p
            v-if="isTodayRow"
            class="bg-brand-new rounded-full text-white text-10 px-6 mr-5 md:mr-0 mb-4 py-1 font-medium"
          >
            Today
          </p>
          <p v-else class="h-17 mb-4" />

          <p
            class="shrink-0 flex items-center truncate leading-small text-15 ml-5"
            :class="isTodayRow ? 'text-brand-new' : 'text-grey-300'"
          >
            {{ weekPlannerTitle.date }}
          </p>
        </div>
      </div>

      <div>
        <NewTask
          v-if="showNewTask && newTaskOrder === 'top'"
          :task-row-id="taskRowId"
          :order="orderTask"
          weekPlanner
          isCardView
          :taskEndDate="newTaskDateForGrouping"
          class="prevent-drag-scroll"
          @getTasks="$emit('getTasks')"
          @hideNewTask="hideNewTask"
        />

        <draggable
          :id="item?.id"
          v-model="computedTasks"
          :data-date="item"
          group="tasks"
          :disabled="isClient"
          ghostClass="my-sortable-ghost-task--card"
          :chosenClass="isMobile ? 'grab-class-task-mobile' : 'grab-class-task'"
          drag-class="grab-class-task"
          item-key="id"
          filter=".no-drag"
          handle=".drag-handler"
          :forceFallback="true"
          fallbackClass="force-fallback-light-task"
          class="rounded-8"
          :class="{'absolute w-full lg:min-h-[300px]': computedTasks.length === 0 && !showNewTask }"
          :move="onMove"
          :delay="500"
          :delay-on-touch-only="true"
          @add="add"
          @mousedown="$emit('toggleDragging', true)"
          @mouseup="$emit('toggleDragging', false)"
          @start="onDragStart"
          @end="onDragEnd"
        >
          <template #item="{ element, index }">
            <TaskItemObserver
              :isCardView="true"
              :task="element"
              :idx="index"
              weekPlanner
              :rowId="rowId"
              @getTasks="$emit('getTasks')"
            />
          </template>
        </draggable>

        <NewTask
          v-if="showNewTask && newTaskOrder === 'bottom'"
          :task-row-id="taskRowId"
          class="prevent-drag-scroll"
          isCardView
          weekPlanner
          :taskEndDate="newTaskDateForGrouping"
          @getTasks="$emit('getTasks')"
          @addNewTemplate="newTask('bottom')"
          @hideNewTask="hideNewTask"
        />

        <WeekPlannerEmptyState
          :tasksLength="computedTasks.length"
          :showNewTask="showNewTask"
          :class="{'absolute lg:top-[60px] w-full': computedTasks.length === 0 && !showNewTask }"
          @newTask="newTask('bottom')"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable'
import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
import { isDateInRange } from '@/core/helper-functions'

dayjs.extend(isToday)

const props = defineProps<{
  item: ITaskRow | any
  rowIndex?: number
}>()

const emit = defineEmits(['getTasks', 'sort', 'toggleDragging'])

const { isMobile } = useGeneral()
const {
  tasks,
  rows,
  handleUpdateTask,
  updateTask
} = useTask()
const { member } = useTeam()
const { allowAddTasks, toggleLimitModal, currentPlan } = usePlan()
const { isClient } = useProfile()

const dynamicHeight = ref('0px')
const showNewTask = ref(false)
const newTaskOrder = ref('bottom')

const taskRowId = computed(() => rows.value?.find(r => r.order === 0)?.id)
const rowId = computed(() => `task-row-${taskRowId.value}`)
const isTodayRow = computed(() => dayjs(props.item.id).isToday())

const newTaskDateForGrouping = computed(() => {
  return dayjs(props.item?.id).format('YYYY-MM-DD')
})

const weekPlannerTitle = computed(() => {
  return {
    day: props.item.id.split(',').map(item => item.trim())[0],
    date: props.item.id.split(',').map(item => item.trim())[1]
  }
})

const computedTasks = computed({
  get: () => {
    return tasks.value
      .filter(task => {
        if (task.integrationType === 'google') {
          return getConditionForGroupBy(task)
        } else {
          return getConditionForGroupBy(task) && task?.teamMembers?.some(e => e.id === member.value.id)
        }
      })
      .sort((a, b) => {
        if (a.order > b.order) return 1
        if (a.order < b.order) return -1
        return 0
      })
  },
  set: (val) => {
    const ids = {}
    val.forEach((item, index) => {
      if (!ids[item.bookId]) {
        ids[item.bookId] = [item.id]
      } else {
        ids[item.bookId].push(item.id)
      }

      handleUpdateTask({ id: item.id, order: index })
    })

    for (const [key, value] of Object.entries(ids)) {
      taskService.order({ ids: value, bookId: key }).then(() => {
        (value as number[]).forEach((item, index) => handleUpdateTask({ id: item, order: index }))
      })
    }
  }
})

const orderTask = computed(() => {
  const task = computedTasks.value[0]
  if (task) return task.order - 1
  return 0
})

function hideNewTask () {
  showNewTask.value = false
}

function getConditionForGroupBy (task: ITask) {
  const id = props.item?.id

  return task.endDate ? isDateInRange(id, task.startDate, task.endDate) : false
}

function newTask (order = 'bottom') {
  if (!allowAddTasks.value) {
    toggleLimitModal({
      show: true,
      type: 'Special',
      title: 'You\'re Doing Great',
      // eslint-disable-next-line max-len
      description: `<p>You've reached the limit of
            <span class="font-semibold underline">${currentPlan.value?.maxTasks} tasks</span>
              on the free plan</p>`
    })

    return
  }

  newTaskOrder.value = order
  showNewTask.value = true
}

function add (evt) {
  const id = parseInt(evt.item.id)
  const task = tasks.value.find(item => item.id === id)
  const newIndex = evt.newIndex

  const startDate = dayjs(evt.to.id).format('YYYY-MM-DD')
  const endDate = dayjs(evt.to.id).format('YYYY-MM-DD')

  const data = {
    id: task.id,
    order: newIndex,
    bookId: task.bookId,
    startDate,
    endDate
  }

  updateTask(data)
  handleUpdateTask(data)
}

function onMove () {
  return true
}

function onDragStart (card) {
  emit('toggleDragging', true)

  nextTick(() => {
    const el = document.getElementById(card.clone.id)
    dynamicHeight.value = el?.getAttribute('data-height') || '0px'
  })
  document.body.classList.add('grabbing')
}

function onDragEnd () {
  emit('toggleDragging', false)
  document.body.classList.remove('grabbing')
}
</script>

<style lang="scss">
.my-sortable-ghost-task {
  &--card {
    height: v-bind(dynamicHeight);
  }
}

.force-fallback-light-task {
  min-height: v-bind(dynamicHeight);
}
</style>
