<template>
  <div
    class="fixed z-50 bottom-20 right-20 text-app-color bg-primary hover:bg-grey-50 rounded-10 py-10 px-15
           flex items-center cursor-pointer anim-color shadow-[0px_2px_2px_0px_rgb(35,47,53,0.23)] border border-grey-700"
    @click="openIntegrations"
  >
    <div class="flex items-center mr-5">
      <img src="@/assets/images/googleCalendar.svg" alt="Google Calendar icon" class="w-40 h-40 mr-10">

      <div class="flex">
        <div class="flex flex-col max-w-[270px]">
          <p class="font-semibold text-14">Sync your Google Calendar</p>

          <p class="text-12">
            View all your Google Calendar events in this calendar.

            <button class="text-brand underline opacity-80 hover:opacity-100">
              Sync now
            </button>
          </p>
        </div>

        <button class="self-start" @click.stop="closeBadge">
          <i class="icon-close-smooth text-18 text-grey-300 hover:text-app-color anim-color" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import localStorageService from '@/core/local-storage'
const { changeActiveState, toggleSettingsModal } = useSettings()
const { showGooglePopup } = useGoogleCalendar()

const showBadge = ref(localStorageService.getItem('google-calendar-badge'))

async function openIntegrations () {
  changeActiveState('Integrations')
  toggleSettingsModal(true)
}

function closeBadge () {
  localStorageService.setItem('google-calendar-badge', false)
  showBadge.value = false
}

if (!localStorageService.hasKey('google-calendar-badge') && showGooglePopup.value) {
  localStorageService.setItem('google-calendar-badge', true)
}

if (!localStorageService.hasKey('google-calendar-badge') && !showGooglePopup.value) {
  localStorageService.setItem('google-calendar-badge', false)
}
</script>
