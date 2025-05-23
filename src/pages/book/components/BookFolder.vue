<template>
  <div
    v-if="!(hideIfEmpty && folder.books.length === 0)"
    class="group-scope relative"
    :class="wrapperClasses"
  >
    <div
      v-if="isSidebar"
      class="absolute h-full w-2 bg-grey-425 left-10"
      :class="{'mt-5': isFavorite}"
    />
    <FolderHeader
      :isEmpty="folder.books.length === 0"
      :isSidebar="isSidebar"
      :folder="folder"
      :class="{'mb-[-4px] pl-23': isSidebar}"
      @fold="toggleFold"
      @deleteFolder="(value) => emit('deleteFolder', value)"
    />
    <draggable
      :id="folder.id"
      v-model="computedBooks"
      itemKey="id"
      group="books"
      :ghost-class="ghostClass"
      :chosen-class="booksViewType.index === 0 && isMobile ? 'rotate-3' : ''"
      handle=".drag-handler"
      :disabled="sortedBy === 'Recent' || sortedBy === 'A-Z' || isClient"
      :class="booksViewType.index === 0 && !isSidebar ?
        'grid grid-cols-2 md:flex md:flex-wrap gap-x-[11px]' :
        ''"
      delay="500"
      :delay-on-touch-only="true"
      @add="add"
      @start="onDragStart"
      @end="onDragEnd"
    >
      <template #item="{element, index}">
        <ItemObserver
          v-if="!isSidebar"
          :id="element.id"
          :key="element.id"
          needToWatchComponentUpdating
        >
          <BookItem
            :book="element"
          />

          <template #placeholder>
            <div
              :class="[
                booksViewType.index === 0 ? 'w-[155px] lg:w-[235px] h-[180px]' : 'h-48',
                {'!h-0' : isSidebar}
              ]"
            />
          </template>
        </ItemObserver>

        <BookItem
          v-else
          :id="element.id"
          isSidebar
          class="h-29"
          :class="computedBooks.length - 1 === index ? 'mb-14' : ''"
          :book="element"
        />
      </template>
    </draggable>
  </div>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable'

const props = defineProps<{
  hideIfEmpty?: boolean
  folder: IFolder
  sortedBy: TSortBy
  isSidebar?: boolean
  isFavorite?: boolean
}>()

const emit = defineEmits(['deleteFolder'])
const { handleUpdateBookOrder, handleUpdateBookFolderId, booksViewType, editBook, books } = useBook()
const { isClient } = useProfile()
const { isMobile } = useGeneral()

const showMore = ref(true)

const wrapperClasses = computed(() => {
  if (props.isSidebar) return

  return showMore.value && props.folder.books.length !== 0 ? 'mb-36' : 'mb-[-4px]'
})

const ghostClass = computed(() => {
  if (props.isSidebar) {
    return 'my-sortable-ghost-book--list-sidebar'
  }
  return booksViewType.value.index === 0 ? 'my-sortable-ghost-book--card' : 'my-sortable-ghost-book--list'
})

const computedBooks = computed({
  get: () => {
    const booksToShow = showMore.value ? props.folder.books : []

    if (props.sortedBy === 'Manual') {
      return booksToShow.sort((a, b) => {
        if (a.bookOrder?.order > b.bookOrder?.order) return 1
        if (a.bookOrder?.order < b.bookOrder?.order) return -1
        return 0
      })
    }
    return booksToShow
  },
  set: (val) => {
    val.forEach((item, index) => {
      if (item.bookOrder) {
        item.bookOrder.order = index
      }

      handleUpdateBookOrder(item.id, index)
    })

    const ids = val.map(item => ({ bookId: item.id }))
    bookService.order(ids)
  }
})

function toggleFold (event) {
  showMore.value = event
}

function checkBooksSection ({ toId, id }) {
  let payload

  switch (toId) {
    case -1:
      payload = { id, favorite: true, archivedAt: null, bookFolderId: null }
      break
    case -2:
      payload = { id, favorite: false, archivedAt: null, bookFolderId: null }
      break
    case -3:
      payload = { id, favorite: false, archivedAt: new Date(), bookFolderId: null }
      break
    default:
      if (toId > 0) {
        payload = { id, favorite: false, archivedAt: null, bookFolderId: toId }
      }
  }

  if (payload) {
    editBook({ ...books.value.find(e => e.id === id), ...payload })
  }
}

function onDragStart () {
  document.body.classList.add('grabbing')
}

function onDragEnd (ctx) {
  checkBooksSection({
    toId: +ctx.to.id,
    id: +ctx.item.id
  })

  document.body.classList.remove('grabbing')
}

function add (ctx) {
  const bookId = +ctx.item.id
  const folderId = +ctx.to.id

  handleUpdateBookFolderId(bookId, folderId)
}
</script>

<style lang="scss" scoped>
@mixin sortable-ghost-book {
  padding: 0;
  box-shadow: none;
  opacity: .25 !important;
  background: theme('colors.blue.5fe2ff') !important;

  & div {
      visibility: hidden;
    }
}
.my-sortable-ghost-book {
  &--card {
    @include sortable-ghost-book;
    height: 130px;
    @apply rounded-12 md:w-[252px] rotate-0 #{!important};
  }

  &--list {
    @include sortable-ghost-book;
    height: 48px;
    @apply rounded-12 mb-12;
  }

  &--list-sidebar {
    @include sortable-ghost-book;
    height: 27px;
    margin-right: 12px;
    @apply rounded-8;
  }
}
</style>
