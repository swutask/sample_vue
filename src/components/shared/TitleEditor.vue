<template>
  <div class="title-editor relative" :class="editorClass">
    <CustomEditorContent
      :id="editorId"
      autocomplete="off"
      autocorrect="off"
      autocapitalize="on"
      class="editor__content"
      :class="{'cursor-text': !disabled}"
      :editor="editor"
    />
  </div>
</template>

<script setup lang="ts">
import EmojiMixin from '@/mixins/EmojiMixin.js'
import MentionMixin from '@/mixins/MentionMixin'

const editorLoader = () => import(/* chunkName: editor */ '@tiptap/vue-3')
const extensionsLoader = () => import(/* chunkName: tip-tap extension */ '@/tiptap/extensions')

const props = defineProps<{
  modelValue?: string
  chatId?: number
  taskId?: number
  attachmentId?: number
  bookId?: number
  content: string
  disabled?: boolean
  editorClass?: string
  editorId?: string
  hasEnterHandler?: boolean
  allowEmpty?: boolean
  isOneLineTitle?: boolean
  isPageTitle?: boolean
  isGoogleEvent?: boolean
}>()

const emit = defineEmits(['onUpdate', 'onBlur', 'onEnter', 'update:modelValue', 'onFocus'])

const { blockHotKey } = useGeneral()

const emoji = EmojiMixin({
  editorClass: props.editorClass,
  editorId: props.editorId
})

const mention = MentionMixin({
  bookId: props.bookId,
  chatId: props.chatId,
  taskId: props.taskId,
  editorClass: props.editorClass,
  // editorId: props.editorId,
  sendImmediately: false,
  selectMention
})

const mentionUser = ref([])

const editor = ref()

const isFocusedEditor = ref(false)

const docExtension = computed(() => {
  return props.hasEnterHandler
    ? {
      enterHandler: () => {
        const value = editor.value.isEmpty ? null : editor.value.getHTML()
        emit('onEnter', value)
      }
    }
    : null
})

onBeforeUnmount(() => {
  editor.value?.destroy()
})

onMounted(async () => {
  const { Editor } = await editorLoader()

  const { titleExtensions, pageTitleExtensions } = await extensionsLoader()
  const options = {
    emoji: {
      suggestion: emoji
    },
    mention: {
      suggestion: props.disabled ? null : mention
    },
    doc: docExtension.value
  }

  const extensions = props.isOneLineTitle ? pageTitleExtensions(options) : titleExtensions(options)

  editor.value = new Editor({
    onUpdate: () => {
      if (!props.allowEmpty && editor.value.isEmpty) return
      emit('onUpdate', editor.value.isEmpty ? '' : editor.value.getHTML())
    },
    onFocus: () => {
      emit('onFocus', true)
      isFocusedEditor.value = true
      setTimeout(() => {
        blockHotKey(true)
      }, 200)
    },
    onBlur: () => {
      isFocusedEditor.value = false
      blockHotKey(false)
      setTimeout(() => emit('onFocus', false))
      const value = editor.value.isEmpty ? null : editor.value.getHTML()
      emit('onBlur', value)
      if (props.isPageTitle) {
        emit('onEnter')
      }
    },
    extensions,
    content: props.content,
    editable: !props.disabled
  })
})

watch(() => props.content, () => {
  if (!editor.value.isFocused) {
    editor.value.commands.setContent(props.content)
  }
})

watch(() => props.disabled, (value) => {
  editor.value.setOptions({
    editable: !value
  })
})

function selectMention (item: IMentionItem) {
  mentionUser.value.push(item)
}

function blur () {
  editor.value.chain().blur().run()
}

function selectContent () {
  editor.value.commands.selectAll()
}

function focus () {
  setTimeout(() => editor.value?.chain().focus().run(), 100)
}

function clearContent () {
  editor.value.commands.clearContent()
}

function setCursorAtEnd () {
  setTimeout(() => {
    editor.value
      ?.chain()
      .focus()
      .setSelectionContent()
      .setCursorAtEnd()
      .run()
  }, 100)
}

defineExpose({
  blur,
  focus,
  clearContent,
  selectContent,
  setCursorAtEnd,
  isFocusedEditor
})
</script>
