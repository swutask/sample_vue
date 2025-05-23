<template>
  <div ref="wrapperRef" class="relative">
    <img
      v-show="imageLoaded"
      :src="giphy.images.preview_gif.url"
      class="mb-8 w-full cursor-pointer rounded-8"
      @click="selectGif"
      @load="imageOnLoad"
    >
    <LoadingModule
      v-if="!imageLoaded"
      :loading="true"
      :style="`height: ${height}px`"
      class="static z-50 w-full h-[100px] rounded-8"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  giphy: any
}>()
const emit = defineEmits(['selectGif'])

const imageLoaded = ref(false)
const wrapperRef = ref(null)
const height = ref(0)

function selectGif () {
  emit('selectGif', props.giphy)
}

onMounted(() => {
  nextTick(() => {
    const rect = wrapperRef.value.getBoundingClientRect()
    const widthCoef = rect.width / parseInt(props.giphy.images.preview_gif.width)
    height.value = parseInt(props.giphy.images.preview_gif.height) * widthCoef
  })
})

function imageOnLoad () {
  imageLoaded.value = true
}
</script>
