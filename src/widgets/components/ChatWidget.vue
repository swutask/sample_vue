<template>
  <div class="absolute z-[102] bottom-20 right-20 flex flex-col">
    <TransitionExpand>
      <div
        v-if="showChat"
        class="flex flex-col w-[550px] h-[770px]
        bg-primary rounded-10 shadow-dropdown"
      >
        <div
          class="w-full hover:bg-grey-200 rounded-t-10 group flex justify-center py-10 cursor-pointer
           border-b border-grey-500"
          @click="toggleChat"
        >
          <i class="icon-keyboard-arrow-down text-13 group-hover:text-grey-950 text-grey-300" />
        </div>

        <div class="p-10 overflow-hidden flex flex-col h-full bg-primary rounded-b-10">
          <div class="flex justify-between items-center w-full pb-10 px-10">
            <h1 class="text-20 font-bold leading-none">Chat</h1>

            <ChatSearch
              :bookId="currentBook?.id"
              :chatId="activeChatId"
              @scrollToMessage="scrollToMessage({id: $event, scrollTo: 'center'})"
            />
          </div>

          <div class="flex flex-grow flex-col overflow-hidden">
            <div
              id="show-scrollbar-on-hover"
              ref="scrollToDownRef"
              class="flex-grow overflow-y-auto overflow-x-hidden scrollbar-gutter"
              @scroll="scrollListener"
              @wheel="scrollListenerForDateBar"
            >
              <div class="flex flex-col w-full h-full px-15 py-5 relative min-w-[300px] mx-auto">
                <!-- C A R D -->
                <div
                  v-for="(group, idx) in filteredMessages"
                  :key="idx"
                  :class="group[0].isSample ? 'flex flex-col h-full' : ''"
                >
                  <DateBar
                    v-if="group.length"
                    :showDateBar="showDateBar"
                    topPosition="top-0"
                    :date="group[0]?.createdAt"
                  />
                  <ChatMessage
                    v-for="(message, index) in group"
                    :ref="el => messageRefs[message.id] = el"
                    :key="message.id"
                    :message="message"
                    :prevMessage="group[index - 1]"
                    :isStartOfNewMessage="message.showNewMessage"
                    :privateChatUserId="null"
                    :isLastMessage="index === group.length - 1"
                    :isPrivateChat="false"
                    isMinimized
                    class="w-full text-14 lg:text-15 ml-4"
                    :class="[user.id === message.userId ? 'self-end' : 'self-start', {'mt-auto': index === 0}]"
                    :classes="user.id === message.userId ? 'justify-end' : 'justify-start'"
                    :bookId="currentBook?.id"
                    @editMessage="editMessage"
                    @reply="reply"
                    @scrollToMessage="scrollToMessage"
                  />
                </div>
              </div>
            </div>

            <div class="flex relative">
              <!-- E D I T O R -->
              <ChatEditor
                :key="currentBook?.id"
                ref="chatEditorRef"
                editorClass="chatEditor"
                :chatId="activeChatId"
                :isChat="true"
                isMinimized
                inactiveEditorClasses="border border-grey-700"
                background="!bg-primary"
                :bookId="currentBook?.id"
                :shareWith="currentBook?.shareWith"
                :repliedMessage="repliedMessage"
                @scrollToDown="scrollToElement"
                @deleteReply="deleteReply"
              />
            </div>
          </div>
        </div>
      </div>
    </TransitionExpand>

    <ButtonModule
      type="transparent"
      main
      prefix="icon-chat-page mr-5"
      class="h-32 px-10 mt-10 w-min rounded-10 self-end"
      @click="toggleChat"
    >
      <p>Chat</p>

      <NotificationDot
        v-if="unreadCount && !showChat"
        :unreadCount="unreadCount"
        showCount
        class="absolute top-2 right-[-2px]"
      />
    </ButtonModule>
  </div>
</template>
<script setup lang="ts">
import TransitionExpand from '@/components/shared/TransitionExpand'

const route = useRoute()

type TGroupedMessages = TIndexedObject<IMessage[]>

const { handleLoading } = useGeneral()
const { books, bookChats } = useBook()
const { user } = useProfile()
const {
  messages,
  countMessages,
  updateMessageStatus,
  fetchMessages,
  getMessages,
  unreadMessageCount,
  getReactions
} = useChat()

let page = 1

const showChat = ref(false)

const activeChatId = ref<number | null>(null)
const chatEditorRef = ref(null)
const messageRefs = ref({})
const scrollToDownRef = ref(null)
const previousScrollTop = ref(0)
const isFetchingMessagesAllowed = ref(true)
const repliedMessage = ref<IMessage | null>(null)
const currentBook = ref()
const showDateBar = ref(false)
const localMessages = computed(() => {
  return messages.value[activeChatId.value] || []
})

const defaultMessagesCountToShow = ref(-10)

const localCountMessages = computed(() => countMessages.value[activeChatId.value] || 0)

const unreadCount = computed(() => +bookChats.value.find(e => e.bookId === currentBook.value?.id)?.unreadMessageCount)
const activeBookChatId = computed(() => bookChats.value?.find(e => e.bookId === +route.params?.id)?.id)

const filteredMessages = computed<TGroupedMessages>(() => {
  const result = localMessages.value.slice(defaultMessagesCountToShow.value)
  if (result?.length === 0) {
    return {
      today: [{
        createdAt: new Date(),
        userId: user.value.id,
        isSample: true,
        text: '<p>Welcome to the Chat! You know how this works 😀</p>',
        user: {
          profile: {
            firstName: 'Eve from',
            lastName: 'Complex',
            color: user.value.profile.color
          }
        }
      }]
    }
  }

  let firstUnreadMessage = null

  return groupMessagesByDate(result.map((e: IMessage) => {
    if (!firstUnreadMessage && e.messageStatus?.status === 'unread') {
      firstUnreadMessage = e
      return { ...e, showNewMessage: firstUnreadMessage.id === e.id }
    } else {
      return e
    }
  }))
})

