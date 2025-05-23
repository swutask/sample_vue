<template>
  <div v-clickOutside="close" class="w-full" :class="[maxEditorWidth, {'p-2': isMinimized}]">
    <!-- E D I T O R -->
    <div class="w-full relative md:mt-5" :class="editorClass">
      <!-- text area -->
      <div
        class="relative transition duration-50 hover:md:shadow-chat-active group w-[100%]"
        :class="[
          editorIsActive && !isMinimized && !isMobile
            ? 'md:shadow-chat-active default-border !border-black !shadow-black-05 dark:bg-book bg-primary !pb-5'
            : `py-15 ${inactiveEditorClasses}`,
          isMinimized && editorIsActive ? 'border md:pb-1 px-15 pt-11 !border-black !shadow-black-1' : 'md:pb-5 p-15',
          background,
          isMobile ? 'bg-primary border-t border-grey-500' : 'rounded-12',
          editorIsActive ? 'cursor-text' : 'cursor-pointer'
        ]"
        @click="onFocus"
      >
        <!-- replied message -->
        <RepliedMessage
          v-if="repliedMessage"
          :message="repliedMessage"
          hasCloseIcon
          class="bg-grey-500 opacity-[0.5] mb-12"
          @close="deleteReply"
        />
        <!-- images and files -->
        <div v-if="uploadedAttachments.length && !editedMessage" class="flex items-center flex-wrap">
          <draggable
            v-model="computedAttachments"
            itemKey="id"
            class="flex"
            :animation="250"
            group="attachmentsChat"
            handle=".drag-handler"
            ghost-class="sortable-ghost-attachment"
            @add="onAdd"
          >
            <template #item="{element}">
              <ChatImageComponent
                :image="element"
                class="select-none drag-handler"
                @deleteUploadedFile="deleteUploadedFile"
                @deleteNotUploadedFile="deleteNotUploadedFile"
              />
            </template>
          </draggable>
        </div>

        <div v-if="temporaryAttachments.length && editedMessage" class="flex items-center flex-wrap">
          <draggable
            v-model="computedTemporaryAttachments"
            itemKey="id"
            class="flex"
            :animation="250"
            group="attachmentsChat"
            handle=".drag-handler"
            ghost-class="sortable-ghost-attachment"
            @add="onAdd"
          >
            <template #item="{element}">
              <ChatImageComponent
                :image="element"
                class="select-none drag-handler"
                @deleteUploadedFile="deleteUploadedFile"
                @deleteNotUploadedFile="deleteNotUploadedFile"
              />
            </template>
          </draggable>
        </div>

        <!-- emoji picker -->
        <EmojiPicker
          v-if="showEmojiPicker"
          ref="emojiPickerRef"
          v-clickOutside="closeEmojiPicker"
          class="md:mx-30"
          :class="{ '-top-[280px] left-0': isMobile }"
          @selectEmoji="insertEmoji"
          @click.stop
        />
        <!-- gif picker -->
        <GifPicker
          v-if="showGifPicker"
          ref="gifPickerRef"
          v-clickOutside="closeGifPicker"
          :class="{ '-top-[380px] left-0': isMobile, 'md:mx-[60px]': !isMinimized }"
          @selectGif="insertGif"
          @click.stop
        />

        <!-- editor -->
        <CustomEditorContent
          :id="editorId"
          autocomplete="off"
          autocorrect="off"
          autocapitalize="on"
          class="editor__content editor__chat h-full text-canvas-color
                text-main flex flex-col flex-grow overflow-x-hidden overflow-y-auto md:mb-10 anim-all"
          :class="[
            threadId ? '!min-h-[20px] !max-h-[63px]' : 'max-h-[200px]',
            { 'mr-22': isMobile },
            editorIsActive ? (isMinimized ? 'min-h-[30px]' : 'md:min-h-[55px] min-h-[45px]') : ''
          ]"
          :editor="editor"
        />

        <div v-if="editorIsActive" class="flex justify-between items-center">
          <div class="flex items-center">
            <!-- attach file button -->

            <div class="flex cursor-pointer" @click="openImageUploader">
              <ButtonModule
                prefix="icon-attach-file text-20"
                class="-ml-4 text-dark-500 rounded-10 hover:bg-menu-hover p-5"
                hasHover
                :tooltipOptionalGap="45"
                tooltipText="Attachment"
                teleportTooltip
                tooltipTop
              />

              <input ref="inputImageRef" class="hidden" type="file" multiple @change="uploadImageFromInput">
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
              class="text-dark-500 rounded-10 hover:bg-menu-hover px-5 py-5"
              hasHover
              :tooltipOptionalGap="45"
              tooltipText="Giphy"
              teleportTooltip
              tooltipTop
              @click.stop="openGifPicker"
            >
              <p class="cursor-pointer font-semibold text-16 leading-none mt-2">GIF</p>
            </ButtonModule>
          </div>

          <!-- send button -->
          <div class="flex items-center cursor-pointer">
            <ButtonModule
              text="Send"
              border-width="border-2"
              type="black"
              :disabled="isEmptyPost"
              class="text-14 w-full font-semibold max-w-[75px]
                     justify-center py-6 px-20 sm:mb-9 dark:bg-sidebar dark:text-white"
              @click="sendMessage"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable'

