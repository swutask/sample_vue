<template>
  <div
    ref="taskRef"
    v-clickOutside="save"
    class="relative flex justify-between min-w-[259px]"
    :class="[isCardView && !weekPlanner
               ? 'flex-col rounded-8 px-14 pt-9 pb-6 w-full mb-12 min-h-[100px] bg-primary shadow-event'
               : 'h-[54px]',
             { 'px-10': isListView, '!h-40': weekPlanner }
    ]"
  >
    <div
      class="border-grey-850"
      :class="{'border-b w-full -px-10 flex items-center': !isCardView || weekPlanner}"
    >
      <div
        :class="{
          'flex items-center flex-grow mr-10': !isCardView || weekPlanner,
          'pl-9 !mr-0': weekPlanner
        }"
      >
        <i v-if="isListView" class="icon-radio_btn_unchecked flex-shrink-0 text-grey-cfcfcf text-21 md:text-20 ml-3 mr-10 opacity-70" />

        <div class="flex">
          <SelectBook
            v-if="weekPlanner || isPerspective"
            weekPlanner
            class="ml-[-4px]"
            :class="weekPlanner ? 'mr-7' : 'mr-4'"
            :books="computedBooks"
            labelFontSize="p-0 text-12"
            customButtonClasses=""
            :selectedBook="selectedBookInDropdown"
            @toggleBook="changeBook"
          />

          <div class="overflow-hidden" :class="{'md:max-w-[200px]': weekPlanner }">
            <TitleEditor
              ref="titleInputRef"
              :content="task.title"
              class="task-list-title-subtitle w-full font-normal bg-transparent
              max-h-[100px] overflow-x-hidden overflow-y-auto block multi-truncate-editor"
              :style="weekPlanner ? '--mt-lines: 1;' : '--mt-lines: 2;'"
              :class="{'font-medium': isCardView}"
              :taskId="task.id"
              :bookId="task.bookId"
              allowEmpty
              editorClass="task-card-editor-class"
              editorId="task-card-editor-id"
              hasEnterHandler
              @onEnter="save"
              @onUpdate="updateTitle"
            />
          </div>
        </div>

        <TitleEditor
          v-if="isCardView && !weekPlanner"
          :content="task.subTitle"
          class="task-card-title-subtitle w-full bg-transparent max-h-[100px] overflow-x-hidden overflow-y-auto block mt-5"
          style="--title-editor-placeholder: 'Short description...'"
          :taskId="task.id"
          :bookId="task.bookId"
          editorClass="task-card-editor-class"
          editorId="task-card-editor-id"
          hasEnterHandler
          @onEnter="save"
          @onUpdate="updateSubTitle"
        />

        <div
          class="flex items-center !ml-auto"
          :class="[isCardView && !weekPlanner ? 'mt-20' : 'ml-10']"
        >
          <Urgency
            v-model="task.urgentStatus"
            :task="task"
            :iconSize="weekPlanner ? 13 : 15"
            :is-task-list="!isCardView"
            isCreate
            :weekPlanner="weekPlanner"
            :isAutoMenuPosition="isMobile"
            :customClasses="isListView ? 'p-5' : '!h-26 !py-3'"
            class="mr-3"
          />

          <TaskDate
            v-if="!weekPlanner"
            isCreateNewTask
            :isTeleported="isCardView"
            :current-date="task.endDate"
            labelClasses="rounded-7 border px-10 py-3 border-grey-850 text-[10.5px]
          leading-tight h-26 cursor-pointer"
            :taskDates="taskDates"
            :position="!isCardView ? '-right-12' : 'left-0'"
            @toggleBothDates="toggleDueDate"
          />

          <TaskAssignMember
            v-if="isTeamAccount && isCardView && !weekPlanner"
            isCreate
            class="anim-opacity text-12 ml-auto"
            :task="task"
            :is-task-list="!isCardView"
            :memberIconSize="21"
            :bookId="task.bookId"
            :assignedMembers="task.teamMembers"
            @assignToTask="toggleMember"
          />

          <TaskAssignMember
            v-if="isTeamAccount && !isCardView"
            isCreate
            class="anim-opacity text-12 ml-11"
            :task="task"
            :is-task-list="!isCardView"
            :memberIconSize="21"
            :bookId="task.bookId"
            :assignedMembers="task.teamMembers"
            @assignToTask="toggleMember"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { prepareDate } from '@/core/helper-functions'
import localStorageService from '@/core/local-storage'

const props = withDefaults(defineProps<{
  taskRowId?: number
  bookIds?: number[]
  order?: number
  isCardView?: boolean
  isListView?: boolean
  urgencyStatus?: number | null
  storyPoints?: number | null
  teamMembers?: ITeamMember | null
  taskEndDate?: string | null
  taskTags?: ITag | null
  assignAutomaticallyToMe?: boolean
  weekPlanner?: boolean
  isPerspective?: boolean
  book?: number | null
}>(), {
  order: 9999,
  urgencyStatus: null,
  storyPoints: null,
  book: null,
  weekPlanner: false,
  assignAutomaticallyToMe: true
})

