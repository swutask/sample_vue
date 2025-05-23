<template>
  <div
    ref="wrapperRef"
    class="relative z-20 text-app-color bg-primary"
    :class="[
      {'overflow-x-auto': taskBoardViewType.index !== 2},
      {'lighter-scroll-bar super-thinner-scroll-bar sticky-bottom-scroll-bar': !isCardView}
    ]"
  >
    <!-- header -->
    <div class="flex md:flex-row flex-col items-center md:justify-normal justify-between mt-20 md:mt-0 md:gap-0 gap-10">
      <Portal :to="isLargeScreen ? 'rightHeaderProjectContent' : 'rightToolsHeaderMobile'">
        <div class="space-x-10 flex md:justify-normal justify-end md:w-auto w-full items-center">
          <!--TODO: temporary hidden, remove it after Notes page will be prepared for mobile-->
          <div v-if="!isLargeScreen && false" class="pr-5 border-r border-grey-150">
            <ButtonModule
              type="transparent"
              prefix="icon-projects text-20"
              class="h-[34px] px-5 border-none"
              @click="goToProject"
            />
          </div>
          <SearchInput
            v-if="taskBoardViewType.index !== 2"
            isExpandable
            class="max-w-[140px] md:max-w-[160px] !h-34"
            @onSearch="search($event)"
          />

          <div data-onboarding-id="onboardingTasksFilter">
            <Filters
              v-model="taskBoardViewType"
              showViewTypeSwitcher
              :initialFilters="initialFilters"
              :filters="filters"
              :filteredTags="filteredTags"
              :membersOptions="membersOptions"
              :isToday="false"
              :height="34"
              @updateFilters="updateInitialFilters"
              @filterBy="handleToggleFilter($event.filters, $event.doRequest)"
              @clearFilters="resetFilters('clearFilters')"
              @resetToDefault="resetFilters('resetToDefault')"
              @update:model-value="saveViewType"
            />
          </div>
        </div>
      </Portal>
    </div>

    <Portal v-if="isMobile" to="subHeader">
      <div class="flex pb-8 pt-12 px-16 justify-between">
        <SelectBook
          :books="computedBooks"
          :customStyleForBookLabel="{
            fontSize: 'text-13 font-medium',
            icon: 'max-h-[80%] max-w-[80%]',
            defaultIcon: 'w-16 h-16',
            iconHover: ''
          }"
          customButtonClasses="rounded-12 bg-menu-hover pl-7 pr-12"
          :selectedBook="selectedBookInDropdown"
          @toggleBook="handleNavigationToBook"
        />

        <Switcher
          #default="{icon}"
          v-model="taskBoardViewType"
          borderRadius="10px"
          height="31px"
          width="50px"
          :scale="{x: 0.82, y: 0.8}"
          :tabs="switcherTabs"
          :optionsNumber="2"
          @update:modelValue="saveViewType"
        >
          <div class="flex relative">
            <ButtonModule
              border-width="border-none"
              :prefix="icon"
              class="px-15 py-2 m-auto outline-none"
            />
          </div>
        </Switcher>
      </div>
    </Portal>

    <div :class="{ 'md:mt-30': isCardView }">
      <div
        v-if="taskBoardViewType.index < 2"
        data-onboarding-id="onboardingTaskManagement"
        :class="isCardView ? 'md:px-28' : 'md:mt-8'"
        class="px-10 min-h-full flex-grow flex flex-col h-full bg-primary"
      >
        <div>
          <div
            class="noselect"
            :class="[
              isCardView ? 'flex items-start !thinner-scroll-bar' : '',
              {'cursor-grab': hasScroll && isCardView},
              {'pb-[150px]': !isGroupedByStatus && !isCardView}
            ]"
          >
            <draggable
              v-model="computedRows"
              group="rows"
              :delay="300"
              :disabled="isClient || !isGroupedByStatus"
              delay-on-touch-only="true"
              :ghost-class="isCardView ? 'sortable-ghost-row-card' : 'sortable-ghost-row-list'"
              chosen-class="grab-class-task"
              drag-class="grab-class-task"
              item-key="id"
              filter=".no-drag"
              handle=".drag-handler"
              :force-fallback="true"
              fallback-class="row-fallback-class"
              class="draggable"
              :class="[isCardView ? 'flex h-full space-x-12' : '', {'pr-[140px]': isCardView && !isGroupedByStatus}]"
              @start="onDragStart"
              @end="onDragEnd"
            >
              <template #item="{ element, index }">
                <div>
                  <TaskRow
                    :key="element.id"
                    :item="element"
                    :rowIndex="index"
                    :isCardView="isCardView"
                    :isListView="isListView"
                    :sortedBy="filters.sortedBy"
                    :groupedBy="filters.groupBy"
                    @getTasks="handleGetTasks"
                    @toggleDragging="toggleDragging"
                  />
                </div>
              </template>
            </draggable>

            <NewTaskRow
              v-if="showNewRow && isGroupedByStatus"
              :class="[isCardView ? 'min-w-[252px] w-[252px] ml-30 mr-1' : '']"
              :book-id="bookId"
              :isCardView="isCardView"
              @close="close"
            />

            <div
              v-if="!isClient && isGroupedByStatus"
              class="group/list relative pr-[140px]"
              :class="{'pb-[150px]': isListView}"
            >
              <ButtonModule
                :prefix="`icon-add ${isListView ? 'text-10 mr-10' : 'text-13'}`"
                :text="isCardView ? '' : 'Add column'"
                tooltipText="Add column"
                tooltipClasses="text-11 px-10 py-7 rounded-8 z-9999"
                tooltipPosition="-top-20 -translate-x-1/2"
                :icon-has-margin="false"
                has-hover
                class="rounded-6 anim-colors text-app-color hover:bg-menu-hover"
                :class="isListView
                  ? 'bg-menu-hover md:group-hover/list:!opacity-100 md:!opacity-0 text-14 py-9 px-12 mt-10'
                  : 'p-7 ml-15 mt-14'"
                @click.stop="addNewRow"
              />
            </div>
          </div>
        </div>
      </div>

      <CalendarView
        v-if="taskBoardViewType.index === 2"
        style="height: calc(100vh - var(--header-height) - 87px)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable'

