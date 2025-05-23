<template>
  <ButtonModule
    :prefix="`${isSidebarCollapsed ? 'icon-sidebar-close' : 'icon-sidebar-open'} text-16 text-grey-1050`"
    tooltipClasses="text-11 px-10 py-7 rounded-8 z-9999"
    :tooltipText="`${isSidebarCollapsed ? 'Show sidebar' : 'Hide sidebar'}`"
    tooltipBottom
    teleportTooltip
    skipGap
    class="bg-grey-425 items-center justify-center rounded-8 px-10 py-6 h-35 hover:bg-grey-580"
    @click="toggleSidebar"
  />
</template>

<script setup lang="ts">
const { isSidebarCollapsed, toggleSidebar } = useSidebar()

</script>
