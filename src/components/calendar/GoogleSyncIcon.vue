<template>
  <ButtonModule
    tag="div"
    tooltipPosition="top-28 left-1/2 -translate-x-1/2 z-20"
    tooltipText="Google Calendar synced"
    class="cursor-pointer relative"
  >
    <template #wrapper>
      <img
        src="@/assets/images/googleCalendar.svg"
        alt="Google Calendar icon"
        class="w-22 h-22 mr-10 opacity-80 hover:opacity-100 anim-opacity"
        @click="openSettings"
      >
    </template>
  </ButtonModule>
</template>

<script setup lang="ts">
const { toggleSettingsModal, changeActiveState } = useSettings()

function openSettings () {
  toggleSettingsModal(true)
  changeActiveState('Integrations')
}
</script>
