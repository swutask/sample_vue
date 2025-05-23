<template>
  <div
    ref="wrapperRef"
    class="lighter-scroll-bar super-thinner-scroll-bar sticky-bottom-scroll-bar
     relative z-20 text-app-color bg-primary overflow-x-hidden"
  >
    <!-- header -->
    <WeekControl
      class="flex items-center lg:hidden justify-between w-full px-25 md:px-10 fixed top-50 left-0 z-[2000] bg-primary py-10"
      :isToday="isToday"
      :currentDate="currentWeekDates[0].id"
      @toToday="toToday"
      @weekChange="weekChange($event?.week, $event?.direction)"
    />

    <Portal :to="!isLargeScreen ? 'rightToolsHeaderMobile' : 'rightHeaderContentCalendar'">
      <div class="flex items-center">
        <WeekControl
          v-if="isLargeScreen"
          class="flex items-center"
          :isToday="isToday"
          :currentDate="currentWeekDates[0].id"
          @toToday="toToday"
          @weekChange="weekChange($event?.week, $event?.direction)"
        />

        <ButtonModule
          text="Today"
          :class="{ 'hidden': isToday }"
          class="mx-10 text-link-color items-center anim-opacity lg:hidden flex
            bg-brand-new rounded-full text-white text-10 px-6 py-2 font-medium ml-5 "
          @click="toToday"
        />

        <div class="flex items-center ml-10">
          <BooksSelect
            :selectedBooks="filters.selectedBooksFilter"
            :options="computedBooks"
            position="left-0 md:right-0 md:left-auto"
            top="top-0 md:top-40"
            btnFontSize="text-13"
            @onSelect="onSelectBookIds"
          />
        </div>
      </div>
    </Portal>

    <div :class="isSidebarCollapsed ? 'lg:mt-10' : 'lg:mt-26'" class="mt-[130px] ">
      <div class="px-14 lg:px-28 flex flex-col bg-primary">
        <div class="h-full">
          <div
            class="noselect flex items-start !thinner-scroll-bar md:pb-[100px] h-full"
            :class="{'cursor-grab': hasScroll }"
          >
            <draggable
              v-model="currentWeekDates"
              group="rows"
              :delay="300"
              :disabled="true"
              delay-on-touch-only="true"
              ghost-class="sortable-ghost-row-card"
              chosen-class="grab-class-task"
              drag-class="grab-class-task"
              item-key="id"
              filter=".no-drag"
              handle=".drag-handler"
              :force-fallback="true"
              fallback-class="row-fallback-class"
              class="draggable h-full"
              :class="[
                !isLargeScreen ? 'flex flex-col gap-[35px] w-full' : 'week-grid',
                isSidebarCollapsed && isLargeScreen ? 'week-planner-sidebar--closed' : 'week-planner-sidebar--opened'
              ]"
              @start="onDragStart"
              @end="onDragEnd"
            >
              <template #item="{ element, index }">
                <div class="group/row">
                  <WeekPlannerRow
                    :key="element.id"
                    :item="element"
                    :rowIndex="index"
                    @getTasks="handleGetTasks"
                    @toggleDragging="toggleDragging"
                  />
                </div>
              </template>
            </draggable>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable'
import { Portal } from 'portal-vue'
import dragScrollMixin from '@/mixins/dragScrollMixin'
import { checkIsTodayInRange, formatDate } from '@/core/helper-functions'
import localStorageService from '@/core/local-storage'
import { initialFiltersForTasks, showCompletedOptions } from '@/pages/task-board/tasks-utils'
import dayjs from 'dayjs'
import weekday from 'dayjs/plugin/weekday'
dayjs.extend(weekday)

const { isTeamAccount, member } = useTeam()
const { getTasks, filters } = useTask()
const { books } = useBook()
const { user } = useProfile()
const route = useRoute()
const { isSidebarCollapsed } = useSidebar()
const { wrapperRef, hasScroll, disabledScroll, dragScroll, checkCursor } = dragScrollMixin()
const { isLargeScreen } = useGeneral()
const currentWeekDates = ref(getCurrentWeekDates())
const { calendarSynced } = useGoogleCalendar()

const computedBooks = computed(() => {
  return books.value.filter(b => !b.archivedAt && !b.isSample)
})

const isToday = ref(true)

