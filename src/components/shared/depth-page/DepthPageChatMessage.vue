<template>
  <div
    class="rounded-10 border"
    :class="[
      {'border-grey-500': showThreadEditor},
      isAnnotation ? 'border-grey-500 border card my-10' : 'border border-primary',
      isHoveredAnnotation ? '!border-dark-500 bg-grey-f7f7f7 card-active-state' : ''
    ]"
  >
    <div
      id="chat"
      ref="messageRef"
      class="flex flex-col md:flex-row items-start group-scope group"
      :class="[
        isHighlighted ? '!bg-text-selection !border-brand' : '',
        messageClasses,
        {'pl-30': isAnnotation}
      ]"
      @mouseenter="setHoveredAnnotation(message?.annotation?.id,false)"
      @mouseleave="setHoveredAnnotation(null,false)"
    >
      <div class="hidden md:flex justify-end mr-10">
        <UserBadge
          :first-name="message.user.profile.firstName"
          :last-name="message.user.profile.lastName"
          :color="message.user.profile.color"
          :avatarUrl="message.user.avatar?.url"
          class="text-app-color items-center shrink-0"
          :showName="false"
          :userId="message.user.id"
          :size="25"
        />
      </div>

      <div class="w-full relative">
        <div class="absolute -top-3 -right-15 flex items-center">
          <ButtonModule
            v-if="!message.threadId && (!threadCount || threadCount === 0)"
            prefix="icon-reply anim-all md:opacity-0 group-scope-hover:opacity-50
            opacity-75 text-18 p-5 rounded-8 hover:bg-menu-hover hover:!opacity-100"
            tooltipText="Reply"
            tooltipTop
            teleportTooltip
            class="cursor-pointer mr-4"
            @click="showReplies"
          />

          <ButtonModule
            :prefix="`icon-radio_btn_checked anim-all
            text-16 p-5 rounded-8 hover:bg-menu-hover
            ${isResolved
            ? 'text-green-10 group-scope-hover:static absolute'
            : 'text-app-color md:opacity-0 group-scope-hover:opacity-50 hover:!opacity-100'}
            ${isAnnotation ? 'top-10 right-[85px]' : 'top-15 right-10'}`
            "
            class="cursor-pointer mr-4"
            :tooltipText="isResolved ? 'Unresolve' : 'Resolve'"
            tooltipTop
            teleportTooltip
            @click="resolve"
          />

          <Reactions
            :message-id="message.id"
            :currentReactions="currentReactions"
            :portal="portal"
            :isThread="!!message?.threadId"
            customClasses="!bg-transparent"
            :book-id="bookId"
            :isChat="!message?.threadId"
            @toggle="toggleReactionModal"
          />

          <MessageMenu
            :message="message"
            :fileId="fileId"
            :bookId="bookId"
            class="mr-4"
            @toggleEdit="toggleEdit"
            @deleteMessage="deleteMessage"
          />
        </div>

        <div class="flex items-center">
          <div class="flex items-center space-x-10 md:space-x-0 mb-4 w-full">
            <UserBadge
              :first-name="message.user.profile.firstName"
              :last-name="message.user.profile.lastName"
              :color="message.user.profile.color"
              :avatarUrl="message.user.avatar?.url"
              class="flex md:hidden text-app-color items-center shrink-0"
              :showName="false"
              :userId="message.user.id"
              :size="30"
            />
            <div class="flex justify-between group-hover:w-auto w-full relative">
              <div class="flex items-center space-x-9 leading-normal md:mt-5">
                <p class="font-semibold text-14">{{ message.user.profile.firstName }} {{ message.user.profile.lastName }}</p>
                <p class="w-3 h-3 bg-grey-300 rounded-full" />
                <p class="text-14 text-grey-300 cursor-default" :title="titleTime">{{ getTime(message.createdAt) }}</p>
              </div>

              <div class="flex items-center self-end">
                <div
                  v-if="isAnnotation"
                  class="text-11 group-hover:hidden flex rounded-8 border
               border-grey-500 justify-center bg-grey-150 items-center px-4 py-3"
                  :class="{'absolute right-0 top-[75%]': isMobile}"
                >
                  <span>Annotation</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <CustomEditorContent
          id="chat-message-editorId"
          class="editor__content ml-44 md:ml-0 text-app-color rounded-8 chat-message break-words"
          :class="{'mb-7': currentReactions.length > 0}"
          autocomplete="off"
          autocorrect="off"
          autocapitalize="on"
          :editor="editor"
        />

        <div v-if="message.attachments?.length" class="flex items-center flex-wrap mt-5 -mr-10 -mb-5">
          <ChatAttachmentPreview
            v-for="image in sortedAttachments"
            :key="image.url"
            class="mr-10 mb-10"
            thumbnailHeight="h-full"
            thumbnailWidth="w-full max-w-[350px]"
            :image="image"
          />
        </div>

        <div class="flex space-x-5 items-center mt-5">
          <ButtonModule
            v-if="!message.threadId && threadCount && threadCount !== 0"
            prefix="icon-reply !mr-5"
            :text="threadCount"
            tooltipText="Reply"
            tooltipTop
            teleportTooltip
            class="cursor-pointer mr-5 anim-all text-14 px-7 py-5 rounded-6 opacity-100 border border-grey-850 h-29"
            @click="showReplies"
          />
          <PortalTarget :name="`reactions-${message.id}`" />
        </div>
      </div>
    </div>

    <Thread
      v-if="showThreadEditor"
      class="-mt-5 ml-30 mr-15 mb-15"
      :message="message"
      :fileId="fileId"
      :bookId="bookId"
      @onSend="threadCount += 1"
    />
  </div>
</template>

<script setup lang="ts">
import { parseDate } from '@/plugins/filters'
import { getTime } from '@/core/helper-functions'
import type { PortalTarget } from 'portal-vue'

const editorLoader = () => import(/* chunkName: editor */ '@tiptap/vue-3')
const extensionsLoader = () => import(/* chunkName: tip-tap extension */ '@/tiptap/extensions')

const props = withDefaults(defineProps<{
  message: IMessage
  bookId?: number
  classes?: string | string[]
  portal?: boolean
  fileId?: number
  attachmentId?: number
  messageClasses?: string
}>(), {
  portal: false,
  messageClasses: 'pl-15 ml-[-15px] pr-15 py-10 rounded-10'
})

const emit = defineEmits(['editMessage', 'onDelete'])

const {
  deleteMessage: handleDeleteMessage,
  messageReactions,
  threadReactions,
  hoveredAnnotation,
  setHoveredAnnotation,
  resolveMessage,
  messages,
  getReactions
} = useChat()
const { setMessageCount } = useAttachment()
const { isMobile } = useGeneral()

const route = useRoute()
const router = useRouter()

const threadCount = ref(+props.message.threadCount)
const isReactionsOpen = ref(false)
const isHighlighted = ref(false)
const messageRef = ref(null)
const showThreadEditor = ref(false)
const isResolved = ref(!!props.message.resolvedAt || !!props.message?.annotation?.resolvedAt)
const isAnnotation = computed(() => !!props.message.annotation)

const isHoveredAnnotation = computed(() => {
  if (props.message?.annotation && hoveredAnnotation.value?.id) {
    return hoveredAnnotation.value?.id === props.message?.annotation?.id
  } else {
    return false
  }
})
const currentReactions = computed(() => {
  if (props.message.threadId) {
    return threadReactions.value.filter(r => r.messageId === props.message.id)
  }

  return messageReactions.value.filter(r => r.messageId === props.message.id)
})

const sortedAttachments = computed(() => {
  const attachments = props.message.attachments
  return attachments?.sort((a, b) => {
    if (a.order > b?.order) return 1
    if (a.order < b?.order) return -1
    return 0
  })
})

const titleTime = computed(() => parseDate(props.message.createdAt, 'DD-MM-YYYY hh:mm'))

const editor = ref()

watch(() => props.message.text, (value) => {
  editor.value.commands.setContent(value)
})

watch(() => props.message.annotation?.text, (value) => {
  if (value) {
    editor.value.commands.setContent(value)
  }
})

onBeforeUnmount(() => {
  editor.value?.destroy()
})

onMounted(async () => {
  await getReactions()

  if (route.query.threadId && +route.query.threadId === +props.message.id) {
    showReplies()
  }
  isHighlighted.value = props.message.id === +route.query.messageId

  setTimeout(() => {
    isHighlighted.value = false
    const query = Object.assign({}, route.query)
    delete query.messageId
    delete query.threadId

    router.replace({ query })
  }, 3000)

  const { Editor } = await editorLoader()

  const { chatExtensions } = await extensionsLoader()

  editor.value = new Editor({
    extensions: chatExtensions(),
    content: props.message.annotation ? props.message.annotation.text : props.message.text,
    editable: false
  })

  nextTick(() => {
    if (isHighlighted.value) {
      messageRef.value.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'center' })
    }
  })
})

function toggleEdit () {
  emit('editMessage', props.message)
}

async function showReplies () {
  showThreadEditor.value = !showThreadEditor.value
}

function deleteMessage () {
  handleDeleteMessage({
    id: props.message.id,
    chatId: props.message.chatId,
    bookId: props.bookId
  })

  if (props.attachmentId) {
    setMessageCount(props.attachmentId, { messageCount: messages.value[props.message.chatId].length })
  }

  emit('onDelete', props.message.id)
}

function toggleReactionModal (value) {
  isReactionsOpen.value = value
}

function resolve () {
  isResolved.value = !isResolved.value

  const resolveValue = isResolved.value ? new Date() : null

  const message = isAnnotation.value
    ? {
      ...props.message,
      annotation: { ...props.message.annotation, resolvedAt: resolveValue }
    }
    : { ...props.message, resolvedAt: resolveValue }

  resolveMessage(message, message.id)
}

defineExpose({
  messageRef
})
</script>
