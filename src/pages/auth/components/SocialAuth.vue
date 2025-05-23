<template>
  <!-- eslint-disable max-len -->
  <div class="w-full flex flex-col h-full">
    <div class="flex text-14 order-1 bg-primary">
      <ButtonModule
        borderWidth="border-2"
        class="w-full justify-center border-black text-grey-20 rounded-[10px] py-16 px-10 hover:bg-grey-500 anim-color"
        @click.prevent="googleLogin"
      >
        <svg class="h-20" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
          <path d="M29.7083 12.0623H28.5V12H15V18H23.4773C22.2405 21.4928 18.9173 24 15 24C10.0298 24 6 19.9702 6 15C6 10.0298 10.0298 6 15 6C17.2943 6 19.3815 6.8655 20.9708 8.27925L25.2135 4.0365C22.5345 1.53975 18.951 0 15 0C6.71625 0 0 6.71625 0 15C0 23.2838 6.71625 30 15 30C23.2838 30 30 23.2838 30 15C30 13.9943 29.8965 13.0125 29.7083 12.0623Z" fill="#FFC107" />
          <path d="M1.72949 8.01825L6.65774 11.6325C7.99124 8.331 11.2207 6 15 6C17.2942 6 19.3815 6.8655 20.9707 8.27925L25.2135 4.0365C22.5345 1.53975 18.951 0 15 0C9.23849 0 4.24199 3.25275 1.72949 8.01825Z" fill="#FF3D00" />
          <path d="M15 30C18.8745 30 22.395 28.5173 25.0567 26.106L20.4142 22.1775C18.9082 23.3183 17.0362 24 15 24C11.0985 24 7.78574 21.5123 6.53774 18.0405L1.64624 21.8093C4.12874 26.667 9.17024 30 15 30Z" fill="#4CAF50" />
          <path d="M29.7083 12.0623H28.5V12H15V18H23.4773C22.8833 19.6777 21.804 21.1245 20.412 22.1782C20.4127 22.1775 20.4135 22.1775 20.4142 22.1768L25.0568 26.1052C24.7283 26.4037 30 22.5 30 15C30 13.9943 29.8965 13.0125 29.7083 12.0623Z" fill="#1976D2" />
        </svg>
        <p class="ml-5 text-dark-default text-15">{{ text }} with Google</p>
      </ButtonModule>
      <!-- <ButtonModule class="ml-10 border border-grey-20 text-grey-20 rounded-6 p-10 hover:bg-grey-430 anim-color" @click="facebookLogin">
        <svg class="h-20" xmlns="http://www.w3.org/2000/svg" width="15" height="30" viewBox="0 0 15 30" fill="none">
          <path d="M4.90156 29.4094V14.7047H0V9.80312H4.90156V7.17098C4.90156 2.18732 7.32906 0 11.4709 0C13.4548 0 14.5037 0.147047 15 0.214443V4.90156H12.1755C10.417 4.90156 9.80312 5.82918 9.80312 7.70893V9.80312H14.9559L14.2562 14.7047H9.80312V29.4094H4.90156Z" fill="#039BE5" />
        </svg>
        <p class="ml-5">{{ text }} with Facebook</p>
      </ButtonModule> -->
    </div>
    <div class="relative" :class="position === 'top' ? 'mb-25 order-0' : 'mt-25 order-2'">
      <div class="absolute inset-0 flex items-center">
        <div class="w-full border-t border-grey-350" />
      </div>
      <div class="relative flex justify-center text-14">
        <span class="px-10 pt-10 text-grey-20 bg-grey-200">or</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import localStorageService from '@/core/local-storage'

defineProps<{
  text: string
  position?: string
}>()

const route = useRoute()

// function facebookLogin () {
//   window.location.href = `${import.meta.env.VITE_APP_API}/api/auth/oauth/facebook`

//   if (route.query.planId) {
//     localStorageService.setItem('planId', route.query.planId)
//   }
// }

function googleLogin () {
  window.location.href = `${import.meta.env.VITE_APP_API}/api/auth/oauth/google`

  if (route.query.planId) {
    localStorageService.setItem('planId', route.query.planId)
  }
}

</script>