function getCurrentWeekDates (date = new Date()) {
  const monday = dayjs(date).weekday(1)

  // Generate the dates for the current week (Monday to Sunday)
  const weekDates = []
  for (let i = 0; i < 7; i++) {
    const day = monday.add(i, 'day') // Add days starting from Monday

    const formattedDate = new Intl.DateTimeFormat(
      'en',
      { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    ).format(day as any)

    weekDates.push({ id: formattedDate })
  }

  return weekDates
}

const options = computed<ITeamMember[]>(() => {
  if (!isTeamAccount.value) return []

  const book = books.value.find(b => b.id === +route.params.id)
  const members = book?.shareWith?.filter(m => m.userId !== user.value.id) || []
  const me = book?.shareWith?.find(m => m.userId === user.value.id)

  members.unshift(me)

  return members || []
})

onMounted(() => {
  nextTick(async () => {
    dragScroll()
    checkCursor()

    new ResizeObserver(correctWrapperHeight).observe(wrapperRef.value)

    setFilter()

    await handleGetTasks()
  })
})

const initialFilters = ref({
  ...initialFiltersForTasks,
  selectedBooksFilter: books.value.map(e => e.id),
  membersFilter: options.value,
  groupBy: 'WeekDays',
  dateFilter: {
    startDate: getCurrentWeekDates()[0].id,
    endDate: getCurrentWeekDates()[6].id
  }
})

filters.value = { ...initialFilters.value } as any

async function handleGetTasks () {
  await getTasks({
    bookIds: filters.value.selectedBooksFilter,
    search: filters.value.search,
    showCompleted: showCompletedOptions(filters.value.showCompletedFilter),
    sortedBy: filters.value.sortedBy,
    sortedDirection: filters.value.sortedDirection,
    tagIds: filters.value?.tagsFilter?.map(e => e.id),
    teamMemberIds: filters.value?.membersFilter?.length === options.value.length ? [] : filters.value?.membersFilter?.map(e => e.id),
    urgencyStatuses: filters.value?.urgencyFilter?.map(e => e.type),
    calendarSynced: calendarSynced.value
  })
}

function onSelectBookIds (value: number[]) {
  const isAll = value.length === computedBooks.value.map(b => b.id).length

  const localData = localStorageService.getItem('isAllBooksSelectedWeekPlanner') || {}

  localData[user.value.id] = isAll

  localStorageService.setItem('isAllBooksSelectedWeekPlanner', localData)

  filters.value.selectedBooksFilter = localData?.[user.value.id]
    ? computedBooks.value.map(b => b.id)
    : value

  handleToggleFilter(filters.value)
}

function handleToggleFilter (value, doReq = true) {
  const localData = localStorageService.getItem('week-planner-tasks-filter') || {}
  localData[member.value.id.toString()] = value

  filters.value = {
    ...filters.value,
    ...value
  }

  if (doReq && !!value) {
    localStorageService.setItem('week-planner-tasks-filter', localData)
    handleGetTasks()
  }
}

function setFilter () {
  const allFilters = localStorageService.getItem('week-planner-tasks-filter') || {}

  let selectedBooksFilterLocal = computedBooks.value.reduce((acc: number[], item: IBook) => {
    if (!item.archivedAt && allFilters[member.value.id.toString()]?.selectedBooksFilter?.includes(item.id)) {
      acc.push(item.id)
    }

    return acc
  }, [])

  if (selectedBooksFilterLocal.length === 0) {
    selectedBooksFilterLocal = computedBooks.value.map(b => b.id)
  }

  filters.value = {
    ...filters.value,
    selectedBooksFilter: localStorageService.getItem('isAllBooksSelectedWeekPlanner')?.[user.value.id]
      ? computedBooks.value.map(b => b.id)
      : selectedBooksFilterLocal
  }
}
function onDragStart () {
  disabledScroll.value = true
  document.body.classList.add('grabbing')
}

function onDragEnd () {
  disabledScroll.value = false
  document.body.classList.remove('grabbing')
}

function correctWrapperHeight () {
  if (wrapperRef.value) {
    wrapperRef.value.style.height = 'auto'

    nextTick(() => {
      wrapperRef.value.style.height = '100%'
    })
  }
}

function toggleDragging (value: boolean) {
  disabledScroll.value = value
}

function toggleWeeks (currentWeekDates, direction = 1, dayMode = false) {
  const step = dayMode ? 1 : 7
  const currentMonday = new Date(currentWeekDates)
  const prevOrNextMonday = new Date(currentMonday)
  prevOrNextMonday.setDate(currentMonday.getDate() + (step * direction))

  const weekDates = []
  for (let i = 0; i < 7; i++) {
    const date = new Date(prevOrNextMonday)
    date.setDate(prevOrNextMonday.getDate() + i)

    const formattedDate = new Intl.DateTimeFormat(
      'en',
      { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    ).format(date)

    weekDates.push({ id: formattedDate })
  }

  return weekDates
}

function weekChange (week = true, direction = 1) {
  filters.value.dateFilter = {
    startDate: formatDate(toggleWeeks((filters.value.dateFilter as any)?.startDate, direction, !week)[0].id),
    endDate: formatDate(toggleWeeks((filters.value.dateFilter as any)?.endDate, direction, !week)[0].id)
  } as any

  isToday.value = checkIsTodayInRange({
    start: (filters.value.dateFilter as any).startDate,
    end: (filters.value.dateFilter as any).endDate
  })

  currentWeekDates.value = getCurrentWeekDates(new Date((filters.value.dateFilter as any)?.startDate))
}

function toToday () {
  filters.value.dateFilter = {
    startDate: getCurrentWeekDates()[0].id,
    endDate: getCurrentWeekDates()[6].id
  } as any

  isToday.value = checkIsTodayInRange({
    start: (filters.value.dateFilter as any).startDate,
    end: (filters.value.dateFilter as any).endDate
  })

  currentWeekDates.value = getCurrentWeekDates()

  handleToggleFilter(filters.value)
}
</script>

<style lang="scss">
.week-grid {
  display: grid;
  grid-template-rows: repeat(2, auto);
  gap: 10px 22px;
}
</style>
