<template>
  <div class="min-h-full flex">
    <div class="max-w-[1440px] w-full p-15 mx-auto">
      <div class="max-w-[500px] mx-auto text-center h-full flex">
        <div class="m-auto">
          <i class="text-50" :class="[state.icon, state.textColor]" />
          <p class="text-22 md:text-30 font-bold" :class="state.textColor">{{ state.title }}</p>

          <p class="mb-15 md:mb-40">{{ state.text }}</p>

          <ButtonModule
            text="back to Home"
            :has-hover="true"
            class="text-brand text-18 p-5"
            prefix="icon-keyboard-arrow-left text-13"
            @click="goHome"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const route = useRoute()

const state = computed(() => {
  if (route.query.status === 'success') {
    return {
      title: 'Successfully synced',
      text: 'Your google calendar is successfully synced.',
      icon: 'icon-check-circle',
      textColor: 'text-green-500'
    }
  } else {
    return {
      title: 'Sync Failed',
      text: 'Your google calendar sync was not successfully processed. Please try again.',
      icon: 'icon-warning',
      textColor: 'text-error'
    }
  }
})

setTimeout(() => {
  goHome()
}, 10000)

function goHome () {
  router.push({ name: 'CalendarTeam', params: { team: 'any' } })
}
</script>
