<template>
  <div class="flex flex-col w-full">
    <Portal :to="isLargeScreen ? 'rightHeaderProjectContent' : 'rightToolsHeaderMobile'">
      <div class="flex items-center space-x-10 order-1 md:order-0">
        <ButtonModule
          text="Section"
          borderWidth="1"
          main
          type="transparent"
          prefix="icon-add text-10 mr-10"
          class="!h-[34px] hidden lg:flex"
          @click="handleCreateFolder"
        />

        <ButtonModule
          :data-onboarding-id="isSidebarCollapsed ? 'onboardingAddProjectHeader' : 'onboardingAddProject'"
          text="New space"
          borderWidth="1"
          titleClass="hidden lg:flex"
          :iconHasMargin="false"
          prefix="icon-add text-10 lg:mr-10"
          class="lg:!h-[33.5px] bg-brand-new text-white hover:bg-[#363BD4]
          flex items-center justify-center rounded-7 opacity-100 text-13 lg:px-11 lg:py-7 w-27 h-27 lg:w-auto "
          @click="createNewBook"
        />
      </div>

      <div class="flex items-center order-0 md:order-1">
        <Switcher
          #default="{icon, tooltipText}"
          v-model="booksViewType"
          class="ml-10 bg-primary"
          height="34px"
          width="48px"
          :scale="{x: 0.82, y: 0.8}"
          :tabs="[
            { key: 'board-view', icon: 'icon-spaces text-14', tooltipText: 'Board view' },
            { key: 'list-view', icon: 'icon-task-list text-12', tooltipText: 'List view' }
          ]"
          @update:modelValue="saveViewType"
        >
          <div class="flex relative">
            <ButtonModule
              border-width="border-none"
              :prefix="icon"
              :tooltipText="tooltipText"
              teleportTooltip
              tooltipBottom
              :tooltipOptionalGap="35"
              class="px-15 py-2 m-auto outline-none"
            />
          </div>
        </Switcher>
      </div>
    </Portal>

    <div
      class="relative w-full h-full max-w-[830px] pb-[105px] px-20 mx-auto select-none"
      :class="{'pt-30': !isSidebarCollapsed}"
    >
      <div class="items-center hidden lg:flex">
        <p class="font-semibold text-22 mb-15">Spaces</p>
      </div>
      <div
        class="min-h-full lg:pb-[70px] pb-30"
      >
        <BookFolder
          :folder="favoriteBooks"
          class="drag-handler"
          :sortedBy="sortedBy"
          hideIfEmpty
        />

        <draggable
          v-model="computedFolders"
          itemKey="id"
          group="rows"
          handle=".drag-handler"
          ghost-class="sortable-ghost-book-folder"
          :disabled="sortedBy === 'Recent' || sortedBy === 'A-Z' || isClient"
          delay="500"
          :delay-on-touch-only="true"
        >
          <template #item="{element}">
            <BookFolder
              :id="element.id.toString()"
              :key="element.id"
              :folder="element"
              class="drag-handler"
              :sortedBy="sortedBy"
              @deleteFolder="deleteFolder"
            />
          </template>
        </draggable>

        <BookFolder
          :folder="allBooks"
          class="drag-handler"
          :sortedBy="sortedBy"
          hideIfEmpty
        />

        <BookFolder
          :folder="archivedBooks"
          class="drag-handler"
          :sortedBy="sortedBy"
          hideIfEmpty
        />
      </div>
    </div>

    <SpaceModal v-if="showSpaceModal" @close="closeSpaceModal" />
  </div>
</template>

<script setup lang="ts">
import localStorageService from '@/core/local-storage'
import draggable from 'vuedraggable'

const emit = defineEmits(['openSpaceModal'])

const {
  books,
  folders,
  createFolder,
  // sortBooksAndFolders,
  deleteFolder: handleDeleteFolder,
  booksViewType
} = useBook()
// const { user } = useProfile()

const { isSidebarCollapsed } = useSidebar()
const { toggleLimitModal, allowAddBook } = usePlan()
const { isClient } = useProfile()
const { isLargeScreen } = useGeneral()

const showSpaceModal = ref(false)
const sortedBy = ref<TSortBy>('Manual')

// const sortedByItems = ['Recent', 'A-Z', 'Manual']

const computedFolders = computed({
  get: () => {
    const localFolders = folders.value.map((folder) => {
      return {
        ...folder,
        books: books.value.filter((book) => {
          return book.bookFolderId === folder.id && !book.favorite
        })
      }
    })

    if (sortedBy.value === 'Manual') {
      return localFolders.sort((a, b) => {
        if (a.bookOrder?.order > b.bookOrder?.order) return 1
        if (a.bookOrder?.order < b.bookOrder?.order) return -1
        return 0
      })
    }
    return localFolders
  },
  set: (val) => {
    val.forEach((item, index) => {
      if (item.bookOrder) {
        item.bookOrder.order = index
      }
    })
    const ids = val.map(item => ({ bookFolderId: item.id }))
    bookService.order(ids)
  }
})

const favoriteBooks = computed(() => {
  return {
    id: -1,
    name: 'Favorites',
    books: books.value.filter(b => b.favorite && !b.archivedAt)
  }
})

const allBooks = computed(() => {
  return {
    id: -2,
    name: 'All',
    books: books.value.filter(b => !b.favorite && !b.archivedAt && b.bookFolderId === null)
  }
})

const archivedBooks = computed(() => {
  return {
    id: -3,
    name: 'Archived',
    books: books.value.filter((b) => b.archivedAt && b.bookFolderId === null)
  }
})

onMounted(() => {
  // const storedSortByValues = localStorageService.getItem('booksSortBy') || {}
  // sortedBy.value = 'Manual'

  window.addEventListener('beforeunload', clearStorage)
})

onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', clearStorage)
})

function clearStorage () {
  localStorageService.removeItem('lastOpenedProject')
}

function deleteFolder (item: IFolder) {
  handleDeleteFolder({ id: item.id })
}

function closeSpaceModal () {
  showSpaceModal.value = false
}

function createNewBook () {
  if (allowAddBook.value) {
    emit('openSpaceModal')
    showSpaceModal.value = true
  } else {
    toggleLimitModal({ show: true, type: 'Special', description: 'Please upgrade if you want to add more spaces.' })
  }
}

function saveViewType () {
  localStorageService.setItem('teamBooksViewTypeV2', booksViewType.value)
}

// function sort (value: TSortBy) {
//   const storedSortByValues = localStorageService.getItem('booksSortBy') || {}
//   storedSortByValues[user.value.id] = value
//   localStorageService.setItem('booksSortBy', storedSortByValues)

//   sortedBy.value = value
//   sortBooksAndFolders(books.value, folders.value, value)
// }

function handleCreateFolder () {
  createFolder().then((res) => {
    window.dispatchEvent(new CustomEvent('toggleEditFolder', {
      detail: {
        id: res.id
      }
    }))
  })
}
</script>

<style lang="scss">
.sortable-ghost-book-folder {
  padding: 0;
  box-shadow: none;
  opacity: .25 !important;
  background: theme('colors.blue.5fe2ff') !important;
  & div {
  visibility: hidden;
  }
}

</style>
