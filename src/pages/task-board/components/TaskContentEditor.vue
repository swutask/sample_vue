<template>
  <div
    class="editor w-full relative depth-page-editor text-app-color"
    :class="{'min-h-[102px]': !isNewTask}"
  >
    <!-- text area -->
    <div
      v-if="editor"
      id="editor-wrapper"
      class="relative pb-10 rounded-0 md:rounded-8 transition duration-50 no-scroll-bar"
    >
      <!-- emoji picker -->
      <EmojiPicker
        v-if="showEmojiPicker"
        ref="emojiPickerRef"
        v-clickOutside="closeEmojiPicker"
        class="md:mx-30"
        :class="{ '!fixed !top-0 !left-0': isMobile }"
        @selectEmoji="insertEmoji"
        @click.stop
      />
      <!-- gif picker -->
      <GifPicker
        v-if="showGifPicker"
        ref="gifPickerRef"
        v-clickOutside="closeGifPicker"
        class="md:mx-[60px]"
        :class="{ '!fixed !top-0 !left-0 !w-full': isMobile }"
        @selectGif="insertGif"
        @click.stop
      />

      <MenuFloating
        :editor="editor"
        :bookId="bookId"
        :taskId="taskId"
      />

      <MenuBubble
        :editor="editor"
        :isEvent="true"
      />
      <!-- :is-table-active="!!isTableActive" -->

      <TableControls
        v-if="!!isTableActive"
        :key="activeTable"
        :style="{ top: `${ tableTop }px` }"
        :editor="editor"
        :activeTable="activeTable"
      />

      <!-- editor -->
      <CustomEditorContent
        id="editor"
        autocomplete="off"
        autocorrect="off"
        autocapitalize="on"
        class="editor__task editor__content h-full text-canvas-color pl-1
                text-main flex flex-col flex-grow mb-10 transition-all"
        :class="[
          { 'mr-22': isMobile },
          isEditorActive ?
            isNewTask ? 'md:min-h-[140px] min-h-[90px]' : 'min-h-[120px]' :
            isNewTask ? 'min-h-[46px]' : 'min-h-[60px]'
        ]"
        :editor="editor"
        @focus="isFocusedEditor = true"
      />

      <div
        class="flex items-center"
        :class="[
          isEditorActive ? 'visible' : 'invisible h-0',
          isNewTask ? 'mt-12' : 'mt-40'
        ]"
      >
        <!-- attach file button -->
        <div class="flex cursor-pointer" @click="openImageUploader">
          <ButtonModule
            prefix="icon-attach-file text-20"
            class="text-dark-500 rounded-10 hover:bg-menu-hover p-5 -ml-4"
            hasHover
            :tooltipOptionalGap="45"
            tooltipText="Attachment"
            teleportTooltip
            tooltipTop
          />

          <input ref="inputImageRef" class="hidden" type="file" multiple @change="uploadImage">
        </div>
        <!-- show emoji button -->
        <ButtonModule
          prefix="icon-smile text-20"
          class="text-dark-500 rounded-10 hover:bg-menu-hover p-5"
          hasHover
          :tooltipOptionalGap="45"
          tooltipText="Emoji"
          teleportTooltip
          tooltipTop
          @click.stop="openEmojiPicker"
        />

        <!-- show gif button -->
        <ButtonModule
          class="text-dark-500 rounded-10 hover:bg-menu-hover px-5 py-6"
          hasHover
          :tooltipOptionalGap="45"
          tooltipText="Giphy"
          teleportTooltip
          tooltipTop
          @click.stop="openGifPicker"
        >
          <p class="cursor-pointer font-semibold text-16 leading-none mt-1">GIF</p>
        </ButtonModule>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import EmojiMixin from '@/mixins/EmojiMixin.js'
import MentionMixin from '@/mixins/MentionMixin'
import ImageUploadMixin from '@/mixins/ImageUploadMixin.js'

import { CollaborationExtension } from '@/tiptap/extensions/Collaboration'
import { CollaborationCursor } from '@/tiptap/extensions/CollaborationCursor'
import History from '@tiptap/extension-history'

import * as Y from 'yjs'

