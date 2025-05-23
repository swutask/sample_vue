<template>
  <div
    ref="taskRef"
    class="cursor-pointer drag-handler noselect group relative flex
     justify-between h-full w-full bg-primary dark:bg-secondary duration-50 ease-in-out"
    :class="[
      !weekPlanner ? (hasActiveState ? 'card-active-state' : 'dark:shadow-black-1 shadow-task-card') : '',
      isHighlighted ? 'border-2 bg-text-selection  !border-brand' : '',
      !weekPlanner
        ? 'hover:bg-grey-200 rounded-9 active:!shadow-task-card flex-col'
        : 'card-week-planner border-b border-grey-850 items-center',
      {'!bg-grey-200': isMenuOpened}
    ]"
    @click="openModal"
    @contextmenu.prevent.stop="openMenu"
  >
    <div
      :class="[
        showButtonsComputed?.image && hasPreview && !weekPlanner ? '' : 'flex justify-between pr-8 pl-17 pt-12',
        { 'pb-3' :isCompleted || isSmallCard },
        { 'flex justify-between !px-5 py-5': weekPlanner }
      ]"
    >
      <div v-if="showButtonsComputed?.image && hasPreview && !weekPlanner" class="pt-9 px-8 mb-7">
        <img
          class="rounded-6 mx-auto max-h-[135px] w-full object-cover"
          :src="localTask.attachments[0].url"
          alt="image"
          @load="onResize"
        >
      </div>

      <div class="noselect drag-handler pb-7" :class="showButtonsComputed?.image && hasPreview && !weekPlanner ? 'px-14' : ''">
        <div class="flex">
          <BookLabel
            v-if="weekPlanner"
            :showTitle="false"
            showTooltip
            weekPlanner
            class="font-semibold text-13 mr-7 self-start"
            :bookId="task.bookId"
            :googleEvent="!!task.integrationType"
            :customStyle="{
              fontSize: 'text-14 !font-medium',
              defaultIcon: 'w-[70%] h-[70%]',
              iconHover: 'bg-primary'
            }"
            size="w-18 h-18"
            @click="goToBook(task.bookId)"
          />
          <TitleEditor
            :key="localTask.title"
            :content="localTask.title"
            disabled
            class="task-card-title-title w-full bg-transparent overflow-hidden block"
            :style="weekPlanner ? '--mt-lines: 1;' + backgroundColor : '--mt-lines: 2;'"
            :class="[
              { 'line-through opacity-40 dark:opacity-70': !!isCompleted, 'pr-12' :!weekPlanner },
              weekPlanner ? 'multi-truncate-editor-week-planner' : 'multi-truncate-editor']"
            :taskId="localTask.id"
            :bookId="localTask.bookId"
            editorClass="task-card-editor-class"
            editorId="task-card-editor-id"
          />
        </div>

        <TitleEditor
          v-if="localTask.subTitle && showButtonsComputed?.subtitle && !weekPlanner"
          :key="localTask.subTitle"
          :content="localTask.subTitle"
          disabled
          class="task-card-title-subtitle w-full bg-transparent overflow-hidden
           block multi-truncate-editor-task-card-subtitle text-grey-950 mt-2"
          style="--mt-lines: 2;"
          :class="{ 'line-through opacity-40 dark:opacity-70': !!isCompleted, 'ml-23': weekPlanner }"
          :taskId="localTask.id"
          :bookId="localTask.bookId"
          editorClass="task-card-editor-class"
          editorId="task-card-editor-id"
        />
      </div>
    </div>

    <TaskMenuOptions
      v-if="!isClient"
      ref="taskMenuRef"
      :task="localTask"
    />

    <div
      v-if="!isCompleted"
      class="noselect flex justify-between items-center  drag-handler gap-y-[5px] gap-x-[5px]"
      :class="{
        'md:hidden group-hover:hidden': isSmallCard && !hasActiveState,
        'flex-wrap pb-8 pl-16 pr-15': !weekPlanner
      }"
    >
      <div class="flex flex-grow items-center" :class="{'gap-[4px] flex-wrap': !weekPlanner}">
        <div
          v-if="weekPlanner || showSpecificButtons"
          class="noselect flex pr-1 items-center justify-end flex-shrink-0 text-14 !mt-0 self-end"
        >
          <div class="flex" :class="{'gap-x-[5px]': !weekPlanner}">
            <Urgency
              v-if="localTask.urgentStatus && showButtonsComputed.priority"
              v-model="localTask.urgentStatus"
              v-clickOutside="() => showUrgencyDropdown = false"
              hideDeleteButton
              :weekPlanner="weekPlanner"
              :isAutoMenuPosition="isMobile || weekPlanner"
              :disabled="isClient"
              :task="localTask"
              :iconSize="14"
              zIndex="z-9999"
              customClasses="w-24 h-24"
              @update:visibility="showUrgencyDropdown = $event"
              @update:modelValue="showUrgencyDropdown = false"
            />

            <div v-if="weekPlanner && !props.task.htmlLink" class="md:group-hover:flex md:hidden flex">
              <ButtonModule
                :prefix="`icon-check-circle-outline md:text-18 text-19`"
                :icon-has-margin="false"
                buttonClasses="!p-2"
                has-hover
                :tooltipText="isCompleted ? 'Completed' : 'Complete task'"
                tooltipClasses="text-11 px-10 py-7 rounded-8 z-9999"
                teleportTooltip
                tooltipBottom
                class="rounded-8 anim-color-200 p-2 text-app-color hover:bg-menu-hover/[0.03] flex items-center justify-center"
                :class="{
                  'p-3': !isCompleted,
                  'ml-1': localTask.urgentStatus && showButtonsComputed.priority
                }"
                @click.stop="completeTask"
              />
            </div>

            <ButtonModule
              v-if="additionalInfo.attachments && showButtonsComputed.attachments"
              tooltipText="Attachments"
              tooltipClasses="text-11 px-10 py-7 rounded-8 z-9999"
              teleportTooltip
              tooltipBottom
            >
              <template #wrapper>
                <div class="flex items-center p-4 rounded-7 anim-all border border-grey-850 hover:bg-grey-200 text-13 -mt-2 opacity-70">
                  <i class="icon-attach-file" />
                  <p>{{ additionalInfo.attachments }}</p>
                </div>
              </template>
            </ButtonModule>

            <ButtonModule
              v-if="localTask.storyPoints && showButtonsComputed.storyPoints && !weekPlanner"
              tooltipText="Estimate"
              tooltipClasses="text-11 px-10 py-7 rounded-8 z-9999"
              teleportTooltip
              tooltipBottom
            >
              <template #wrapper>
                <div class="flex items-center p-5 rounded-6 anim-all border border-grey-850 hover:bg-grey-200 opacity-70 h-24">
                  <i class="icon-story-points text-12 mr-2" />
                  <p class="leading-none text-12">{{ localTask.storyPoints }}</p>
                </div>
              </template>
            </ButtonModule>

            <ButtonModule
              v-if="additionalInfo.hasContent && showButtonsComputed.description"
              tooltipText="Content"
              tooltipClasses="text-11 px-10 py-7 rounded-8 z-9999"
              teleportTooltip
              tooltipBottom
            >
              <template #wrapper>
                <div class="py-3 px-5 rounded-7 anim-all border border-grey-850 hover:bg-grey-200 leading-none -mt-2 opacity-70">
                  <i
                    class="icon-additional_info text-17"
                  />
                </div>
              </template>
            </ButtonModule>
          </div>
        </div>

        <TaskDate
          v-if="localTask.endDate && showButtonsComputed?.dueDate && !weekPlanner"
          v-clickOutside="() => showCalendar = false"
          :current-date="localTask.endDate"
          :disabled="isClient"
          hideDeleteButton
          isTaskCard
          isTeleported
          labelClasses="rounded-7 border px-9 py-3 border-grey-850 text-[10.5px]
          leading-tight h-24 hover:bg-menu-hover cursor-pointer"
          :taskDates="taskDates"
          @toggleShow="showCalendar = $event"
          @toggleBothDates="toggleBothDates"
        />

        <Subtasks
          v-if="localTask?.subTask?.length > 0 && !weekPlanner"
          :task="task"
          class="hover:bg-grey-200 h-24 px-6 rounded-7 border border-grey-850"
        />

        <ButtonModule
          v-if="localTask.reminders?.length"
          tooltipText="Reminder"
          tooltipClasses="text-11 px-10 py-7 rounded-8 z-9999"
          teleportTooltip
          tooltipBottom
        >
          <template #wrapper>
            <div
              class="h-24 flex items-center opacity-70"
              :class="{'py-4 px-6 rounded-8 anim-all text-13 border border-grey-850 hover:bg-grey-200': !weekPlanner}"
            >
              <i class="icon-alarm" />
            </div>
          </template>
        </ButtonModule>

        <CommentCount
          v-if="countMessages > 0 && showButtonsComputed?.comments && !weekPlanner"
          wrapperStyling="flex items-center p-5 rounded-7 anim-all border border-grey-850 hover:bg-grey-200 opacity-70 h-24"
          :countMessages="countMessages"
          iconStyling="mr-2 text-11"
          countStyling="text-11"
          customStyling=""
          tooltipBottom
        />

        <!-- tags start -->
        <TagsModal
          v-if="localTask.taskTags.length && showButtonsComputed.labels && !weekPlanner"
          :selected-tags="localTask.taskTags"
          :tags="tags"
          :disabled="isClient"
          :showEmptyState="false"
          tagClass="text-[10.5px] !min-w-[35px] max-w-[70px] !rounded-6 !h-23 ml-2"
          :maxLabelsAmount="3"
          @blockHotKey="blockHotKey"
          @toggleTag="handleToggleTaskTag"
          @updateTag="updateTag"
        />
        <!-- tags end -->

        <div class="flex items-center ml-auto">
          <SampleMembers
            v-if="localTask.isSample && isTeamAccount"
            :count="sampleMembersCount"
            :size="21"
            :sliceIndex="sampleMembersSliceIndex"
          />

          <TaskAssignMember
            v-if="isTeamAccount && showButtonsComputed?.assignee && !localTask.isSample && !weekPlanner"
            v-clickOutside="() => showUserModal = false"
            class="anim-opacity text-12"
            :class="(localTask.teamMembers?.length || showUserModal) || hasActiveState ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'"
            :task="task"
            :assignedMembers="localTask.teamMembers || []"
            :disabled="isClient"
            :bookId="localTask.bookId"
            :showUserModal="showUserModal"
            fontSize="!text-9"
            iconSize="text-18"
            isTaskCard
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
import { tagColorWeekPlanner } from '@/plugins/filters'

