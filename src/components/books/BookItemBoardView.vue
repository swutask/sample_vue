<template>
  <div
    :data-onboarding-id="book.isSample ? isSidebarCollapsed ? 'onboardingSampleProjectHeader' : 'onboardingSampleProject' : null"
    class="mt-1 group"
  >
    <div
      class="flex flex-col items-start justify-between cursor-pointer relative dark:bg-grey-200 bg-primary
      rounded-12 py-11 px-18 mb-12 board-view-border-v2 mx-2 md:w-[252px] md:h-[130px] h-[140px]"
      @click.self="handleNavigation"
    >
      <div v-clickOutside="() => isEdit.title ? cancelEdit(true) : null" class="w-full">
        <div class="flex items-center justify-between">
          <div class="flex items-center truncate">
            <BookIcon
              :book="book"
              :icon-size="iconSize"
              :disabled="isClient"
              size="h-30 w-30"
              class="-ml-7"
              :hasBorder="false"
            />

            <input
              v-show="isEdit.title"
              ref="titleInputRef"
              v-model="localBook.title"
              class="text-14 font-medium outline-none bg-transparent w-full"
              maxlength="30"
              type="text"
              @input="edit(true)"
              @keypress.enter="cancelEdit(true)"
            >

            <p
              v-if="!isEdit.title"
              class="text-14 font-medium truncate mx-5"
              @click="handleNavigation"
            >
              {{ localBook.title }}
            </p>
          </div>

          <BookDropdownMenu
            v-if="!isClient"
            :book="book"
            @toggleEdit="toggleFullEdit"
          />
        </div>

        <textarea
          v-show="isEdit.subTitle"
          ref="subTitleInputRef"
          v-model="localBook.subTitle"
          placeholder="Add details..."
          class="font-medium outline-none text-13 text-grey-275 bg-transparent mt-3 w-full"
          type="text"
          @input="edit(true)"
        />

        <div
          v-if="!isEdit.subTitle"
          class="text-13 text-grey-1000 multi-truncate mt-1"
          style="--mt-lines: 2;"
          @click="handleNavigation"
        >
          <p v-for="(item, idx) in localBook.subTitle?.split('\n') " :key="item + idx">
            {{ item }}
          </p>
        </div>

        <div v-if="book.isSample" class="w-full" @click="handleNavigation">
          <div
            class="bg-[#DEFBF4] dark:bg-sidebar rounded-full text-10 px-7 py-2 font-medium w-[88px] mt-9
           items-center justify-center flex"
          >
            Sample space
          </div>
        </div>
      </div>
      <div class="flex flex-col w-full">
        <div class="flex items-center justify-between w-full">
          <ButtonModule
            v-if="!isClient || isClient && book.favorite"
            :prefix="`${book.favorite ?
              'text-[#FFB800] icon-star text-20 p-1' :
              'icon-star-empty text-grey-d5d5d5 text-16 flex items-center justify-center'}`"
            type="icon"
            class="-ml-3"
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
            :numberOfUsers="isMobile ? 1 : 4"
            class="flex justify-end"
            :members="book.shareWith"
            :width="196"
            infoDropdownClasses="-right-5 max-h-[290px] rounded-8"
            :book="book"
          />
        </div>
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

const {
  // data
  isEdit,
  localBook,
  // refs
  titleInputRef,
  inviteModalRef,
  // computed
  iconSize,
  // function
  edit,
  cancelEdit,
  toggleFullEdit,
  toggleFavorite,
  handleNavigation
} = useBooks({ props })

const { isSidebarCollapsed } = useSidebar()
const { isClient } = useProfile()
const { isMobile } = useGeneral()
</script>
