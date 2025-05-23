<template>
  <div ref="itemRef" class="relative group">
    <div
      class="group-scope noselect relative w-full border-grey-425 border-b py-2 cursor-pointer rounded-10 hover:bg-grey-200"
      :class="{ 'border-t': index === 0 }"
      @click="openModal"
      @contextmenu.prevent.stop="openMenu"
    >
      <TaskMenuOptions
        v-if="!isClient"
        ref="taskMenuRef"
        :task="task"
      />

      <div class="w-full flex items-center justify-between h-42">
        <div class="flex items-center truncate mr-10">
          <BookLabel
            v-if="sortedBy !== 'Space'"
            background="bg-grey-light group-scope-hover:bg-grey-light-hover anim-color"
            class="truncate cursor-pointer text-14 py-5 shrink-0 md:mr-10"
            :bookId="thisBook?.id"
            :showTitle="false"
            showTooltip
            :customStyle="{
              fontSize: 'text-15 font-medium',
              defaultIcon: 'w-18 h-18 md:mx-auto mx-1',
              iconHover: ''
            }"
            :has-border="false"
            :googleEvent="!!task.integrationType"
          />
          <div class="flex items-center justify-center w-18 h-18 mr-10" @click.stop="completeTask">
            <AnimatedCircleCheckMark v-show="startCompleteAnimation" />

            <i
              v-if="!startCompleteAnimation"
              v-hover="(value) => isCompleteIconHovered = value"
              class="flex items-center justify-center"
              :class="isCompleted ?
                'icon-radio_btn_checked text-[#15cb54] md:text-18 text-21' :
                isCompleteIconHovered ? 'icon-radio_btn_checked text-grey-975 md:text-18 text-19 w-19 h-19' :
                'icon-radio_btn_unchecked text-grey-cfcfcf md:text-20 text-23'"
            />
          </div>

          <TitleEditor
            :key="task.title"
            :content="task.title"
            disabled
            class="today-item-title w-full bg-transparent max-h-44 flex-1 overflow-hidden block multi-truncate-editor"
            style="--mt-lines: 1;"
            :class="{ 'line-through opacity-40 dark:opacity-70': !!task.completedAt }"
            :taskId="task.id"
            :bookId="task.bookId"
            editorClass="today-editor-class"
            editorId="today-editor-id"
          />

          <i v-if="task.reminders?.length" class="icon-alarm text-grey-11 text-16 mx-10" />
        </div>

        <div class="flex items-center shrink-0">
          <Subtasks v-if="task?.subTask?.length > 0" class="mr-10 mt-2" :task="task" />

          <div v-if="hasTags && showOnTask.labels && !isMobile" class="flex items-center text-app-color mr-10 space-x-5">
            <div
              v-for="tag in task.taskTags"
              :key="tag.id"
              class="text-11 font-medium flex items-center flex-shrink-0 rounded-full
              h-23 min-w-[30px] px-7 select-none md:select-auto tracking-small"
              :style="tagColor(tag.color)"
            >
              {{ tag.name }}
            </div>
          </div>
          <div v-if="task.integrationType && task.startEventTime !== null">
            <p class="opacity-40 text-12 font-medium mr-10">{{ task?.startEventTime }} {{ task?.endEventTime }}</p>
          </div>

          <div v-if="date && showOnTask.dueDate" class="text-12 font-medium mr-10">
            <p
              v-if="isToday || date === 'today'"
              class="border border-grey-275 rounded-full px-10"
              :class="{'hidden': sortedBy === 'Date'}"
            >
              Today
            </p>
            <p
              v-else-if="isTomorrow"
              class="border border-grey-275 rounded-full px-10"
              :class="{'hidden': sortedBy === 'Date'}"
            >
              Tomorrow
            </p>
            <p v-else :class="(isOverdue && !task?.completedAt) ? 'text-red-light' : 'opacity-40'">{{ date }}</p>
          </div>

          <Urgency
            v-if="task.urgentStatus && showOnTask.priority"
            :key="task.urgentStatus"
            :task="task"
            class="mr-10"
            disabled
            :iconSize="15"
            :modelValue="task.urgentStatus"
          />

          <TaskAssignMember
            v-if="showOnTask.assignee"
            class="text-13 md:mr-7 mr-10"
            :assignedMembers="task.teamMembers || []"
            :task="task"
            :bookId="task.bookId"
            :showUserModal="false"
            disabled
          />
        </div>
      </div>

      <div v-if="filteredSubTasks.length > 0" class="ml-[67px] mb-8">
        <div v-for="subtask in filteredSubTasks" :key="subtask.id">
          <SubtaskItem
            :subtask="subtask"
            :task="task"
            class="h-34"
            :showOnTask="showOnTask"
            :taskAssignMemberClasses="showOnTask.priority ? '-mr-10' : '-mr-5'"
            :urgencyClasses="showOnTask.priority && subtask.urgentStatus ? '!ml-10' : ''"
            disabled
          />
        </div>
      </div>
    </div>
    <div v-if="showBtn" class="absolute h-full left-full top-1/2 transform -translate-y-1/2 pl-13 hidden group-hover:flex">
      <div
        class="cursor-pointer anim-all w-full !border-grey-10 hover:border-dark-1000 board-view-border my-auto
        text-grey-1200 rounded-full bg-primary text-center text-13 py-4 px-10 whitespace-nowrap flex items-center"
        @click="goToTask"
      >
        Go to task
        <i class="icon-top-right ml-5" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { tagColor, parseDate } from '@/plugins/filters'
