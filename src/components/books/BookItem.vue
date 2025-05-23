<template>
  <div
    class="drag-handler"
  >
    <BookItemBoardView
      v-if="booksViewType.index === 0 && !isSidebar"
      :book="book"
      :clientTeam="clientTeam"
    />

    <BookItemSidebarView
      v-else-if="isSidebar"
      :book="book"
      :clientTeam="clientTeam"
    />

    <BookItemListView
      v-else
      :book="book"
      :clientTeam="clientTeam"
    />
  </div>
</template>

<script setup lang="ts">

defineProps<{
  book: IBook
  clientTeam?: IClientTeams
  isSidebar?: boolean
}>()

const { booksViewType } = useBook()
</script>

<style lang="scss">
.btn-classes {
 @apply text-app-color px-11 py-8 w-full text-13;
}
</style>
