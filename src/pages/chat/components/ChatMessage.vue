<template>
  <div
    id="chat"
    ref="chatMessageRef"
    class="group-scope"
    :class="[classes]"
  >
    <div
      v-if="isStartOfNewMessage"
      class="w-full flex justify-between items-center my-12 font-medium text-14"
    >
      <div class="h-1 w-full bg-grey-500" />
      <p class="whitespace-nowrap px-15">New Messages</p>
      <div class="h-1 w-full bg-grey-500" />
    </div>

    <div
      v-if="showUser && isOwnMessage"
      class="text-grey-300 flex items-center leading-none text-14 justify-end mt-10"
    >
      <p class="text-app-color font-semibold">{{ userName }}</p>

      <UserBadge
        :showName="false"
        :first-name="user.profile.firstName"
        :last-name="user.profile.lastName"
        :avatarUrl="user.avatar?.url"
        :color="user.profile.color"
        :size="24"
        :userId="user.id"
        fontSize="text-12"
        class="ml-10"
      />
    </div>

    <div
      v-if="showUser && !isOwnMessage"
      :class="isPrivateChat ? 'pt-10' : 'pt-30'"
      class="text-grey-300 flex items-center leading-none text-14"
    >
      <UserBadge
        :showName="false"
        :first-name="message?.user?.profile?.firstName"
        :last-name="message?.user?.profile?.lastName"
        :avatarUrl="message?.user?.avatar?.url"
        :color="message?.user?.profile?.color"
        :size="24"
        :userId="message.user.id"
        fontSize="text-12"
        class="mr-7"
      />

      <p class="text-app-color font-semibold mr-5">{{ userName }}</p>
    </div>

    <div
      class="flex w-full items-center mt-10"
      :class="[isOwnMessage ? 'justify-end ml-auto' : 'flex-row-reverse justify-end', isLastMessage ? 'mb-20' : '']"
    >
      <div
        class="flex items-center"
        :class="[isOwnMessage ? 'mr-10' : 'ml-10', {'gap-x-[1px]': !isMinimized || isLargeScreen}]"
      >
        <div
          v-if="isLargeScreen && !isMinimized"
          class="text-app-color flex items-end anim-opacity md:opacity-0 group-scope-hover:opacity-100"
          :class="isOwnMessage ? 'order-1' : 'order-5'"
        >
          <span class="mx-5 text-13 text-grey-300">{{ getTime }}</span>
        </div>
        <div
          v-if="(bookId || privateChatUserId) && !message.isSample"
          class="anim-opacity md:opacity-0 group-scope-hover:opacity-100 mr-1"
          :class="isOwnMessage ? 'order-1' : 'order-4'"
        >
          <ButtonModule
            prefix="icon-reply"
            class="hover:bg-menu-hover md:flex hidden hover rounded-8 anim-color-200 border-0 text-app-color p-8 text-18"
            hasHover
            tooltipText="Reply"
            teleportTooltip
            tooltipTop
            tooltip-bg-opacity="bg-opacity-80"
            @click.stop="$emit('reply', message)"
          />
        </div>

        <Reactions
          v-if="(!isLargeScreen || isMinimized) ? currentReactions.length === 0 : !message.isSample"
          :message-id="message.id"
          :currentReactions="currentReactions"
          :book-id="bookId"
          :isReversedPosition="isOwnMessage"
          topPosition="-78px"
          :menuPosition="isOwnMessage ? 'right' : 'left'"
          :class="[currentReactions.length > 0 ? 'order-3' : 'order-2']"
          iconReactionsClasses="!mr-1"
          chosenReactionsClasses="pr-1"
          chosenReactionsBorder="border-[1.5px] border-black"
          isChat
        />

        <MessageMenu
          :message="message"
          :bookId="bookId"
          :privateChatUserId="privateChatUserId"
          buttonClasses="h-33"
          :class="[currentReactions.length > 0 ? 'order-2' : 'order-3',
                   currentReactions.length > 0 && isOwnMessage ? '' : 'order-3',
          ]"
          :position="isLastMessage ? '-80px' : '30px'"
          @toggleEdit="toggleEdit"
          @deleteMessage="deleteMessage"
        />
      </div>

      <div class="max-w-[75vw] md:max-w-[75%]">
        <div
          class="chat chat-message text-app-color rounded-12 break-words ml-1"
          :class="[
            {'border border-grey-e3e3e3': hasText},
            hasText ? isHighlighted ? 'bg-text-selection border-brand' : 'bg-grey-110' : '',
            classes,
            isMinimized || !isLargeScreen ? 'pb-5 pt-8 px-11' : 'py-10 px-16'
          ]"
          @click="toggleMobileReply"
        >
          <RepliedMessage
            v-if="message.reply"
            :message="message.reply"
            class="bg-grey-500 hover:bg-grey-350 anim-colors mb-12 cursor-pointer"
            @click="scrollToReply"
          />

          <CustomEditorContent
            id="editorId"
            autocomplete="off"
            autocorrect="off"
            autocapitalize="on"
            class="editor__content"
            :class="isMinimized ? 'editor__chat-minimized' : ' editor__chat'"
            :editor="editor"
          />

          <div
            v-if="message.attachments?.length"
            class="mt-10 -mr-10 -mb-5"
            :class="[
              message.attachments?.length > 1 ? '' : 'flex items-center flex-wrap',
              hasText ? '' : 'mt-[-20px]'
            ]"
          >
            <ChatAttachmentPreview
              v-for="image in sortedAttachments"
              :key="image.url"
              class="mr-10 mb-10"
              thumbnailHeight="h-full"
              thumbnailWidth="w-full max-w-[500px]"
              :image="image"
            />
          </div>

          <div v-if="!isLargeScreen || isMinimized" class="flex justify-between">
            <Reactions
              v-if="!message.isSample && currentReactions.length > 0"
              :message-id="message.id"
              :currentReactions="currentReactions"
              :book-id="bookId"
              :isReversedPosition="isOwnMessage"
              topPosition="-78px"
              :menuPosition="isOwnMessage ? 'right' : 'left'"
              iconReactionsClasses="!mr-1"
              chosenReactionsClasses="!pr-1"
              isMinimized
              isChat
            />

            <div
              class="text-app-color flex items-end justify-end anim-opacity"
              :class="isOwnMessage ? 'order-1' : 'order-5'"
            >
              <span
                class="text-11 text-grey-300 whitespace-nowrap"
                :class="{ 'mt-5': isMinimized }"
              >{{ getTime }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { Editor } from '@tiptap/vue-3'
import { chatExtensions } from '@/tiptap/extensions'

const props = defineProps<{
  message: IMessage
  prevMessage: IMessage
  bookId?: number
  classes?: string | string[]
  isLastMessage?: boolean
  privateChatUserId?: number
  isStartOfNewMessage?: boolean
  isPrivateChat?: boolean
  isMinimized?: boolean
}>()

const emit = defineEmits(['editMessage', 'reply', 'scrollToMessage'])

const { user } = useProfile()
const { isLargeScreen } = useGeneral()
const { messageReactions, deleteMessage: handleDeleteMessage } = useChat()

const isHighlighted = ref(false)
const chatMessageRef = ref(null)

const route = useRoute()
const router = useRouter()

const isOwnMessage = computed(() => user.value.id === props.message.userId)

const currentReactions = computed(() => messageReactions.value.filter(r => r.messageId === props.message.id))

const userName = computed(() => {
  const profile = props.message.user?.profile
  return profile ? `${profile.firstName} ${profile.lastName}` : 'Unknown'
})

const showUser = computed(() => props.message.userId !== props.prevMessage?.userId)

const sortedAttachments = computed(() => {
  const attachments = props.message?.attachments
  return attachments?.sort((a, b) => {
    if (a.order > b?.order) return 1
    if (a.order < b?.order) return -1
    return 0
  })
})

const getTime = computed(() => {
  const today = dayjs()
  const yesterday = dayjs().subtract(1, 'day')
  const createdAtItem = dayjs(props.message.createdAt)

  const minute = createdAtItem.minute() < 10 ? `0${createdAtItem.minute()}` : createdAtItem.minute()

  if (createdAtItem.isSame(today, 'day')) {
    return `${createdAtItem.hour()}:${minute}`
  }

  if (createdAtItem.isSame(yesterday, 'day')) {
    return `Yesterday ${createdAtItem.hour()}:${minute}`
  }

  const dateFormat = createdAtItem.year() === today.year() ? 'DD MMM hh:mm' : 'DD MMM YYYY hh:mm'

  return createdAtItem.format(dateFormat)
})

const hasText = computed(() => {
  const span = document.createElement('span')
  span.innerHTML = props.message.text
  return span.textContent.trim() !== '' || span.innerText.trim() !== ''
})

const editor = ref()

onBeforeUnmount(() => {
  editor.value?.destroy()
})

watch(() => props.message.text, (value) => {
  editor.value.commands.setContent(value)
})

watch(() => route.query.messageId, (value) => {
  if (value) {
    isHighlighted.value = props.message.id === +value

    nextTick(() => {
      if (isHighlighted.value) {
        emit('scrollToMessage', {
          id: props.message.id,
          scrollTo: 'center'
        })
      }
    })

    setTimeout(() => {
      isHighlighted.value = false
      const query = Object.assign({}, route.query)
      delete query.messageId

      router.replace({ query })
    }, 3000)
  }
}, {
  immediate: true
})

onMounted(async () => {
  editor.value = new Editor({
    extensions: chatExtensions(),
    content: props.message.text,
    editable: false
  })
})

function toggleEdit () {
  emit('editMessage', props.message)
  emit('reply', props.message.reply)
}

function deleteMessage () {
  handleDeleteMessage({
    id: props.message.id,
    chatId: props.message.chatId,
    bookId: props.bookId
  })
}

function scrollToReply () {
  if (props.message?.reply?.id) {
    emit('scrollToMessage', {
      id: props.message?.reply?.id
    })
  }
}

function toggleMobileReply () {
  if (!isLargeScreen.value) {
    emit('reply', props.message)
  }
}

defineExpose({
  chatMessageRef
})
</script>
