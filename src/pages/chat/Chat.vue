<template>
  <div
    :class="(isSidebarCollapsed || !isLargeScreen) ? 'pt-15 md:pt-[65px]' : ''"
  >
    <div class="flex h-full flex-1">
      <div
        v-if="showMenu"
        class="flex flex-col flex-1 w-full lg:max-w-[250px] lg:min-w-[250px]
         pl-5 sm:pl-10 lg:pt-18 border-r border-grey-500 overflow-hidden bg-primary"
      >
        <p
          v-if="filteredBooks.length > 0"
          class="pl-10 mb-9 font-semibold lg:mt-0 mt-4 text-app-color md:text-14 text-18 text-left"
        >
          Space chats
        </p>

        <div
          v-if="filteredBooks.length > 0"
          data-onboarding-id="onboardingChatProjects"
          class="pr-5 sm:pr-10 flex flex-col items-start md:space-y-2 mb-36 overflow-y-auto max-h-[60%]"
        >
          <ChatBookItem
            v-for="bookChat in bookChats"
            :key="bookChat.id"
            :book="getBook(bookChat.bookId)"
            :unreadCount="+bookChat.unreadMessageCount"
            :isActive="bookChat.id === +$route.query?.chatId"
            @click="setActiveChat(bookChat.id)"
          />
        </div>

        <p
          v-if="!isClient"
          class="pl-10 mb-9 font-semibold text-app-color md:text-14 text-18 text-left"
        >
          1-on-1 chats
        </p>

        <div v-if="privateChats && !isClient" class="flex flex-col mb-10 space-y-5 overflow-y-auto pr-10">
          <ChatMemberItem
            v-for="privateChat in privateChats"
            :key="privateChat.opponent.id"
            :user="privateChat.opponent"
            :unreadCount="+privateChat.privateChat.unreadMessageCount"
            :isActive="+privateChat?.privateChat.chatId === +$route.query?.chatId"
            @click="setActiveChat(privateChat.privateChat.chatId)"
          />
        </div>

        <div v-if="!isClient" class="ml-14 mb-10 text-center sm:text-left">
          <DropdownModule
            background="bg-primary dark:bg-grey-110"
            :contentHeight="300"
            positionDirection="left"
            zIndex="z-9999"
            :width="250"
          >
            <template #button>
              <button
                v-if="filteredMembers?.length === 0"
                class="group-scope inline-flex items-center justify-center sm:justify-start"
                @click.stop="openInviteModal"
              >
                <i
                  class="icon-add p-6 text-brand-blue text-10 bg-brand-blue/[0.1] rounded-4
                          opacity-70 group-scope-hover:opacity-100 anim-opacity"
                />

                <span class="ml-12 text-grey-950 hover:text-grey-975 md:text-13 text-15 anim-color">
                  Invite teammates
                </span>
              </button>
              <button v-else class="group-scope inline-flex items-center justify-center sm:justify-start">
                <i
                  class="icon-add p-6 text-brand-blue text-10 bg-brand-blue/[0.1] rounded-4
                          opacity-70 group-scope-hover:opacity-100 anim-opacity"
                />

                <span class="ml-12 text-grey-950 hover:text-grey-975 text-13 anim-color">Add chat</span>
              </button>
            </template>
            <div class="px-12 py-8 overflow-y-auto">
              <p class="font-medium text-15 mb-6">Members</p>
              <UserBadge
                v-for="(person, index) in filteredMembers"
                :key="index"
                :first-name="person.firstName"
                :last-name="person.lastName"
                :avatarUrl="person.avatar?.url"
                :color="person.color"
                :size="26"
                class="mb-4 text-13 items-center cursor-pointer"
                @click="addNewPrivateChat(person.userId)"
              />
            </div>
          </DropdownModule>
        </div>
      </div>

      <div
        v-if="activeChatId && (isLargeScreen || !showMenu)"
        class="flex flex-col flex-1 lg:pt-15 lg:max-w-none max-w-[100vw]"
      >
        <div
          class="flex justify-between items-center min-w-[300px]
         max-w-[980px] mx-auto w-full max-md:px-12 lg:pr-20 mb-15"
        >
          <div class="flex flex-col max-md:space-y-5">
            <div class="flex items-center">
              <i
                v-if="!isLargeScreen"
                class="icon-left-single-arrow text-18 text-grey-950 mx-2 pr-8 cursor-pointer"
                @click="showMenu = true"
              />

              <BookLabel
                v-if="currentBook"
                :bookId="currentBook.id"
                class="sm:pl-10 text-15"
                :customStyle="{
                  fontSize: 'text-15 !font-semibold',
                  defaultIcon: 'w-18 h-18',
                  iconHover: ''
                }"
                :has-border="false"
              />
              <div
                v-else
                class="sm:pl-10 lg:text-22 text-16 lg:font-bold font-medium leading-none flex"
              >
                Chat
                <div v-if="!isLargeScreen" class="flex">
                  <span class="mx-5">with</span>

                  <UserBadge
                    :first-name="currentPrivateChatMember?.profile.firstName"
                    :last-name="currentPrivateChatMember?.profile.lastName"
                    :color="currentPrivateChatMember?.profile.color"
                    :avatarUrl="currentPrivateChatMember?.avatar?.url"
                    :size="30"
                    :userId="currentPrivateChatMember?.id"
                    :showAvatar="false"
                    hideSendMessageButton
                    :showName="true"
                    nameClasses="text-14 text-brand cursor-pointer font-normal"
                    class="mr-10"
                  />
                </div>
              </div>
            </div>

            <div v-if="isLargeScreen" class="flex items-center sm:pl-5">
              <p v-if="!currentBook" class="p-5 text-14 text-app-color">
                Private chat with
              </p>
              <UserBadge
                v-if="!currentBook"
                :first-name="currentPrivateChatMember?.profile.firstName"
                :last-name="currentPrivateChatMember?.profile.lastName"
                :color="currentPrivateChatMember?.profile.color"
                :avatarUrl="currentPrivateChatMember?.avatar?.url"
                :size="30"
                :userId="currentPrivateChatMember?.id"
                :showAvatar="false"
                hideSendMessageButton
                :showName="true"
                nameClasses="text-14 text-brand cursor-pointer"
                class="mr-10"
              />
            </div>
          </div>

          <div class="flex items-center">
            <SharedWith
              v-if="!!currentBook?.shareWith && currentBook"
              class="flex-shrink-0 !text-14 mr-15"
              classes="text-app-color"
              isCard
              withAvatars
              :numberOfUsers="currentBook?.shareWith?.length > 5 ? 5 : currentBook?.shareWith?.length"
              :members="currentBook?.shareWith"
              infoDropdownClasses="left-0 max-h-[190px] overflow-y-auto rounded-8"
              :book="currentBook"
              :allow-delete="false"
              :width="240"
            />

            <ChatSearch
              :bookId="currentBook?.id"
              :chatId="activeChatId"
              @scrollToMessage="scrollToMessage({id: $event, scrollTo: 'center'})"
            />
          </div>
        </div>

        <div
          v-if="activeChatId"
          class="flex flex-grow flex-col overflow-hidden border-t border-grey-500 lg:pl-20"
          :class="{'pb-50': isFocused}"
        >
          <div
            id="show-scrollbar-on-hover"
            ref="scrollToDownRef"
            class="flex-grow overflow-y-auto scrollbar-gutter lg:pr-20"
            @scroll="scrollListener"
            @wheel="scrollListenerForDateBar"
          >
            <div
              class="flex flex-col w-full h-full pt-30 lg:pr-30 px-15 pb-5 relative min-w-[300px] max-w-[980px] mx-auto"
            >
              <!-- C A R D -->
              <div
                v-for="(group, idx) in filteredMessages"
                :key="idx"
                :class="group[0].isSample ? 'flex flex-col h-full' : ''"
              >
                <DateBar
                  v-if="group.length"
                  :showDateBar="showDateBar"
                  :date="group[0]?.createdAt"
                />
                <ChatMessage
                  v-for="(message, index) in group"
                  :ref="el => messageRefs[message.id] = el"
                  :key="message.id"
                  :message="message"
                  :prevMessage="group[index - 1]"
                  :isStartOfNewMessage="message.showNewMessage"
                  :privateChatUserId="currentPrivateChatMember?.id"
                  :isLastMessage="index === group.length - 1"
                  :isPrivateChat="isPrivateChat"
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

          <div
            class="flex lg:pr-50 pl-0 w-full mt-auto lg:mb-10 min-w-[300px] max-w-[980px] mx-auto"
            :class="isFocused ? 'bottom-0 fixed z-[100]' : 'relative'"
          >
            <!-- E D I T O R -->
            <ChatEditor
              :key="currentBook?.id"
              ref="chatEditorRef"
              editorClass="chatEditor"
              :chatId="activeChatId"
              :isChat="true"
              inactiveEditorClasses="border border-grey-700"
              background="dark:bg-book bg-primary"
              :bookId="currentBook?.id"
              :shareWith="currentBook?.shareWith"
              :repliedMessage="repliedMessage"
              @scrollToDown="scrollToElement"
              @deleteReply="deleteReply"
            />

            <ButtonModule
              v-if="showArrowScrollBottom && isLargeScreen"
              prefix="icon-arr-left -rotate-90 text-22 text-dark-default p-2 pr-4"
              class="cursor-pointer p-5 rounded-8 flex items-center absolute top-[-100px]
               -right-5 xl:-right-20 bg-grey-f7f7f7 hover:bg-menu-hover"
              @click="scrollToElement"
            />
          </div>
        </div>
      </div>
    </div>
    <InviteTeammates v-if="showInviteModal" @close="closeInviteModal" />
  </div>
