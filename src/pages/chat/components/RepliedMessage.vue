<template>
  <div class="inline-flex px-12 py-10 rounded-10 max-w-[300px]">
    <div class="w-3 rounded-2 bg-grey-250" />

    <div class="ml-10">
      <CustomEditorContent
        id="editorId"
        autocomplete="off"
        autocorrect="off"
        style="--mt-lines: 2;"
        autocapitalize="on"
        class="editor__content editor__chat multi-truncate-editor"
        :editor="editor"
      />

      <div v-if="message?.attachments?.length" class="mt-5">
        <ChatImageComponent
          v-for="image in sortedAttachments"
          :key="image.key"
          :showDeleteButton="false"
          :image="image"
        />
      </div>
    </div>

    <i
      v-if="hasCloseIcon"
      class="icon-close text-12 text-app-color cursor-pointer ml-10 -mr-5"
      @click.stop="$emit('close')"
    />
  </div>
</template>

<script setup lang="ts">
const editorLoader = () => import(/* chunkName: editor */ '@tiptap/vue-3')
const extensionsLoader = () => import(/* chunkName: tip-tap extension */ '@/tiptap/extensions')

const props = defineProps<{
  message: IMessage
  hasCloseIcon?: boolean
}>()

defineEmits(['close'])

const editor = ref()

const sortedAttachments = computed(() => {
  const attachments = props.message.attachments
  return attachments?.sort((a, b) => {
    if (a.order > b?.order) return 1
    if (a.order < b?.order) return -1
    return 0
  })
})

watch(() => props.message, (value: IMessage) => {
  editor.value?.commands.setContent(value.text)
})

onBeforeUnmount(() => {
  editor.value?.destroy()
})

onMounted(async () => {
  const { Editor } = await editorLoader()

  const { chatExtensions } = await extensionsLoader()

  editor.value = new Editor({
    extensions: chatExtensions(),
    content: props.message.text,
    editable: false
  })
})
</script>
