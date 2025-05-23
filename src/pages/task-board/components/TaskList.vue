<template>
  <div
    v-clickOutside="cancelEdit"
    class="noselect group relative flex items-center justify-between w-full anim-color px-10 rounded-10 hover:bg-grey-200"
    :class="[
      isHighlighted ? 'bg-text-selection' : '',
      {'!bg-grey-200': isMenuOpened}
    ]"
    @click="openModal"
    @contextmenu.prevent.stop="openMenu"
  >
    <TaskMenuOptions
      v-if="!isEdit && !isClient"
      ref="taskMenuRef"
      :task="task"
    />

    <div
      class="flex items-center justify-between w-full anim-color  border-grey-425"
      :class="[ index === 0 ? 'border-t border-b' : 'border-b',
                isEdit ? 'cursor-default' : 'cursor-pointer drag-handler', task.subTitle ? '!min-h-[54px]' : '!min-h-[45px]' ]"
    >
      <div
        class="noselect flex items-center flex-grow truncate min-w-[90px] md:w-[250px]"
        :class="[{'pb-0': !isCompleted}]"
      >
        <div class="flex items-center truncate p-5">
          <div class="flex items-center justify-center w-25 h-25 md:w-17 md:h-17 mr-7 md:mr-15 cursor-pointer shrink-0" @click.stop="completeTask">
            <AnimatedCircleCheckMark v-show="startCompleteAnimation" />

            <i
              v-if="!startCompleteAnimation"
              v-hover="(value) => isCompleteIconHovered = value"
              :class="isCompleted ?
                'icon-radio_btn_checked text-[#15cb54] text-20 md:text-18 md:ml-1' :
                isCompleteIconHovered ? 'icon-radio_btn_checked text-grey-975 text-18 md:ml-1' :
                'icon-radio_btn_unchecked text-grey-cfcfcf hover:text-grey-950 text-22 md:text-21 md:ml-1'"
            />
          </div>
          <div class="flex flex-col">
            <TitleEditor
              :key="localTask.title"
              :content="localTask.title"
              disabled
              class="task-list-title-subtitle w-full bg-transparent max-h-[60px] pr-12 overflow-hidden block multi-truncate-editor "
              style="--mt-lines: 1;"
              :class="{ 'line-through opacity-40 dark:opacity-70 ml-1': isCompleted }"
              :taskId="localTask.id"
              :bookId="localTask.bookId"
              editorClass="task-list-editor-class"
              editorId="task-list-editor-id"
            />

            <TitleEditor
              v-if="localTask.subTitle && showOnTask?.subtitle"
              :key="localTask.subTitle"
              :content="localTask.subTitle"
              disabled
              class="task-list-subtitle w-full bg-transparent max-h-[60px] mt-2 pr-12 overflow-hidden block multi-truncate-editor "
              style="--mt-lines: 1;"
              :class="{ 'line-through opacity-40 dark:opacity-70 ml-1': isCompleted }"
              :taskId="localTask.id"
              :bookId="localTask.bookId"
              editorClass="task-list-editor-class"
              editorId="task-list-editor-id"
            />
          </div>
        </div>

        <div v-if="!isEdit" class="hidden lg:flex items-center leading-none space-x-5">
          <div v-if="additionalInfo.attachments && showOnTask.attachments" class="flex items-center opacity-25 mr-5">
            <i class="icon-attach-file text-15" />
            <p>{{ additionalInfo.attachments }}</p>
          </div>

          <CommentCount
            v-if="countMessages > 0 && showOnTask.comments"
            :countMessages="countMessages"
            wrapperStyling="flex items-center"
            iconStyling="mr-3 text-15"
            customStyling="flex items-center opacity-25 mr-5"
            countStyling="text-15"
            tooltipBottom
          />

          <div v-if="task.storyPoints && showOnTask.storyPoints" class="flex items-center opacity-25 mr-5">
            <i class="icon-story-points text-15 mr-3" />
            <p class="leading-none">{{ task.storyPoints }}</p>
          </div>

          <i v-if="additionalInfo.hasContent && showOnTask.description" class="icon-additional_info text-15 opacity-25" />
          <Subtasks v-if="task?.subTask?.length > 0" :task="task" />
        </div>
      </div>

      <div class="lg:flex items-center hidden gap-x-8 group">
        <i v-if="task.reminders?.length" class="icon-alarm text-grey-11 text-18" />
        <!-- tags start -->
        <div v-if="task.taskTags?.length && showOnTask.labels && tags" class="hidden lg:flex">
          <TagsModal
            v-clickOutside="() => showTagsDropdown = false"
            isTaskList
            :selected-tags="task.taskTags"
            :tags="tags"
            :disabled="isClient"
            :tagMaxWidth="120"
            :class="[
              task.taskTags?.length || isEdit || showTagsDropdown
                || areAttributesInActiveState ? '!flex' : 'hidden group-hover:flex',
              {'': task.taskTags?.length && !task.urgentStatus}
            ]"
            tag-class="min-w-[25px] h-24 text-10"
            :maxLabelsAmount="3"
            @toggleTag="handleToggleTaskTag"
            @updateTag="updateTag"
            @showDropdown="showTagsDropdown = $event"
          />
        </div>
        <!-- tags end -->

        <!-- urgency start -->
        <Urgency
          v-if="showOnTask.priority && task.urgentStatus"
          v-clickOutside="() => showUrgencyDropdown = false"
          :modelValue="task.urgentStatus"
          isTaskList
          positionMenu="right"
          :task="task"
          :iconSize="17"
          :disabled="isClient"
          hideDeleteButton
          @update:visibility="showUrgencyDropdown = $event"
          @update:modelValue="showUrgencyDropdown = false"
        />
        <!-- urgency end -->

        <!-- due date start -->
        <TaskDate
          v-if="showOnTask.dueDate && task.endDate"
          v-clickOutside="() => showCalendar = false"
          isTaskList
          position="right-0 top-30"
          :isCompleted="!!task?.completedAt"
          :disabled="isClient"
          :current-date="task.endDate"
          :taskDates="taskDates"
          @toggleBothDates="toggleDueDate"
          @toggleShow="showCalendar = $event"
        />

        <!-- due date end -->

        <!-- members start -->
        <div v-if="isTeamAccount && showOnTask.assignee" class="hidden" :class="task.teamMembers?.length ? 'lg:flex' : 'lg:group-hover:flex'">
          <SampleMembers
            v-if="task.isSample"
            :count="sampleMembersCount"
            :sliceIndex="sampleMembersSliceIndex"
            :size="24"
            class="mr-7"
          />

          <TaskAssignMember
            v-clickOutside="() => showUserModal = false"
            class="anim-opacity text-12"
            :class="[
              task.teamMembers?.length || showUserModal || areAttributesInActiveState ? 'flex' : 'hidden group-hover:flex',
            ]"
            :task="task"
            :assignedMembers="task.teamMembers || []"
            :disabled="isClient"
            :bookId="task.bookId"
            :memberIconSize="24"
            fontSize="!text-12"
            :hasRelatedClass="false"
            :showUserModal="showUserModal"
            @click="toggleShowUserDropdown"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { prepareDate } from '@/core/helper-functions'
