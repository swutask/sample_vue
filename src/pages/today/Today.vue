<template>
  <div v-if="filters" class="h-full" :class="isSidebarCollapsed || !isLargeScreen ? 'lg:pt-0 pt-[70px]' : 'pt-14'">
    <Portal :to="!isLargeScreen ? 'rightToolsHeaderMobile' : 'rightHeaderProjectContent'">
      <div class="flex md:space-x-10 space-x-20">
        <Filters
          v-if="filters"
          v-model="perspectiveView"
          :initialFilters="initialFilters"
          :filters="filters"
          :filteredTags="filteredTags"
          :membersOptions="membersOptions"
          isToday
          showViewTypeSwitcher
          @updateFilters="updateFilterOnServer"
          @update:modelValue="saveViewType"
          @filterBy="updateLocalFilter($event.filters, $event.doRequest)"
          @clearFilters="resetFilters('clearFilters')"
          @resetToDefault="resetFilters('resetToDefault')"
        />

        <BooksSelect
          v-if="filters?.selectedBooksFilter"
          :selectedBooks="filters.selectedBooksFilter"
          :options="computedBooks"
          position="right-0"
          btnFontSize="text-13"
          :top="isMobile ? 'top-0' : 'top-50'"
          @onSelect="onSelectBookIds"
        />
      </div>
    </Portal>

    <div v-if="activePerspective" class="px-20">
      <Perspectives
        isToday
        :activePerspective="activePerspective.id"
        @setPerspective="setPerspective"
        @updatePerspectiveFilters="updatePerspectiveFilters"
      />
    </div>

    <div
      v-if="filters"
      class="p-15 pt-0 mx-auto w-full relative text-app-color"
      :class="{'h-full': isListView}"
    >
      <template v-if="hasItems">
        <div v-if="isListView">
          <TodayRow
            v-for="(name, index) in rowNames"
            :key="name"
            :name="name"
            :index="index"
            :showOnTask="showOnTask"
            :filteredTags="filteredTags as ITag"
            :membersFilter="filters.membersFilter"
            :completedFilter="filters.showCompletedFilter"
            :groupedBy="filters.groupBy"
          />
        </div>

        <div v-if="isCardView" class="flex space-x-12">
          <div v-for="(element, index) in rowNames" :key="element.id" class="h-full">
            <TaskRow
              :key="element.id"
              :item="element"
              :rowIndex="index"
              :isCardView="true"
              :showOnTask="showOnTask"
              :isListView="false"
              isPerspective
              :sortedBy="filters.sortedBy"
              :groupedBy="filters.groupBy"
              @getTasks="handleGetTasks"
            />
          </div>
        </div>
      </template>

      <EmptyState
        v-else
        class="mt-[60px]"
        maxWidth="max-w-full"
        title="There are no tasks for this perspective"
        subTitle="Try adjusting the display options to view tasks."
        imgName="emptyToday"
      />

      <div v-if="isListView" class="h-[100px]" />
    </div>

    <AppDownloadBadge />
  </div>
</template>

<script setup lang="ts">
import {
  findDateRange,
  initialFiltersForToday,
  showCompletedOptions,
  storyPointsData
} from '@/pages/task-board/tasks-utils'
import { existingPriorities } from '@/core/priority'
import { Portal } from 'portal-vue'

const { isLargeScreen, isMobile } = useGeneral()
const { isSidebarCollapsed } = useSidebar()
const { tasks, getTasks, disableEventType } = useTask()
const { perspectives, getPerspectives, updatePerspective } = usePerspectives()
const { user } = useProfile()
const { members, member } = useTeam()
const { books, todayBook } = useBook()
const route = useRoute()
const router = useRouter()

const activePerspective = ref<IPerspective>()

const perspectiveView = ref<ISwitcherModelValue>(
  useLocalStorage.getItem('perspectiveView')?.[activePerspective.value?.id] || { index: 0, key: 'board-view' }
)

const isCardView = computed(() => perspectiveView.value.index === 0)
const isListView = computed(() => perspectiveView.value.index === 1)

const initialFilters = ref<IFilters>(null)
const filters = ref<IFilters>(null)

const membersOptions = computed(() => {
  return members.value.sort((a: ITeamMember, b: ITeamMember) => {
    const memberId = member.value.id
    return a.id === memberId ? -1 : b.id === memberId ? 1 : a.id - b.id
  })
})

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

  return usedTags
})

