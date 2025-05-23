<template>
  <section id="main_section" class="main_section h-full text-app-color bg-sidebar">
    <div
      v-if="showTrialBanner && token"
      class="absolute z-[150] w-full top-0 text-11 h-20 flex text-white justify-center bg-brand-new items-center"
    >
      <p>Your trial is ending in {{ remainingTrialDays }} day(s). Choose a plan now to keep your workspace active.</p>
    </div>
    <template v-if="$route.name === 'Share'">
      <router-view class="w-full" />
    </template>

    <template v-if="$route.name === 'TrialOver'">
      <router-view class="w-full" />
    </template>

    <div v-if="!showHeader" class="w-full h-full">
      <router-view class="w-full" />
    </div>

    <template v-if="showHeader && $route.name !== 'Share' && $route.name !== 'TrialOver'">
      <MainLayout />
    </template>

    <NotificationModule />

    <LimitReached v-if="showLimitModal" />
  </section>
</template>

<script setup lang="ts">
import MainLayout from '@/pages/MainLayout.vue'

import { routesWithoutHeader } from '@/router/index'
import designConfig from '@/core/design-config'

const { getFeatureFlags } = useFeatureFlag()
const { settings } = useSettings()
const { token } = useAuth()
const { showLimitModal, showTrialBanner, remainingTrialDays } = usePlan()
const { setInnerWidth } = useGeneral()
const { isTeamAccount } = useTeam()
const { isClient } = useProfile()
const route = useRoute()

const showHeader = computed(() => {
  if (!route.name) return false

  return !routesWithoutHeader.includes(route.name as string)
})

const designStyles = computed(() => {
  return {
    sidebarWidth: designConfig.mainSettings.teamSidebarWidth,
    fontSize: designConfig.fontSizes[settings.value.fontSize],
    lineHeight: designConfig.lineHeights[settings.value.lineHeight],
    fontFamily: designConfig.fontFamilies[settings.value.fontFamily],
    headerHeight: (isTeamAccount.value || isClient.value)
      ? designConfig.mainSettings.teamHeaderHeight
      : designConfig.mainSettings.personalHeaderHeight,
    mainHeaderHeight: designConfig.mainSettings.mainHeaderHeight
  }
})

onMounted(() => {
  getFeatureFlags()
  setInnerWidth(window.innerWidth)

  window.onresize = () => {
    setInnerWidth(window.innerWidth)
  }
})
</script>

<style lang="scss" scoped>
.main_section {
  --sidebar-width: v-bind('designStyles.sidebarWidth');
  --header-height: v-bind('designStyles.headerHeight');
  --main-header-height: v-bind('designStyles.mainHeaderHeight');
}
</style>
