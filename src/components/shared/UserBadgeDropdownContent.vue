<template>
  <div v-if="memberInfo && !disabledDropdown" class="flex flex-col">
    <div class="relative bg-brand bg-opacity-[0.15] h-[100px] w-full rounded-t-10">
      <div
        class="user-badge-icon rounded-full flex items-center justify-center
                 w-[100px] h-[100px] !absolute -bottom-25 left-20"
      >
        <img
          v-if="avatarUrl"
          class="avatar rounded-full object-cover w-full h-full"
          :src="avatarUrl"
          alt="avatar"
        >
        <div
          v-else
          class="flex items-center justify-center rounded-full w-full h-full"
          :style="`background: ${color};`"
        >
          <span class="text-26 initials leading-none uppercase font-medium text-dark-100">
            {{ userInitials }}
          </span>
        </div>
      </div>
    </div>

    <div class="flex flex-col mt-40 px-20 pb-20">
      <span class="text-19 font-semibold leading-4">
        {{ memberInfo.firstName }}
        {{ memberInfo.lastName }}
      </span>

      <span v-if="memberInfo.position" class="mt-3 text-14 text-grey-975">{{ memberInfo.position }}</span>

      <a :href="`mailto:${memberInfo.email}`" class="mt-5 text-[#bebebe] text-13 underline">
        {{ memberInfo.email }}
      </a>

      <div v-if="memberInfo.location || memberInfo.timezone" class="mt-10">
        <p v-if="memberInfo.location" class="mr-5 text-14 text-grey-20 font-semibold">{{ memberInfo.location }}</p>

        <span v-if="memberInfo.timezone" class="text-14 text-grey-20">
          {{
            new Date().toLocaleString('en-US', {
              timeZone: memberInfo.timezone?.split(' ')[1], hour: 'numeric', minute: 'numeric'
            })
          }}
          local time {{ memberInfo.timezone?.split(' ')[0] }}
        </span>
      </div>

      <span v-if="sharedBooks?.length" class="mt-10 text-14 text-grey-20 flex items-center">
        {{ sharedBooks?.length }}
        {{ sharedBooks?.length > 1 ? 'spaces' : 'space' }}
        <ButtonModule
          :has-hover="true"
          prefix="icon-info_outline text-main-color"
          class="text-app-color p-0 ml-5"
          @click.stop="toggleBooksModal"
        />
      </span>

      <div v-if="user.id !== memberInfo.userId && !isClient && !hideSendMessageButton" class="mt-20">
        <button
          class="px-10 py-4 text-12 text-app-color border border-grey-950 rounded-full
            hover:border-brand hover:shadow-brand-05 anim-color"
          @click="startPrivateChat"
        >
          Send private message
        </button>
      </div>
    </div>
  </div>

  <InfoDropdown
    v-if="showBooks"
    title="Spaces"
    width="max-w-[250px]"
    class="relative"
    classes="max-h-[190px] rounded-4"
    @showDropdown="closeBooksModal"
  >
    <div class="pb-8 px-12 overflow-y-auto">
      <div v-if="sharedBooks.length === 0" class="text-13">
        No shared spaces
      </div>
      <p v-for="book in sharedBooks" :key="book.id" class="mb-4">
        <BookLabel
          background="bg-grey-light group-hover:bg-grey-light-hover anim-color"
          class="truncate py-4 text-14"
          :bookId="book.id"
          :has-border="false"
          size="w-25 h-25"
          :customStyle="{
            fontSize: 'text-14', defaultIcon: 'w-18 h-18', iconHover: ''
          }"
        />
      </p>
    </div>
  </InfoDropdown>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  memberInfo: ITeamMember
  userInitials: string
  avatarUrl: string
  color: string
  isClientMember: boolean
  hideSendMessageButton: boolean
  disabledDropdown: boolean
}>(), {

})

const { user, isClient } = useProfile()
const router = useRouter()
const { privateChats } = useChat()

const { books } = useBook()
const emitter = useEmitter()

const showBooks = ref(false)

const sharedBooks = computed(() => {
  if (props.isClientMember) {
    return books.value.filter(book => props.memberInfo?.books?.some(b => b?.title === book?.title))
  }
  return (props.memberInfo as ITeamMember).books.filter(book => books.value.some(b => b.id === book.id))
})

function toggleBooksModal () {
  showBooks.value = !showBooks.value
}

function closeBooksModal () {
  showBooks.value = false
}
function getPrivateChatId (id) {
  const chat = privateChats.value.find(chat => chat.privateChat.memberId === id)
  return chat.privateChat.chatId
}

function startPrivateChat () {
  const privateChatId = getPrivateChatId(props.memberInfo.userId)
  router.replace({ query: { chatId: privateChatId } })

  emitter.emit('closeTaskModalOnStartPrivateChat')
}

</script>