const computedBooks = computed(() => {
  if (todayBook.value) {
    const newBooks = books.value.filter(b => !b.archivedAt && !b.isSample)
    newBooks.splice(newBooks.indexOf(todayBook.value), 1)
    newBooks.splice(0, 0, todayBook.value)
    return newBooks
  }

  return books.value.filter(b => !b.archivedAt && !b.isSample)
})

const rowNames = computed(() => {
  const bookIds = tasks.value.map(i => i.bookId)
  const uniqueBookIds = [...new Set(bookIds)]

  const filteredTasks = tasks.value.reduce((result, item) => {
    if (item.taskRow) {
      result.push(item.taskRow)
    }
    return result
  }, [])

  const groupMap = {
    Status: extractUniqueRowTitles(filteredTasks),
    Space: uniqueBookIds,
    Priority: existingPriorities.sort((a, b) => {
      if (a.id === null) return 1
      if (b.id === null) return -1
      return b.id - a.id
    }),
    Date: ['Overdue', 'Today', 'Currently in progress', 'Tomorrow', 'Later this week', 'Upcoming', 'No due date'],
    Assignee: members.value?.length ? (isCardView.value ? [...members.value] : [...members.value.map(e => e.id), null]) : [],
    Labels: isCardView.value
      ? [...Object.values(filteredTags.value).flat(), { id: null }]
      : [...Object.values(filteredTags.value).flatMap((e: ITag[]) => e.map(a => a.id)), null],
    Estimate: isCardView.value ? [...storyPointsData, { id: null }] : [...storyPointsData.map(s => s.text), null]
  }

  return groupMap?.[filters.value.groupBy]
})

const hasItems = computed(() => {
  return !!tasks.value.filter(t => !t.isSample).length
})

const showOnTask = computed(() => {
  return filters.value?.showOnTask?.reduce((acc, item) => {
    acc[item.key] = item.selected
    return acc
  }, {} as IShowOnTaskObj)
})

watch(() => route.query.highlight, (value) => {
  if (value) {
    router.push({ query: { taskId: +route.query?.taskId } })
  }
})

watch(() => activePerspective.value, (value) => {
  if (value) {
    const localData = useLocalStorage.getItem('perspectiveView') || {}
    perspectiveView.value = localData?.[+value.id] || { index: 0, key: 'board-view' }
  }
})

watch(
  () => disableEventType.value,
  async () => {
    await handleGetTasks()
  },
  { deep: true }
)

onMounted(async () => {
  await setInitialFilters()
  await handleGetTasks()

  const localData = useLocalStorage.getItem('isAllBooksSelected') || {}

  if (localData?.[user.value.id] === undefined) {
    localData[user.value.id] = true

    useLocalStorage.setItem('isAllBooksSelected', localData)
  }

  if (+route.query?.taskId) {
    router.push({ query: { taskId: +route.query?.taskId } })
  }

  const localPerspectiveViewData = useLocalStorage.getItem('perspectiveView') || {}
  perspectiveView.value = localPerspectiveViewData?.[+activePerspective.value?.id] || { index: 0, key: 'board-view' }
})

function extractUniqueRowTitles (array) {
  const uniqueTitles = new Set()
  return array
    .filter(item => !uniqueTitles.has(item.title) && uniqueTitles.add(item.title))
    .sort((a, b) => {
      if (a.order && b.order) {
        return a.order - b.order
      } else if (!a.order) {
        return -1
      } else if (!b.order) {
        return 1
      } else {
        return 0
      }
    })
}

async function setPerspective (perspective: IPerspective) {
  const storedPerspectives = useLocalStorage.getItem('todayActivePerspective') || {}

  if (storedPerspectives[user.value.id] === perspective.id) return

  storedPerspectives[user.value.id] = perspective.id
  const localPerspective = allPerspectives[perspective.id] || {}

  useLocalStorage.setItem('todayActivePerspective', storedPerspectives)
  activePerspective.value = perspective

  await handleGetTasks({ ...perspective.task, ...localPerspective })

  initialFilters.value = { ...perspective.task }
  filters.value = { ...initialFilters.value, ...localPerspective }
}

function updatePerspectiveFilters (value: IFilters) {
  updateLocalFilter(value, true)
  updateFilterOnServer()
}