import EmojiMixin from '@/mixins/EmojiMixin.js'
import MentionMixin from '@/mixins/MentionMixin'
import ImageUploadMixin from '@/mixins/ImageUploadMixin.js'
import { getSelectedUsers, removeHTMLTags } from '@/core/helper-functions'
import localStorageService from '@/core/local-storage'

import debounce from 'lodash/debounce'

const editorLoader = () => import(/* chunkName: editor */ '@tiptap/vue-3')
const extensionsLoader = () => import(/* chunkName: tip-tap extension */ '@/tiptap/extensions')

const props = withDefaults(defineProps<{
  chatId: number
  taskId?: number
  attachmentId?: number
  isAnnotation?: boolean
  bookId?: number
  editorClass?: string
  editorId?: string
  isDepthPageChat?: boolean
  isChat?: boolean
  isDisabledFocusEditor?: boolean
  imagePreviewMode?: boolean
  repliedMessage?: IMessage
  maxEditorWidth?: string
  threadId?: number
  inactiveEditorClasses?: string
  background?: string
  isMinimized?: boolean
}>(), {
  editorId: 'editor_chat',
  inactiveEditorClasses: 'bg-book'
})

const emit = defineEmits(['scrollToDown', 'onSend', 'deleteReply', 'addMessage', 'updateMessage'])

const { user } = useProfile()
const { order, setMessageCount } = useAttachment()
const { updateMessage, addMessage, setMessage, updateMessageSendStatus, updateAnnotation, messages } = useChat()
const { isMobile, setNotification, allowHotKey, blockHotKey } = useGeneral()
const { files } = useFile()

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
  allowAllUsers: !props.bookId,
  selectMention
})

const imageUpload = ImageUploadMixin({
  bookId: props.bookId
}, false)

const uploadedAttachments = ref([])

const editedMessage = ref(null)

const inputImageRef = ref(null)
const showEmojiPicker = ref(false)
const showGifPicker = ref(false)
const gifPickerRef = ref(null)
const emojiPickerRef = ref(null)
const isFocusedEditor = ref(false)
const isEditorEmpty = ref(true)
const isResolved = ref(false)

const mentionUser = ref([])
const selectedUsers = ref([])

const editor = ref()

const editorIsActive = computed(() => {
  return isFocusedEditor.value || showGifPicker.value || showEmojiPicker.value || !isEditorEmpty.value
})

const isEmptyPost = computed(() => {
  return editor.value?.isEmpty && uploadedAttachments.value.length === 0
})

const computedAttachments = computed({
  get: () => {
    return uploadedAttachments.value.sort((a, b) => (a.order > b?.order) ? 1 : (a.order < b?.order) ? -1 : 0)
  },
  set: (val) => {
    val.forEach((i, index) => {
      uploadedAttachments.value = uploadedAttachments.value.map((item) => {
        if (item.id === i.id) return { ...item, order: index }
        return item
      })
    })

    order(val.map(item => item.id) as number[])
  }
})

