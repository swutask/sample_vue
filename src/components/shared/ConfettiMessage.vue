<template>
  <Transition name="fade">
    <div
      v-if="confettiMessage" class="fixed left-1/2 top-28 -translate-x-1/2 px-20 py-11 rounded-12 z-[12000]
      bg-primary shadow-dropdown text-13 border border-grey-11"
      v-html="confettiMessage"
    />
  </Transition>
</template>

<script setup lang="ts">
const { confettiMessage } = useGeneral()
const { showConfetti } = useConfetti()

watch(() => confettiMessage.value, (value) => {
  if (value) {
    showConfetti()
  }
})
</script>