import completeSound from '@/assets/sounds/complete-v2.mp3'

const props = defineProps<{
  task: ITask
  index?: number
}>()

const emit = defineEmits(['getTasks', 'updateHeight'])

const { setNotification } = useGeneral()
const { isTeamAccount } = useTeam()
const { isClient } = useProfile()
const {
  showOnTask,
  tags: storedTags,
  updateTask,
  complete,
  updateTaskTag,
  toggleTaskTag,
  handleUpdateTask,
  getTasksForTaskBoardPageWithFilters
} = useTask()
const { books } = useBook()
const route = useRoute()
const router = useRouter()
const taskMenuRef = ref(null)
const isCompleteIconHovered = ref(false)
const showUserModal = ref(false)
const showUrgencyDropdown = ref(false)
const showCalendar = ref(false)
const startCompleteAnimation = ref(false)
const showTagsDropdown = ref(false)

const additionalInfo = ref<{
  attachments: number
  hasContent: boolean
}>({
  attachments: 0,
  hasContent: false
})

const timeWasUpdated = false

const isMenuOpened = computed(() => taskMenuRef.value?.isOpened)

const areAttributesInActiveState = computed(() => (showTagsDropdown.value || showUserModal.value ||
  showCalendar.value || showUrgencyDropdown.value || taskMenuRef.value?.showMenu)
)

const sampleMembersCount = computed(() => {
  const result = Math.floor(Math.random() * (3 - 1 + 1) + 1)

  return result + sampleMembersSliceIndex.value > 3 ? 3 : result + sampleMembersSliceIndex.value
})

const taskDates = computed(() => ({
  groupDates: true,
  dates: prepareDate(props.task.startDate, props.task.endDate),
  start: props.task.startDate || props.task.endDate,
  end: props.task.endDate,
  rrule: props.task?.rrule
}))

const sampleMembersSliceIndex = computed(() => Math.floor(Math.random() * 3))

const tags = computed(() => storedTags.value.filter(tag => tag.bookId === selectedBook.value?.id))
const countMessages = computed(() => props.task.chat?.messages?.length || 0)

const isHighlighted = computed(() => props.task.id === +route.query.highlight)

const isCompleted = computed(() => !!props.task.completedAt)

const localTask = computed({
  get: () => props.task,
  set: value => handleUpdateTask(value)
})

watch(() => localTask.value.subTitle, (newSubtitle) => {
  onResize(!!newSubtitle)
})

const isEdit = ref(!props.task.title)

const temporaryTitle = ref(props.task.title || '')
const temporarySubTitle = ref(props.task.subTitle || '')

const selectedBook = computed(() => books.value.find(b => b.id === props.task.bookId))

// const toggleEdit = () => {
//   if (isClient.value) return

//   setTimeout(() => {
//     isEdit.value = true
//     nextTick(() => {
//       titleInputRef.value.focus()
//       titleInputRef.value.setSelectionRange(0, 9999)
//     })
//   }, 100)
// }