import { checkIsToday, checkIsTomorrow } from '@/core/helper-functions'
import { getAssignedSubTasks } from '../utils'
import completeSound from '@/assets/sounds/complete-v2.mp3'

const props = defineProps<{
  task: ITask
  index?: number
  sortedBy: string
  showOnTask: IShowOnTaskObj
  completedFilter: IShowCompletedFilter
  membersFilter?: ITeamMember[]
  name?: string | number | object | null
}>()

const { books } = useBook()
const { changeBook } = useBookChange()
const { innerWidth, isMobile } = useGeneral()
const { complete } = useTask()
const { isClient } = useProfile()
const router = useRouter()

const showBtn = ref(true)
const itemRef = ref(null)
const taskMenuRef = ref(null)

const startCompleteAnimation = ref()

const isCompleteIconHovered = ref(false)

const isCompleted = computed(() => !!props.task.completedAt)

const isToday = computed(() => checkIsToday(new Date(props.task.endDate)))

const isTomorrow = computed(() => checkIsTomorrow(new Date(props.task.endDate)))

const thisBook = computed(() => books.value.find(b => b.id === props.task.bookId))

const isOverdue = computed(() => {
  const today = new Date()
  const curDate = new Date(props.task.endDate)

  return curDate.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0)
})

const assignedSubtasks = computed(() => {
  return getAssignedSubTasks(props.task, props.completedFilter, props.membersFilter) || []
})

const filteredSubTasks = computed(() => {
  const nextDay = new Date()
  nextDay.setDate(nextDay.getDate() + 1)

  const date = parseDate(new Date(), 'YYYY-MM-DD')
  const tomorrow = parseDate(nextDay, 'YYYY-MM-DD')

  if (props.task.endDate || props.sortedBy !== 'Date') return assignedSubtasks.value

  return assignedSubtasks.value.filter((item) => {
    if (props.sortedBy === 'Date') {
      if (props.name === 'No due date') {
        return (!item.endDate)
      } else if (props.name === 'Overdue') {
        return (item.endDate < date)
      } else if (props.name === 'Today') {
        return item.endDate === date
      } else if (props.name === 'Tomorrow') {
        return item.endDate === tomorrow
      } else if (props.name === 'Upcoming') {
        return item.endDate > tomorrow
      }
      return item
    }

    return item
  })
})

const date = computed(() => {
  if (!props.task.startDate && !props.task.endDate) return ''

  if (props.task.startDate && props.task.endDate) {
    if (props.task.startDate === props.task.endDate && new Date() === new Date(props.task.endDate)) return 'today'

    if (props.task.startDate === props.task.endDate) return parseDate(props.task.endDate, 'D MMM').toLocaleLowerCase()

    return `${parseDate(props.task.startDate, 'D MMM')} - ${parseDate(props.task.endDate, 'D MMM')}`.toLocaleLowerCase()
  }
  if (props.task.startDate) return parseDate(props.task.startDate, 'D MMM').toLocaleLowerCase()
  return parseDate(props.task.endDate, 'D MMM').toLocaleLowerCase()
})

const hasTags = computed(() => props.task.taskTags?.length > 0)

onMounted(() => {
  nextTick(() => {
    isShowBtn()
  })
})

watch(() => innerWidth.value, () => {
  setTimeout(() => isShowBtn(), 500)
})

function isShowBtn () {
  const main = document.getElementById('main')
  const itemRect = itemRef.value?.getBoundingClientRect()
  showBtn.value = main.offsetWidth > itemRect?.width + 200
}

function openModal () {
  if (props.task?.htmlLink) {
    window.open(props.task.htmlLink, '_blank')
  } else {
    router.push({ query: { taskId: props.task.id } })
  }
}

async function goToTask () {
  if (props.task?.htmlLink) {
    window.open(props.task.htmlLink, '_blank')
  } else {
    await changeBook(thisBook.value, true)
    router.replace({ params: { id: props.task.bookId }, query: { highlight: props.task.id } })
  }
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

function openMenu (e: MouseEvent) {
  taskMenuRef.value.open(e)
}
</script>
