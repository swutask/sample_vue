<template>
  <div
    :class="[
      {'flex flex-col w-full h-full': !isProjectCalendar},
      {'md:mt-3': isSidebarCollapsed }
    ]"
    @wheel="handleScroll"
  >
    <Portal to="rightHeaderContentCalendar">
      <div class="flex mr-[-20px]">
        <div
          class="flex items-center mr-15"
        >
          <ButtonModule
            text="Today"
            :class="{ 'hidden': isToday }"
            class="mx-10 flex items-center anim-opacity
            bg-brand-new rounded-full text-white text-10 px-6 py-2 font-medium ml-5"
            @click="toToday"
          />

          <ButtonModule
            prefix="icon-left-single-arrow text-16"
            class="text-grey-300 p-5 hover:text-app-color anim-color hover:bg-menu-hover rounded-6"
            @click="prevMonth"
          />
          <CalendarPicker
            :current-date="new Date()"
            :position="`${isProjectCalendar ? 'left-[-25px]' : 'left-[-70px]'} top-30`"
            class="flex justify-center cursor-pointer w-[125px]"
            @dayclick="jumpTo"
          >
            <!-- eslint-disable  vue/no-v-html -->
            <p class="flex shrink-0 mx-4 text-15" v-html="currentDate" />
          </CalendarPicker>
          <ButtonModule
            prefix="icon-right-single-arrow text-16"
            class="text-grey-300 p-5 hover:text-app-color anim-color hover:bg-menu-hover rounded-6"
            @click="nextMonth"
          />
        </div>
        <div class="flex items-center mr-20">
          <GoogleSyncIcon v-if="showGoogleCalendarLabel && calendarSynced" />

          <BooksSelect
            v-if="selectedBooks[0] && !isTaskBoard"
            :selectedBooks="selectedBooks"
            position="left-0 md:right-0 md:left-auto"
            btnFontSize="text-13"
            :options="computedBooks"
            @onSelect="onSelect"
          />
        </div>
      </div>
    </Portal>

    <FullCalendar
      ref="calendarRef"
      :options="options"
      class="flex-grow w-full border-t border-t-grey-150"
      :class="{'no-border-top' : !isProjectCalendar}"
    >
      <template #dayCellContent="arg">
        <span
          v-if="arg.isToday && arg.view.type === 'dayGridMonth' || arg.isOther && arg.dayNumberText === '1'"
          :key="arg.date" class="w-full"
          :class="{ 'text-brand': arg.isToday && arg.view.type === 'dayGridMonth' }"
        >
          {{ arg.isToday && arg.view.type === 'dayGridMonth' ? 'Today' :
            arg.isOther && arg.dayNumberText === '1' ? `${arg.date.toLocaleString('en-US', {
              month: 'short',
            })}` : '' }}
        </span>

        <span class="ml-auto" :class="{ 'text-brand': arg.isToday && arg.view.type === 'dayGridMonth' }">{{ arg.dayNumberText }}</span>
      </template>

      <template #dayHeaderContent="arg">
        <span v-if="arg.view.type === 'dayGridMonth'" class="text-app-color text-13">{{ arg.text }}</span>

        <p
          v-if="arg.view.type === 'timeGridWeek'"
          class="text-app-color text-13"
          :class="{ 'text-brand font-semibold': arg.isToday }"
        >
          <span v-if="arg.text.split(' ')[0] === '1'" class="mr-10 font-medium">
            {{ arg.date.toLocaleString('en-US', { month: 'short'}) }}
          </span>

          {{ arg.text.split(' ')[1] }} {{ arg.text.split(' ')[0] }} {{ arg.isToday ? '(today)' : '' }}
        </p>
      </template>

      <template #eventContent="arg">
        <TaskEvent
          v-if="arg.event.extendedProps.task && !arg.event.extendedProps.task?.isCreate"
          :ref="(el) => taskRefs[arg.event?.id] = el"
          v-model="stopUpdate"
          :selectedBook="arg.event.extendedProps.task?.selectedBook"
          :title="arg.event.extendedProps.task.title"
          :task="arg.event.extendedProps.task"
          :arg="arg"
          @getTasks="handleGetTasks"
        />

        <NewTaskEvent
          v-if="arg.event.extendedProps && arg.event.extendedProps.isCreate"
          ref="newTaskRef"
          :arg="arg.event"
          :bookId="selectedBooks[0]"
          @removeTaskFromCalendar="removeTaskFromCalendar"
        />
      </template>
    </FullCalendar>

    <GoogleCalendarBadge v-if="!isClient && showGooglePopup && !isProjectCalendar" />
  </div>
