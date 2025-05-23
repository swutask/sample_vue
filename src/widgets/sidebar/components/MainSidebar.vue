<template>
  <div
    class="flex h-screen group-scope select-none"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <div class="flex flex-col w-full h-full pl-16 bg-secondary">
      <LogoDropdown isSidebar class="mt-13 mb-7 pr-10" />

      <TopSidebarTools class="my-10 pr-10" />

      <SidebarNavigation />

      <BooksSidebar class="w-full group/sidebar" @openSpaceModal="openSpaceModal" />

      <UpgradeFreePlan
        v-if="isFreePlan && !isMobile && !isClient"
        class="mt-10"
      />

      <UpgradePlanBar v-if="isTrialPlan && !isMobile && !isClient" />

      <BottomTools />
    </div>
  </div>
</template>

<script setup lang="ts">
const { onMouseEnter, onMouseLeave } = useSidebar()
const { activeBookId } = useBook()
const { isFreePlan, isTrialPlan } = usePlan()
const { isClient } = useProfile()
const { isMobile } = useGeneral()

const route = useRoute()

const showSpaceModal = ref(false)

watch(() => route.params, (value) => {
  if (!value.id) {
    activeBookId.value = null
  }
})

function openSpaceModal () {
  showSpaceModal.value = true
}
</script>
