<template>
  <div class="w-[220px]">
    <div class="bg-sidebar h-6 rounded-10">
      <div class="bg-green-10 h-full rounded-10" :style="{width: `${currentStep / totalSteps * 100}%`}" />
    </div>
    <div v-if="totalSteps - currentStep === 0" class="flex justify-center">
      <strong>Completed</strong>
    </div>
    <div v-else class="flex justify-center text-13 mt-5">
      <div>
        <strong>{{ totalSteps - currentStep }} steps </strong>
        <span>left to receive your credit</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  currentStep: number
  totalSteps: number
}>()
</script>
