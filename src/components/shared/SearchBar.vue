<template>
  <teleport to="#main_section">
    <div
      v-if="showSearch"
      v-closeOnPressEsc="close"
      class="fixed top-0 left-0 p-15 w-full h-full bg-light-backdrop flex justify-center items-start z-[105]"
      @click.self="close"
    >
      <div class="relative bg-primary rounded-[12px] w-full max-w-[600px] top-40 md:top-1/10 shadow-dropdown">
        <div class="relative">
          <!-- INPUT -->
          <label class="flex items-center rounded-t-10  px-11 py-20 border-b border-grey-500">
            <i v-if="!searchValue || !isSearchInProgress" class="icon-search ml-8 text-grey-300 cursor-pointer w-20 flex-shrink-0" />
            <div v-else class="mr-5"><Spinner /></div>

            <input
              ref="inputRef"
              v-model="searchValue"
              type="text"
              placeholder="Search"
              class="w-full text-app-color bg-transparent pr-10 pl-5 focus:outline-none
                  placeholder-app-color opacity-50 focus:opacity-100 anim-opacity"
              @input="search"
            >

            <ShortCutLabel v-if="!searchValue" class="text-11 hidden lg:inline-block mr-17" first="Ctrl" second="K" />

            <i v-else class="icon-close opacity-50 hover:opacity-100 anim-opacity cursor-pointer text-grey-275 mr-10" @click="clearInput" />
          </label>
          <!-- ACTIONS -->
          <div
            class="select-none"
            :class="{'border-b border-grey-500 ': searchValue || (!searchValue && filteredSearchItems.length > 0)}"
          >
            <div
              v-if="!searchValue"
              class="px-19 pb-20"
            >
              <p class="font-normal text-grey-950 mb-5 mt-15 text-14">Actions</p>
              <ButtonModule
                prefix="icon-add text-12 mr-15"
                class="w-full rounded-10 p-7 px-10"
                :class="{'bg-grey-450': activeIndex === 0}"
                @click.stop="openTaskCreateModal"
                @mouseenter="activeIndex = 0"
              >
                <div class="flex justify-between w-full items-center">
                  <p class="text-14">New task</p>
                  <ShortCutLabel class="text-11" first="ALT" second="C" />
                </div>
              </ButtonModule>

              <ButtonModule
                text="New space"
                titleClass="text-14"
                prefix="icon-add text-12 mr-15"
                class="w-full rounded-10 p-7 px-10"
                :class="{'bg-grey-450': activeIndex === 1}"
                @click="openProjectCreateModal"
                @mouseenter="activeIndex = 1"
              />

              <ButtonModule
                text="Invite people"
                prefix="icon-add-user text-17"
                titleClass="text-14"
                class="w-full rounded-10 p-7 px-10"
                :class="{'bg-grey-450': activeIndex === 2}"
                @click="openInviteModal"
                @mouseenter="activeIndex = 2"
              />
            </div>
          </div>
          <div
            v-if="searchValue || (!searchValue && filteredSearchItems.length > 0)"
            id="show-scrollbar-on-hover"
            class="w-full max-h-[355px] py-15 overflow-y-auto lighter-scroll-bar"
          >
            <p
              v-if="filteredSearchItems.length > 0 && !searchValue"
              class="font-normal text-grey-950 px-24 mb-5 text-14"
            >
              Recent searches
            </p>
            <!-- GROUP -->
            <div v-if="filteredSearchItems.length > 0" class="px-25">
              <div
                v-for="(item, index) in sortedSearchItems"
                :id="item._id"
                :key="item._id + item._index"
                :ref="el => indexRefs[index + indexCoefficient] = el"
                class="search-item flex justify-between items-center cursor-pointer group text-app-color px-10 rounded-10 hover:bg-grey-450"
                :class="[
                  getSearchClass(item._index),
                  {'bg-grey-450' : activeIndex === index + indexCoefficient}
                ]"
                @mousedown.prevent.stop
                @mouseenter="activeIndex = index + indexCoefficient"
                @click="select(item)"
              >
                <SearchItemMember
                  v-if="item._index === 'complex-member'"
                  :item="item"
                  :activeIndex="index + indexCoefficient === activeIndex"
                />
                <SearchItem
                  v-if="item._index !== 'complex-member'"
                  :item="item"
                  :activeIndex="index + indexCoefficient === activeIndex"
                />
              </div>
            </div>
            <!-- NO ITEMS -->
            <p v-if="filteredSearchItems.length === 0 && searchValue && !isSearchInProgress" class="font-medium text-grey-950 px-15 mb-5 text-13">
              No result
            </p>
          </div>
        </div>
      </div>
    </div>
    <InviteTeammates v-if="showInviteModal && !isClient" enableMultiselect @close="closeInviteModal" />
  </teleport>
