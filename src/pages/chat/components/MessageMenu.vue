<template>
  <DropdownModule
    ref="messageMenuRef"
    prefix="icon-more-horizontal text-20"
    :width="150"
    :top-position="position"
    zIndex="z-9999"
    tooltipText="More"
    teleportTooltip
    tooltipTop
    class="anim-opacity md:opacity-0 group-scope-hover:opacity-70 hover:!opacity-100"
    :buttonClasses="buttonClasses"
    :class="{'md:opacity-100': showMenu}"
    removeOptionalTopGap
    defaultStyles
    background="bg-primary dark:bg-grey-110"
    is-auto-menu-position
    @click="showMenu = true"
    @close="showMenu = false"
  >
    <ButtonModule
      v-if="isOwner"
      text="Edit"
      prefix="icon-edit mr-15"
      class="pt-10 pb-8 px-10 w-full group-scope text-14"
      @click.stop="toggleEdit"
    />

    <ButtonModule
      v-if="!isClient"
      text="Create task"
      prefix="icon-task mr-15"
      class="px-10 py-8 w-full group-scope text-14"
      @click="openTaskModal"
    />

    <ButtonModule
      text="Copy link"
      prefix="icon-copy-link mr-15"
      class="px-10 py-8 w-full group-scope text-14"
      @click="copyLink"
    />

    <ButtonModule
      v-if="isOwner"
      text="Delete"
      prefix="icon-delete mr-15"
      class="pb-10 pt-8 px-10 w-full group-scope text-14"
      @click.stop="deleteMessage"
    />
  </DropdownModule>
</template>

<script setup lang="ts">
import { copy } from '@/core/helper-functions'

const props = withDefaults(defineProps<{
  message: IMessage
  position?: string
  bookId?: number | string
  privateChatUserId?: string | number
  fileId?: number
  buttonClasses?: string
}>(), {
  position: '30px',
  buttonClasses: '!p-4'
})

const emit = defineEmits(['deleteMessage', 'toggleEdit'])

const { user, isClient } = useProfile()
const { toggleNewTaskModal } = useTask()
const { setNotification } = useGeneral()
const { isTeamAccount, team } = useTeam()

const messageMenuRef = ref()
const showMenu = ref(false)
const route = useRoute()

const isOwner = computed(() => props.message.user?.id === user.value.id)

function deleteMessage () {
  emit('deleteMessage')
  messageMenuRef.value?.close()
}

function toggleEdit () {
  emit('toggleEdit')
  messageMenuRef.value?.close()
}

function openTaskModal () {
  const title = props.message.annotation ? props.message.annotation.text : props.message.text

  toggleNewTaskModal(true, { title })
}

function copyLink () {
  const teamUrlPart = isTeamAccount.value ? `/${team.value.link}` : ''
  const baseUrl = window.location.origin + teamUrlPart

  let newURL: string

  if (props.privateChatUserId) {
    newURL = `${baseUrl}/chat?chatId=${props.message.chatId}&messageId=${props.message.id}`
  } else if (props.fileId) {
    newURL = `${baseUrl}/files/${props.bookId}?fileId=${props.fileId}&messageId=${props.message.id}`
  } else if (props.bookId && route.name === 'TaskBoardTeam') {
    newURL = `${baseUrl}/task-board/${props.bookId}?taskId=${route.query?.taskId}&messageId=${props.message.id}`
  } else {
    const currentURL = window.location.href
    const messageIdParam = 'messageId=' + props.message.id

    if (currentURL.includes('?' + messageIdParam)) {
      newURL = currentURL.replace('?' + messageIdParam, '?' + messageIdParam)
    } else {
      newURL = currentURL.replace(/(\?|&)(messageId=\d+)/g, '') + '&' + messageIdParam
    }
  }

  if (props.message.threadId) {
    newURL = newURL + '&threadId=' + props.message.threadId
  }

  copy(newURL, () => setNotification({ uuid: window.crypto.randomUUID(), message: 'Link copied' }))
  messageMenuRef.value?.close()
}
</script>
