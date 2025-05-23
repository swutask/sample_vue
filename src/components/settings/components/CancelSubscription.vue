<template>
  <div v-if="isCancelSubscriptionBtnVisible">
    <ButtonModule
      type="black"
      text="Cancel subscription"
      class="mt-10 rounded-10 px-35 py-12 dark:bg-primary dark:text-white"
      @click="onClick"
    />
    <ConfirmModal ref="cancelSubscriptionConfirmRef" confirmBtnTitle="Confirm" title="Cancel subscription" @confirm="handleCancelSubscription">
      <p>
        Are you sure you want to cancel your subscription?
        You will have access to your data until your plan expires.
        Inactive accounts will be deleted after 60 days.
      </p>
    </ConfirmModal>
  </div>
</template>

<script setup lang="ts">
const { cancelSubscription } = usePlan()
const { isTrialPlan, isCancelledSubscription } = usePlan()
const cancelSubscriptionConfirmRef = ref(null)

const isCancelSubscriptionBtnVisible = computed(() => {
  if (isCancelledSubscription.value) {
    return false
  } else if (isTrialPlan.value) {
    return false
  } else {
    return true
  }
})

function onClick () {
  nextTick(() => {
    cancelSubscriptionConfirmRef.value?.open()
  })
}

async function handleCancelSubscription () {
  await cancelSubscription()
  nextTick(() => {
    cancelSubscriptionConfirmRef.value?.close()
  })
}
</script>
