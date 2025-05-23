<template>
  <div
    class="w-[220px] bg-primary cursor-pointer card text-center text-13 select-none
         border border-grey-250 dark:border-black anim-color rounded-full p-8 shadow-main-button"
    :class="{'fixed left-10 bottom-20 z-[105]': isSidebarCollapsed}"
    @click="togglePlansInfoModal(true)"
  >
    <i class="icon-upgrade text-15 mr-9" />
    <span class="font-medium">Upgrade to Pro</span>
  </div>
</template>

<script setup lang="ts">
const { isSidebarCollapsed } = useSidebar()
const { togglePlansInfoModal } = usePlan()
</script>
