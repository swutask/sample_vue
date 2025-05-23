<template>
  <div class="h-full w-full mx-auto md:mx-0 md:max-w-full md:pl-[100px] pt-31 text-app-color overflow-auto">
    <div class="flex items-center md:hidden" @click="$emit('back')">
      <i class="text-12 mr-10 icon-keyboard-arrow-left opacity-50" />
      <p class="text-opacity-80">Back</p>
    </div>

    <p class="text-35 md:text-21 font-bold">Team notifications</p>

    <NotificationRules />

    <p class="font-bold mt-30 my-5 text-17">Snooze notifications</p>

    <PauseNotifications />
  </div>
</template>

<script setup lang="ts">
defineEmits(['back'])
</script>
