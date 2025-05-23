<template>
  <teleport to="#main_section">
    <transition name="fade">
      <div
        class="fixed top-0 left-0 w-full h-full bg-backdrop flex justify-center md:items-center overflow-y-auto
               md:pt-0 pt-[60px] items-baseline z-[105] p-15"
        @click.self="close"
      >
        <div class="relative bg-primary max-w-[500px] w-full rounded-20 shadow-modal dark:shadow-event-dark pb-15">
          <div class="border-b border-grey-200 pb-5 px-20">
            <Switcher
              v-model="switcherState"
              class="mt-10 text-12 md:text-14 font-medium"
              wrapperClasses="!border-none"
              width="50%"
              height="50px"
              :tabs="[
                { name: 'Invite teammate', key: 'team-members' },
                { name: 'Invite guests', key: 'observers' }
              ]"
              @onChange="toggleState"
            />
          </div>

          <div class="px-25 py-16">
            <p class="text-13 text-grey-275 mb-16 leading-[1.7]">
              {{ switcherState.key === 'observers'
                ? 'Guests can be added to your workspace for free. They can view tasks, mark them complete, and leave comments.'
                : `Each additional workspace member you add is priced at ${annualPlanPricePerMonth}$ per user per month, billed annually.`
              }}
            </p>
            <InputModule
              ref="emailsRef"
              v-model="emails"
              name="email"
              type="text"
              label="Email"
              placeholder="name@example.com"
              class="w-full"
              inputClasses="dark:bg-sidebar px-18 py-16 rounded-10 border border-grey-1500 focus:rounded-6 focus:border-dark-300 anim-all
                            focus:shadow-[0px_0px_0px_1px_#222] hover:rounded-6 hover:!border-dark-300 hover:shadow-[0px_0px_0px_1px_#222]"
              label-class="mb-5 font-bold text-15 text-app-color bg-transparent"
            />

            <div
              v-if="!enableMultiselect"
              class="mt-20"
            >
              <p class="mb-5 font-bold text-15 text-app-color bg-transparent">Share space</p>
              <BookLabel
                :class="`!cursor-pointer custom-color px-18 py-16 rounded-10 border border-grey-1500 focus:rounded-6
                              focus:border-dark-300 focus:shadow-[0px_0px_0px_1px_#222] hover:rounded-6 hover:!border-dark-300
                              hover:shadow-[0px_0px_0px_1px_#222] anim-all book-input ${openBookModal ? 'shadow-signup' : ''}`"
                class="cursor-pointer"
                :customStyle="{
                  fontSize: 'text-14 !font-medium',
                  defaultIcon: 'w-2/3 h-2/3',
                  iconHover: 'bg-transparent'
                }"
                :bookId="currentBook?.id"
                :hasBorder="false"
                size="w-21 h-21"
              />
            </div>

            <BooksSelect
              v-else
              :selected-books="selectedBooks"
              :options="options"
              top="top-[85px]"
              width="w-full"
              :defaultBookId="options[0]?.id"
              @onSelect="onSelect"
              @toggle="toggleModal"
              @close="closeModal"
            >
              <InputModule
                v-model="selectedBooksTitle"
                label="Share space"
                placeholder="All spaces"
                class="w-full mt-20"
                readonly
                :inputClasses="`dark:bg-sidebar !cursor-pointer custom-color px-18 py-16 rounded-10 border border-grey-1500 focus:rounded-6
                              focus:border-dark-300 focus:shadow-[0px_0px_0px_1px_#222] hover:rounded-6 hover:!border-dark-300
                              hover:shadow-[0px_0px_0px_1px_#222] anim-all book-input ${openBookModal ? 'shadow-signup' : ''}`"
                label-class="mb-5 font-bold text-15 text-app-color bg-transparent"
              />
            </BooksSelect>

            <ConfirmModal
              ref="confirmRef"
              confirm-btn-title="Yes"
              confirm-btn-cancel="No"
              @confirm="invite"
            >
              <p class="text-14 mt-15 mb-25">
                If you invite new member we will automatically transfer you to Teams Plan
              </p>
            </ConfirmModal>

            <ButtonModule
              type="black"
              class="font-semibold px-35 py-16 text-15 w-full mt-30 dark:text-white"
              @click="clickInvite"
            >
              <p class="text-center w-full">Send invites</p>
            </ButtonModule>
          </div>

          <InviteLink v-if="inviteLink && switcherState.key === 'team-members'" :link="inviteLink" class="mb-15" />

          <div v-if="accessVisibilityCondition[switcherState.key]" class="px-20">
            <p class="mb-10 font-bold text-15 text-app-color bg-transparent mt-20">
              {{ switcherState.key === 'team-members'
                ? 'Invite workspace members to this space'
                : 'Invite workspace guests to this space'
              }}
            </p>

            <template v-if="switcherState.key === 'team-members'">
              <div
                v-for="teamMember in filteredMembers"
                :key="teamMember.id"
                class="flex justify-between mb-10"
              >
                <UserBadge
                  :first-name="teamMember.firstName"
                  :last-name="teamMember.lastName"
                  :avatarUrl="teamMember.avatar?.url"
                  :color="teamMember.color"
                  :size="21"
                  :userId="teamMember.id"
                  class="text-13"
                />
                <ToggleModule
                  :value="checkMemberAccess(teamMember.id)"
                  duration="duration-100"
                  @input="toggleMember($event, teamMember)"
                />
              </div>
            </template>

            <template v-else>
              <div
                v-for="client in clients"
                :key="client.id"
                class="flex justify-between mb-10"
              >
                <UserBadge
                  :first-name="client.user.profile.firstName"
                  :last-name="client.user.profile.lastName"
                  :avatarUrl="client.user.avatar?.url"
                  :color="client.user.profile.color"
                  :size="21"
                  :userId="client.id"
                  class="text-13"
                />
                <ToggleModule
                  :value="checkClientAccess(client.userId)"
                  duration="duration-100"
                  @input="toggleClient($event, client)"
                />
              </div>
            </template>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { preventBodyScroll, replaceRouterQuery } from '@/core/helper-functions'
import { teamsService } from '@/services'
import { emailValidation } from '@/helpers'
import { useRoute } from 'vue-router'

const props = withDefaults(defineProps<{
  book?: IBook
  type?: 'observer' | 'member'
  enableMultiselect?: boolean
}>(), {
  type: 'member'
})

const emit = defineEmits(['close'])

const route = useRoute()
const { setNotification } = useGeneral()
const { team, getTemporaryMembers, members, isAdmin } = useTeam()
const { toggleLimitModal, allowAddMembers, teamProPlan, isPersonalPlan } = usePlan()
const { books, book, bookOwner } = useBook()
const { clients } = useClient()
const { user } = useProfile()

const currentBook = ref(book.value)

const emailsRef = ref(null)
const confirmRef = ref()
const emails = ref('')
const selectedBooks = ref([])
const selectedBooksTitle = ref('')
const openBookModal = ref(false)
const switcherState = ref<ISwitcherModelValue>({ index: 0, key: 'team-members' })

const inviteLink = computed(() => team.value?.inviteLink)
const annualPlanPricePerMonth = computed(() => ((+teamProPlan.value.pricePerMonth).toFixed(0)))

const options = computed(() => {
  return books.value.filter((b) => !b.isSample && b.title !== 'Personal' && !b.archivedAt)
})

const accessVisibilityCondition = computed(() => {
  const condition = !props.enableMultiselect && (isAdmin.value || bookOwner.value.userId === user.value.id)
  return {
    'team-members': condition && members.value.length > 1,
    observers: condition && clients.value.length
  }
})

const filteredMembers = computed(() => {
  return members.value.filter(item => bookOwner.value?.userId !== item.userId && item.userId !== user.value?.id)
})

watch(() => route.query.showInviteModal, (value) => {
  if (value === 'client') {
    switcherState.value = { index: 1, key: 'observers' }
    toggleState()
  } else {
    replaceRouterQuery({ showInviteModal: null })
  }
})

onBeforeMount(async () => {
  if (props.book) {
    const { data } = await bookService.getBookById(props.book.id)
    currentBook.value = props.book
    bookOwner.value = data.owner
  }
})

onMounted(() => {
  if (!props.enableMultiselect) {
    selectedBooks.value.push(currentBook.value?.id)
  }

  switcherState.value = props.type === 'member'
    ? { index: 0, key: 'team-members' }
    : { index: 1, key: 'observers' }

  if (switcherState.value.index === 0) {
    if (allowAddMembers.value) {
      nextTick(() => emailsRef.value?.focus())
    } else {
      switcherState.value = { index: 1, key: 'observers' }
    }
  }
})

function checkClientAccess (clientId: number) {
  return !!currentBook.value?.clients.some(m => m.user.id === clientId)
}

function checkMemberAccess (userId: number) {
  return !!currentBook.value?.shareWith.some(m => m.id === userId)
}

function close () {
  preventBodyScroll(false)
  replaceRouterQuery({ showInviteModal: null })
  emit('close')
}

function onSelect (value) {
  selectedBooks.value = value

  const allSelectedBooks = books.value.filter(b => selectedBooks.value.includes(b.id))
  selectedBooksTitle.value = allSelectedBooks[0] ? allSelectedBooks.map(item => item.title).join(', ') : ''
}

function checkEmail (email) {
  // eslint-disable-next-line no-useless-escape
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email.trim()).toLowerCase())
}

function invite () {
  const emailsArray = emails.value
    .split(',')
    .reduce((acc, curr) => {
      if (checkEmail(curr)) {
        acc.push(curr.trim())
      }
      return acc
    }, [])

  const bookIds = selectedBooks.value

  if (emailsArray.length > 0) {
    emailsArray.forEach(item => {
      emailValidation(item)
    })

    const methodName = switcherState.value.index === 0 ? 'inviteMembers' : 'inviteClients'

    teamsService[methodName]({ emails: emailsArray, bookIds }).then(() => {
      emails.value = ''
      getTemporaryMembers()
      setNotification({
        uuid: window.crypto.randomUUID(),
        message: 'Invite successfully sent'
      })

      close()
    }).catch((err) => {
      if (err.data.error.code === 0) {
        setNotification({
          uuid: window.crypto.randomUUID(),
          message: 'This person is already added to your spaces, you can enable access in each space using the toggle.'
        })
      }
      const error = err.data.error.message.split('emails[')

      if (error.length > 0) {
        const index = parseInt((error[1]))

        if (emailsArray[index]) {
          setNotification({
            uuid: window.crypto.randomUUID(),
            message: `Email ${emailsArray[index]} is not valid`
          })
        }
      }
    })
  }
}

function toggleModal (value) {
  openBookModal.value = value
}

function closeModal () {
  openBookModal.value = false
}

function toggleState () {
  if (switcherState.value.index === 0 && !allowAddMembers.value) {
    toggleLimitModal({ show: true, type: 'users' })
    close()
  } else {
    nextTick(() => emailsRef.value?.focus())
  }

  if (switcherState.value.index === 1) {
    selectedBooks.value = [options.value[0].id]

    const allSelectedBooks = books.value.filter(b => selectedBooks.value.includes(b.id))

    selectedBooksTitle.value = allSelectedBooks[0].title
  } else {
    selectedBooks.value = []
    selectedBooksTitle.value = ''
  }
}

async function toggleMember (invite: boolean, member) {
  if (invite) {
    await addMember(member)
  } else {
    await deleteMember(member)
  }
}

async function deleteMember (member) {
  try {
    await teamsService.removeMemberFromSpace({
      memberId: member.id,
      bookId: props.book?.id || currentBook.value.id
    })
    currentBook.value.shareWith = currentBook.value.shareWith.filter(item => item.id !== member.id)
  } catch (error) {
    console.log(error)
  }
}

async function addMember (member) {
  try {
    await teamsService.addMemberToSpace({
      memberId: member.id,
      bookId: props.book?.id || currentBook.value.id
    })
    currentBook.value.shareWith.push(member)
  } catch (error) {
    console.log(error)
  }
}

async function addClientAccessToBook (client) {
  try {
    await clientService.addClientAccessToBook({
      clientId: client.user.id,
      bookId: props.book?.id || currentBook.value.id
    })
    currentBook.value.clients.push(client)
  } catch (error) {
    console.log(error)
  }
}

async function removeClientAccessFromBook (client) {
  try {
    await clientService.removeClientAccessFromBook({
      clientId: client.user.id,
      bookId: props.book?.id || currentBook.value.id
    })
    currentBook.value.clients = currentBook.value.clients.filter(item => item.id !== client.id)
  } catch (error) {
    console.log(error)
  }
}

async function toggleClient (invite: boolean, client) {
  if (invite) {
    await addClientAccessToBook(client)
  } else {
    await removeClientAccessFromBook(client)
  }
}

function clickInvite () {
  if (!isPersonalPlan.value || switcherState.value.index === 1) {
    invite()
  } else {
    confirmRef.value?.open()
  }
}
</script>
