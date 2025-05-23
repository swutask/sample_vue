<template>
  <div class="grid grid-cols-3 items-center px-16 border-grey-850 border-b w-full py-8 bg-primary/[0.8]">
    <LogoDropdown />

    <p class="text-14 font-semibold justify-self-center">{{ mobileHeaderRoutes[route.name] }}</p>

    <div class="flex justify-end">
      <PortalTarget name="rightToolsHeaderMobile" />
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const mobileHeaderRoutes = {
  TeamBooks: 'Spaces',
  Today: 'Overview',
  CalendarTeam: 'Calendar',
  WeekPlanner: 'Week planner',
  Chat: 'Chat',
  TaskBoardTeam: 'Tasks',
  TeamBook: 'Notes',
  TeamMembers: 'People',
  FeatureFlags: 'Feature Flags'
}
</script>