</template>

<script setup lang="ts">
import localStorageService from '@/core/local-storage'
import { searchService } from '@/services'
import type { ISearchItem } from '../search/search.types'
import { parseDate } from '@/plugins/filters'

const emit = defineEmits(['openSpaceModal', 'openInviteModal'])

const { toggleNewTaskModal } = useTask()
const { user } = useProfile()
const { isClient } = useProfile()
const { showSearch, toggleSearch, setHighlightedText } = useGeneral()
const { team, isTeamAccount, members } = useTeam()
const router = useRouter()
const route = useRoute()
const { toggleLimitModal, allowAddBook } = usePlan()

const indexRefs = ref([])
const inputRef = ref(null)

const showInviteModal = ref(false)
const searchValue = ref('')
const activeIndex = ref(0)
const isSearchInProgress = ref(false)
const filteredSearchItems = ref([])
const recentSearch = ref([])
const query = ref('')

const indexCoefficient = computed(() => !searchValue.value ? 3 : 0)

const sortedSearchItems = computed(() => filteredSearchItems.value.sort((a, b) => {
  if (a._index > b._index && a._score > b._score) return 1
  if (a._index < b._index && a._score < b._score) return -1
  return 0
}))

onMounted(() => {
  const allRecentOpened = localStorageService.getItem('recentSearch') || {}

  recentSearch.value = allRecentOpened[user.value.id]
  filteredSearchItems.value = recentSearch.value || []
})

onBeforeUpdate(() => {
  // to reset the refs before each update
  indexRefs.value = []
})

watch(showSearch, (value) => {
  if (value) {
    document.addEventListener('keydown', arrowNavigation)
    nextTick(() => inputRef.value.focus())
  } else {
    document.removeEventListener('keydown', arrowNavigation)
  }
})

watch(searchValue, (value) => {
  if (value.trim() === '') {
    filteredSearchItems.value = recentSearch.value || []
  }
})

function getSearchClass (label: string) {
  const classes = {
    'complex-project': 'mention-project',
    'complex-member': 'mention-user',
    'complex-task': 'mention-tasks',
    'complex-attachment': 'mention-attachment',
    'complex-message': 'mention-chat',
    'complex-book': 'mention-book'
  }

  return classes[label]
}

function close () {
  activeIndex.value = 0
  searchValue.value = ''
  query.value = ''
  filteredSearchItems.value = recentSearch.value || []
  toggleSearch(false)
  document.removeEventListener('keydown', arrowNavigation)
}

function closeInviteModal () {
  showInviteModal.value = false
}

function arrowNavigation (e: KeyboardEvent) {
  if (e.key === 'ArrowUp' && activeIndex.value > 0) {
    e.preventDefault()
    activeIndex.value--
    indexRefs.value[activeIndex.value]?.scrollIntoView(false)
  }
  if (e.key === 'ArrowDown' && activeIndex.value - indexCoefficient.value < filteredSearchItems.value.length - 1) {
    e.preventDefault()
    activeIndex.value++
    indexRefs.value[activeIndex.value]?.scrollIntoView(false)
  }
  if (e.key === 'Enter') {
    e.preventDefault()
    if (activeIndex.value <= 2 && !searchValue.value) {
      const methods = [() => openTaskCreateModal(), () => openProjectCreateModal(), () => openInviteModal()]

      methods[activeIndex.value]()
    } else {
      select(filteredSearchItems.value[activeIndex.value - indexCoefficient.value])
    }
  }
}

function toProject (item: ISearchItem) {
  if (isTeamAccount.value) {
    router.push({ name: 'TeamBook', params: { team: team.value.link, id: item._source.bookId }, query: { page: item._id } })
  } else {
    router.push({ name: 'Book', params: { id: item._source.bookId }, query: { page: item._id, highlight: 'true' } })
  }
}