async function handleGetTasks (value?: IFilters) {
  const filtersData = value || filters.value
  await getTasks({
    bookIds: filtersData.selectedBooksFilter,
    search: filtersData.search,
    showCompleted: showCompletedOptions(filtersData.showCompletedFilter),
    tagIds: filtersData?.tagsFilter?.map(e => e.id),
    sortedBy: filtersData?.sortedBy,
    sortedDirection: filtersData?.sortedDirection,
    teamMemberIds: filtersData.membersFilter?.length === membersOptions.value.length ? [] : filtersData.membersFilter?.map(e => e.id),
    urgencyStatuses: filtersData?.urgencyFilter?.map(e => e.type),
    date: findDateRange(filtersData?.dateFilter)
  })
}

function onSelectBookIds (value: number[]) {
  const isAll = value.length === computedBooks.value.map(b => b.id).length

  const localData = useLocalStorage.getItem('isAllBooksSelected') || {}

  localData[user.value.id] = isAll

  useLocalStorage.setItem('isAllBooksSelected', localData)

  filters.value.selectedBooksFilter = localData?.[user.value.id]
    ? computedBooks.value.map(b => b.id)
    : value

  updateLocalFilter(filters.value, true)
}

const allPerspectives = useLocalStorage.getItem('perspectives') || {}
const storedPerspectives = useLocalStorage.getItem('todayActivePerspective') || {}
const localPerspective = allPerspectives[storedPerspectives[user.value.id]] || {}

async function setInitialFilters () {
  try {
    const result = await getPerspectives()

    let currentPerspective = result.find(p => p.id === storedPerspectives[user.value.id]) || result[0]

    activePerspective.value = currentPerspective

    if (!currentPerspective.task?.membersFilter || !currentPerspective.task?.selectedBooksFilter) {
      currentPerspective = await initDefaultMembersAndBooks(currentPerspective)
    }

    if (currentPerspective.task) {
      initialFilters.value = { ...currentPerspective.task }
    } else {
      initialFilters.value = {
        ...initialFiltersForToday,
        membersFilter: [member.value],
        selectedBooksFilter: computedBooks.value.map(e => e.id),
        groupBy: 'Date'
      }
    }

    filters.value = { ...initialFilters.value, ...localPerspective }
  } catch (e) {
    console.log(e)
  }
}

async function initDefaultMembersAndBooks (currentPerspective: IPerspective) {
  if (!currentPerspective.task?.membersFilter) {
    currentPerspective.task.membersFilter = [member.value]
  }

  if (!currentPerspective.task?.selectedBooksFilter) {
    currentPerspective.task.selectedBooksFilter = computedBooks.value.map(e => e.id)
  }

  await updatePerspective({
    id: activePerspective.value.id,
    taskFilter: currentPerspective.task
  })

  return currentPerspective
}

function updateLocalFilter (value: IFilters, doRequest?: boolean) {
  filters.value = {
    ...filters.value,
    ...value
  }

  allPerspectives[activePerspective.value.id] = { ...filters.value }
  useLocalStorage.setItem('perspectives', allPerspectives)

  if (doRequest) {
    handleGetTasks()
  }
}

function updateFilterOnServer () {
  updatePerspective({
    id: activePerspective.value.id,
    taskFilter: filters.value
  })

  initialFilters.value = { ...filters.value }
}

function resetFilters (resetType: 'resetToDefault' | 'clearFilters') {
  const currentPerspective = perspectives.value.find(p => p.id === storedPerspectives[user.value.id])

  const currFilters = currentPerspective
    ? { ...currentPerspective.task }
    : {
      ...initialFiltersForToday,
      membersFilter: [member.value],
      selectedBooksFilter: computedBooks.value.map(e => e.id),
      groupBy: 'Date'
    }

  if (resetType === 'resetToDefault') {
    updateLocalFilter(currFilters, true)
  } else {
    filters.value.tagsFilter = currFilters.tagsFilter
    filters.value.urgencyFilter = currFilters.urgencyFilter
    filters.value.dateFilter = currFilters.dateFilter
    filters.value.membersFilter = membersOptions.value
    updateLocalFilter(filters.value, true)
  }
}

function saveViewType (event: ISwitcherModelValue) {
  perspectiveView.value = event

  const localData = useLocalStorage.getItem('perspectiveView') || {}
  localData[activePerspective.value.id] = perspectiveView.value
  useLocalStorage.setItem('perspectiveView', localData)
}
</script>
