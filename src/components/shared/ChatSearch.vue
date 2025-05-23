<template>
  <DropdownModule
    ref="dropdownRef"
    :iconHasHover="false"
    preventOpenOnClick
    isAutoMenuPosition
    :isTeleported="isLargeScreen"
    background="bg-primary dark:bg-grey-110 max-h-[500px] overflow-y-auto"
    :contentHeight="500"
    removeOptionalTopGap
    zIndex="z-[9999]"
  >
    <template #button>
      <SearchInput
        v-model="searchInput"
        class="max-w-[200px] h-36"
        isExpandable
        @onSearch="search($event)"
        @onFocus="onFocus"
      />
    </template>

    <div v-if="searchResult.length">
      <div v-for="searchResultItem in searchResult" :key="searchResultItem.id">
        <SearchResultItem :item="searchResultItem" @scrollToMessage="scrollToMessage" />
      </div>
    </div>

    <div v-else class="w-full h-50 flex items-center px-20 text-14">
      <p>No matches...</p>
    </div>
  </DropdownModule>
</template>

<script setup lang="ts">

const props = defineProps<{
  chatId: number
  bookId?: number
}>()

const emit = defineEmits(['scrollToMessage'])

const searchInput = ref('')
const searchResult = ref<ISearchMessage[]>([])
const dropdownRef = ref(null)
const { isLargeScreen } = useGeneral()

const { searchInChat } = useChat()

function scrollToMessage (id: number) {
  emit('scrollToMessage', id)
}

function search (text: string) {
  searchInput.value = text

  if (text.trim()) {
    searchInChat(
      text,
      props.chatId
    ).then(({ data }) => {
      dropdownRef.value.toggle(true)
      searchResult.value = data.result
    })
  } else {
    dropdownRef.value.close()
  }
}

function onFocus () {
  if (searchInput.value.trim() !== '' && !dropdownRef.value.isDropdownVisible) {
    dropdownRef.value.toggle(true)
  }
}
</script>