function toBook (item: ISearchItem) {
  if (isTeamAccount.value) {
    router.push({ name: 'TaskBoardTeam', params: { team: team.value.link, id: item._index === 'complex-task' ? item._source.bookId : item._id } })
  } else {
    router.push({ name: 'Book', params: { id: item._id } })
  }
}

function toTask (item: ISearchItem) {
  const bookId = item._source.bookId
  const taskId = item._id
  router.push({ name: 'TaskBoardTeam', params: { team: team.value.link, id: bookId }, query: { taskId } })
}

function toTool (item: ISearchItem) {
  const teamNames = { task: 'TaskBoardTeam', attachment: 'FileManagerTeam' }
  const personalNames = { task: 'TaskBoard', attachment: 'FileManager' }

  const name = isTeamAccount.value ? teamNames[item._index] : personalNames[item._index]
  const params: {
    team?: string
    id: string | number
  } = isTeamAccount.value
    ? { team: team.value.link, id: item._source.bookId }
    : { id: item._source.bookId }

  let query: {
    highlight?: number | string
    additionalInfo?: string
    resolved?: string
    startDate?: string
    content?: string
    taskId?: number | string
  } = {
    highlight: item._id
  }

  switch (item._index) {
    case 'task':
      query = {
        taskId: item._source.parentId || item._id
      }
      break
    default:
      break
  }

  if (item.highlight?.additionalInfo) query.additionalInfo = 'true'
  if (item._source.start) query.startDate = parseDate(item._source.start, 'YYYY-MM-DD')

  router.push({ name, params, query })
}

async function toPrivateChat (item: ISearchItem) {
  const query = { ...route.query }
  const member = members.value.find(m => m.id === +item._id)

  if (member) {
    query.privateChat = member.userId.toString()
    router.replace({ query })
  }
}

function toBookChat (item: ISearchItem) {
  router.push({
    name: 'Chat',
    params: {
      team: team.value.link,
      id: item.chat.bookId
    },
    query: {
      chatId: item.chat.id,
      messageId: item._id
    }
  })
}

function redirect (item: ISearchItem) {
  setHighlightedText(query.value)

  switch (item._index) {
    case 'complex-project':
      return toProject(item)
    case 'complex-book':
      return toBook(item)
    case 'complex-task':
      return toTask(item)
    case 'complex-attachment':
      return toTool(item)
    case 'complex-member':
      return toPrivateChat(item)
    case 'complex-message':
      return toBookChat(item)
    default:
      break
  }
}

function select (item: ISearchItem) {
  redirect(item)

  saveRecentFiles(item)

  close()
}

function saveRecentFiles (item: ISearchItem) {
  const allRecentOpened = localStorageService.getItem('recentSearch') || {}
  const recentOpened = allRecentOpened[user.value.id] || []

  const indexOfRecentOpenedItem = recentOpened.findIndex((recentOpenedItem: ISearchItem) => recentOpenedItem._id === item._id)

  if (indexOfRecentOpenedItem < 0) {
    if (recentOpened.length > 2) {
      recentOpened.pop()
    }
  } else {
    recentOpened.splice(indexOfRecentOpenedItem, 1)
  }

  recentOpened.unshift(item)

  recentSearch.value = recentOpened
  allRecentOpened[user.value.id] = recentOpened

  localStorageService.setItem('recentSearch', allRecentOpened)
}

let timer = null

function search () {
  clearTimeout(timer)
  isSearchInProgress.value = true

  timer = setTimeout(() => {
    query.value = searchValue.value
    activeIndex.value = 0

    if (searchValue.value.trim() !== '') {
      const modelNames = ['book', 'task', 'project', 'message', 'attachment', 'member']

      searchService.search({ query: searchValue.value, modelNames })
        .then(res => {
          filteredSearchItems.value = res.data.result || []
        }).finally(() => {
          isSearchInProgress.value = false
        })
    }
  }, 300)
}

function openTaskCreateModal () {
  close()

  toggleNewTaskModal(true)
}

function openProjectCreateModal () {
  if (allowAddBook.value) {
    close()
    emit('openSpaceModal')
  } else {
    toggleLimitModal({ show: true, type: 'Special', description: 'Please upgrade if you want to add more spaces.' })
  }
}

function openInviteModal () {
  close()
  emit('openInviteModal')

  showInviteModal.value = !showInviteModal.value
}

function clearInput () {
  searchValue.value = ''
}
</script>