</template>

<script setup lang="ts">
import rrulePlugin from '@fullcalendar/rrule'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

import { parseDate } from '@/plugins/filters'
import localStorageService from '@/core/local-storage'
import { checkIsTodayInRange, eventColor, falsyFilter } from '@/core/helper-functions'

import { findDateRange, showCompletedOptions } from '../tasks-utils'
import { Portal } from 'portal-vue'

const route = useRoute()
const { isSidebarCollapsed } = useSidebar()
const { showGooglePopup, showGoogleCalendarLabel, calendarSynced } = useGoogleCalendar()

const {
  tasks,
  taskCalendarEventDate,
  filters,
  getTaskTags,
  getTasks,
  handleUpdateTask,
  updateTask,
  disableEventType
} = useTask()

const { isTeamAccount } = useTeam()
const { user } = useProfile()

const filteredTasks = computed<ITask[]>(() => {
  return tasks.value.filter(t => {
    if (t.endDate) {
      const startDate = new Date(t.startDate || t.endDate).getTime()
      const endDate = new Date(t.endDate).getTime()
      const rangeStart = new Date(calendarRange.value.start).getTime()
      const rangeEnd = new Date(calendarRange.value.end).getTime()

      return (startDate >= rangeStart && startDate <= rangeEnd) || (endDate >= rangeStart && endDate <= rangeEnd) || t?.rrule
    } else {
      return false
    }
  })
})

const { toggleNewTaskModal } = useTask()
const { books, todayBook } = useBook()
const { calendarFirstDay } = useSettings()
const { isClient } = useProfile()
const calendarRef = ref(null)
const taskRefs = ref([])
const newTaskRef = ref(null)

const currentEvent = ref()

const currentDate = ref()
const selectedBooks = ref<number[]>([])
const calendarRange = ref()
const stopUpdate = ref(false)
const isToday = ref(true)

const calendarAPI = computed(() => calendarRef.value?.getApi())
const isProjectCalendar = computed(() => falsyFilter(route.params.id))

const computedBooks = computed(() => {
  if (isTaskBoard.value) {
    return books.value.filter(item => !item.archivedAt && !item.isSample)
  }

  if (todayBook.value) {
    const newBooks = books.value.filter(b => !b.archivedAt && !b.isSample)
    newBooks.splice(newBooks.indexOf(todayBook.value), 1)
    newBooks.splice(0, 0, todayBook.value)
    return newBooks
  }

  return books.value.filter(b => !b.archivedAt && !b.isSample)
})

const filterOptions = computed<ITeamMember[]>(() => {
  if (!isTeamAccount.value) return []

  const book = books.value.find(b => b.id === +route.params.id)
  const members = book?.shareWith?.filter(m => m.userId !== user.value.id) || []
  const me = book?.shareWith?.find(m => m.userId === user.value.id)

  if (me) {
    members.unshift(me)
  }

  return members || []
})

const isTaskBoard = computed(() => route.name === 'TaskBoard' || route.name === 'TaskBoardTeam')

const options = reactive({
  events: [],
  firstDay: 1,
  plugins: [
    dayGridPlugin,
    timeGridPlugin,
    interactionPlugin,
    rrulePlugin
  ],
  initialView: 'dayGridMonth',
  views: {
    dayGridMonth: {
      select: addEvent
    }
  },
  height: '100%',
  dayHeaderClassNames: 'text-app-color font-light',
  headerToolbar: {
    start: '',
    center: '',
    end: ''
  },
  buttonText: {
    today: 'Today'
  },
  editable: !isClient.value,
  selectable: !isClient.value,
  selectMirror: true,
  eventClick: handleEventClick,
  eventChange: onEventChange,
  eventResizableFromStart: true
})