const props = defineProps<{
  task: ITask
  weekPlanner?: boolean
  isPerspective?: boolean
  showOnTask?: IShowOnTaskObj
}>()

const backgroundColor = computed(() => {
  const tag = props.task.taskTags[0]

  return tag?.color ? tagColorWeekPlanner(tag?.color) : ''
})

const emit = defineEmits(['getTasks', 'updateHeight'])

const { blockHotKey, isMobile } = useGeneral()
const { isTeamAccount, team } = useTeam()
const {
  tags: storedTags,
  showOnTask,
  complete,
  updateTask,
  updateTaskTag,
  toggleTaskTag,
  handleUpdateTask,
  getTasksForTaskBoardPageWithFilters
} = useTask()
const { books } = useBook()
const { isClient } = useProfile()
const route = useRoute()
const router = useRouter()

const taskRef = ref(null)
const taskMenuRef = ref(null)

const additionalInfo = ref<{
  hasContent: boolean
  attachments: number
}>({
  hasContent: false,
  attachments: 0
})
const showUserModal = ref(false)
const showUrgencyDropdown = ref(false)
const showCalendar = ref(false)

const isMenuOpened = computed(() => taskMenuRef.value?.isOpened)

const sampleMembersCount = computed(() => {
  const result = Math.floor(Math.random() * (3 - 1 + 1) + 1)

  return result + sampleMembersSliceIndex.value > 3 ? 3 : result + sampleMembersSliceIndex.value
})

