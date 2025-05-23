<template>
  <div
    class="flex flex-grow group max-w-[700px] transition-[max-width] ease-in-out duration-200"
    :class="{'md:max-w-[820px]': isContentFocused}"
  >
    <div v-if="isOpened" class="flex flex-1 rounded-12 shadow-create-task-modal dark:shadow-event-dark">
      <div
        v-clickOutside="save"
        class="flex flex-grow flex-wrap py-12 rounded-12 anim-shadow bg-primary relative max-w-[700px]"
        :class="{'md:max-w-[820px]': isContentFocused}"
      >
        <div class="px-18">
          <SelectModule
            v-model="selectedBook"
            class="text-13 w-[176px] bg-menu-hover border-none rounded-full mb-15 !mr-auto"
            itemClass="py-7 px-8"
            selectedClass="!px-8 !py-6"
            arrowIconClasses="!text-10"
            :options="computedOptions"
            width="w-[200px]"
            @change="changeCurrentBook"
          >
            <template #selected="{ item }">
              <BookLabel
                v-if="selectedBook?.id"
                class="truncate cursor-pointer"
                :bookId="item.id"
                :has-border="false"
                size="w-20 h-20 mr-8"
                :customStyle="{
                  fontSize: 'text-[12.5px] font-medium',
                  defaultIcon: 'w-15 h-15',
                  iconHover: ''
                }"
              />

              <span v-else class="text-[#ccc] text-14">Select project</span>
            </template>
            <template #option="{ item }">
              <div class="flex justify-between">
                <BookLabel
                  class="truncate cursor-pointer"
                  :bookId="item.id"
                  :class="{'font-bold': selectedBook?.id === item.id}"
                  size="w-20 h-20 mr-8"
                  :has-border="false"
                  :customStyle="{
                    fontSize: 'text-[12.5px] font-normal',
                    defaultIcon: 'w-16 h-16',
                    iconHover: ''
                  }"
                />
                <i v-if="selectedBook?.id === item.id" class="icon-check_mark text-18 self-center opacity-100 group-hover:opacity-100" />
              </div>
            </template>
          </SelectModule>
        </div>

        <div class="flex-grow w-full px-18 mt-2 min-h-[114px]">
          <TitleEditor
            ref="titleEditorRef"
            :key="bookId"
            :content="task.title"
            class="today-new-item-title w-full bg-transparent multi-truncate-editor block overflow-hidden"
            :class="[{ 'line-through opacity-40 dark:opacity-70': !!task.completedAt }]"
            style="--title-editor-placeholder: 'Task title'; --mt-lines: 2;"
            :taskId="task.id"
            :bookId="bookId"
            editorClass="today-new-item-editor-class"
            editorId="today-new-item-editor-id"
            hasEnterHandler
            @onUpdate="onUpdate"
            @onEnter="save"
          />

          <TaskContentEditor
            ref="taskContentRef"
            class="mb-16 mt-3"
            isNewTask
            :content="task.additionalInfo"
            style="--editor-placeholder: 'Add description...'"
            :taskId="task.id"
            :bookId="bookId"
            @onUpdate="onUpdateAdditionalInfo"
          />
        </div>

        <div class="flex md:flex-row flex-col md:gap-x-[10px] gap-x-0 justify-between w-full">
          <div class="flex items-center lg:flex-grow gap-[10px] flex-wrap pl-18">
            <SelectTaskRow
              v-if="selectedBook?.id && task.taskRow"
              :task="task"
              :rows="rows"
              :bookId="bookId"
              customClasses="rounded-6 h-26"
              @select="selectRow"
            />

            <TagsModal
              v-if="task.taskTags.length"
              textColor="text-dark-default"
              :selected-tags="task.taskTags"
              :tags="localTags"
              :maxLabelsAmount="3"
              :iconSize="'text-18'"
              titleFontSize="text-14"
              tagClass="!text-12 !min-w-[35px] !rounded-7"
              position-classes="left-0 top-25 z-9999"
              opacity="opacity-40"
              tagsBtnClasses="rounded-6 w-min !cursor-default !py-0"
              @toggleTag="toggleTaskTag"
              @updateTag="updateTag"
            />

            <StoryPoints
              v-if="task.storyPoints"
              v-model="task.storyPoints"
              border-radius="rounded-6"
              paddings="px-6 py-4"
              :iconSize="14"
              isCreate
              fontSize="text-14"
              :task="task"
              :showTooltip="false"
              preventOpenOnClick
              textColor="text-dark-default"
              opacity="opacity-40"
              title="Estimate"
            />

            <TaskDate
              :current-date="task.endDate"
              :taskDates="taskDates"
              isTaskBoardModal
              paddings="px-6 py-4"
              fontSize="text-13"
              iconSize="text-17"
              opacity="opacity-50"
              @toggleBothDates="toggleDate"
            />

            <Urgency
              v-model="task.urgentStatus"
              :task="(task as ITask)"
              isCreate
              isModal
              :showTooltip="false"
              isAutoMenuPosition
              prefixMargin="mr-6"
              paddings="px-6 py-4"
              :opacity="task?.urgentStatus ? '!opacity-100' : 'opacity-50'"
              fontSize="text-13 text-opacity-100"
              :iconSize="15"
            />

            <Reminder
              v-model="task.reminders"
              :task="(task as ITask)"
              isCreate
              isModal
              isAutoMenuPosition
              paddings="px-6 py-4"
              :opacity="task?.reminders?.length ? '!opacity-100' : 'opacity-50'"
              fontSize="text-13 text-opacity-100"
              :iconSize="13"
              @update:remindAt="onUpdateReminder"
            />

            <DropdownModule
              ref="attributesDropdownRef"
              prefix="icon-more-horizontal text-20"
              :width="170"
              class="anim-opacity"
              top-position="30px"
              :isTeleported="false"
              defaultStyles
              buttonClasses="h-27 bg-menu-hover/[0.06]"
              buttonOpacity="50"
              background="bg-primary dark:bg-grey-110"
              is-auto-menu-position
              preventCloseOnClick
            >
              <TagsModal
                isAttributeDropdown
                :selected-tags="task.taskTags"
                :tags="localTags"
                :isModalView="!isMobile"
                :maxLabelsAmount="3"
                tagsBtnClasses="!p-10 h-[33.5px] !opacity-100"
                iconSize="text-12"
                tagClass="text-[10.5px] !min-w-[35px] max-w-[70px] !rounded-7"
                titleFontSize="text-13"
                paddings="pr-0 py-4"
                textColor="text-dark-default"
                position-classes="left-0 top-25 z-9999"
                opacity="opacity-100"
                @toggleTag="toggleTaskTag"
                @updateTag="updateTag"
              />

              <StoryPoints
                v-model="task.storyPoints"
                isAttributeDropdown
                paddings="p-10"
                :iconSize="12"
                customWrapperClasses="h-34 w-full"
                fontSize="text-13"
                class="w-full"
                isCreate
                :task="task"
                :isTeleported="false"
                borderRadius="rounded-none"
                prefixMargin="!mr-10"
                :showTooltip="false"
                textColor="text-dark-default"
                opacity="opacity-100 !group-hover:opacity-100"
                title="Estimate"
                :isModalView="!isMobile"
                iconsClasses="text-12"
                textClasses="text-13"
              />
            </DropdownModule>
          </div>

          <div class="w-full h-1 bg-grey-850 my-10 md:hidden block" />

          <div class="flex ml-auto items-center pr-18 self-end">
            <TaskAssignMember
              isCreate
              class="anim-opacity text-12 mr-7"
              :task="task"
              paddings="px-6 py-4"
              :assignedMembers="task.teamMembers || []"
              :bookId="bookId"
              isNewTaskModal
              :memberIconSize="28"
              fontSize="text-12"
              :fixedMembers="selectedBook?.id ? [] : [member]"
              @assignToTask="toggleMember"
            />

            <ButtonModule
              text="Create task"
              type="black"
              :disabled="isEmptyTask"
              class="text-14 w-full font-medium rounded-10 justify-center md:py-9
               py-10 px-20 ml-5 hover:opacity-70 anim-opacity dark:bg-sidebar dark:text-white"
              @click="save(true)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { prepareDate } from '@/core/helper-functions'
