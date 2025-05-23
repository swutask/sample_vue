<template>
  <div
    class="flex flex-col items-center justify-center py-30 px-20 max-h-[500px] w-full mx-auto bg-grey-150 bg-opacity-90 rounded-10"
    :class="maxWidth"
  >
    <img v-if="imgSrc" :src="imgSrc" :alt="imgName" class="h-[200px] object-contain">

    <div
      class="flex flex-col items-center space-y-5 text-center mt-40"
      :class="maxWidth"
    >
      <p class="font-semibold text-dark-default">{{ title }}</p>
      <!-- eslint-disable  vue/no-v-html -->
      <p class="text-grey-975" v-html="subTitle" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  imgName: string
  title: string
  subTitle: string
  maxWidth?: string
}>(), {
  maxWidth: 'max-w-[600px]'
})

const imgSrc = computed(() => {
  if (!props.imgName) return null

  const href = new URL(`/src/assets/images/empty-states/${props.imgName}.svg`, import.meta.url).href

  return href
})
</script>
