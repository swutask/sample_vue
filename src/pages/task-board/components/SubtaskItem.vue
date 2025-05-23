<template>
  <div
    ref="wrapperRef"
    v-clickOutside="saveOnClickOutside"
    class="flex items-center py-10 text-app-color group"
    :class="[
      { 'pointer-events-none': isClient },
      { '!border bg-text-selection !border-brand rounded-8': isHighlighted },
      { 'hover:cursor-grab': subtaskData?.id && !disabled }
    ]"
  >
    <div class="flex items-center flex-grow space-x-10 truncate">
      <div
        class="flex items-center justify-center w-18 h-18 cursor-pointer" @click.stop="completeSubTask"
      >
        <i
          :class="[isCompleted ?
                     'icon-radio_btn_checked text-[#15cb54] text-16' :
                     'icon-radio_btn_unchecked text-grey-cfcfcf hover:text-grey-950 text-17',
                   !subtaskData.id ? 'cursor-default hover:text-grey-cfcfcf' : ''
          ]"
        />
      </div>

      <TitleEditor
        ref="titleEditorRef"
        :key="subtaskData.title"
        :content="subtaskData.title"
        :disabled="!isCreate && !isEdit"
        class="subtask-title w-full bg-transparent max-h-44 overflow-hidden block multi-truncate-editor select-none subtask-editor"
        style="--mt-lines: 1;"
        :class="{ 'line-through opacity-40 dark:opacity-70': !!subtaskData.completedAt }"
        :taskId="subtaskData.id"
        :bookId="subtaskData.bookId"
        editorClass="subtask-editor-class"
        editorId="subtask-editor-id"
        isOneLineTitle
        allowEmpty
        hasEnterHandler
        @onUpdate="saveTitle"
        @onEnter="saveOnClickOutside"
        @onBlur="onBlur"
      />
    </div>

    <div
      class="flex items-center hover:cursor-default space-x-5"
    >
      <TaskAssignMember
        v-if="isTeamAccount && showOnTask?.assignee"
        :isCreate="isCreate"
        class="text-13 ml-5 mr-7"
        :class="[subtaskData?.teamMembers?.length === 0 && !(isCreate || isEdit) ? 'subtask-btn anim-opacity order-0' : 'order-5',
                 taskAssignMemberClasses]"
        :assignedMembers="subtaskData.teamMembers || []"
        :task="subtaskData"
        :bookId="task.bookId"
        :disabled="disabled"
        :appendToBody="appendToBody"
        positionMenu="left"
        iconSize="!text-19"
        isSubtask
        @assignToTask="toggleMember"
      />

      <Urgency
        v-if="showOnTask?.priority"
        v-model="subtaskData.urgentStatus"
        positionMenu="left"
        :disabled="isClient || disabled"
        :class="[
          !subtaskData.urgentStatus && !(isCreate || isEdit) ? 'subtask-btn anim-opacity order-1' : 'order-3',
          urgencyClasses
        ]"
        class="mt-1"
        zIndex="z-9999"
        customClasses="border-none"
        isSubtask
        :iconSize="urgencyIconSize"
        :isCreate="isCreate"
        :task="(subtaskData as ITask)"
      />

      <TaskDate
        v-if="showOnTask?.dueDate && showDatePicker"
        :current-date="subtaskData.endDate"
        :isCompleted="!!subtaskData?.completedAt"
        :disabled="isClient || disabled"
        :position="subtaskData?.teamMembers?.length > 2
          ? 'md:right-[-100px] right-[20px]'
          : 'md:right-[-50px] right-[20px]'
        "
        :iconSize="dateIconSize"
        :isTaskBoardModal="isTaskBoardModal"
        isSubTask
        class="w-auto"
        :class="[isTodayClass,
                 !subtaskData.endDate && !(isCreate || isEdit) ? 'subtask-btn anim-opacity order-2' : 'order-4',
                 {'!mr-5': subtaskData?.teamMembers?.length > 0}
        ]"
        :taskDates="taskDates"
        @toggleBothDates="toggleDueDate"
      />

      <DropdownModule
        v-if="!isCreate && !isClient && !disabled"
        :prefix="`icon-more-horizontal ${iconMoreSize}`"
        :width="150"
        buttonClasses="!p-3"
        top-position="30px"
        :isTeleported="false"
        class="subtask-btn anim-opacity order-6"
        :class="{'md:opacity-100': showMenu}"
        background="bg-primary dark:bg-grey-110"
        is-auto-menu-position
        @click="showMenu = true"
        @close="showMenu = false"
      >
        <div>
          <div class="hover:bg-selection group-scope text-14 rounded-t-10">
            <ButtonModule
              text="Edit"
              prefix="icon-edit mr-15"
              class="p-10 w-full"
              @click="handleEdit"
            />
          </div>
          <div class="hover:bg-selection group-scope text-14 rounded-b-10">
            <ButtonModule
              text="Delete"
              prefix="icon-delete mr-15"
              class="p-10 w-full"
              @click="handleDeleteTask"
            />
          </div>
        </div>
      </DropdownModule>
    </div>
  </div>
</template>

<script setup lang="ts">
import cloneDeep from 'lodash/cloneDeep'
import { prepareDate } from '@/core/helper-functions'

const props = withDefaults(defineProps<{
  appendToBody?: boolean
  task: ITask
  isCreate?: boolean
  disabled?: boolean
  subtask: ITask
  order?: number
  showDatePicker?: boolean
  isModal?: boolean
  isTaskBoardModal?: boolean
  taskAssignMemberClasses?: string
  urgencyClasses?: string
  urgencyIconSize?: number
  dateIconSize?: string
  iconMoreSize?: string
}>(), {
  showDatePicker: true,
  isCreate: false,
  order: 0,
  urgencyIconSize: 14,
  iconMoreSize: 'text-20'
})