const editorLoader = () => import(/* chunkName: editor */ '@tiptap/vue-3')
const extensionsLoader = () => import(/* chunkName: tip-tap extension */ '@/tiptap/extensions')

const props = defineProps<{
  taskId?: number
  bookId: number
  isNewTask?: boolean
  content?: string
}>()

const emit = defineEmits(['onUpdate'])

const route = useRoute()

const { user, isClient } = useProfile()
const { isTableActive, setTableActive } = useProject()
const { highlightedText, isMobile, setHighlightedText, setNotification, blockHotKey } = useGeneral()

const emoji = EmojiMixin({
  editorClass: 'depth-page-editor'
})

const mention = MentionMixin({
  bookId: props.bookId,
  taskId: props.taskId,
  editorClass: 'depth-page-editor'
})

const imageUpload = ImageUploadMixin(props)

const inputImageRef = ref(null)
const gifPickerRef = ref(null)
const emojiPickerRef = ref(null)

const activeTable = ref(null)
const tableTop = ref(0)

const isImageUploaderOpen = ref(false)
const showEmojiPicker = ref(false)
const showGifPicker = ref(false)
const isFocusedEditor = ref(false)

const ydoc = new Y.Doc()
const editor = ref()
const provider = ref()

const isEditorActive = computed(() => isFocusedEditor.value || showGifPicker.value || showEmojiPicker.value || isImageUploaderOpen.value)

watch([
  () => route.query.additionalInfo,
  () => highlightedText.value
], value => {
  if (value) {
    setTimeout(() => scrollToHighlightedText(), 300)
  }
})

watch(() => route.query.taskId, async (value) => {
  if (value && !props.isNewTask) {
    editor.value?.destroy()
    provider.value?.destroy()
    nextTick(() => {
      initEditor(+value)
    })
  }
}, { immediate: true })

watch(isTableActive, (active) => {
  if (active) {
    tableTopPosition()
  }
})

onBeforeUnmount(async () => {
  editor.value?.destroy()
  provider.value?.destroy()
  setTableActive(false)
})

onMounted(async () => {
  if (props.isNewTask) {
    initEditor()
  }
})

async function initEditor (id = props.taskId) {
  editor.value?.destroy()
  provider.value?.destroy()

  try {
    if (!props.isNewTask) {
      const res = await collaborationService.getJWTForTask(id, props.bookId)

      if (!res?.data?.jwt) {
        throw new Error('')
      }

      provider.value = new TiptapCollabProvider({
        name: res.data?.name || `book-${props.bookId}-task-${id}`,
        appId: import.meta.env.VITE_APP_TIPTAP_APP_ID,
        token: res.data.jwt,
        document: ydoc
      })
    }

    const { Editor } = await editorLoader()
    const { taskContentExtensions } = await extensionsLoader()

    const extensions = await taskContentExtensions({
      highlight: {
        multicolor: true
      },
      dropcursor: {
        color: 'rgb(var(--color-link-color))',
        width: 2
      },
      taskItem: {
        nested: true
      },
      emoji: {
        suggestion: emoji
      },
      mention: {
        suggestion: mention
      },
      image: {
        uploadFunc: imageUpload.upload
      }
    })

    if (!props.isNewTask) {
      extensions.push(
        CollaborationExtension.configure({
          document: ydoc
        }),
        CollaborationCursor.configure({
          provider: provider.value,
          user: {
            name: user.value?.profile.firstName || 'Guest',
            userColor: user.value?.profile.color,
            avatar: user.value?.avatar?.url
          }
        })
      )
    } else {
      extensions.push(History)
    }
    editor.value = new Editor({
      onUpdate: () => {
      // save()
        if (props.isNewTask) {
          emit('onUpdate', editor.value.isEmpty ? '' : editor.value.getHTML())
        }
        tableTopPosition()
      },
      onFocus: () => {
        blockHotKey(true)
        isFocusedEditor.value = true
      },
      onBlur: () => {
        blockHotKey(false)
        setTimeout(() => {
          if (!props.isNewTask) {
            isFocusedEditor.value = false
          }
        }, 100)
      },
      content: props.content,
      extensions,
      editable: !isClient.value
    })

    if (!editor.value.storage.collabHistory?.versioningEnabled && !props.isNewTask) {
      ydoc.getMap<number>(
        '__tiptapcollab__config'
      ).set('autoVersioning', 1)
    }

    setTimeout(() => {
      scrollToHighlightedText()
    }, 500)
  } catch (error) {
    setNotification({
      uuid: window.crypto.randomUUID(),
      message: 'Something went wrong. Please, try again'
    })
  }
}

