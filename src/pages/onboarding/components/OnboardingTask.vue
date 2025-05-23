<template>
  <div class="border rounded-10 border-grey-500 onboarding-active-state p-20">
    <div class="flex justify-between items-center">
      <div>
        <div class="flex space-x-5 items-center" :class="{'mb-4':onboardingTask.description}">
          <p class="font-semibold">
            <span class="mr-5">{{ onboardingTask.id }}.</span>
            <span class="text-17">{{ onboardingTask.title }}</span>
          </p>
          <div class="rounded-full bg-grey-cfcfcf w-3 h-3" />

          <span class="text-grey-275">{{ onboardingTask.estimatedTime }}</span>
        </div>
        <p class="text-grey-950">{{ onboardingTask.description }}</p>
      </div>
      <i class="icon-radio_btn_checked text-22" :class="isCompleted ? 'text-green-10' : 'text-grey-700'" />
    </div>

    <video v-if="onboardingTask.media" class="rounded-10 w-2/3 mx-auto mt-10" controls>
      <source :src="onboardingTask.media">
    </video>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isCompleted?: boolean
  onboardingTask: IOnboardingTask
}>()
</script>

<style scoped lang="scss">
.onboarding-active-state {
  &:hover {
    background-color: #fbfbfb;
    border-color: theme('colors.grey.300');
    box-shadow: 0 0 0 0.5px theme('colors.grey.300');
}
}
</style>
