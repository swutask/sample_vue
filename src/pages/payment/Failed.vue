<template>
  <div class="min-h-full flex">
    <div class="max-w-[1440px] w-full p-15 mx-auto">
      <div class="max-w-[500px] mx-auto text-center h-full flex">
        <div class="m-auto">
          <i class="icon-warning text-error text-50" />
          <p class="text-22 text-error md:text-30 font-bold">{{ titleAndSubtitle.title }}</p>

          <p key="step2" class="mb-15 md:mb-40">{{ titleAndSubtitle.subtitle }}</p>

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
const route = useRoute()
const router = useRouter()

const titleAndSubtitle = computed(() => {
  if (route.name === 'PaymentChangeFailed') {
    return {
      title: 'Failed',
      subtitle: 'Your credit card was not changed. Please try again'
    }
  }

  return {
    title: 'Payment Failed',
    subtitle: 'Your payment was not successfully processed. Please try again'
  }
})

let timer = null

onMounted(() => {
  timer = setTimeout(() => {
    router.push({ name: 'Today', params: { team: 'team' } })
  }, 10000)
})

function goHome () {
  clearTimeout(timer)
  router.push({ name: 'Today', params: { team: 'team' } })
}
</script>
