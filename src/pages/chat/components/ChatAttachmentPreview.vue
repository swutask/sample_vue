<template>
  <div>
    <img
      v-if="mimetype === 'image'"
      class="object-cover rounded-8 cursor-pointer border border-grey-700 hover:border-grey-1050 transition ease-in-out duration-100"
      :class="[thumbnailWidth, thumbnailHeight]"
      :src="`${image.url}?t=${new Date().getTime()}`"
      alt="image"
      @click="open"
    >

    <div v-else-if="mimetype === 'video'" @click="open">
      <video
        ref="videoRef"
        :src="`${image.url}?t=${new Date().getTime()}`"
        class="object-cover rounded-8 cursor-pointer border border-grey-700"
        :class="[thumbnailWidth, thumbnailHeight]"
        controls
        muted
        @mouseover="playVideo"
      />
    </div>

    <div v-else class="flex w-50 h-50 cursor-pointer rounded-8 border border-grey-700" @click="downloadImage">
      <i class="m-auto text-45 text-brand" :class="`icon-attachment-${mimetype}`" />
    </div>

    <PreviewAttachment
      v-if="isImageModalOpen"
      v-closeOnPressEsc="closeModal"
      disableComments
      :showCopyLink="false"
      hideDeleteButton
      :file="image"
      @close="closeModal"
    />
  </div>
</template>

<script setup lang="ts">
import { attachmentService } from '@/pages/file-manager/attachment.service'

const props = withDefaults(defineProps<{
  image: IAttachment
  thumbnailWidth?: string
  thumbnailHeight?: string
}>(), {
  thumbnailWidth: 'w-[100px]',
  thumbnailHeight: 'h-[100px]'
})

const videoRef = ref<HTMLVideoElement>()

const mimetype = computed(() => {
  if (props.image.mimeType?.split('/')[0] === 'image') return 'image'
  if (props.image.mimeType?.split('/')[0] === 'video') return 'video'
  if (props.image.mimeType?.split('/')[1] === 'pdf') return 'pdf'
  if (props.image.mimeType === 'application/msword' || props.image.mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') return 'google-docs'
  if (props.image.mimeType === 'application/vnd.ms-excel' || props.image.mimeType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') return 'xls'
  return 'file'
})

const isImageModalOpen = ref(false)

function open () {
  isImageModalOpen.value = true
}

function closeModal () {
  isImageModalOpen.value = false
}

function downloadImage () {
  // TODO: move this to helpers
  attachmentService.proxy(props.image.url)
    .then(res => {
      const blob = res.data
      const blobUrl = window.URL.createObjectURL(blob)

      const a = document.createElement('a')
      a.setAttribute('href', blobUrl)
      a.setAttribute('download', `${props.image.name}.${props.image.key.split('.')[1]}`)
      document.body.appendChild(a)
      a.click()
      a.remove()
    })
}

function playVideo () {
  videoRef.value.play()
}
</script>
