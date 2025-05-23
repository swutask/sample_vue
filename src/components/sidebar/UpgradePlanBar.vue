<template>
  <div
    class="flex justify-center w-[220px] z-[105] bg-primary cursor-pointer card text-center text-13 select-none
          border border-grey-250 dark:border-black anim-color rounded-full p-8 shadow-main-button"
    :class="{'fixed left-10 bottom-20': isSidebarCollapsed}"
    @click="togglePlansInfoModal(true)"
  >
    <p class="flex items-center font-medium">
      <i class="icon-upgrade text-15 mr-5" />
      <span class="text-13 mr-3">{{ daysLeft.title }}</span>
      <span>left in your trial</span>
    </p>
  </div>
</template>

<script setup lang="ts">
const { isSidebarCollapsed } = useSidebar()
const { subscription, togglePlansInfoModal } = usePlan()
const { daysLeft } = useSubscriptionCountdown(subscription.value.expireAt)
</script>