</template>

<script setup lang="ts">
import { preventBodyScroll } from '@/core/helper-functions'
import localStorageService from '@/core/local-storage'

const route = useRoute()
const router = useRouter()

type TGroupedMessages = TIndexedObject<IMessage[]>

const { isSidebarCollapsed } = useSidebar()
const { handleLoading, setNotification, isLargeScreen, isMobile } = useGeneral()
const { books, getBookChats, bookChats } = useBook()
const { user, isClient } = useProfile()
const { members, getMembers } = useTeam()
const {
  messages,
  countMessages,
  updateMessageStatus,
  fetchMessages,
  getMessages,
  unreadMessageCount,
  privateChats,
  getPrivateChats,
  addPrivateChat,
  getReactions
} = useChat()

let page = 1

const activeChatId = ref<number | null>(null)
const chatEditorRef = ref(null)
const messageRefs = ref({})
const scrollToDownRef = ref(null)
const previousScrollTop = ref(0)
const isFetchingMessagesAllowed = ref(true)
const repliedMessage = ref<IMessage | null>(null)
const showInviteModal = ref(false)
const currentPrivateChatMember = ref<IUser>()
const currentBook = ref()
const showDateBar = ref(false)
const showMenu = ref(false)
const localMessages = computed(() => {
  return messages.value[activeChatId.value] || []
})

