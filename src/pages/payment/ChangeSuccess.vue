<template>
  <div class="min-h-full flex">
    <div class="max-w-[1440px] w-full p-15 mx-auto">
      <div class="max-w-[500px] mx-auto text-center h-full flex">
        <div class="m-auto">
          <i class="icon-check-circle text-green-500 text-50" />
          <p class="text-22 text-green-500 md:text-30 font-bold">Done</p>

          <p key="step2" class="mb-15 md:mb-40">Your credit card is successfully changed</p>

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

let timer = null

onMounted(async () => {
  timer = setTimeout(() => {
    router.push({ name: 'Today', params: { team: 'team' } })
  }, 10000)
})

function goHome () {
  clearTimeout(timer)
  router.push({ name: 'Today', params: { team: 'team' } })
}
</script>
