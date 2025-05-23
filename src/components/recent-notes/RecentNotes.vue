<template>
  <div class="fixed bottom-[60px] lg:bottom-15 right-15 rounded-20 z-[100]">
    <DropdownModule
      ref="recentNoteRef"
      :iconHasHover="false"
      class="text-app-color text-15 h-full flex items-center rounded-20"
      :width="300"
      is-auto-menu-position
      zIndex="z-9999"
      :topGap="10"
      :contentHeight="248.5"
      background="bg-basic"
      @input="toggleMenu"
      @close="toggleMenu(false)"
    >
      <template #button>
        <div :class="`px-5 py-4 rounded-8 group ${menuIsOpen ? 'bg-basic' : 'bg-none hover:bg-grey-500'}`">
          <ButtonModule
            type="icon"
            border-width="border-2 border-black !rounded-8"
            class="px-13 py-12"
            tooltipPosition="absolute top-3/4 right-[50px]"
            tooltipClasses="text-11 px-10 py-7 rounded-8 z-9999 font-sans-serif"
            :tooltipText="menuIsOpen ? '' : 'Recently viewed'"
            :prefix="`icon-recurring [transform:rotateY(180deg)] px-4 py-3 font-semibold text-18 rounded-8
             ${menuIsOpen ? 'bg-basic' : 'bg-primary group-hover:bg-grey-500'}`"
          />
        </div>
      </template>
      <div class="p-15 bg-basic rounded-20 open-note-animation">
        <div v-if="favoriteNotes.length" class="mb-15">
          <p class="text-14 mb-10 font-semibold">Favorites</p>
          <div class="overflow-auto no-scroll-bar">
            <div
              v-for="(note, index) in favoriteNotes"
              :key="note"
              :ref="(el) => favoriteNoteRefs[index] = el"
              class="cursor-pointer px-8 py-5 rounded-10 hover:bg-grey-f8f8ff hover:max-w-[280px] group mb-3"
              :class="{ 'bg-grey-f8f8ff max-w-[280px]': activeIndex === index }"
              @click="noteClick(note, index)"
            >
              <RecentNoteItem :note="note" :showArrow="activeIndex === index" @toggleFavorite="toggleFavorite(note)" />
            </div>
          </div>
        </div>

        <p class="text-14 mb-10 font-semibold">Recently viewed</p>
        <div class="overflow-auto no-scroll-bar">
          <div
            v-for="(note, index) in notes"
            :key="note"
            :ref="(el) => noteRefs[index] = el"
            class="cursor-pointer px-8 py-5 rounded-10 hover:bg-grey-f8f8ff hover:max-w-[280px] group mb-3"
            :class="{ 'bg-grey-f8f8ff max-w-[280px]': activeIndex === index + (favoriteNotes ? favoriteNotes.length : 0) }"
            @click="noteClick(note, index + (favoriteNotes ? favoriteNotes.length : 0))"
          >
            <RecentNoteItem
              :note="note"
              :showArrow="activeIndex === index + (favoriteNotes ? favoriteNotes.length : 0)"
              @toggleFavorite="toggleFavorite(note)"
            />
          </div>
        </div>
      </div>
    </DropdownModule>
  </div>
</template>
<script setup lang="ts">
import router from '@/router'
import localStorageService from '@/core/local-storage'
import { removeHTMLTags } from '@/core/helper-functions'

const notes = ref([])
const favoriteNotes = ref([])
const menuIsOpen = ref(false)
const noteRefs = ref([])
const favoriteNoteRefs = ref([])
const recentNoteRef = ref()
const activeIndex = ref(0)
const prevIndex = ref(0)
const { user } = useProfile()
const { projects } = useProject()
const { modalTask, showTaskModal } = useTask()
const { books } = useBook()
const { setNotification } = useGeneral()
const route = useRoute()

watch(() => route.fullPath, (value) => {
  if (value) {
    onRouteChange(value)
  }
}, { immediate: true })

onMounted(() => {
  const localData = localStorageService.getItem('recent-notes') || []

  notes.value = [...new Set(localData[user.value.id])]?.filter((e: IRecentNote) => !e?.isFavorite) || []
  favoriteNotes.value = [...new Set(localData[user.value.id])]?.filter((e: IRecentNote) => e?.isFavorite) || []
})

document.addEventListener('keydown', (e) => {
  keyClickHandler(e)
})

function onRouteChange (value) {
  const localData = localStorageService.getItem('recent-notes') || {}
  const isTaskIdIncluded = value.includes('taskId')
  const routeTitle = routeParser(value)?.title

  if (!isTaskIdIncluded) showTaskModal.value = false

  const existingData = localData[user.value.id] || []
  const existingItem = existingData.find(e => e.url === value)
  const isFavorite = existingItem?.isFavorite

  if (routeTitle && routeTitle !== 'undefined') {
    const newItem = routeParser(value, isFavorite)
    localData[user.value.id] = localData[user.value.id] ? [newItem, ...localData[user.value.id]] : [newItem]
  }

  const uniqueUrls = new Set(localData[user.value.id]?.map(item => item.url))
  localData[user.value.id] = localData[user.value.id].filter((item, index, self) => {
    // Filter out items with the same title except for the first occurrence
    return index === self.findIndex(t => t.title === item.title)
  })?.filter(item => uniqueUrls.delete(item.url))

  if (localData[user.value.id]?.length > 12 && !isFavorite) {
    localData[user.value.id].sort((a, b) => (a.isFavorite && !b.isFavorite ? -1 : !a.isFavorite && b.isFavorite ? 1 : 0))
    localData[user.value.id].pop()
  }

  notes.value = localData[user.value.id]?.filter(e => !e?.isFavorite)
  favoriteNotes.value = localData[user.value.id]?.filter(e => e?.isFavorite)

  activeIndex.value = isFavorite ? 0 : favoriteNotes.value?.length

  localStorageService.setItem('recent-notes', localData)
}

function noteClick (value: IRecentNote, index: number) {
  activeIndex.value = value?.isFavorite ? index : index + (favoriteNotes.value ? favoriteNotes.value.length : 0)
  router.push(value.url)
}

function keyClickHandler (event: KeyboardEvent) {
  const allRefs = favoriteNotes.value.length ? [...favoriteNoteRefs.value, ...noteRefs.value] : noteRefs.value

  if (event.key === 'ArrowDown' && menuIsOpen.value) {
    activeIndex.value++
    prevIndex.value = activeIndex.value - 1

    if (activeIndex.value > allRefs.length - 1) {
      activeIndex.value = 0
      prevIndex.value = allRefs.length - 1
    }
  }
  if (event.key === 'ArrowUp' && menuIsOpen.value) {
    activeIndex.value--
    prevIndex.value = activeIndex.value + 1

    if (activeIndex.value < 0) {
      activeIndex.value = allRefs.length - 1
    }
  }

  if (event.key === 'Enter' && menuIsOpen.value) {
    noteClick([...favoriteNotes.value, ...notes.value][activeIndex.value], activeIndex.value)

    menuIsOpen.value = false
  }

  if (event.keyCode === 88 && event.altKey) {
    toggleMenu(true)
    recentNoteRef.value.toggle(true)
  }
}

function toggleMenu (value) {
  activeIndex.value = favoriteNotes.value.some(e => e.url === route.fullPath) ? 0 : favoriteNotes.value.length
  menuIsOpen.value = value
}

function toggleFavorite (note: IRecentNote) {
  const localData = localStorageService.getItem('recent-notes') || {}

  if (localData[user.value.id]?.filter(e => e?.isFavorite).length > 5 && !note.isFavorite) {
    setNotification({ uuid: window.crypto.randomUUID(), message: 'You can have a maximum of 6 favorites' })
    return
  }

  localData[user.value.id] = localData[user.value.id].map((e: IRecentNote) => (
    e.url === note.url ? { ...e, isFavorite: !e?.isFavorite } : e
  ))

  favoriteNotes.value = localData[user.value.id]?.filter(e => e?.isFavorite)
  notes.value = localData[user.value.id]?.filter(e => !e?.isFavorite)

  localStorageService.setItem('recent-notes', localData)
}

function routeParser (note: string, isFavorite = false): IRecentNote {
  const book = books.value.find(b => b.id === +route.params?.id)
  const parseResult = (icon: string, title: IRecentNote['title']) => ({ icon, url: note, title, isFavorite })

  const title = removeHTMLTags(notes.value?.find(e => e.url === note)?.title)

  const taskName = title || removeHTMLTags(modalTask.value?.title)
  const pageName = title ||
    removeHTMLTags(projects.value?.find(e => e.id === +route.query?.page)?.title)

  const conditions = [
    { check: note.includes('taskId'), result: parseResult('icon-task', `${taskName}`) },
    { check: note.includes('space') && route.query.page, result: parseResult('icon-projects1', `${pageName}`) },
    { check: note.includes('/chat'), result: parseResult('icon-chat-page', 'Chat') },
    { check: note.includes('/members'), result: parseResult('icon-people-page !text-14', 'People') },
    { check: note.includes('/projects'), result: parseResult('icon-books-v2 !text-13', 'Spaces') },
    { check: note.includes('/calendar'), result: parseResult('icon-calendar', 'Calendar') },
    { check: route.name === 'Today', result: parseResult('icon-perspectives', 'Overview') },
    { check: !note.includes('taskId') && note.includes('/task-board'), result: parseResult('icon-task', { firstPartTitle: 'Tasks', secondPartTitle: `${book?.title}` }) },
    { check: route.params.id && note.includes('/files'), result: parseResult('icon-file-manager !text-14', { firstPartTitle: 'Files', secondPartTitle: `${book?.title}` }) }
  ]

  const matchedCondition = conditions.find((condition) => condition.check)
  return matchedCondition ? matchedCondition.result : null
}
</script>
<style>
@keyframes animate-recent-note {
  0% {
    transform: scale(0.9);
    opacity: 20%
  }

  100% {
    transform: scale(1);
    opacity: 100%
  }
}

.open-note-animation {
  animation-delay: 0.4s;
  animation: animate-recent-note 0.4s linear
}

.font-sans-serif {
  font-family: Inter, sans-serif !important;
}
</style>
