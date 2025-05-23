<template>
  <div
    class="fixed top-0 left-0 p-15 w-full h-full bg-backdrop flex z-[105] overflow-auto"
    @click.self="close"
  >
    <div
      class="w-full max-w-[550px] p-15 md:p-24 rounded-10 relative bg-primary
             md:rounded-20 shadow-modal dark:shadow-event-dark m-auto"
    >
      <img
        class="rounded-10 h-[280px] w-full object-cover"
        src="https://complex-production-upload.s3.eu-central-1.amazonaws.com/welcome-image.png"
        alt="image"
      >

      <h1 class="mt-20 mb-10 text-20 lg:text-23 py-3">Welcome to Complex.so</h1>

      <p class="py-3 leading-relaxed text-13 lg:text-15">
        We've upgraded you to a free 14-day trial of our Pro plan.
        <br>
        Explore all the features Complex.so has to offer and decide what works best for you.
        <br>
        <br>
        After your trial ends, you can continue with our Pro plan or choose the Free or Teams plan.
        <br>
        <br>

        Have a productive day.<br>

        <strong>
          The Complex.so team
        </strong>
      </p>

      <div class="flex justify-end">
        <ButtonModule
          text="Start trial"
          type="black"
          class="w-[150px] justify-center text-white rounded-10
         mt-15 md:mt-20 py-14 font-semibold text-16 bg-dark-1000 hover:bg-black"
          @click="close"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['close'])

function close () {
  emit('close')
}
</script>
