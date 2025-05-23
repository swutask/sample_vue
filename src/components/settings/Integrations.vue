<template>
  <div class="h-full w-full md:px-[60px]  pt-31 text-app-color">
    <div class="flex items-center md:hidden text-app-color" @click="$emit('back')">
      <i class="text-12 mr-10 icon-keyboard-arrow-left opacity-50" />
      <p class="text-opacity-80">Back</p>
    </div>

    <h2 class="text-app-color mb-15 font-bold text-30 md:text-21" :class="[isMobile && 'ml-7 mt-4']">Integrations</h2>

    <IntegrationItem v-for="i in integrations" :key="i.title" :item="i" @hideCancelAction="i.showCancelAction = $event" />
  </div>
</template>

<script setup lang="ts">
defineEmits(['back'])

const { deleteGoogleSync, showGooglePopup } = useGoogleCalendar()
const { setNotification, isMobile } = useGeneral()

const integrations = ref<IIntegrationItem[]>([
  {
    label: 'Upgrade',
    action: goToCalendar,
    cancelAction: cancelGoogleSync,
    title: 'Sync Google Calendar',
    text: 'View all your Google Calendar events in Complex.so',
    icon: 'googleCalendar',
    showCancelAction: !showGooglePopup.value
  }
])

async function goToCalendar () {
  const { data } = await googleCalendarService.goToCalendar()
  window.location = data.url
}

async function cancelGoogleSync () {
  await deleteGoogleSync()

  setNotification({
    uuid: window.crypto.randomUUID(),
    message: 'Google calendar sync successfully disconnected.',
    color: 'success'
  })
}
</script>