const computedTemporaryAttachments = computed({
  get: () => {
    return temporaryAttachments.value.sort((a, b) => (a.order > b?.order) ? 1 : (a.order < b?.order) ? -1 : 0)
  },
  set: (val) => {
    val.forEach((i, index) => {
      temporaryAttachments.value = temporaryAttachments.value.map((item) => {
        if (item.id === i.id) return { ...item, order: index }
        return item
      })
    })

    order(val.map(item => item.id) as number[])
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', hotKeys)
  editor.value?.destroy()
})

onMounted(async () => {
  const { Editor } = await editorLoader()

  const { chatExtensions } = await extensionsLoader()

  const draft = localStorageService.getItem('chatDraft')
  const draftMessage = draft?.[props.chatId] || ''

  editor.value = new Editor({
    onUpdate: () => {
      isEditorEmpty.value = editor.value.isEmpty
      saveDraft()
    },
    onFocus: () => {
      isFocusedEditor.value = true
      setTimeout(() => {
        blockHotKey(true)
        emit('scrollToDown')
      }, 200)
    },
    onBlur: () => {
      blockHotKey(false)
    },
    extensions: [
      ...chatExtensions({
        emoji: {
          suggestion: emoji
        },
        dropcursor: {
          color: 'rgb(var(--color-link-color))',
          width: 2
        },
        mention: {
          suggestion: mention
        },
        image: {
          uploadFunc: uploadImage
        },
        chat: {
          enterHandler: sendMessage
        },
        youtube: {
          width: 350,
          height: 225
        }
      })
    ],
    content: draftMessage
  })

  document.addEventListener('keydown', hotKeys)
})

function hotKeys (event) {
  if (event.keyCode === 82 && event.altKey && !isFocusedEditor.value && allowHotKey.value &&
    !props.isDisabledFocusEditor && !props.threadId) {
    setTimeout(() => editor.value.chain().focus(), 100)
  }
}

function pushMessage ({ text }) {
  emit('onSend')

  const randomId = Math.random()

  const message: IMessage = {
    id: randomId,
    text,
    chatId: props.chatId,
    createdAt: new Date(),
    messageStatus: {
      status: 'read'
    },
    updatedAt: new Date(),
    attachments: computedAttachments.value,
    attachmentIds: computedAttachments.value.map(file => file.id),
    user: user.value,
    userId: user.value.id,
    replyId: props.repliedMessage?.id || null,
    reply: props.repliedMessage || null
  }

  const messageData: IMessage = {
    chatId: props.chatId,
    bookId: props.bookId,
    text,
    attachments: computedAttachments.value,
    attachmentIds: computedAttachments.value.map(file => file.id),
    id: randomId,
    resolvedAt: isResolved.value ? new Date() : null
  }

  if (props.isDepthPageChat) {
    messageData.taskId = props.taskId
    messageData.threadId = props.threadId
  } else {
    messageData.projectId = 'true'
  }

  if (props.repliedMessage) {
    messageData.replyId = props.repliedMessage.id
  }

  if (!props.threadId) {
    setMessage(message)
  }

  deleteReply()

  /* eslint-disable-next-line */
    // @ts-ignore
  addMessage(messageData).then(res => {
    mentionMember()

    updateMessageSendStatus({
      chatId: props.chatId,
      oldId: randomId,
      newId: res.id
    })
    emit('addMessage', res)

    if (props.attachmentId) {
      setMessageCount(props.attachmentId, { messageCount: messages.value[props.chatId]?.length })
    }
  })
  emit('scrollToDown')
}

function handleUpdateAnnotation ({ text }) {
  updateAnnotation(
    {
      ...editedMessage.value,
      annotation: {
        ...editedMessage.value.annotation,
        text: removeHTMLTags(text)
      }
    },
    {
      text: removeHTMLTags(text),
      x: parseInt(editedMessage.value.annotation.x),
      y: parseInt(editedMessage.value.annotation.y)
    },
    editedMessage.value.annotation.id
  )
}

function handleUpdateRegularMessage ({ text }) {
  updateMessage({
    id: editedMessage.value.id,
    chatId: editedMessage.value.chatId,
    bookId: props.bookId,
    attachmentIds: computedAttachments.value.map(file => file.id),
    attachments: computedAttachments.value,
    text,
    resolvedAt: isResolved.value ? new Date() : null,
    replyId: props.repliedMessage?.id || null,
    reply: props.repliedMessage || null,
    threadId: editedMessage.value.threadId

  }).then(_ => {
    mentionMember()
    deleteReply()
  })

  emit('updateMessage', { id: editedMessage.value.id, text, attachments: computedAttachments.value })
}

function handleUpdateMessage ({ text }) {
  uploadedAttachments.value = temporaryAttachments.value
  if (props.isAnnotation) {
    handleUpdateAnnotation({ text })
  } else {
    handleUpdateRegularMessage({ text })
  }

  editedMessage.value = null
}

function sendMessage () {
  if (Object.values(files.value).some(item => item?.percent >= 0 && item.bookId === props.bookId)) {
    setNotification({
      uuid: window.crypto.randomUUID(),
      message: 'Your file is still uploading, please wait for it to finish'
    })
    return
  }

  const html = editor.value.getHTML()

  const content = html.replace(/<br>/g, '').replace(/<\s*p*>( ?)<\s*\/*p>/g, '')

  if ((content.trim() !== '' && !editor.value.isEmpty) || uploadedAttachments.value.length !== 0) {
    selectedUsers.value = getSelectedUsers(editor.value.getJSON().content)

    if (editedMessage.value) {
      handleUpdateMessage({ text: html })
    } else {
      pushMessage({ text: html })
    }

    temporaryAttachments.value = []
    uploadedAttachments.value = []

    editor.value.chain().focus().selectAll().deleteSelection().run()

    if (isMobile.value) {
      editor.value.chain().blur().run()
    }

    return true
  } else {
    return false
  }
}

function saveDraft () {
  debounce(() => {
    const localData = localStorageService.getItem('chatDraft') || {}
    localData[props.chatId] = editor.value.getHTML()

    localStorageService.setItem('chatDraft', localData)
  }, 1000)()
}

function mentionMember () {
  if (!props.bookId) return
  if (mentionUser.value.length > 0 && selectedUsers.value.length > 0) {
    mentionUser.value.forEach(item => {
      const selectedUser = selectedUsers.value.find(u => u.id === item.id)

      if (selectedUser) {
        const data: {
          bookId: number
          memberId: number
          message: string
          chatId?: number
          taskId?: number
        } = {
          bookId: item.bookId,
          memberId: item.id,
          message: selectedUser.message
        }

        if (props.isChat) {
          data.chatId = item.chatId
        }

        if (props.isDepthPageChat) {
          data.taskId = props.taskId
        }

        bookService.mentionMember(data)
      }
    })

    mentionUser.value = []
    selectedUsers.value = []
  }
}

const temporaryAttachments = ref([])

async function uploadImage (files: File[]) {
  if (files.length === 0) return

  const images = await imageUpload.upload(files)
  !editedMessage.value ? uploadedAttachments.value.push(...images) : temporaryAttachments.value.push(...images)
}

async function uploadImageFromInput (event: Event) {
  const allFiles = (event.target as HTMLInputElement).files

  const attachments = Array.from(allFiles)

  await uploadImage(attachments)
}

function deleteUploadedFile (file) {
  if (editedMessage.value) {
    temporaryAttachments.value = temporaryAttachments.value.filter(item => item.id !== file.id)
  } else {
    uploadedAttachments.value = uploadedAttachments.value.filter(item => item.id !== file.id)
  }
  chatService.deleteAttachments([file.id])
}

function deleteNotUploadedFile (file) {
  if (editedMessage.value) {
    temporaryAttachments.value = temporaryAttachments.value.filter(item => item.id !== file.id)
  } else {
    uploadedAttachments.value = uploadedAttachments.value.filter(item => item.id !== file.id)
  }
}

function openImageUploader () {
  inputImageRef.value.click()
  editor.value.chain().focus()
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

function insertGif (gif) {
  editor.value.chain().focus().setGif({ url: gif }).run()
  closeGifPicker()
}

function openEmojiPicker () {
  isFocusedEditor.value = true
  showEmojiPicker.value = !showEmojiPicker.value
  showGifPicker.value = false

  setTimeout(() => {
    if (emojiPickerRef.value) emojiPickerRef.value.toggleInput()
  }, 100)
}

function openGifPicker () {
  isFocusedEditor.value = true
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

function close () {
  isFocusedEditor.value = false
}

function selectMention (item) {
  mentionUser.value.push(item)
}

function editMessage (value) { // used by ref
  uploadedAttachments.value = value.attachments

  temporaryAttachments.value = [...uploadedAttachments.value]
  editedMessage.value = value
  editor.value.commands.setContent(value.annotation ? value.annotation.text : value.text)
  editor.value.chain().focus()
}

function onFocus () {
  isFocusedEditor.value = true
  setTimeout(() => editor.value?.chain()?.focus(), 200)
}

function deleteReply () {
  emit('deleteReply')
}

function onAdd (e) {
  e.item.classList.add('display-none')
}

defineExpose({
  editMessage,
  onFocus,
  isFocusedEditor
})
</script>
