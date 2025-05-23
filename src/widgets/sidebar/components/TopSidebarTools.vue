<template>
  <div>
    <div class="flex justify-between items-center gap-x-[6px]">
      <ButtonModule
        text="New task"
        prefix="icon-plus"
        data-onboarding-id="onboardingCreateTask"
        tooltipText="Alt + C"
        tooltipClasses="text-11 px-10 py-7 rounded-8 z-9999"
        tooltipBottom
        teleportTooltip
        skipGap
        main
        titleClass="text-13 font-medium text-dark-100"
        class="sidebar-tools flex-1"
        @click="openNewTaskModal"
      />

      <Inbox
        v-if="!isClient"
        customBtnClasses="sidebar-tools"
        customIconClasses="text-16 text-dark-100"
        customTooltipClasses="text-11 px-10 py-7 rounded-8 z-9999"
      />

      <ButtonModule
        v-if="!isClient"
        prefix="icon-search text-13 text-dark-100"
        tooltipText="Search"
        tooltipClasses="text-11 px-10 py-7 rounded-8 z-9999"
        tooltipBottom
        teleportTooltip
        skipGap
        main
        class="sidebar-tools"
        :class="btnClasses"
        @click="toggleSearch(true)"
      />
    </div>

    <SearchBar
      v-if="!isClient && !isSidebarCollapsed"
      @openSpaceModal="showSpaceModal = true"
      @openInviteModal="openInviteModal"
    />
    <SpaceModal v-if="showSpaceModal" @close="closeSpaceModal" />
  </div>
</template>

<script setup lang="ts">
import { preventBodyScroll } from '@/core/helper-functions'

const { toggleNewTaskModal } = useTask()
const { isClient } = useProfile()
const { toggleSearch, showSearch } = useGeneral()
const { isSidebarCollapsed } = useSidebar()

const showSpaceModal = ref(false)
const showInviteModal = ref(false)

const btnClasses = computed(() => {
  return showSearch.value ? 'bg-grey-150 text-dark-default' : 'hover:bg-grey-150 text-grey-1050'
})

function openInviteModal () {
  showInviteModal.value = true
  preventBodyScroll(true)
}

function closeSpaceModal () {
  showSpaceModal.value = false
}

function openNewTaskModal () {
  setTimeout(() => toggleNewTaskModal(true), 10)
}
</script>

<style lang="scss">
.sidebar-tools {
  @apply bg-grey-425 items-center justify-center rounded-8 px-10 py-6 px-12 h-37;
  &:hover {
    @apply bg-primary border-black border #{!important};
  }
}
</style>