const sampleMembersSliceIndex = computed(() => Math.floor(Math.random() * 3))

const tags = computed(() => storedTags.value.filter(tag => tag.bookId === selectedBook.value?.id))
const countMessages = computed(() => props.task.chat?.messages?.length || 0)

const isHighlighted = computed(() => props.task.id === +route.query.highlight)

const isCompleted = computed(() => !!props.task.completedAt)

const localTask = computed<ITask>({
  get: () => props.task,
  set: value => handleUpdateTask(value)
})

const showButtonsComputed = computed(() => {
  return props.isPerspective ? props.showOnTask : showOnTask.value
})

const showSpecificButtons = computed(() => {
  return (localTask.value.urgentStatus && showButtonsComputed.value.priority) ||
         (additionalInfo.value.attachments && showButtonsComputed.value.attachments) ||
         (additionalInfo.value.hasContent && showButtonsComputed.value.description) ||
         (localTask.value.storyPoints && showButtonsComputed.value.storyPoints)
})

const isSmallCard = computed(() => {
  return !showSpecificButtons.value &&
  (localTask.value.teamMembers?.length <= 0 || !showButtonsComputed.value?.assignee) &&
  (!localTask.value.endDate || !showButtonsComputed.value?.dueDate) &&
  (!localTask.value.taskTags.length || !showButtonsComputed.value.labels)
})