watch(
  () => disableEventType.value,
  async () => {
    await handleGetTasks(calendarSynced)
  },
  { deep: true }
)

watch(
  () => calendarSynced.value,
  async () => {
    await handleGetTasks(calendarSynced)
  },
  { deep: true }
)

onMounted(async () => {
  if (isTaskBoard.value) {
    const book = computedBooks.value.find(item => item.id === +route.params.id)
    selectedBooks.value = [book.id]
  } else {
    selectedBooks.value = computedBooks.value.map(b => b.id)

    const storage = localStorageService.getItem('calendarBooks')

    if (storage) {
      const bIds = storage?.split(',').map((i: string) => parseInt(i))
      const filteredBooks = computedBooks.value.filter(b => bIds.includes(b.id))

      if (bIds && filteredBooks.length > 0) {
        selectedBooks.value = filteredBooks.map(b => b.id)
      }
    }

    getTaskTags(computedBooks.value.map(b => b.id))
  }

  updateCurrentDate()
  updateCalendarRange()

  if (tasks.value.length === 0 || route.name === 'CalendarTeam') {
    await handleGetTasks(calendarSynced)
  } else {
    setCalendarTasks()
  }

  options.firstDay = calendarFirstDay.value ? 0 : 1
})

watch(() => calendarFirstDay.value, (value) => (options.firstDay = value ? 0 : 1))

watch(() => tasks.value, () => setCalendarTasks(), { deep: true })

watch(isSidebarCollapsed, () => {
  nextTick(() => {
    try {
      setTimeout(() => {
        calendarAPI.value?.updateSize()
      }, 160)
    } catch (error) {
    }
  })
})

watch(() => route.query.startDate, (value) => {
  if (value) {
    nextTick(() => {
      jumpTo({ id: value })
    })
  }
}, {
  immediate: true
})

onBeforeUpdate(() => {
  taskRefs.value = []
})

function handleEventClick ({ event }) {
  taskCalendarEventDate.value = event._instance.range.start

  if (!event._def.extendedProps.isCreate) {
    setTimeout(() => taskRefs.value[event.id]?.openModal(), 10)
  }
}

async function onEventChange ({ event }) {
  if (event.id === 'new-task') {
    currentEvent.value._def.extendedProps.endDate = event.startStr
    currentEvent.value._def.extendedProps.startDate = event.endStr

    return
  }

  if (!stopUpdate.value) {
    let endDate = event.endStr?.trim() !== '' ? event.endStr : event.startStr

    const preparedDate = new Date(endDate)
    preparedDate.setDate(preparedDate.getDate() - 1)

    endDate = parseDate(preparedDate, 'YYYY-MM-DD')

    updateTask({
      id: +event.id,
      bookId: event.extendedProps.bookId,
      startDate: event.startStr,
      endDate
    })

    handleUpdateTask({
      id: +event.id,
      ...event.extendedProps,
      bookId: event.extendedProps.bookId,
      startDate: event.startStr,
      endDate
    })
  }
}

let scrollTimeout: ReturnType<typeof setTimeout> | null = null

function handleScroll (event: WheelEvent) {
  clearTimeout(scrollTimeout)
  const isMouseWheel = Math.abs(event.deltaY) > 10

  if (isMouseWheel) {
    scrollTimeout = setTimeout(() => {
      event.deltaY > 0 ? nextMonth() : prevMonth()
    }, 300)
  }
}

function addEvent (info) {
  const preparedDate = new Date(info.endStr)
  preparedDate.setDate(preparedDate.getDate() - 1)

  setTimeout(() => {
    toggleNewTaskModal(true, {
      startDate: info.startStr,
      endDate: parseDate(preparedDate, 'YYYY-MM-DD')
    })
  }, 100)
}

function removeTaskFromCalendar () {
  currentEvent.value?.remove()
  currentEvent.value = null
}