function scrollToHighlightedText () {
  if (route.query.additionalInfo && editor) {
    editor.value.commands.setSearchTerm(highlightedText.value)

    const el = document.getElementsByClassName('search-result')[0]
    if (el) el.scrollIntoView({ block: 'center', behavior: 'smooth' })

    setTimeout(() => {
      editor.value.commands.setSearchTerm('')
      setHighlightedText('')
    }, 4000)
  }
}

// function getAttachments (json) {
//   const nodes = []

//   json.content
//     .filter(item => item.type === 'paragraph' && item.content?.length)
//     .map(item => item.content)
//     .forEach(item => nodes.push(...item))
//   const files = json.content.filter(item => item.type === 'file') || []

//   const imgNodes = nodes.filter(item => item.type === 'image')
//   const gifs = nodes.filter(item => item.type === 'Gif')

//   const images = imgNodes.map(item => +item.attrs.id)

//   emit('updateContent', {
//     attachments: images.length + files.length + gifs.length,
//     hasContent: !editor.value.isEmpty
//   })

//   return [...images, ...files.map(f => f.attrs.id)]
// }

// let timer = null
// function save () {
//   clearTimeout(timer)
//   timer = setTimeout(() => {
//     emit('save', editor.value.getHTML())
//   }, 400)
// }

async function uploadImage (event: Event) {
  const allFiles = (event.target as HTMLInputElement).files

  const attachments = Array.from(allFiles)

  if (attachments.length === 0) return

  const result = await imageUpload.upload(attachments)

  result.forEach(item => {
    const isImage = (/image/i).test(item.mimeType)

    if (isImage) {
      editor.value.chain().focus().setImage(item).run()
    } else {
      editor.value.chain().focus().setFile(item).run()
    }
  })

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  event.target.value = ''
  isImageUploaderOpen.value = false
}

function openImageUploader () {
  isImageUploaderOpen.value = true
  inputImageRef.value.click()
}

function insertEmoji (emoji) {
  if (emoji.category === 'flags') {
    editor.value.chain().focus().setImageChatEmoji({ url: `https://helloivy-icons.s3.eu-central-1.amazonaws.com/flags/${emoji.name}.png` }).run()
  } else {
    const transaction = editor.value.state.tr.insertText(emoji.char)
    editor.value.view.dispatch(transaction)
  }
  editor.value.chain().focus()
  closeEmojiPicker()
}

function insertGif (gif: string) {
  editor.value.chain().focus().setGif({ url: gif }).run()
  closeGifPicker()
}

function openEmojiPicker () {
  showEmojiPicker.value = !showEmojiPicker.value
  showGifPicker.value = false

  setTimeout(() => {
    if (emojiPickerRef.value) emojiPickerRef.value.toggleInput()
  }, 100)
}

function openGifPicker () {
  showGifPicker.value = !showGifPicker.value
  showEmojiPicker.value = false

  setTimeout(() => {
    if (gifPickerRef.value) gifPickerRef.value.toggleInput()
  }, 100)
}

function closeEmojiPicker () {
  showEmojiPicker.value = false
}

function closeGifPicker () {
  showGifPicker.value = false
}

function tableTopPosition () {
  if (isTableActive.value) {
    activeTable.value = document.querySelector('.tableWrapper.activeTable table')
    const wrapper = document.querySelector('.scroll-wrapper')

    if (!activeTable.value) return

    tableTop.value = activeTable.value.getBoundingClientRect().top - activeTable.value.getBoundingClientRect().height - 160 + wrapper?.scrollTop
  }
}

defineExpose({
  isEditorActive,
  isFocusedEditor
})
</script>