const hasPreview = computed(() => props.task.attachments?.length > 0 && props.task.attachments[0].showInCard)
const hasActiveState = computed(() => showUserModal.value || showUrgencyDropdown.value || showCalendar.value)

const taskDates = computed(() => ({
  groupDates: props.task.startDate && props.task.endDate,
  dates: prepareDate(props.task.startDate, props.task.endDate),
  start: props.task.startDate,
  end: props.task.endDate,
  rrule: props.task?.rrule
}))

const selectedBook = computed(() => books.value.find(b => b.id === props.task.bookId))

watch([() => props.task.additionalInfo, () => props.task.chat?.messages], () => checkAdditionalInfo())
watch(() => props.task.teamMembers?.length, (newValue) => {
  if (!newValue) showUserModal.value = true
})

watch(() => route.query.additionalInfo, (value) => {
  if (value && isHighlighted.value) {
    router.push({ query: { taskId: props.task.id } })
  }
})

onMounted(() => {
  nextTick(() => {
    if (+route.query?.taskId === props.task.id || +route.query?.highlight === props.task.id) {
      router.push({ query: { taskId: props.task.id } })
      unHighLightTask()
    }

    if (isHighlighted.value) {
      taskRef.value.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'center' })
      if (route.query.additionalInfo) {
        router.push({ query: { taskId: props.task.id } })
      }
    }
  })
  checkAdditionalInfo()
  onResize()
})

onUpdated(() => {
  onResize()
})

function onResize () {
  setTimeout(() => {
    if (taskRef.value) {
      const rect = taskRef.value.getBoundingClientRect()

      const h = props.task.completedAt && !props.task.attachments?.length ? 38 : rect.height

      emit('updateHeight', `min-height: ${h}px`)
    }
  }, 500)
}

function unHighLightTask () {
  setTimeout(() => {
    const query = Object.assign({}, route.query)
    delete query.highlight

    router.replace({ query })
  }, 3000)
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

function checkAdditionalInfo () {
  const body = document.createElement('body')

  body.innerHTML = props.task.additionalInfo

  const gifs = props.task.additionalInfo?.match(/type="gif"/g) || []
  const images = props.task.additionalInfo?.match(/type="image"/g) || []
  const files = props.task.additionalInfo?.match(/type="file"/g) || []

  const messageAttachments = props.task.chat?.messages?.reduce((a, b) => a + b.attachments?.length || 0, 0) || 0

  additionalInfo.value = {
    attachments: gifs?.length + images?.length + files?.length + messageAttachments,
    hasContent: !!body.textContent
  }
}

function toggleBothDates (value) {
  updateTask({
    id: props.task.id,
    bookId: props.task.bookId,
    startDate: value.start,
    endDate: value.end,
    rrule: value.rrule
  })

  handleUpdateTask({
    ...props.task,
    bookId: props.task.bookId,
    startDate: value.start,
    endDate: value.end,
    rrule: value.rrule
  })

  showCalendar.value = false

  if (route.name === 'TaskBoardTeam') {
    getTasksForTaskBoardPageWithFilters(+route.params.id)
  }
}

function updateTag ({ name, id }) {
  updateTaskTag({ name, id, bookId: props.task.bookId })
    .then(() => emit('getTasks'))
}

function toggleShowUserDropdown () {
  setTimeout(() => { showUserModal.value = !showUserModal.value })
}

async function completeTask () {
  const completedAt = props.task.completedAt ? null : new Date()

  if (completedAt) {
    new Audio(completeSound).play()
  }

  await complete({
    id: props.task.id,
    bookId: props.task.bookId,
    completedAt,
    task: props.task
  })
}

function hasPreventClass (el) {
  if (!el || el.classList.contains('no-drag')) {
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
  if (props.task.htmlLink) {
    window.open(props.task.htmlLink, '_blank')
  } else if (!hasPreventClass(e.target)) {
    router.push({ query: { taskId: props.task.id } })
  }
}

function goToBook (bookId: number) {
  router.push({ name: 'TaskBoardTeam', params: { team: team.value.link, id: bookId } })
}

function openMenu (e: MouseEvent) {
  if (!props.task.htmlLink) {
    taskMenuRef.value.open(e)
  }
}
</script>