watch([() => props.task.additionalInfo, () => props.task.chat.messages], () => checkAdditionalInfo())
watch(() => route.query.additionalInfo, (value) => {
  if (value && isHighlighted.value) {
    router.push({ query: { taskId: props.task.id } })
  }
})

onMounted(async () => {
  if (+route.query?.taskId === props.task.id || +route.query?.highlight === props.task.id) {
    router.push({ query: { taskId: props.task.id } })
    unHighLightTask()
  }
  checkAdditionalInfo()
  onResize(!!props.task.subTitle)
})

function onResize (subtitle: boolean) {
  if (subtitle) {
    emit('updateHeight', 'min-height: 54px')
  } else {
    emit('updateHeight', 'min-height: 45px')
  }
}

function toggleShowUserDropdown () {
  setTimeout(() => { showUserModal.value = !showUserModal.value })
}

function unHighLightTask () {
  setTimeout(() => {
    const query = Object.assign({}, route.query)
    delete query.highlight

    router.replace({ query })
  }, 3000)
}

function checkAdditionalInfo () {
  const body = document.createElement('body')

  body.innerHTML = props.task.additionalInfo

  const gifs = props.task?.additionalInfo?.match(/type="gif"/g) || []
  const images = props.task?.additionalInfo?.match(/type="image"/g) || []
  const files = props.task?.additionalInfo?.match(/type="file"/g) || []

  const messageAttachments = props.task.chat?.messages?.reduce((a, b) => a + b.attachments?.length || 0, 0) || 0

  additionalInfo.value = {
    attachments: gifs?.length + images?.length + files?.length + messageAttachments,
    hasContent: !!body.textContent
  }
}

function cancelEdit () {
  isEdit.value = false
  save()
}

function save () {
  const title = localTask.value.title.trim()
  const subTitle = localTask.value.subTitle?.trim()

  if (title === '') {
    setNotification({
      uuid: window.crypto.randomUUID(),
      message: 'Title cannot be empty'
    })
    localTask.value.title = temporaryTitle.value
    return
  }

  if (title !== temporaryTitle.value.trim() || subTitle !== temporarySubTitle.value || timeWasUpdated) {
    temporaryTitle.value = localTask.value.title
    temporarySubTitle.value = localTask.value.subTitle

    const data = {
      title,
      subTitle
    }

    updateTask({
      id: props.task.id,
      bookId: props.task.bookId,
      ...data
    })

    handleUpdateTask({
      ...props.task,
      bookId: props.task.bookId,
      ...data
    })
  }
}

function toggleDueDate ({ end, start, rrule }) {
  updateTask({
    id: props.task.id,
    bookId: props.task.bookId,
    endDate: end,
    startDate: start,
    rrule
  })

  handleUpdateTask({
    ...props.task,
    bookId: props.task.bookId,
    endDate: end,
    startDate: start,
    rrule
  })

  if (route.name === 'TaskBoardTeam') {
    getTasksForTaskBoardPageWithFilters(+route.params.id)
  }
}

function updateTag ({ name, id }) {
  updateTaskTag({ name, id, bookId: props.task.bookId })
    .then(() => emit('getTasks'))
}

function completeTask () {
  const completedAt = props.task.completedAt ? null : new Date()

  if (completedAt) {
    new Audio(completeSound).play()
    startCompleteAnimation.value = true
  }

  setTimeout(() => {
    complete({
      id: props.task.id,
      bookId: props.task.bookId,
      completedAt,
      task: props.task
    })

    startCompleteAnimation.value = false
  }, completedAt ? 700 : 0)
}

function hasPreventClass (el) {
  if (!el || el.classList.contains('no-drag') || isEdit.value) {
    return true
  } else {
    if (el && el.parentElement?.tagName !== 'BODY') {
      return hasPreventClass(el.parentElement)
    } else {
      return false
    }
  }
}

function openModal (e) {
  if (!hasPreventClass(e.target)) {
    router.push({ query: { taskId: props.task.id } })
  }
}

function handleToggleTaskTag ({ tag, isSelected, isUpdate }) {
  let taskTags = props.task.taskTags || []

  if (isUpdate) {
    if (taskTags.length > 0) {
      const currentTagIndex = props.task.taskTags.findIndex(item => item.id === tag.id)
      taskTags = props.task.taskTags
      taskTags.splice(currentTagIndex, 1, { ...taskTags[currentTagIndex], name: tag.name })
    } else {
      taskTags = [tag]
    }
  } else {
    if (isSelected) {
      taskTags = taskTags.filter(t => t.id !== tag.id)
    } else {
      taskTags.push(tag)
    }

    toggleTaskTag({
      tag,
      taskId: props.task.id,
      isSelected,
      bookId: props.task.bookId
    })
  }

  handleUpdateTask({
    ...props.task,
    taskTags
  })
}

function openMenu (e: MouseEvent) {
  taskMenuRef.value.open(e)
}
</script>

<style lang="scss">
.list-active-state {
  @apply bg-grey-200;
}

.list {
  @apply border-b;

  &:hover {
    @apply list-active-state;
  }
}
</style>
