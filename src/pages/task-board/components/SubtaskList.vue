<template>
  <div v-if="task" class="flex flex-col mt-40">
    <p :class="titleClasses">Subtasks</p>

    <div class="flex flex-col">
      <draggable
        v-if="subtasks?.length"
        v-model="subtasks"
        :delay="10"
        :disabled="isClient"
        :force-fallback="true"
        item-key="id"
        filter=".no-drag"
        class="flex flex-col"
      >
        <template #item="{ element }">
          <SubtaskItem
            :order="element.order"
            :subtask="element"
            :task="task"
            class="border-b border-grey-500 px-5 h-46"
            :taskAssignMemberClasses="element.teamMembers.length ? '-mr-5' : ''"
            :isTaskBoardModal="isTaskBoardModal"
            dateIconSize="text-18"
            iconMoreSize="text-18"
            @close="close"
            @blockHotKey="blockHotKeyHandler"
            @delete="$emit('delete')"
          />
        </template>
      </draggable>

      <SubtaskItem
        v-if="isNewSubTaskShown"
        ref="newSubtaskRef"
        :task="task"
        :subtask="newSubtask"
        class="border-b border-grey-500 px-5 h-50"
        dateIconSize="text-18"
        :isTaskBoardModal="isTaskBoardModal"
        :appendToBody="appendToBody"
        iconMoreSize="text-18"
        isCreate
        @close="close"
        @blockHotKey="blockHotKeyHandler"
        @createSubTask="createNewSubtask"
      />

      <div v-if="!disabled" class="flex">
        <ButtonModule
          v-if="isScreenTaskView || !isNewSubTaskShown"
          text="Add subtask"
          class="text-14 mt-10 font-normal text-grey-250 hover:text-app-color hover:bg-menu-hover
          relative z-10 py-8 px-10 rounded-6 anim-color-200 prevent-drag-scroll"
          prefix="icon-add text-10 mt-2"
          @click.stop="showNewSubtask"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable'

const props = withDefaults(defineProps<{
  task: ITask
  disabled?: boolean
  titleClasses?: string
  isScreenTaskView?: boolean
  appendToBody?: boolean
  isTaskBoardModal?: boolean
}>(), {
  disabled: false,
  titleClasses: 'font-semibold',
  isScreenTaskView: false
})

const emit = defineEmits(['close', 'blockHotKey', 'createSubTask', 'delete'])

const { handleUpdateTask, handleUpdateSubTask } = useTask()
const { isClient } = useProfile()
const { allowAddTasks, toggleLimitModal, currentPlan } = usePlan()

const isNewSubTaskShown = ref(false)
const newSubtaskRef = ref(null)

const newSubtask = ref<ITask>({
  id: null,
  title: '',
  taskTags: [],
  isUrgent: false,
  urgentStatus: null,
  endDate: null,
  isToday: props.task?.isToday,
  bookId: props.task?.bookId,
  startDate: null,
  teamMembers: props.task?.isToday ? props.task.teamMembers : [],
  endEventTime: '',
  startEventTime: '',
  htmlLink: '',
  integrationType: ''
})

const subtasks = computed(({
  get: () => {
    const items = props.task?.subTask || []

    return items.sort((a, b) => {
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

      handleUpdateSubTask({
        value: {
          ...item,
          order: index
        }
      })
    })

    setTimeout(() => {
      for (const [key, value] of Object.entries(ids)) {
        taskService.order({ ids: value, bookId: key })
      }
    }, 100)
  }
}))

onMounted(() => {
  isNewSubTaskShown.value = props.isScreenTaskView ? false : props.task?.subTask?.length === 0
})

function close () {
  if (props.task?.subTask?.length > 0) {
    isNewSubTaskShown.value = false
  } else {
    emit('close')
  }
}

function createNewSubtask () {
  nextTick(() => {
    newSubtaskRef.value?.titleFocus()
  })
}

function blockHotKeyHandler (value: boolean) {
  emit('blockHotKey', value)
}

function showNewSubtask () {
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

  isNewSubTaskShown.value = true
}

defineExpose({
  showNewSubtask
})
</script>