const emit = defineEmits(['hideNewTask', 'addNewTemplate', 'getTasks'])

const { isTeamAccount, member } = useTeam()
const { toggleBookLoading, isMobile } = useGeneral()
const { createTask, getRows, tasks } = useTask()
const { books } = useBook()
const { user } = useProfile()

const route = useRoute()

const taskRef = ref(null)
const titleInputRef = ref(null)

const taskDates = computed(() => ({
  groupDates: true,
  dates: prepareDate(task.value.startDate, task.value.endDate),
  start: props.taskEndDate ? props.taskEndDate : (task.value.startDate || task.value.endDate),
  end: props.taskEndDate ? props.taskEndDate : task.value.endDate
}))

const selectedBook = ref(books.value.find(b => b.id === +((props.weekPlanner || props.isPerspective)
  ? props.book || books.value.filter((a) => !a.isSample)[0].id.toString()
  : route.params.id as string)
) || books.value[0])

const selectedBookInDropdown = ref(books.value.find(b => b.id === +selectedBook.value.id) || books.value[0])

const computedBooks = computed(() => books.value.filter(b => !b.archivedAt && !b.isSample))

const rowIdsFromDropdown = ref()

async function changeBook (book: IBook) {
  selectedBookInDropdown.value = book

  rowIdsFromDropdown.value = await getRows(book.id)
}

const task = ref<ITask>(initNewTask())

onMounted(async () => {
  if (props.weekPlanner || props.isPerspective) {
    const userId = user.value.id
    const lastUsedBooks = localStorageService.getItem('lastUsedBookForWeekPlanner') || {}

    if (lastUsedBooks[userId] && !props.isPerspective) {
      const storedBook = books.value.find(b => b.id === lastUsedBooks[userId])
      if (storedBook) {
        selectedBookInDropdown.value = storedBook
      }
    }

    await getRows((props.weekPlanner || props.isPerspective) ? selectedBook.value.id : +localStorageService.getItem('lastVisitedBook'))
    changeBook(selectedBookInDropdown.value)
  }

  titleInputRef.value.focus()

  setTimeout(() => {
    taskRef.value.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, 200)
})

function initNewTask () {
  const teamMembers = props.teamMembers ? [props.teamMembers as ITeamMember] : []

  if (props.assignAutomaticallyToMe) {
    teamMembers.push(member.value)
  }

  return {
    id: null,
    title: '',
    subTitle: '',
    project: null,
    taskTags: props.taskTags ? [props.taskTags as ITag] : [],
    isUrgent: false,
    urgentStatus: props?.urgencyStatus || null,
    storyPoints: props?.storyPoints || null,
    endDate: props.taskEndDate ? props.taskEndDate : null,
    isToday: false,
    bookId: (props.weekPlanner || props.isPerspective) ? selectedBookInDropdown.value.id : +route.params.id,
    startDate: props.taskEndDate ? props.taskEndDate : null,
    teamMembers,
    endEventTime: '',
    startEventTime: '',
    htmlLink: '',
    integrationType: ''
  }
}

async function save () {
  if (task.value.title.trim() === '') {
    emit('hideNewTask')
    return
  }

  toggleBookLoading(true)

  const { data } = await createTask({
    title: task.value.title,
    subTitle: task.value.subTitle,
    additionalInfo: '',
    isUrgent: task.value.isUrgent,
    taskRowId: (props.weekPlanner || props.isPerspective) ? rowIdsFromDropdown.value[0].id : props.taskRowId,
    bookId: (props.weekPlanner || props.isPerspective) ? selectedBookInDropdown.value.id : selectedBook.value.id,
    isToday: task.value.isToday,
    projectId: task.value.project?.id,
    order: props.order,
    subTask: [],
    startDate: task.value.startDate,
    endDate: task.value.endDate,
    tagIds: task.value.taskTags.map(item => item.id),
    teamMembers: task.value.teamMembers.map(m => m.id),
    urgentStatus: task.value.urgentStatus,
    storyPoints: task.value.storyPoints
  })

  if (props.weekPlanner) {
    const userId = user.value.id
    const storedBooks = localStorageService.getItem('lastUsedBookForWeekPlanner') || {}
    storedBooks[userId] = selectedBookInDropdown.value.id
    localStorageService.setItem('lastUsedBookForWeekPlanner', storedBooks)
  }
  tasks.value.unshift(data)

  emit('getTasks')

  titleInputRef.value?.clearContent()

  emit('hideNewTask')
  toggleBookLoading(false)

  emit('addNewTemplate')

  task.value = initNewTask()
}

function toggleDueDate ({ end, start }) {
  task.value.startDate = start
  task.value.endDate = end
}

function toggleMember (member: ITeamMember) {
  if (task.value.teamMembers.some(m => m.id === member.id)) {
    task.value.teamMembers = task.value.teamMembers.filter(m => m.id !== member.id)
  } else {
    task.value.teamMembers.push(member)
  }
}

function updateTitle (value: string | null) {
  task.value.title = value || ''
}

function updateSubTitle (value: string | null) {
  task.value.subTitle = value || ''
}
</script>
