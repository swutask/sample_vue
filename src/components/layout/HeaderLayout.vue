<template>
  <header
    v-if="!isChat || !isSidebarCollapsed"
    id="header"
    class="hidden lg:flex items-center justify-center
    group-block transition-all text-app-color flex-col shrink-0 relative"
  >
    <div
      class="flex w-full h-full anim-opacity px-20 grow"
      :class="[
        isProjectsPage ? 'justify-end' : 'justify-between',
        { 'bg-grey-200': isCalendar },
        isSidebarCollapsed ? 'py-15' : 'pt-13 pb-10 bg-secondary',
      ]"
    >
      <div class="flex items-center justify-between w-full border-grey-500">
        <div
          v-if="sectionData && !sectionData.hide"
          :class="{'px-13 py-9': !isSidebarCollapsed}"
          class="flex items-center rounded-full"
        >
          <i v-if="!sectionData.hideIcon" :class="sectionData.icon" />
          <p
            class="text-14 text-app-color font-medium"
            :class="{ 'font-semibold text-22': (isCalendar || isWeekPlanner) && isSidebarCollapsed }"
          >
            {{ sectionData.name }}
          </p>
        </div>

        <div
          v-if="book && route.params.id"
          class="flex flex-1 group items-center"
        >
          <SelectBook
            :books="computedBooks"
            :selectedBook="book"
            class="group/select-book"
            @toggleBook="handleNavigation"
          >
            <template #default="{isOpen}">
              <ButtonModule
                type="grey"
                suffix="group-hover/select-book:ml-15 text-12 transition duration-150 icon-keyboard-arrow-down
                 text-grey-275 hidden group-hover/select-book:flex"
                class="px-13 py-9 items-center mr-10 hover:bg-grey-f6f6f6 pl-6 justify-center text-grey-1050 rounded-20"
                :class="isOpen ? 'bg-grey-500' : ''"
                :has-hover="false"
              >
                <BookLabel
                  v-if="book"
                  ref="bookLabelRef"
                  :showTitle="!isEdit.title"
                  class="cursor-pointer"
                  :customStyle="{
                    fontSize: 'text-14 !font-medium',
                    defaultIcon: 'w-2/3 h-2/3',
                    iconHover: 'bg-transparent'
                  }"
                  :bookId="book.id"
                  :hasBorder="false"
                  size="w-21 h-21"
                />

                <input
                  v-show="isEdit.title"
                  ref="titleInputRef"
                  v-model="localBook.title"
                  :style="{ 'width': `${bookLabelRef?.labelWidth}px` }"
                  class="text-14 font-medium outline-none bg-transparent text-app-color pl-1 ml-8"
                  maxlength="30"
                  type="text"
                  @input="edit(true)"
                  @blur="cancelEdit(true)"
                  @keypress.enter="cancelEdit(true)"
                >
              </ButtonModule>
            </template>
          </SelectBook>

          <!-- Temporary hidden-->
          <div v-if="false" class="flex items-center relative order-2">
            <div class="flex items-center h-full">
              <div class="flex items-center h-full pr-23 space-x-5">
                <NavigationSwitcher
                  :update-value="isEdit.title"
                  customHeight="h-34"
                  :bookId="book.id"
                  :routes="routes"
                />
              </div>
            </div>
          </div>
        </div>

        <div
          class="flex items-center"
          :class="{'w-full justify-end': isProjectsPage || isTeamMembers || isOnboarding || isTodayPage }"
          data-onboarding-id="onboardingPeopleMenuItem"
        >
          <PortalTarget name="rightHeaderContentCalendar" />

          <PortalTarget name="rightHeaderProjectContent" />

          <div v-if="isBookPage && !isClient" class="flex items-center space-x-7 ml-10">
            <SharedWith
              v-if="book?.clients.length"
              ref="inviteModalRef"
              preventOpenOnClick
              isCard
              withAvatars
              :numberOfUsers="4"
              class="flex justify-end"
              :members="parsedClients"
              :width="196"
              infoDropdownClasses="-right-5 max-h-[290px] rounded-8"
              :book="book"
            />

            <SharedWith
              v-if="totalMembers > 1 || book?.shareWith.length > 1"
              ref="inviteModalRef"
              preventOpenOnClick
              isCard
              withAvatars
              :numberOfUsers="4"
              class="flex justify-end"
              :members="book?.shareWith"
              :width="196"
              infoDropdownClasses="-right-5 max-h-[290px] rounded-8"
              :book="book"
            />

            <ShareBook />

            <ButtonModule
              :prefix="`${book?.favorite ?
                'text-[#FFB800] icon-star text-21 p-1' :
                'icon-star-empty text-grey-1050 text-17 flex items-center justify-center'}`"
              type="icon"
              tooltipText="Favorite"
              teleportTooltip
              :disabled="isClient"
              tooltipBottom
              class="h-29 w-29"
              @click="toggleFavorite"
            />

            <BookDropdownMenu
              tooltipText="More options"
              :book="book"
              showAlways
              @toggleEdit="toggleFullEdit"
            />
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { PortalTarget } from 'portal-vue'
import localStorageService from '@/core/local-storage'
import useBooks from '../books/useBooks'

const props = defineProps<{
  book: IBook
}>()

const route = useRoute()

const { isSidebarCollapsed } = useSidebar()
const { team, totalMembers } = useTeam()
const { book, getBook, books } = useBook()
const { user, isClient } = useProfile()
const { changeBook } = useBookChange()
const {
  // data
  localBook,
  isEdit,
  // refs
  titleInputRef,
  // function
  toggleFullEdit,
  edit,
  cancelEdit,
  toggleFavorite
} = useBooks({ props })

const bookLabelRef = ref(null)

const computedBooks = computed(() => {
  const items = books.value.filter(b => !b.archivedAt && b.id !== +route.params.id)
  const fromStorage = localStorageService.getItem('recentlyOpenedBooks') || {}
  const order = fromStorage[user.value.id] || []

  return items.sort((a, b) => {
    const indexA = order.indexOf(a.id)
    const indexB = order.indexOf(b.id)

    if (indexA === -1) return 1
    if (indexB === -1) return -1

    return indexA - indexB
  })
})

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const parsedClients = computed<ITeamMember[]>(() => {
  return props.book.clients.map(client => {
    client.user.profile.lastName = client.user.profile.lastName + '(observer)'

    return {
      ...client,
      ...client.user,
      ...client.user.profile
    }
  })
})

const routes = computed(() => {
  return [
    { name: 'TaskBoardTeam', text: 'Tasks', isVisible: true },
    // Temporary hidden
    { name: 'TeamBook', text: 'Notes', isVisible: false }
  ]
})

const isChat = computed(() => route.name === 'Chat')
const isTeamMembers = computed(() => route.name === 'TeamMembers')
const isProjectsPage = computed(() => route.name === 'TeamBooks')
const isTodayPage = computed(() => route.name === 'Today')
const isCalendar = computed(() => route.name === 'CalendarTeam')
const isWeekPlanner = computed(() => route.name === 'WeekPlanner')
const isOnboarding = computed(() => route.name === 'Onboarding')
const isBookPage = computed(() => !!route.params?.id)

const sectionData = computed(() => {
  const res = {
    Today: { name: 'Overview', icon: 'icon-perspectives mr-7 text-19', hide: isSidebarCollapsed.value },
    TeamBooks: { name: 'Spaces', icon: 'icon-books-v2 mr-7 text-16', hide: isSidebarCollapsed.value },
    CalendarTeam: { name: 'Calendar', icon: 'icon-calendar mr-7 text-19', hideIcon: isSidebarCollapsed.value },
    WeekPlanner: { name: 'Week planner', icon: 'icon-week-planner-sidebar mr-8 text-18', hideIcon: isSidebarCollapsed.value },
    Chat: { name: 'Chat', icon: 'icon-chat-page mr-7 text-16', hide: isSidebarCollapsed.value },
    TeamMembers: { name: 'People', icon: 'icon-people-page mr-7 text-16', hide: isSidebarCollapsed.value }
  }

  return res[route.name]
})

watch(() => route.params?.id, (value) => {
  if (value) {
    getBook(+value)
  }
}, { immediate: true })

function handleNavigation (event: IBook) {
  if (isClient.value) {
    localStorageService.setItem('clientStorage', {
      teamId: team.value.id,
      bookId: event.id
    })
  }

  changeBook(event, true)
}
</script>