const localCountMessages = computed(() => countMessages.value[activeChatId.value] || 0)

const isFocused = computed(() => chatEditorRef.value?.isFocusedEditor && !isLargeScreen.value)

const filteredBooks = computed(() => {
  return books.value.filter(b => !b.archivedAt && !b.isSample)
})

const isPrivateChat = ref(false)

const filteredMessages = computed<TGroupedMessages>(() => {
  const result = localMessages.value
  if (result?.length === 0 && !isPrivateChat.value) {
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

const filteredMembers = computed(() => {
  const activeChatsMemberIds = privateChats.value?.map(c => c.opponent.id)

  return members.value?.filter(m => m.userId !== user.value.id && !activeChatsMemberIds.includes(m.userId))
})

const showArrowScrollBottom = ref(false)

onMounted(async () => {
  await getMembers({})
  await getBookChats()
  await getPrivateChats()
  await getReactions()

  showMenu.value = !isLargeScreen.value

  const lastOpenedChat = localStorageService.getItem('lastOpenedChat')?.[user.value.id]

  if (route.query.privateChatUserId) {
    const privateChat: IPrivateChat = privateChats.value.find((item) => {
      return +item.opponent.id === +route.query.privateChatUserId
    })

    if (privateChat) {
      setActiveChat(privateChat.privateChat.chatId)
    } else {
      addNewPrivateChat(+route.query.privateChatUserId)
    }

    return router.replace({ query: { chatId: privateChat.privateChat.chatId } })
  }

  if (route.query?.chatId) {
    setActiveChat(+route.query?.chatId)
    return
  }

  if (lastOpenedChat || (isLargeScreen.value && !showMenu.value)) {
    const chatToSetActive = bookChats.value.find(e => e.id === +lastOpenedChat) ||
      privateChats.value.find(e => e.privateChat.chatId === +lastOpenedChat)
    setActiveChat(chatToSetActive ? +lastOpenedChat : +(route.query?.chatId || bookChats.value[0].id))
  }
})

watch(() => localMessages.value, (newValue) => {
  if (newValue[newValue.length - 1]?.chatId === activeChatId.value) {
    const decreaseCount = newValue.filter(e => e.messageStatus?.status === 'unread')?.length

    setTimeout(() => {
      const gap = Math.max(unreadMessageCount.value - decreaseCount, 0)

      unreadMessageCount.value = unreadMessageCount.value === 0 ? 0 : gap
    }, 1000)

    updateMessageStatus(newValue[newValue.length - 1].chatId)
  }

  if (isFetchingMessagesAllowed.value) {
    scrollToElement()
  }
}, { deep: true })

watch(() => route.query.chatId, (value) => {
  if (value) {
    setActiveChat(+value)
  }
})

watch(() => activeChatId.value, (newValue, oldVal) => {
  if (newValue && oldVal) {
    updateMessageStatus(newValue)
    updateMessageStatus(oldVal)

    privateChats.value = privateChats.value.map((e) => ({
      ...e,
      privateChat: e.privateChat.chatId === newValue || e.privateChat.chatId === oldVal
        ? { ...e.privateChat, unreadMessageCount: 0 }
        : e.privateChat
    }))

    bookChats.value = bookChats.value.map((e) => ({
      ...e,
      unreadMessageCount: e.id === newValue || e.id === oldVal
        ? 0
        : e.unreadMessageCount
    }))
  }
})

watch(() => [privateChats.value, bookChats.value], ([privateChatsValue, booksChatsValue]) => {
  const totalUnreadMessages = privateChatsValue.reduce((sum, item) => sum + (parseInt(item.privateChat.unreadMessageCount) || 0), 0) +
    booksChatsValue.reduce((sum, item) => sum + (parseInt(item.unreadMessageCount) || 0), 0)
  unreadMessageCount.value = totalUnreadMessages
})

onBeforeUnmount(() => {
  messageRefs.value = {}
  if (activeChatId.value) {
    updateMessageStatus(activeChatId.value)
  }

  if (isPrivateChat.value) {
    privateChats.value = privateChats.value.map((e) => ({
      ...e,
      privateChat: e.privateChat.chatId === activeChatId.value ? { ...e.privateChat, unreadMessageCount: 0 } : e.privateChat
    }))
  } else {
    bookChats.value = bookChats.value.map((e) => ({
      ...e,
      unreadMessageCount: e.book?.id === currentBook.value?.id ? 0 : e.unreadMessageCount
    }))
  }
})

function getBook (id: number) {
  return books.value.find(book => book.id === id)
}

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
      if (localMessages.value.length > 0) {
        scrollToMessage({ id: localMessages.value.slice(-1)[0].id })
      } else {
        scrollToDownRef.value.scrollTop = scrollToDownRef.value.scrollHeight
      }
    }
  })
}

