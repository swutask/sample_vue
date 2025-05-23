<template>
  <div
    :class="isSidebar ? 'w-full' : 'lg:w-[200px]'"
    @mouseenter="toggleSidebarBtn(true)"
    @mouseleave="toggleSidebarBtn(false)"
  >
    <div class="flex items-center gap-8 group h-35">
      <DropdownModule
        isTeleported
        background="bg-primary dark:bg-grey-110"
        zIndex="z-9999"
        :width="250"
        :topGap="6"
        class="anim-all"
      >
        <template #button="{isOpen}">
          <div class="flex items-center cursor-pointer lg:py-5 lg:px-2 lg:hover:bg-menu-hover rounded-7">
            <TeamLogo class="group-hover:lg:max-w-[145px] lg:max-w-[210px]" />

            <i
              class="icon-arrow-top text-20 ml-2 opacity-0 group-hover:opacity-100 hidden lg:flex"
              :class="isOpen ? '' : 'transform rotate-180'"
            />
          </div>
        </template>

        <div class="flex flex-col items-start border-b border-grey-500 py-8 px-9 text-[13.5px] default-dropdown">
          <ButtonModule
            prefix="icon-logo-dropdown-settings text-14"
            text="Settings"
            type="grey"
            class="rounded-full !text-app-color py-5 px-10 mb-5"
            @click="openSettingsModal"
          />

          <ButtonModule
            v-if="!isClient"
            class="rounded-full py-5 px-10 !text-app-color"
            prefix="icon-plus text-14"
            text="Invite people"
            type="grey"
            @click="openInviteModal"
          />
        </div>

        <div class="flex flex-col items-start border-b border-grey-500 py-8 px-9 text-[13.5px] default-dropdown">
          <ButtonModule
            tag="a"
            href="https://complex.so/downloads"
            prefix="icon-download-1 text-16"
            text="Download apps"
            type="grey"
            class="rounded-full !text-app-color py-5 px-8 mb-5"
          />

          <ButtonModule
            v-if="!isMobile"
            tag="a"
            href="mailto:hey@complex.so?subject=Feedback for Complex"
            prefix="icon-favorite-chat-message text-14"
            text="Share feedback"
            type="grey"
            class="rounded-full !text-app-color py-5 px-10 mb-5"
          />

          <ButtonModule
            tag="a"
            href="mailto:hey@complex.so?subject=Support question"
            prefix="icon-support-1 text-14"
            text="Support"
            type="grey"
            class="rounded-full !text-app-color py-5 px-10 "
          />
        </div>
        <div v-if="!isClient && !hasPayedPlan" class="flex flex-col items-start border-b border-grey-500 py-8 px-6 text-[13.5px] default-dropdown">
          <ButtonModule
            prefix="text-[#FFB800] icon-star text-18"
            text="Upgrade to Pro"
            type="grey"
            class="rounded-full !text-app-color py-5 px-10"
            @click="togglePlansInfoModal(true)"
          />
        </div>
        <div class="flex flex-col items-start py-8 px-9 text-[13.5px] default-dropdown">
          <ButtonModule
            prefix="icon-log-out1 text-14"
            text="Log out"
            type="grey"
            class="rounded-full !text-app-color py-5 px-10"
            @click="logout"
          />
          <UpgradePlanBar v-if="isTrialPlan && !isClient" class="mt-10" />
        </div>
      </DropdownModule>
      <SidebarButton
        v-if="showSidebarBtn && !isClient"
        class="hidden lg:flex opacity-0 group-hover:opacity-100"
        :class="isSidebar ? 'ml-auto' : 'ml-0'"
      />
    </div>

    <InviteTeammates v-if="showInviteModal" enableMultiselect @close="closeInviteModal" />
  </div>
</template>

<script setup lang="ts">
import { preventBodyScroll } from '@/core/helper-functions'
import localStorageService from '@/core/local-storage'
const { togglePlansInfoModal, hasPayedPlan } = usePlan()

defineProps<{
  isSidebar?: boolean
}>()

const { isMobile } = useGeneral()
const { isTrialPlan } = usePlan()
const { isClient } = useProfile()
const { changeActiveState, toggleSettingsModal } = useSettings()

const router = useRouter()

const showSidebarBtn = ref(false)
const showInviteModal = ref(false)

function openInviteModal () {
  showInviteModal.value = true
  preventBodyScroll(true)
}

function closeInviteModal () {
  showInviteModal.value = false
  preventBodyScroll(false)
}

function logout () {
  localStorageService.removeItem('lastOpenedProject')
  localStorageService.removeItem('startOnboarding')

  const html = document.getElementsByTagName('html').item(0)
  html.removeAttribute('class')

  router.push({ name: 'Login' })
}

function openSettingsModal () {
  changeActiveState('Account')
  toggleSettingsModal(true)
}

function toggleSidebarBtn (value: boolean) {
  showSidebarBtn.value = value
}
</script>