const emit = defineEmits(['close', 'createSubTask', 'delete'])

const { isTeamAccount } = useTeam()
const { isClient } = useProfile()
const { updateTask, createTask, complete, addSubTask, handleUpdateSubTask, deleteTask, showOnTask } = useTask()
const route = useRoute()
const router = useRouter()
const showMenu = ref(false)
const isHighlighted = ref(false)
const isEdit = ref(false)
const wrapperRef = ref(null)

const subtaskData = ref<ITask>(cloneDeep(props.subtask))
const localTitle = ref('')

const isCompleted = computed(() => !!subtaskData.value?.completedAt)
const isTodayClass = computed(() => route.name === 'Today' ? '' : 'mr-5')

const titleEditorRef = ref(null)

const taskDates = computed(() => ({
  groupDates: subtaskData.value.startDate && subtaskData.value.endDate,
  dates: prepareDate(subtaskData.value.startDate, subtaskData.value.endDate),
  start: subtaskData.value.startDate,
  end: subtaskData.value.endDate
}))

watch(() => props.subtask, (value) => {
  if (value.title) {
    subtaskData.value = cloneDeep(value)
  }
}, { deep: true })

watch(() => props.order, (value) => {
  subtaskData.value.order = value
})

onMounted(() => {
  isHighlighted.value = props.subtask.id === +route.query.highlight

  setTimeout(() => {
    isHighlighted.value = false
    const query = Object.assign({}, route.query)
    delete query.highlight
    delete query.parentId

    router.replace({ query })
  }, 3000)

  if (props.isCreate) {
    titleFocus()
  }
})
function titleFocus () {
  setTimeout(() => {
    titleEditorRef.value?.focus()
  }, 100)
}

function saveTitle (value: string) {
  localTitle.value = value || ''
}

async function toggleDueDate ({ end, start }) {
  subtaskData.value.endDate = end
  subtaskData.value.startDate = start

  if (!props.isCreate) {
    subtaskData.value.endDate = end
    subtaskData.value.startDate = start
    updateTask({
      id: subtaskData.value.id,
      bookId: subtaskData.value.bookId,
      endDate: end,
      startDate: start
    })

    handleUpdateSubTask({
      value: {
        ...subtaskData.value,
        bookId: subtaskData.value.bookId,
        endDate: end,
        startDate: start
      }
    })
  }
}

function completeSubTask () {
  if (isClient.value || !subtaskData.value.id) return
  const completedAt = subtaskData.value.completedAt ? null : new Date()

  complete({
    id: subtaskData.value.id,
    bookId: props.task.bookId,
    completedAt,
    task: subtaskData.value as ITask,
    isSubTask: true
  })

  handleUpdateSubTask({
    value: {
      ...subtaskData.value,
      bookId: subtaskData.value.bookId,
      completedAt
    }
  })

  subtaskData.value.completedAt = completedAt
}

async function createSubTask () {
  if (props.isCreate || isEdit.value) {
    if (isEdit.value) {
      handleUpdateSubTask({
        value: {
          ...subtaskData.value,
          title: localTitle.value,
          bookId: subtaskData.value.bookId
        }
      })

      await updateTask({
        id: subtaskData.value.id,
        bookId: subtaskData.value.bookId,
        title: localTitle.value
      })

      isEdit.value = false
      localTitle.value = ''
    } else {
      const newTask = await createTask({
        parentId: props.task.id,
        title: localTitle.value,
        taskRowId: props.task.taskRowId,
        bookId: props.task.bookId,
        endDate: subtaskData.value.endDate,
        startDate: subtaskData.value.startDate,
        isToday: props.task.isToday,
        tagIds: subtaskData.value.taskTags.map(item => item.id),
        teamMembers: subtaskData.value.teamMembers.map(m => m.id),
        urgentStatus: subtaskData.value.urgentStatus
      })

      addSubTask({ value: newTask.data })

      subtaskData.value = { ...props.subtask, bookId: props.task.bookId }
      localTitle.value = ''
      titleEditorRef.value?.clearContent()
      emit('createSubTask')
    }
  } else {
    emit('close')
  }
}

function onBlur (value: string) {
  if (isEdit.value && value) {
    updateTask({
      id: subtaskData.value.id,
      bookId: subtaskData.value.bookId,
      title: value
    })

    handleUpdateSubTask({
      value: {
        ...subtaskData.value,
        bookId: subtaskData.value.bookId
      }
    })
  }

  isEdit.value = false
}

function handleEdit () {
  isEdit.value = true

  setTimeout(() => {
    titleEditorRef.value?.focus()
  }, 100)
}

function handleDeleteTask () {
  deleteTask({
    id: subtaskData.value.id,
    parentId: subtaskData.value.parentId,
    bookId: subtaskData.value.bookId,
    isSubtask: true
  })
  emit('delete')
}

function toggleMember (member) {
  if (subtaskData.value.teamMembers.some(m => m.id === member.id)) {
    subtaskData.value.teamMembers = subtaskData.value.teamMembers.filter(m => m.id !== member.id)
  } else {
    subtaskData.value.teamMembers.push(member)
  }
}

function saveOnClickOutside () {
  if (localTitle.value.trim() !== '') {
    createSubTask()
  } else if (props.isCreate) {
    emit('close')
  }
}

defineExpose({
  titleFocus
})
</script>

<style lang="scss" scoped>
.subtask-btn {
  @apply group-hover:opacity-100;

  @screen md {
    @apply opacity-0
  }
}
</style>
