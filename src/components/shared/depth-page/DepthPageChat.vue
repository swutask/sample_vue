<template>
  <div class="text-app-color" :class="{ 'flex flex-col': fixedEditor }">
    <div :class="{ 'overflow-auto h-full': fixedEditor }">
      <!-- C A R D -->
      <div v-if="isLargeScreen" class="flex items-center">
        <i class="icon-comment mr-10 mb-2 text-14 text-dark-100" :class="{ 'ml-20': imagePreviewMode }" />

        <p :class="[titleClasses]">
          Comments
        </p>
      </div>

      <template v-if="messages?.length > 0">
        <DepthPageChatMessage
          v-for="message in messages"
          :key="message.id"
          :ref="el => messageRefs[message.id] = el"
          class="md:last:pb-0"
          :class="[messageClasses, editorRef?.isFocusedEditor ? 'last:pb-[110px]' : 'last:pb-25']"
          :message="message"
          messageClasses="pl-5 pr-10 py-10 rounded-10"
          :fileId="fileId"
          :attachmentId="attachmentId"
          :book-id="bookId"
          portal
          @editMessage="editMessage"
          @onDelete="$emit('onDeleteMessage')"
        />
      </template>
      <div
        v-if="newAnnotation"
        :class="messageClasses"
        class="my-10 flex flex-col items-start group card-active-state border
    group-scope bg-primary p-15 rounded-10 bg-grey-f7f7f"
      >
        <div class="flex justify-between w-full mb-10">
          <div class="flex items-center">
            <UserBadge
              :first-name="user.profile.firstName"
              :last-name="user.profile.lastName"
              :avatarUrl="user.avatar?.url"
              :color="user.profile.color"
              :userId="user.id"
              class="items-center mr-10"
              :showName="false"
              :size="30"
            />

            <p class="font-semibold text-14">{{ user.profile.firstName }} {{ user.profile.lastName }}</p>
          </div>
          <div
            class="text-11 self-end flex rounded-8 border
               border-grey-500 justify-center items-center px-4 py-3"
          >
            <span>Annotation</span>
          </div>
        </div>

        <input
          ref="inputAnnotationRef"
          v-model="newAnnotation.text"
          placeholder="Type here..."
          class="w-full rounded bg-primary text-14 outline-none leading-none"
          type="text"
          @keypress.enter="saveAnnotation"
        >
      </div>
    </div>

    <div
      :class="[showEmptyState ? 'mt-auto justify-end' : 'mt-8', taskId ? null : 'mr-20']"
      class="md:ml-0 flex items-start"
    >
      <div class="hidden md:flex flex-shrink-0 text-grey-300 text-15 mr-11 mt-5">
        <UserBadge
          :first-name="user.profile.firstName"
          :last-name="user.profile.lastName"
          :avatarUrl="user.avatar?.url"
          :color="user.profile.color"
          :userId="user.id"
          class="items-center"
          :showName="false"
          :size="25"
        />
      </div>
      <ChatEditor
        v-if="!isMobile"
        id="depthPageChatEditor"
        ref="editorRef"
        editorClass="depthPageChatEditor"
        :chatId="chatId"
        :bookId="bookId"
        :taskId="taskId"
        :isAnnotation="isAnnotation"
        :maxEditorWidth="maxEditorWidth"
        :imagePreviewMode="imagePreviewMode"
        :attachmentId="attachmentId"
        isActiveOnFocus
        isDepthPageChat
        @onSend="sendMessage"
      />
      <teleport v-else to="#main_section">
        <ChatEditor
          v-if="showCommentsForMobile"
          id="depthPageChatEditor"
          ref="editorRef"
          editorClass="depthPageChatEditor"
          :chatId="chatId"
          :bookId="bookId"
          :taskId="taskId"
          :isAnnotation="isAnnotation"
          :maxEditorWidth="maxEditorWidth"
          :imagePreviewMode="imagePreviewMode"
          :attachmentId="attachmentId"
          isActiveOnFocus
          isDepthPageChat
          class="fixed bottom-0 md:static z-[10000] w-full"
          @onSend="sendMessage"
        />
      </teleport>
    </div>
  </div>
</template>

<script setup lang="ts">
// const editorLoader = () => import(/* chunkName: editor */ '@tiptap/vue-3')
// const extensionsLoader = () => import(/* chunkName: tip-tap extension */ '@/tiptap/extensions')

const props = withDefaults(defineProps<{
  chatId?: number
  bookId?: number
  taskId?: number
  attachmentId?: number
  fileId?: number
  fixedEditor?: boolean
  imagePreviewMode?: boolean
  scrollBottom?: boolean
  titleClasses?: string
  showEmptyState?: boolean
  messageClasses?: string
  showCommentsForMobile?: boolean
  maxEditorWidth?: string
}>(), {
  fixedEditor: false,
  showCommentsForMobile: true,
  imagePreviewMode: false,
  scrollBottom: false,
  titleClasses: 'text-16 font-medium mb-20'
})

const emit = defineEmits(['onAddMessage', 'onDeleteMessage'])

const { user } = useProfile()
const { messages: allMessages, getMessages, messageReactions, newAnnotation, createAnnotation, hoveredAnnotation } = useChat()
const { isLargeScreen, isMobile } = useGeneral()

const editorRef = ref(null)
const inputAnnotationRef = ref()
const isAnnotation = ref(false)

const route = useRoute()

const messages = computed(() => allMessages.value[props.chatId])

const messageRefs = ref({})

onBeforeUnmount(() => {
  messageReactions.value = []
})

onBeforeUpdate(() => {
  messageRefs.value = {}
})

watch(() => hoveredAnnotation.value, (value) => {
  if (value.id && value.pointHover) {
    nextTick(() => {
      const message = messages.value?.find((e) => e?.annotation?.id === value.id)

      const msgRef = messageRefs.value[message.id]?.messageRef

      msgRef?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' })
    })
  }
})

watch(() => newAnnotation.value, (value) => {
  if (value) {
    nextTick(() => inputAnnotationRef.value.focus())
  }
})

onMounted(async () => {
  await getMessages({
    bookId: props.bookId || null,
    chatId: props.chatId
  })

  if (props.scrollBottom) {
    nextTick(() => {
      scrollToBottom()
    })
  }
})

function editMessage (value) {
  isAnnotation.value = !!value.annotation
  editorRef.value.editMessage(value)
}

function saveAnnotation () {
  createAnnotation({ ...newAnnotation.value }, props.fileId, props.chatId)
    .then(() => {
      newAnnotation.value = null
      scrollToBottom('smooth')
    })
}

function scrollToBottom (behavior: 'smooth' | 'instant' = 'instant') {
  if (messages.value?.length && !route.query.messageId) {
    const lastMessage = messages.value.slice(-1)[0]
    const lastMessageRef = messageRefs.value[lastMessage.id].messageRef

    setTimeout(() => {
      lastMessageRef?.scrollIntoView({ behavior, block: 'start' })
    }, 300)
  }
}

function sendMessage () {
  scrollToBottom('smooth')
  emit('onAddMessage')
}
</script>