import dragScrollMixin from '@/mixins/dragScrollMixin'

import localStorageService from '@/core/local-storage'
import {
  storyPointsData,
  initialFiltersForTasks
} from '@/pages/task-board/tasks-utils'
import { existingPriorities } from '@/core/priority'
import { removeHTMLTags } from '@/core/helper-functions'

const { isMobile, isLargeScreen } = useGeneral()
const { members, team } = useTeam()
const { tasks, rows, tags, filters, handleUpdateRow, getRows, getTasksForTaskBoardPageWithFilters, getTaskTags, updateFilters } = useTask()
const { books, bookMembers } = useBook()
const { changeBook } = useBookChange()
const { user, isClient } = useProfile()
const { wrapperRef, hasScroll, disabledScroll, dragScroll, checkCursor } = dragScrollMixin()

const route = useRoute()
const router = useRouter()

const showNewRow = ref(false)
const rowsLength = ref(0)
const selectedBook = ref(books.value.find(b => b.id === parseInt(route.params.id as string)))
const selectedBookInDropdown = ref(books.value.find(b => b.id === +selectedBook.value.id))

const computedBooks = computed(() => books.value.filter(b => !b.archivedAt))
const switcherTabs = computed(() => {
  return [
    { key: 'board-view', icon: 'icon-spaces text-14', tooltipText: 'Board view' },
    { key: 'list-view', icon: 'icon-task-list text-12', tooltipText: 'List view' }
  ]
})

const isGroupedByStatus = computed(() => filters.value.groupBy === 'Status')
const bookId = computed(() => parseInt(route.params.id as string))
const filteredTags = computed(() => {
  const usedTags = {}

  tasks.value.forEach(t => {
    usedTags[t.bookId] = []
  })

  tasks.value.forEach(t => {
    const ids = new Set(usedTags[t.bookId].map(tag => tag.id))

    const taskTags = t.taskTags?.filter(d => !ids.has(d.id)) || []

    usedTags[t.bookId] = [...usedTags[t.bookId], ...taskTags]
  })

  return usedTags as TIndexedObject<ITag[]>
})

const taskBoardViewType = ref<ISwitcherModelValue>(
  useLocalStorage.getItem('taskBoardTypeV3')?.[bookId.value] || { index: 0, key: 'board-view' }
)

const isCardView = computed(() => taskBoardViewType.value.index === 0)
const isListView = computed(() => taskBoardViewType.value.index === 1)

const membersOptions = computed<ITeamMember[]>(() => {
  const book = books.value.find(b => b.id === +route.params.id)
  const members = book?.shareWith?.filter(m => m.userId !== user.value.id) || []
  const me = book?.shareWith?.find(m => m.userId === user.value.id)

  members.unshift(me)

  return members || []
})

watch(() => membersOptions.value, (value) => {
  initialFilters.value.membersFilter = value
})

const initialFilters = ref<IFilters>({
  ...initialFiltersForTasks,
  membersFilter: membersOptions.value,
  showOnTask: initialFiltersForTasks.showOnTask.map((item) => {
    if (item.key === 'assignee') {
      item.selected = members.value.length > 1
    }

    return item
  })
})

filters.value = { ...initialFilters.value }

const computedTaskRows = computed({
  get: () => {
    return rows.value?.slice()?.sort((a, b) => {
      if (a.order > b.order) return 1
      if (a.order < b.order) return -1
      return 0
    })
  },
  set: (value) => {
    value.forEach((item, index) => {
      handleUpdateRow({ id: item.id, order: index })
    })

    setTimeout(() => {
      taskService.orderRow({ ids: value.map(item => item.id), bookId: bookId.value })
    }, 100)
  }
})

