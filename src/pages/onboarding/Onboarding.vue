<template>
  <Portal to="rightHeaderProjectContent">
    <OnboardingProgress
      :currentStep="currentProgress"
      :totalSteps="onboardingTasks.length"
    />
  </Portal>

  <div class="flex flex-col max-w-[700px] mt-30 mb-[80px] mx-auto">
    <div class="flex flex-col space-y-5 mb-20">
      <h1 class="text-25">Onboarding checklist</h1>
      <p>Follow these simple steps to get started and <span class="font-medium">receive a $35 discount on any plan</span></p>
    </div>

    <div class="space-y-15">
      <div v-if="currentProgress === onboardingTasks.length" class="border rounded-10 border-grey-500 py-50 px-32">
        <h2>Congratulations 🎉</h2>

        <p class="text-14 mt-5">
          You crushed all tasks! We added a $35 credit to your account, which will be deducted when you upgrade to a paid plan.
        </p>
      </div>

      <OnboardingTask
        v-for="(onboardingTask, idx) in onboardingTasks"
        :key="onboardingTask.title"
        :onboardingTask="onboardingTask"
        :isCompleted="isCompleted[idx]"
      />
    </div>

    <ButtonModule
      text="Exit onboarding"
      border-width="border-2"
      class="fixed bottom-20 right-20 text-13 font-semibold ml-10 h-35
            rounded-10 justify-center py-5 px-20 bg-basic md:hover:opacity-80 border-basic"
      @click="confirmRef.open()"
    />
  </div>

  <ConfirmModal
    ref="confirmRef"
    title="Close onboarding"
    confirm-btn-title="Yes"
    confirm-btn-cancel="No"
    @confirm="closeOnboarding"
  >
    <p class="text-14 mt-20 mb-25">
      Do you really want to close the onboarding page?
    </p>
  </ConfirmModal>
</template>

<script setup lang="ts">
import { Portal } from 'portal-vue'

const { onboardingTasks, closeOnboarding, confirmRef, currentProgress, isCompleted } = useOnboarding()
</script>
