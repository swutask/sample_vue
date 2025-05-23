<template>
  <div
    class="w-1/2 h-screen flex items-center"
  >
    <div class="w-full h-full overflow-hidden min-h-full p-36 pl-0 items-center justify-center flex">
      <div v-if="isFirstSteps" class="w-full h-full object-cover rounded-[60px] bg-[#FEF6F0] p-[150px] flex items-center justify-center">
        <Step1SVG />
      </div>
      <!-- <img  class="w-full h-full object-cover rounded-[60px]" src="@/assets/images/signup/sign-up.svg" alt="Your Image"> -->
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  step: number
  user: IAuthUser
  team: IAuthTeam
  onboarding: IAuthOnboarding
}>()

const isFirstSteps = computed(() => props.step === 1 || props.step === 2 || props.step === 3)
</script>
