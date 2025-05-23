<template>
  <div
    class="mt-1 group pr-10 ml-18"
  >
    <div
      class="flex items-center cursor-pointer relative rounded-8 h-29 pr-10 select-none"
      :class="isBookActive || menuRef?.isDropdownVisible ? 'bg-grey-425 ' : 'hover:bg-grey-425'"
      @click="handleNavigation"
    >
      <BookIcon
        :book="book"
        icon-size="w-15 h-15"
        :disabled="isClient"
        class="px-2"
        size="h-31 w-31"
        :hasBorder="false"
        @click.stop
      />

      <input
        v-show="isEdit.title"
        ref="titleInputRef"
        v-model="localBook.title"
        class="text-[13.5px] mt-5 mb-4 outline-none bg-transparent pl-1 grow"
        :class="isBookActive ? 'text-dark-default' : 'text-dark-1100'"
        maxlength="30"
        type="text"
        @input="edit(true)"
        @blur="cancelEdit(true)"
        @keypress.enter="cancelEdit(true)"
      >

      <p
        v-if="!isEdit.title"
        class="flex-grow mr-5 truncate text-[13.5px] ml-2"
        :class="isBookActive || menuRef?.isDropdownVisible ? 'text-dark-default font-medium' : 'text-dark-1100'"
      >
        {{ localBook.title }}
      </p>

      <div
        v-if="!isEdit.title"
        class="flex items-center space-x-2 ml-auto"
        @click.stop
      >
        <div
          v-if="book.isSample && !menuRef?.isDropdownVisible"
          class="bg-[#DEFBF4] dark:bg-primary rounded-full text-9 text-app-color px-7 py-2 ml-10 font-medium block group-hover:hidden"
        >
          Sample
        </div>

        <ButtonModule
          v-if="(!isClient || isClient && book.favorite)"
          :prefix="`rounded-6 hover:!bg-menu-hover !opacity-100 ${book.favorite ?
            'text-[#FFB800] icon-star text-20 p-1' :
            'icon-star-empty text-15 text-grey-975 flex items-center justify-center w-22 h-22'}`"
          type="icon"
          class="mt-1"
          :class="menuRef?.isDropdownVisible ? 'flex' : '!hidden group-hover:!flex '"
          tooltipText="Favorite"
          tooltipClasses="text-12 px-10 py-7 rounded-8 z-9999"
          teleportTooltip
          :disabled="isClient"
          tooltipBottom
          @click="toggleFavorite(true)"
        />

        <i
          v-if="book.shareWith?.length > 1 && isSidebarHovered"
          class="icon-shared-space text-16 text-grey-1050 group-hover:!hidden"
        />

        <BookDropdownMenu
          v-if="!isClient"
          :book="book"
          @toggleEdit="toggleFullEdit"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useBooks from './useBooks'

const props = defineProps<{
  book: IBook
  clientTeam?: IClientTeams
}>()

const { isSidebarHovered } = useSidebar()
const { activeBookId } = useBook()
const {
  // data
  localBook,
  isEdit,
  // refs
  menuRef,
  titleInputRef,
  // function
  toggleFullEdit,
  edit,
  cancelEdit,
  toggleFavorite,
  handleNavigation
} = useBooks({ props })

const isBookActive = computed(() => props.book.id === activeBookId.value)

const { isClient } = useProfile()
</script>