let scrollTimer = null

const scrollListenerForDateBar = () => {
  showDateBar.value = true

  clearTimeout(scrollTimer)
  scrollTimer = setTimeout(() => {
    showDateBar.value = false
  }, 2000)
}

function scrollListener (e: Event) {
  const targetForArrow = e.target as HTMLElement
  const scrollBottom = targetForArrow.scrollHeight - targetForArrow.scrollTop - targetForArrow.clientHeight
  showArrowScrollBottom.value = scrollBottom > 200
  if (!(isPrivateChat.value || currentBook.value)) return
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
  if (activeChatId.value === chatId && !isMobile.value) {
    return
  }

  showMenu.value = isLargeScreen.value

  activeChatId.value = chatId

  const bookChat: IChat = bookChats.value.find(e => e.id === +chatId)

  if (bookChat) {
    const book = books.value.find(book => book.id === bookChat.bookId)

    currentBook.value = book
    currentPrivateChatMember.value = null
  } else {
    const privateChat: IPrivateChat = privateChats.value.find((item) => +item.privateChat.chatId === +chatId)

    if (!privateChat) {
      setNotification({
        uuid: window.crypto.randomUUID(),
        message: 'Chat not found'
      })
      router.push({ name: 'Today', params: { team: route.params.team } })
      return
    }

    isPrivateChat.value = !!privateChat
    currentBook.value = null
    currentPrivateChatMember.value = privateChat?.opponent
  }

  handleLoading(true)

  const localData = localStorageService.getItem('lastOpenedChat') || {}
  localData[user.value.id] = chatId
  localStorageService.setItem('lastOpenedChat', localData)

  router.replace({
    query: {
      ...route.query,
      chatId
    }
  })

  getMessages({
    chatId,
    bookId: bookChat?.bookId || null
  })
    .then(() => chatEditorRef.value?.onFocus())
    .finally(() => {
      handleLoading(false)
      showArrowScrollBottom.value = false
    })
}

async function addNewPrivateChat (userId: number) {
  const newPrivateChat: IPrivateChat = await addPrivateChat(userId)

  await setActiveChat(newPrivateChat.privateChat.chatId)
}

function reply (message: IMessage) {
  repliedMessage.value = message
  chatEditorRef.value.onFocus()
}

function deleteReply () {
  repliedMessage.value = null
}

function openInviteModal () {
  if (!filteredMembers.value?.length) {
    showInviteModal.value = true
    preventBodyScroll(true)
  }
}

function closeInviteModal () {
  showInviteModal.value = false
  preventBodyScroll(false)
}
</script>