const computedRows = computed({
  get: () => {
    const groupMap = {
      Status: computedTaskRows.value,
      Priority: existingPriorities.sort((a, b) => {
        if (a.id === null) return 1
        if (b.id === null) return -1
        return b.id - a.id
      }),
      Date: ['Overdue', 'Today', 'Currently in progress', 'Tomorrow', 'Next week', 'Upcoming', 'No due date'],
      Labels: [...tags.value, { id: null }],
      Assignee: [...bookMembers.value, { id: null }],
      Estimate: [...storyPointsData, { id: null }]
    }

    return groupMap[filters.value.groupBy]
  },
  set: (value) => {
    value.forEach((item, index) => {
      handleUpdateRow({ id: item.id, order: index })
    })

    setTimeout(() => {
      taskService.orderRow({ ids: value.map(item => item.id), bookId: bookId.value })
    }, 100)
  }
})

watch(() => route.params.id, (value) => {
  if (value) {
    const book = books.value.find(b => b.id === +route.params.id)
    document.title = removeHTMLTags(book.title) + ' - complex'
    getRows(+route.params.id)
    getTaskTags([value])
    setFilter()
    rowsLength.value = 0
    const localData = useLocalStorage.getItem('taskBoardTypeV3') || {}
    taskBoardViewType.value = localData?.[+value] || { index: 0, key: 'board-view' }
  }
})

watch(() => rows.value, (value) => {
  setTimeout(() => {
    if (value?.length > rowsLength.value && rowsLength.value !== 0) {
      if (wrapperRef.value) {
        wrapperRef.value.scrollLeft += window.innerWidth
      }
    }
    rowsLength.value = value?.length
    checkCursor()
  }, 100)
}, {
  deep: true
})

onMounted(() => {
  document.title = removeHTMLTags(selectedBook.value.title) + ' - complex'

  nextTick(() => {
    rowsLength.value = rows.value?.length

    getRows(+route.params.id)
    getTaskTags([route.params.id])

    if (!isMobile.value) {
      dragScroll()
      checkCursor()
    }

    new ResizeObserver(correctWrapperHeight).observe(wrapperRef.value)

    setFilter()
  })
})

function search (value: string) {
  filters.value.search = value
  handleGetTasks()
}

async function handleGetTasks () {
  await getTasksForTaskBoardPageWithFilters(bookId.value)
}

function handleToggleFilter (value: Partial<IFilters>, doReq = true) {
  const localData = localStorageService.getItem('task-board-filter') || {}

  localData[route.params.id as string] = value

  filters.value = {
    ...filters.value,
    ...value
  }

  if (doReq && !!value) {
    localStorageService.setItem('task-board-filter', localData)

    handleGetTasks()
  }
}
function addNewRow () {
  showNewRow.value = true
}

function close () {
  showNewRow.value = false
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

function saveViewType (event: ISwitcherModelValue) {
  taskBoardViewType.value = event

  const localData = useLocalStorage.getItem('taskBoardTypeV3') || {}
  localData[bookId.value] = taskBoardViewType.value
  useLocalStorage.setItem('taskBoardTypeV3', localData)
}

function toggleDragging (value: boolean) {
  disabledScroll.value = value
}

function setFilter () {
  const allFilters = localStorageService.getItem('task-board-filter') || {}

  const currentFilters = allFilters[route.params.id as string] || initialFilters.value

  if (currentFilters?.showOnTask && !currentFilters?.showOnTask?.some((e) => e.key === 'image')) {
    currentFilters.showOnTask.push(initialFiltersForTasks.showOnTask.find((e) => e.key === 'image'))
  }

  if (currentFilters?.showOnTask && !currentFilters?.showOnTask?.some((e) => e.key === 'storyPoints')) {
    currentFilters.showOnTask.push(initialFiltersForTasks.showOnTask.find((e) => e.key === 'storyPoints'))
  }

  filters.value = {
    ...initialFilters.value,
    ...currentFilters,
    membersFilter: membersOptions.value
  }

  handleGetTasks()
}

function resetFilters (resetType: 'resetToDefault' | 'clearFilters') {
  if (resetType === 'resetToDefault') {
    initialFilters.value = { ...initialFiltersForTasks, membersFilter: membersOptions.value, groupBy: 'Status' }
    handleToggleFilter({
      ...initialFilters.value,
      membersFilter: membersOptions.value,
      showOnTask: initialFilters.value.showOnTask
    })
    updateFilters(filters.value, +route.params.id)
  } else {
    handleToggleFilter({
      tagsFilter: initialFilters.value.tagsFilter,
      urgencyFilter: initialFilters.value.urgencyFilter,
      dateFilter: initialFilters.value.dateFilter,
      membersFilter: membersOptions.value
    })
  }
}

function updateInitialFilters () {
  initialFilters.value = { ...filters.value }
}

function handleNavigationToBook (book: IBook) {
  selectedBookInDropdown.value = book

  changeBook(book)
}

function goToProject () {
  router.push({
    name: 'TeamBook',
    params: {
      team: team.value.link,
      id: selectedBookInDropdown.value.id
    }
  })
}
</script>
