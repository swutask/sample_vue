<template>
  <div class="w-full flex flex-col flex-grow overflow-hidden text-grey-250">
    <div
      id="show-scrollbar-on-hover"
      :class="isTrialPlan && !isMobile && !isClient ? 'max-h-[75%]' : ''"
      class="overflow-y-auto pb-50"
    >
      <BookFolder
        v-if="favoriteBooks?.books.length"
        :folder="favoriteBooks"
        class="drag-handler"
        isFavorite
        :sortedBy="sortedBy"
        isSidebar
      />

      <draggable
        v-model="computedFolders"
        itemKey="id"
        group="rows"
        handle=".drag-handler"
        ghost-class="sortable-ghost-book-folder"
        :disabled="sortedBy === 'Recent' || sortedBy === 'A-Z' || isClient"
      >
        <template #item="{element}">
          <BookFolder
            :id="element.id.toString()"
            :key="element.id"
            isSidebar
            :folder="element"
            class="drag-handler"
            :sortedBy="sortedBy"
            @deleteFolder="deleteFolder"
          />
        </template>
      </draggable>

      <BookFolder
        isSidebar
        :folder="allBooks"
        class="drag-handler"
        :sortedBy="sortedBy"
        hideIfEmpty
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable'

const {
  books,
  folders,
  deleteFolder: handleDeleteFolder
} = useBook()

const { isMobile } = useGeneral()
const { isTrialPlan } = usePlan()
const { isClient } = useProfile()

const sortedBy = ref<TSortBy>('Manual')

const computedFolders = computed({
  get: () => {
    return folders.value.map((folder) => {
      return {
        ...folder,
        books: books.value.filter((book) => {
          return book.bookFolderId === folder.id && !book.favorite
        })
      }
    }).sort((a, b) => {
      if (a.bookOrder?.order > b.bookOrder?.order) return 1
      if (a.bookOrder?.order < b.bookOrder?.order) return -1
      return 0
    })
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

function deleteFolder (item: IFolder) {
  handleDeleteFolder({ id: item.id })
}
</script>
