<template>
  <div class="flex w-[65px] h-[65px] overflow-hidden mr-10 mb-10 relative group-scope rounded-8 border border-grey-700">
    <div v-if="src && (!file || file?.percent === -1)">
      <img
        v-if="mimetype === 'image'"
        class="w-[65px] h-[65px] object-cover rounded-8"
        :src="src" alt="image"
      >
      <div v-else-if="mimetype === 'video'">
        <video
          :src="image.url"
          class="w-[65px] h-[65px] object-cover rounded-8"
        />
      </div>
      <div v-else class="flex w-[65px] h-[65px] rounded-8">
        <i class="m-auto text-45 text-brand" :class="`icon-attachment-${mimetype}`" />
      </div>
    </div>
    <div v-else class="bg-grey-11 bg-opacity-30 rounded-8 w-full h-full flex">
      <div :key="progress" class="m-auto flex items-center justify-center relative w-40 h-40">
        <svg
          stroke-width="6"
          class="absolute top-0 left-0"
          style="width: inherit; height: inherit"
          viewBox="0 0 100 100"
          stroke="#ddd"
          fill="#fff"
        >
          <circle cx="50" cy="50" r="45" />
        </svg>

        <svg
          stroke-linecap="round"
          style="width: inherit; height: inherit"
          stroke-width="6"
          :stroke-dashoffset="progress"
          stroke="#3F40F2"
          class="absolute top-0 left-0 -rotate-90"
          viewBox="0 0 100 100"
        >
          <circle cx="50" cy="50" r="45" style="stroke-dasharray: 283; fill: none" />
        </svg>
        <span class="relative z-5 text-12">{{ percent }}%</span>
      </div>
    </div>

    <div
      v-if="showDeleteButton"
      class="flex absolute top-0 left-0 w-full h-full bg-backdrop opacity-0
         group-scope-hover:opacity-100 rounded-8 anim-opacity z-50 p-5"
    >
      <i
        class="icon-close ml-auto mb-auto text-14 md:opacity-50 hover:opacity-100 text-white cursor-pointer"
        @click="deleteFile"
      />
      <p
        class="hidden md:block shadow absolute text-app-color whitespace-nowrap -top-30 left-1/2 -translate-x-1/2
        text-12 font-medium px-10 py-4 rounded-8 bg-primary"
      >
        {{ image.name }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  image: IImg
  showDeleteButton?: boolean
}>(), {
  showDeleteButton: true
})

const emits = defineEmits(['deleteNotUploadedFile', 'deleteUploadedFile'])

const { files, deleteFile: handleDeleteFile } = useFile()

const src = ref(props.image.url)

const progress = ref(283)
const percent = ref(0)

const mimetype = computed(() => {
  if (props.image.mimeType?.split('/')[0] === 'image') return 'image'
  if (props.image.mimeType?.split('/')[0] === 'video') return 'video'
  if (props.image.mimeType?.split('/')[1] === 'pdf') return 'pdf'
  if (props.image.mimeType === 'application/msword' || props.image.mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') return 'google-docs'
  if (props.image.mimeType === 'application/vnd.ms-excel' || props.image.mimeType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') return 'xls'
  return 'file'
})

watch(files, value => {
  if (value[props.image.id]?.percent === -1) {
    src.value = props.image.url
    handleDeleteFile(props.image.id as number)
  } else {
    percent.value = value[props.image.id]?.percent
    progress.value = 283 - (283 * value[props.image.id]?.percent || 0) / 100
  }
}, {
  deep: true
})

const file = computed(() => files.value[props.image.id])

function deleteFile () {
  if (src.value) {
    emits('deleteUploadedFile', props.image)
  } else {
    file.value?.abort()
    setTimeout(() => handleDeleteFile(props.image.id as number), 200)
    emits('deleteNotUploadedFile', props.image)
  }
}
</script>
