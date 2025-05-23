<template>
  <div class="pt-7 pb-9 pr-10">
    <ButtonModule
      v-if="!isClient"
      data-onboarding-id="onboardingInvitePeople"
      prefix="icon-add text-10"
      skipGap
      text="Invite"
      class="justify-center items-center text-13 rounded-10 mb-8 border-none hover:bg-grey-150 px-10 py-5 ml-5 h-30"
      @click="openInviteModal"
    />

    <div class="flex item-center justify-between">
      <DropdownModule
        isTeleported
        background="bg-primary dark:bg-grey-110"
        zIndex="z-9999"
        bottom
        :width="230"
        class="anim-all"
      >
        <template #button>
          <div
            class="py-5 pl-7 pr-10 rounded-full bg-grey-425 hover:bg-grey-1111
          flex items-center cursor-pointer relative"
          >
            <UserBadge
              :first-name="user.profile.firstName.length > nameLengthLimit
                ? user.profile.firstName.slice(0, nameLengthLimit)
                : user.profile.firstName"
              :last-name="user.profile.lastName"
              :avatarUrl="user.avatar?.url"
              :color="user.profile.color"
              disabledDropdown
              hideTooltip
              disabled
              :size="25"
              :userId="user.id"
              :showLastName="!showOnlyFirstName"
              fontSize="text-12"
              nameClasses="font-medium text-[13.5px]"
            />

            <i class="icon-more-horizontal text-17 ml-10" />
          </div>
        </template>

        <div class="flex flex-col items-start py-8 px-9 text-[13.5px] gap-y-[5px] default-dropdown">
          <ButtonModule
            prefix="icon-logo-dropdown-settings text-14"
            text="Settings"
            type="grey"
            class="rounded-full !text-app-color py-5 px-10"
            @click="openSettingsModal"
          />

          <ButtonModule
            v-if="!isClient"
            prefix="icon-plus text-14"
            class="rounded-full py-5 px-10 !text-app-color"
            text="Invite people"
            type="grey"
            @click="openInviteModal"
          />

          <ButtonModule
            prefix="icon-people-page text-12 leading-none"
            text="Team"
            type="grey"
            class="rounded-full !text-app-color py-5 px-10"
            @click="goToPeople"
          />

          <ButtonModule
            v-if="!isClient && !hasPayedPlan"
            prefix="text-[#FFB800] icon-star text-19 mr-8"
            text="Upgrade to Pro"
            :iconHasMargin="false"
            type="grey"
            class="rounded-full !text-app-color py-5 px-10"
            @click="togglePlansInfoModal(true)"
          />
        </div>
      </DropdownModule>

      <ButtonModule
        :prefix="`${isDarkMode ? 'icon-moon' : 'icon-sun'} text-app-color`"
        :tooltipText="isDarkMode ? 'Light mode' : 'Dark mode'"
        teleportTooltip
        tooltipTop
        type="grey"
        class="p-5 rounded-6 shrink-0 w-35"
        @click="updateTheme(null)"
      />
    </div>

    <InviteTeammates v-if="showInviteModal" enableMultiselect @close="closeInviteModal" />
  </div>
</template>

<script setup lang="ts">
import { preventBodyScroll } from '@/core/helper-functions'

const { user } = useProfile()
const { changeActiveState, toggleSettingsModal } = useSettings()
const { updateTheme, isDarkMode } = useTheme()
const { team } = useTeam()
const { togglePlansInfoModal, hasPayedPlan } = usePlan()
const { isClient } = useProfile()
const nameLengthLimit = 16

const router = useRouter()

const showInviteModal = ref(false)

const showOnlyFirstName = computed(() => {
  return user.value.profile.firstName.length + user.value.profile.lastName.length > nameLengthLimit
})

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

function openInviteModal () {
  showInviteModal.value = true
  preventBodyScroll(true)
}

function closeInviteModal () {
  showInviteModal.value = false
  preventBodyScroll(false)
}
</script>