import localStorageService from '@/core/local-storage'
import dayjs from 'dayjs'

const emit = defineEmits(['close'])

const { tags, getTaskTags, updateTaskTag, createTask, setTasks, tasks, initialDataForNewTask } = useTask()
const { createReminder } = useReminder()
const { books } = useBook()
const route = useRoute()
const { handleLoading, isMobile } = useGeneral()
const { allowAddTasks, currentPlan, toggleLimitModal } = usePlan()
const { member } = useTeam()
const { user } = useProfile()

const rows = ref<ITaskRow[]>([])

const titleEditorRef = ref()
const taskContentRef = ref()

const isContentFocused = computed(() => taskContentRef.value?.isEditorActive)

const isOpened = ref(false)

const task = ref<ITask>({
  id: null,
  title: '',
  subTitle: '',
  additionalInfo: '',
  project: null,
  taskTags: [],
  isUrgent: false,
  bookId: null,
  urgentStatus: null,
  taskRow: rows.value[0],
  endDate: dayjs().format('YYYY-MM-DD'),
  startDate: null,
  teamMembers: [member.value],
  reminders: [],
  storyPoints: null,
  endEventTime: '',
  startEventTime: '',
  htmlLink: '',
  integrationType: ''
})

const selectedBook = ref<IBook>()

const bookId = computed(() => {
  return selectedBook.value?.id
})

const computedOptions = computed(() => {
  return books.value.filter(item => !item.archivedAt && !item.isSample)
    .sort((a, b) => a.title.localeCompare(b.title))
})

const isEmptyTask = computed(() => task.value.title.trim() === '')

const localTags = computed(() => tags.value.filter(tag => tag.bookId === selectedBook.value.id))

