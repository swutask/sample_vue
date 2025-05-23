<template>
  <div
    v-if="showAppDownloadBadge && isLargeScreen && osInfo"
    class="bg-[#282828] fixed bottom-20 right-40 rounded-10 flex items-center max-w-[580px] px-21 py-18"
  >
    <i
      class="icon-close text-12 absolute hover:text-grey-275/[0.7] text-grey-275 top-10 right-10 cursor-pointer p-4"
      @click="close"
    />

    <i :class="osInfo.icon" class="text-40 text-white mr-25" />

    <div class="mr-20">
      <p class="text-white text-17 mb-3 font-bold">Complex for {{ osInfo.name }}</p>

      <p class="text-white text-14">
        Download the desktop app for easy access and a smoother, faster experience.
      </p>
    </div>

    <ButtonModule
      tag="a"
      text="Download"
      :href="osInfo.link"
      class="bg-[#32B437] hover:bg-[#32B437]/[0.7] mr-34 rounded-6 px-25 py-13 font-semibold text-white text-16"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import localStorageService from '@/core/local-storage'

const { isLargeScreen } = useGeneral()
const { user } = useProfile()
const { showWelcomeModalValue } = useAuth()
const showAppDownloadBadge = ref(true)

const osOptions = {
  'mac os': {
    name: 'MAC',
    icon: 'icon-apple',
    link: 'https://downloads-apps.s3.eu-west-2.amazonaws.com/Complex.dmg'
  },
  'windows nt': {
    name: 'Windows',
    icon: 'icon-windows',
    link: 'https://downloads-apps.s3.eu-west-2.amazonaws.com/complex.exe'
  }
}

const osInfo = computed(() => Object.entries(osOptions).find(([key]) =>
  window.navigator.userAgent.toLowerCase().includes(key)
)?.[1] || null)

onMounted(() => {
  const userId = user.value.id
  const lsKeyForLoginSessionCount = 'login-sessions'
  const loginData = localStorageService.getItem(lsKeyForLoginSessionCount) || {}

  // if user is in current session
  if (!loginData[userId]) {
    loginData[userId] = 1
    localStorageService.setItem(lsKeyForLoginSessionCount, loginData)
  }

  const showInstructions = localStorageService.getItem('showInstructions')
  const localData = localStorageService.getItem('app-download-show') || {}
  const loginSessionCount = localStorageService.getItem(lsKeyForLoginSessionCount)?.[userId] || 1

  const firstTimeAlreadyClosed = loginSessionCount === 1 && localData?.[user.value.id]?.closeCount >= 1

  if (showInstructions?.Today || localData[userId]?.closeCount > 1 ||
    firstTimeAlreadyClosed || showWelcomeModalValue.value) {
    showAppDownloadBadge.value = false

    return
  }

  if (!localData[userId]) {
    localData[userId] = {
      tooltipClosed: !(showInstructions?.Today),
      visitCount: 0,
      closeCount: 0
    }
  }

  if ((localData[userId].tooltipClosed && localData[userId].visitCount === 1) || (loginSessionCount <= 2 && !firstTimeAlreadyClosed)) {
    showAppDownloadBadge.value = true
  }

  localData[userId].visitCount++

  localStorageService.setItem('app-download-show', localData)
})

function close () {
  showAppDownloadBadge.value = false

  const localData = localStorageService.getItem('app-download-show') || {}
  const userId = user.value.id

  localData[userId].closeCount++

  localStorageService.setItem('app-download-show', localData)
}
</script>
