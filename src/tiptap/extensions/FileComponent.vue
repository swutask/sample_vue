<template>
  <NodeViewWrapper
    as="div"
    type="file"
    data-drag-handle
    draggable="true"
    class="drag-handler relative transition-all pl-0 group-scope hover:pl-30"
  >
    <i
      v-if="editor.isEditable && !isMobile"
      data-drag-handle
      draggable="true"
      class="icon-drag transition-all drag-icon md:opacity-0 group-scope-hover:opacity-100 top-1/2 -translate-y-1/2"
    />
    <span
      class="bg-sidebar text-14 px-8 py-5 my-5 border-2 mr-7 border-dark-500 hover:border-black
       rounded-8 text-app-color inline-flex items-center max-w-full"
      :class="status > 0 ? 'opacity-50' : 'hover:cursor-pointer hover:opacity-80'"
      @click.stop="openPreview"
    >
      <img
        v-if="fileTypeIcon.src"
        :src="fileTypeIcon.src"
        class="mx-auto mr-5" alt="file type icon"
        :class=" fileTypeIcon.isDefault ? 'w-24' : 'w-30'"
      >

      <span class="!text-14 truncate">{{ node.attrs.name }}</span>
      <span class="ml-10 text-grey-250 !text-14">{{ size }}</span>
      <ButtonModule
        v-if="editor.isEditable"
        prefix="icon-close !text-12"
        hasHover
        class="text-grey-275 hover:text-app-color cursor-pointer ml-5 p-5"
        button-opacity="80"
        @click.stop="cancelUpload"
      />
    </span>
    <span
      v-if="status > 0"
      class="block relative w-full max-w-[250px] h-20  rounded-8 overflow-hidden mb-10 border-2 border-main-color"
    >
      <span
        class="block h-20 transition-all duration-50 bg-main-color"
        :style="`width: ${ status }%`"
      >
        <span class="absolute top-0 -translate-x-1/2 left-1/2 leading-normal" style="font-size: 12px">{{ status }}%</span>
      </span>
    </span>

    <PreviewAttachment
      v-if="isPreviewMode"
      :disableComments="isSharePage"
      :hideDeleteButton="isSharePage && share?.mode === 'read'"
      :file="localAtt"
      @close="isPreviewMode = false"
    />
  </NodeViewWrapper>
</template>

<script setup lang="ts">
import { NodeViewWrapper } from '@tiptap/vue-3'
import { filename } from 'pathe/utils'

const props = defineProps<{
  node: any
  editor: any
  updateAttributes: (args, pos) => void
  getPos: () => void
}>()

const { files, deleteFile: handleDeleteFile } = useFile()
const { getAttachmentsById, getAttachmentsBySharedId, localAttachment } = useAttachment()
const { isMobile, setNotification } = useGeneral()
const localAtt = computed(() => localAttachment.value.find(e => e.id === props.node.attrs.id))
const { currentProject, share } = useProject()
const route = useRoute()

const status = ref(props.node.attrs.percent)
const isPreviewMode = ref(false)
const isSharePage = computed(() => route.name === 'Share')
const file = computed(() => files.value[props.node.attrs.id])
const isTaskBoardPage = computed(() => route.name === 'TaskBoard' || route.name === 'TaskBoardTeam')

let allowUpdate = true

watch(files, value => {
  setTimeout(() => {
    const percent = value[props.node.attrs.id]?.percent || -1
    if ((isSharePage.value || +route.query.page === currentProject.value?.id || isTaskBoardPage.value) && allowUpdate) {
      props.updateAttributes({ percent }, props.getPos())
    }
    status.value = percent
  }, 50)
}, {
  deep: true,
  immediate: true
})

const size = computed(() => {
  const mb = (props.node.attrs.size / 1024 / 1024).toFixed(2) + 'MB'

  return mb
})

const fileTypeIcon = computed(() => {
  const src = props.node.attrs.src
  const type = src.split('.').pop().toLowerCase()
  const glob = import.meta.glob('@/assets/images/file-extension/*.svg', { eager: true })

  const images = Object.fromEntries(
    Object.entries(glob).map(([key, value]) => [filename(key), (value as { default: string }).default])
  )

  return {
    src: images[type] || images.default,
    isDefault: !images[type]
  }
})

function cancelUpload () {
  if (status.value !== -1 && typeof file.value?.abort === 'function') {
    allowUpdate = false
    file.value.abort()
  }

  deleteFile()
}

function deleteFile () {
  setTimeout(() => handleDeleteFile(props.node.attrs.id), 100)
  props.editor.commands.deleteImage(props.getPos())
}

async function openPreview () {
  let file = null

  if (isSharePage.value) {
    file = await getAttachmentsBySharedId({
      id: props.node.attrs.id,
      shareId: share.value?.id,
      projectId: props.node.attrs.projectId || currentProject.value?.id
    })
  } else {
    file = await getAttachmentsById({
      id: props.node.attrs.id,
      taskId: +route.query.taskId,
      projectId: +route.query.page
    })
  }

  isPreviewMode.value = true
  if (props.node.attrs.percent >= 0) return

  if (!file.url) {
    deleteFile()

    return setNotification({
      uuid: window.crypto.randomUUID(),
      message: 'File was not uploaded'
    })
  }
}
</script>