const isTaskBoardPage = computed(() => ['TaskBoardTeam', 'TaskBoard'].includes(route.name as string))

const taskDates = computed(() => ({
  groupDates: true,
  dates: prepareDate(task.value.startDate, task.value.endDate),
  start: task.value.startDate || task.value.endDate,
  end: task.value.endDate
}))

onMounted(() => {
  if (!allowAddTasks.value) {
    toggleLimitModal({
      show: true,
      type: 'Special',
      title: 'You\'re Doing Great',
      description: `<p>You've reached the limit of
            <span class="font-semibold underline">${currentPlan.value?.maxTasks} tasks</span>
              on the free plan</p>`
    })

    return
  }

  const lastSelectedBook = getLastSelectedBook()

  selectedBook.value = lastSelectedBook || books.value[0]

  if (isTaskBoardPage.value) {
    selectedBook.value = books.value.find(b => b.id === +route.params.id && !b.isSample) || selectedBook.value
  }

  if ((selectedBook.value as IBook).isSample) {
    selectedBook.value = books.value.filter(e => !e.isSample)[0]
  }

  if (books.value?.length > 0) {
    getTaskTags(books.value.map(b => b.id))
  }

  nextTick(() => {
    titleEditorRef.value.focus()
  })

  getLocalRows()
  openCreateTask()
})

function toggleTaskTag ({ tag, isSelected }) {
  if (isSelected) {
    task.value.taskTags = task.value.taskTags.filter(t => t.id !== tag.id)
  } else {
    task.value.taskTags.push(tag)
  }
}

function updateTag ({ name, id }) {
  updateTaskTag({ name, id, bookId: selectedBook.value.id })
}

async function getLocalRows () {
  const { data } = await taskService.getRows({ bookId: selectedBook.value.id })

  rows.value = data.taskRows
  task.value.taskRow = rows.value[0]
}

function toggleDate ({ start, end }) {
  task.value.endDate = end
  task.value.startDate = start
}

function openCreateTask () {
  isOpened.value = true

  task.value = {
    ...task.value,
    ...initialDataForNewTask.value
  }

  nextTick(() => {
    // titleEditorRef.value?.setCursorAtEnd() // temporary disabled since title editor doesn't have this method
  })
}

function toggleMember (member: ITeamMember) {
  if (task.value.teamMembers.some(m => m.id === member.id)) {
    task.value.teamMembers = task.value.teamMembers.filter(m => m.id !== member.id)
  } else {
    task.value.teamMembers.push(member)
  }
}

async function save (allowOnMobile = false) {
  if (!isMobile.value || allowOnMobile) {
    try {
      if (task.value.title.trim() !== '') {
        handleLoading(true)

        const { data } = await createTask({
          title: task.value.title,
          subTitle: task.value.subTitle,
          order: 0,
          additionalInfo: task.value.additionalInfo,
          isUrgent: task.value.isUrgent,
          taskRowId: task.value.taskRow.id,
          bookId: bookId.value || task.value.bookId || books.value[0]?.id,
          projectId: task.value.project?.id,
          startDate: task.value.startDate,
          endDate: task.value.endDate,
          subTask: [],
          storyPoints: task.value.storyPoints,
          tagIds: task.value.taskTags.map(item => item.id),
          urgentStatus: task.value.urgentStatus,
          teamMembers: task.value.teamMembers.map(m => m.id)
        })

        localStorageService.setItem('lastSelectedBookInTodayAddTask', { [user.value.id]: selectedBook.value?.id })

        if (!isTaskBoardPage.value || +route.params.id === bookId.value) {
          tasks.value.unshift(data)

          setTasks(tasks.value)
        }

        if (task.value.reminders.length) {
          await createReminder({
            date: task.value.reminders[0]?.remindAt,
            taskId: data.id
          }, data)
        }
      }
    } finally {
      handleLoading(false)
      emit('close')
      isOpened.value = false
    }
  }
}

function getLastSelectedBook () {
  const lastSelectedBookIds = localStorageService.getItem('lastSelectedBookInTodayAddTask') || {}

  const filteredBooks = books.value.filter(item => !item.archivedAt)

  return filteredBooks.find(b => b.id === lastSelectedBookIds[user.value.id]) || filteredBooks[0]
}

async function changeCurrentBook (value: IBook) {
  await getLocalRows()

  selectedBook.value = books.value.find(e => e.id === value.id)

  task.value.bookId = value.id
  task.value.taskTags = []
  task.value.reminders = []
  task.value.taskRow = rows.value[0]
  task.value.teamMembers = [member.value]
}

function selectRow (value: ITaskRow) {
  task.value.taskRow = value
}

function onUpdate (value: string) {
  task.value.title = value || ''
}

function onUpdateAdditionalInfo (value: string) {
  task.value.additionalInfo = value || ''
}

function onUpdateReminder (remindAt) {
  task.value.reminders = remindAt ? [{ remindAt }] : []
}
</script>
