<template>
  <div class="px-20 pt-8 pb-14 flex items-center justify-between w-full bg-grey-110">
    <NavigationSwitcher
      :routes="footerRoutes"
      isMainNavigation
      hideActiveItem
      class="w-full"
      customHeight="h-45"
      marginRight=""
      activeTextColor="text-brand-new"
      additionalGap="justify-between"
    />
  </div>
</template>

<script setup lang="ts">
const { hasMembers } = useTeam()

const footerRoutes = computed<INavigationRoute[]>(() => ([
  { name: 'Today', icon: 'icon-perspectives text-22 mb-2', text: 'Overview', isVisible: true, id: 'onboardingOverviewMenuItemHeader', isPined: true },
  { name: 'TeamBooks', icon: 'icon-books-v2 text-23 mb-2', text: 'Spaces', isVisible: true, id: 'onboardingProjectsMenuItemHeader', isPined: true },
  { name: 'WeekPlanner', icon: 'icon-week-planner-sidebar text-23 mb-2', toolName: 'weekPlanner', id: 'onboardingWeekPlannerItemHeader', text: 'Week planner', isVisible: true, isPined: true },
  { name: 'Chat', icon: 'icon-chat-page text-19 mb-2', toolName: 'Chat', id: 'onboardingChatItemHeader', text: 'Chat', isVisible: hasMembers.value, isPined: true }
]))
</script>