function setCalendarTasks () {
  options.events = filteredTasks.value.map((item: ITask) => {
    let tagColor
    if (item.integrationType === 'google') {
      tagColor = 67356281
    } else {
      tagColor = item?.taskTags?.[0]?.color ?? 8947848
    }
    const { borderClass, borderColor } = eventColor(tagColor)

    const preparedDate = new Date(item.endDate)
    preparedDate.setDate(preparedDate.getDate() + 1)

    const endDate = parseDate(preparedDate, 'YYYY-MM-DD')

    return {
      ...item,
      evId: item.id,
      id: item.id,
      start: item.startDate || item.endDate,
      end: endDate,
      title: item.title,
      allDay: true,
      classNames: borderClass,
      editable: item.integrationType !== 'google',
      borderColor,
      task: {
        ...item,
        subTitle: item.subTitle || '',
        selectedBook: computedBooks.value.find(b => b.id === item.bookId)
      },
      rrule: item?.rrule
    }
  })
}

async function handleGetTasks (calendarSynced) {
  if (isTaskBoard.value) {
    await getTasks({
      bookIds: selectedBooks.value,
      search: filters.value.search,
      showCompleted: showCompletedOptions(filters.value.showCompletedFilter),
      sortedBy: filters.value.sortedBy,
      sortedDirection: filters.value.sortedDirection,
      tagIds: filters.value?.tagsFilter?.map(e => e.id),
      teamMemberIds: filters.value.membersFilter?.length === filterOptions.value.length ? [] : filters.value.membersFilter?.map(e => e.id),
      urgencyStatuses: filters.value?.urgencyFilter?.map(e => e.type),
      date: findDateRange(filters.value?.dateFilter),
      calendarSynced: calendarSynced.value
    })
  } else {
    await getTasks({
      bookIds: selectedBooks.value,
      calendarSynced: calendarSynced.value
    })
  }

  setCalendarTasks()
}

function updateCalendarRange () {
  if (calendarAPI.value) {
    calendarRange.value = calendarAPI.value?.currentData?.dateProfile?.activeRange

    isToday.value = checkIsTodayInRange(calendarRange.value)
  }
}

function updateCurrentDate () {
  const date = calendarAPI.value?.currentData.currentDate
  const month = parseDate(date, 'MMM')

  if (calendarAPI.value?.currentData.currentViewType === 'timeGridWeek') {
    const weekNumber = getWeekNumber(date)

    currentDate.value = `<p>${month} - Week <span class="font-bold">${weekNumber}</span></p>`
  } else {
    currentDate.value = `<p>${month} <span class="font-bold">${new Date(date).getFullYear()}</span></p>`
  }
}

async function nextMonth () {
  if (calendarAPI.value) {
    calendarAPI.value.next()

    updateCurrentDate()
    updateCalendarRange()

    await handleGetTasks(calendarSynced)
  }
}

async function prevMonth () {
  if (calendarAPI.value) {
    calendarAPI.value.prev()

    updateCurrentDate()
    updateCalendarRange()

    await handleGetTasks(calendarSynced)
  }
}

async function jumpTo (data) {
  calendarAPI.value.gotoDate(new Date(data.id))
  updateCurrentDate()
  updateCalendarRange()

  isToday.value = checkIsTodayInRange(calendarAPI.value.currentData.dateProfile.activeRange)
  await handleGetTasks(calendarSynced)
}

async function onSelect (value: number[]) {
  selectedBooks.value = value

  await handleGetTasks(calendarSynced)

  localStorageService.setItem('calendarBooks', selectedBooks.value.join(','))
}

function toToday () {
  if (calendarAPI.value) {
    calendarAPI.value.today()
    isToday.value = true

    updateCurrentDate()
    updateCalendarRange()

    handleGetTasks(calendarSynced)
  }
}

function getWeekNumber (date) {
  const newDate = new Date(date)

  const d = new Date(Date.UTC(newDate.getFullYear(), newDate.getMonth(), newDate.getDate()))
  const dayNum = d.getDay() || 7
  d.setDate(d.getDate() + 4 - dayNum)
  const yearStart = new Date(d.getFullYear(), 0, 1)
  return Math.ceil((((+d - +yearStart) / 86400000) + 1) / 7)
}
</script>
