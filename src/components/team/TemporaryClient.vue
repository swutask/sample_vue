<template>
  <div class="w-full flex items-center p-10 pr-0 rounded-6 border border-grey-800 bg-primary">
    <div class="flex-grow w-[150px] md:w-auto px-10">
      <p class="truncate font-extrabold text-app-color">Email</p>
      <p class="opacity-70 text-14 truncate pr-20">{{ member.email }}</p>
    </div>

    <!-- Projects -->
    <div class="w-[120px] px-10 flex relative items-center shrink-0 mr-20">
      <p class="mr-5">{{ sharedBooks?.length }} Spaces</p>

      <DropdownModule
        isTeleported
        prefix="icon-info_outline text-main-color p-2"
        class="text-app-color top-0 bottom-0 right-0 p-0 prevent-toggle"
        isAutoMenuPosition
        background="bg-primary dark:bg-grey-110"
        z-index="z-9999"
        :width="250"
      >
        <div class="py-8 px-12 overflow-y-auto flex flex-col items-start max-h-[190px]">
          <p class="font-medium text-15 mb-6">Spaces</p>

          <div v-if="sharedBooks?.length === 0" class="text-13 whitespace-nowrap">
            No shared spaces
          </div>
          <p v-for="book in sharedBooks" :key="book.title" class="mb-4">
            <BookLabelForClient :title="book.title" :icon="book.icon" size="w-25 h-25" />
          </p>
        </div>
      </DropdownModule>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  member: ITemporaryClient
}>()

const { books } = useBook()

const sharedBooks = computed(() => {
  return books.value.filter(book => props.member.bookIds?.split(',')?.some(e => +e === book.id))
})
</script>
