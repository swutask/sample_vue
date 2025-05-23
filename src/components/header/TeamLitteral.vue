<template>
  <p
    class="flex justify-center items-center text-13 font-medium pt-2 lg:mr-8 rounded-[7px] lg:ml-5
         h-25 w-25 leading-[1.6] text-white bg-brand-new flex-shrink-0"
  >
    {{ name?.charAt(0).toUpperCase() }}
  </p>
</template>

<script setup lang="ts">
defineProps<{
  name: string
}>()
</script>
