<template>
  <ClientBooks v-if="isClient" />
  <TeamBooks v-else :class="isSidebarCollapsed || !isLargeScreen ? 'lg:pt-0 pt-[60px]' : 'pt-[20px]'" />
</template>

<script setup lang="ts">
const { isClient } = useProfile()
const { isLargeScreen } = useGeneral()
const { isSidebarCollapsed } = useSidebar()
</script>