onMounted(async () => {
  await getReactions()

  setActiveChat(activeBookChatId.value)
})

watch(() => [localMessages.value, showChat.value], ([newValue, show]) => {
  const decreaseCount = newValue.filter(e => e.messageStatus?.status === 'unread')?.length
  if (newValue[newValue.length - 1]?.chatId === activeChatId.value && (show && decreaseCount)) {
    setTimeout(() => {
      const gap = Math.max(unreadMessageCount.value - decreaseCount, 0)

      unreadMessageCount.value = unreadMessageCount.value === 0 ? 0 : gap

      bookChats.value = bookChats.value.map((e) => ({
        ...e,
        unreadMessageCount: e.bookId === currentBook.value.id ? 0 : e.unreadMessageCount
      }))
    }, 1000)

    updateMessageStatus(newValue[newValue.length - 1].chatId)
  }

  if (isFetchingMessagesAllowed.value) {
    scrollToElement()
  }
}, { deep: true })

watch(() => activeBookChatId.value, (value) => {
  if (value) {
    setActiveChat(+value)
  }
})

watch(() => bookChats.value, (value) => {
  unreadMessageCount.value = value.reduce((sum, item) => sum + (parseInt(item.unreadMessageCount) || 0), 0)
})

function scrollToMessage ({ id, scrollTo = 'center' }: {id: number; scrollTo?: string}) {
  nextTick(() => {
    const msg = messageRefs.value[+id]

    if (msg?.chatMessageRef) {
      msg.chatMessageRef.scrollIntoView({ block: scrollTo, behavior: 'smooth' })
    } else {
      const totalPages = localCountMessages.value / 50

      if (page < totalPages) {
        fetchMessages({
          chatId: activeChatId.value,
          bookId: currentBook.value?.id,
          page
        }).then(() => {
          page++
          scrollToMessage({ id, scrollTo })
        })
      }
    }
  })
}

function groupMessagesByDate (messages: IMessage[]) {
  if (messages) {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    const groupedMessages = {}
    messages?.forEach(message => {
      const key = new Date(message.createdAt).toISOString().split('T')[0]

      if (!groupedMessages[key]) {
        groupedMessages[key] = []
      }
      groupedMessages[key].push(message)
    })
    return groupedMessages
  }
}

function scrollToElement () {
  setTimeout(() => {
    if (route.query.messageId) return

    if (scrollToDownRef.value) {
      scrollToDownRef.value.scrollTop = scrollToDownRef.value.scrollHeight
    }
  })
}

let scrollTimer: ReturnType<typeof setTimeout> | null = null

const scrollListenerForDateBar = () => {
  showDateBar.value = true

  clearTimeout(scrollTimer)
  scrollTimer = setTimeout(() => {
    showDateBar.value = false
  }, 2000)
}

function scrollListener (e: Event) {
  if (!currentBook.value) return
  const target = e.target as HTMLElement
  const top = target.scrollTop < 0 ? target.scrollHeight + target.scrollTop - target.clientHeight : target.scrollTop

  if (localMessages.value?.length >= localCountMessages.value) {
    isFetchingMessagesAllowed.value = false
  }

  if (isFetchingMessagesAllowed.value && previousScrollTop.value > top && top < 500 && top >= 100) {
    isFetchingMessagesAllowed.value = false
    const fixedTopPosition = target.scrollHeight

    fetchMessages({
      chatId: activeChatId.value,
      bookId: currentBook.value?.id,
      page
    }).then(() => {
      page++
      scrollToDownRef.value.scrollTop = target.scrollHeight - fixedTopPosition

      setTimeout(() => {
        isFetchingMessagesAllowed.value = true
      }, 1000)
    })
  }

  previousScrollTop.value = top
}

function editMessage (value) {
  chatEditorRef.value.editMessage(value)
  scrollToDownRef.value.scrollIntoView({ block: 'end', behavior: 'smooth' })
}

async function setActiveChat (chatId: number) {
  if (activeChatId.value === chatId) {
    return
  }

  activeChatId.value = chatId
  const bookChat: IChat = bookChats.value.find(e => e.id === +chatId)

  if (bookChat) {
    currentBook.value = books.value.find(book => book.id === bookChat.bookId)
    showChat.value = useLocalStorage.getItem('bookChatOpened')?.[currentBook.value?.id] || false

    if (showChat.value) {
      nextTick(() => { chatEditorRef.value?.onFocus() })
    }
  }

  handleLoading(true)

  getMessages({
    chatId,
    bookId: bookChat?.bookId || null
  })
    .then(() => chatEditorRef.value?.onFocus())
    .finally(() => {
      handleLoading(false)
    })
}

function reply (message: IMessage) {
  repliedMessage.value = message
  chatEditorRef.value.onFocus()
}

function deleteReply () {
  repliedMessage.value = null
}

let chatTimer: ReturnType<typeof setTimeout> | null = null

function toggleChat () {
  showChat.value = !showChat.value

  const localData = useLocalStorage.getItem('bookChatOpened') || {}

  if (showChat.value) {
    nextTick(() => {
      chatEditorRef.value?.onFocus()
    })

    clearTimeout(chatTimer)

    chatTimer = setTimeout(() => {
      defaultMessagesCountToShow.value = 0
    }, 1000)
  } else {
    defaultMessagesCountToShow.value = -10
  }

  localData[currentBook.value?.id] = showChat.value

  useLocalStorage.setItem('bookChatOpened', localData)
}
</script>
