<template>
  <div
    :data-onboarding-id="book.isSample ? isSidebarCollapsed ? 'onboardingSampleProjectHeader' : 'onboardingSampleProject' : null"
    class="mt-1 group"
  >
    <div
      class="flex items-center cursor-pointer relative space-x-7 md:space-x-14
        rounded-12 py-8 px-10 mb-12 board-view-border-v2 dark:bg-grey-200 bg-primary mx-2"
      @click.self="handleNavigation"
    >
      <BookIcon
        :book="book"
        :iconSize="iconSize"
        :disabled="isClient"
        size="h-30 w-30"
        :hasBorder="false"
      />

      <input
        v-show="isEdit.title"
        ref="titleInputRef"
        v-model="localBook.title"
        class="text-14 mt-5 mb-4 outline-none pl-13 bg-transparent text-grey-1300"
        maxlength="30"
        type="text"
        @input="edit(true)"
        @blur="cancelEdit(true)"
        @keypress.enter="cancelEdit(true)"
      >

      <p
        v-if="!isEdit.title"
        class="mr-5 text-14 text-grey-1300 dark:text-app-color truncate"
        @click="handleNavigation"
      >
        {{ localBook.title }}
      </p>

      <div
        v-if="book.isSample"
        class="bg-[#DEFBF4] dark:bg-sidebar rounded-full text-8 lg:text-10 px-7 py-2 font-medium lg:w-[88px] shrink-0"
        @click="handleNavigation"
      >
        Sample space
      </div>

      <ButtonModule
        v-if="!isClient || isClient && book.favorite"
        :prefix="`${book.favorite ?
          'text-[#FFB800] icon-star text-20 p-1' :
          'icon-star-empty text-grey-d5d5d5 text-16 flex items-center justify-center'}`"
        type="icon"
        class="shrink-0"
        :class="{ 'lg:!opacity-0 lg:group-hover:!opacity-100': !book.favorite }"
        tooltipText="Favorite"
        teleportTooltip
        :disabled="isClient"
        tooltipBottom
        @click="toggleFavorite"
      />

      <SharedWith
        v-if="!isClient"
        ref="inviteModalRef"
        isCard
        withAvatars
        :numberOfUsers="isMobile ? 1 : 5"
        class="flex !ml-auto"
        :members="book.shareWith"
        :width="196"
        infoDropdownClasses="-right-5 rounded-8"
        :book="book"
      />

      <BookDropdownMenu
        v-if="!isClient"
        :book="book"
        showAlways
        @toggleEdit="toggleFullEdit"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import useBooks from './useBooks'

const props = defineProps<{
  book: IBook
  clientTeam?: IClientTeams
}>()

const {
  // data
  localBook,
  isEdit,
  // refs
  inviteModalRef,
  titleInputRef,
  // computed
  iconSize,
  // function
  toggleFullEdit,
  edit,
  cancelEdit,
  toggleFavorite,
  handleNavigation
} = useBooks({ props })

const { isSidebarCollapsed } = useSidebar()
const { isClient } = useProfile()
const { isMobile } = useGeneral()
</script>
