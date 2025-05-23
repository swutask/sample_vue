<template>
  <div class="flex items-center">
    <ButtonModule
      v-if="!isClient"
      data-onboarding-id="onboardingPeopleMenuItemHeader"
      prefix="icon-people-page text-16 leading-none"
      tooltipText="People"
      tooltipBottom
      teleportTooltip
      skipGap
      class="justify-center items-center rounded-20 px-15 py-8 w-48 h-35"
      :class="$route.name === 'TeamMembers' ? 'bg-grey-150 text-dark-default' : 'hover:bg-grey-150 text-grey-1050'"
      @click="goToPeople"
    />

    <ButtonModule
      v-if="!isClient"
      prefix="icon-search text-16"
      tooltipText="Search"
      tooltipBottom
      teleportTooltip
      skipGap
      class="justify-center items-center rounded-20 px-15 py-8 w-48 h-35"
      :class="btnClasses"
      @click="toggleSearch(true)"
    />

    <Inbox v-if="!isClient" class="mr-10" />

    <div
      class="p-3 border-[2.5px] border-transparent rounded-full flex items-center hover:border-grey-800 relative"
    >
      <UserBadge
        :showName="false"
        :first-name="user.profile.firstName"
        :last-name="user.profile.lastName"
        :avatarUrl="user.avatar?.url"
        :color="user.profile.color"
        disabledDropdown
        hideTooltip
        :size="27"
        :userId="user.id"
        fontSize="text-12"
      />
      <div class="absolute top-0 left-0 z-500 w-full h-full cursor-pointer" @click="openSettingsModal" />
    </div>
  </div>

  <SearchBar
    v-if="!isClient && isSidebarCollapsed"
    @openSpaceModal="showSpaceModal = true"
    @openInviteModal="openInviteModal"
  />

  <InviteTeammates v-if="showInviteModal" @close="closeInviteModal" />
  <SpaceModal v-if="showSpaceModal" @close="closeSpaceModal" />
  <ConfirmModal v-if="isConfirmVisible" />
</template>

<script setup lang="ts">
import { preventBodyScroll } from '@/core/helper-functions'

const { toggleSearch, showSearch } = useGeneral()
const { user } = useProfile()
const { team } = useTeam()
const { isClient } = useProfile()
const { changeActiveState, toggleSettingsModal } = useSettings()
const { isSidebarCollapsed } = useSidebar()

const router = useRouter()

const showSpaceModal = ref(false)
const showInviteModal = ref(false)
const isConfirmVisible = ref(false)

const btnClasses = computed(() => {
  return showSearch.value ? 'bg-grey-150 text-dark-default' : 'hover:bg-grey-150 text-grey-1050'
})

function closeSpaceModal () {
  showSpaceModal.value = false
}

function openInviteModal () {
  showInviteModal.value = true
  preventBodyScroll(true)
}

function closeInviteModal () {
  showInviteModal.value = false
  preventBodyScroll(false)
}

function openSettingsModal () {
  changeActiveState('Account')
  toggleSettingsModal(true)
}

function goToPeople () {
  router.push({
    name: 'TeamMembers',
    params: {
      team: team.value.link
    }
  })
}
</script>
