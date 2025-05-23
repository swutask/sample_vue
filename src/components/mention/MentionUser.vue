<template>
  <div class="text-grey-300 text-15">
    <UserBadge
      :first-name="item.firstName"
      :last-name="item.lastName"
      :avatarUrl="item.avatar?.url"
      :color="item.color"
      :size="24"
      nameClasses="font-normal text-13 text-app-color"
      class="text-app-color items-center"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  item: IMentionItem
}>()
</script>
