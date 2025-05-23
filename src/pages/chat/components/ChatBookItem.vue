<template>
  <div
    v-if="isClient || book.shareWith?.length >= 2 || book.clients.length"
    class="flex justify-start items-center md:justify-center w-full px-5 sm:px-10 py-2 sm:py-3
      rounded-8 hover:bg-grey-150 cursor-pointer select-none"
    :class="[
      { 'lg:bg-grey-150': isActive },
    ]"
  >
    <BookIcon
      :book="book"
      icon-size="w-15 h-15"
      :size="!isLargeScreen ? 'h-27 w-27' : 'h-31 w-31'"
      class="pr-2"
      :customStyling="!isLargeScreen ? 'rounded-full bg-grey-400 mr-6' : ''"
      :hasBorder="false"
    />

    <p
      class="flex-grow mr-5 ml-2 md:text-13 text-15 text-[#313539] truncate py-5"
      :class="isActive ? 'lg:text-dark-1000 lg:font-medium' : 'text-grey-1050'"
    >
      {{ book.title }}
    </p>

    <NotificationDot v-if="!!unreadCount" showCount :unreadCount="isActive ? 0 : unreadCount" class="mr-10" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  book: IBook
  isActive?: boolean
  unreadCount?: number
}>()

const { isClient } = useProfile()
const { isLargeScreen } = useGeneral()
</script>
