<template>
  <div>
    <div v-if="localThread.length" class="!border-l-4 border-grey-500 rounded-0 pl-10 my-15 space-y-10">
      <DepthPageChatMessage
        v-for="threadMessage in localThread"
        :key="threadMessage.id"
        :message="threadMessage"
        class="group-scope"
        :bookId="bookId"
        :fileId="fileId"
        portal
        @editMessage="editMessage"
        @onDelete="deleteThreadMessage"
      />
    </div>

    <ChatEditor
      v-if="!message.threadId"
      id="depthPageChatEditor"
      ref="editorRef"
      editorClass="depthPageChatEditor"
      isActiveOnFocus
      isDepthPageChat
      :bookId="bookId"
      :chatId="message.chatId"
      :threadId="message.id"
      @updateMessage="updateThreadMessage"
      @onSend="$emit('onSend')"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  message: IMessage
  fileId?: number
  bookId?: number
}>()

defineEmits(['onDeleteMessage', 'onAddMessage', 'onSend'])

const {
  threadMessages,
  getThread,
  updateThreadMessage,
  deleteThreadMessage,
  threadReactions
} = useChat()

const editorRef = ref()

const localThread = computed(() => {
  return threadMessages.value.filter(threadMessage => threadMessage.threadId === props.message.id).reverse()
})

onMounted(async () => {
  await getThread(props.message.id, props.message.chatId)
})

onBeforeUnmount(() => {
  removeUnmountedThread()
  removeUnmountedReactions()
})

function editMessage (event: IMessage) {
  editorRef.value.editMessage(event)
}

function removeUnmountedThread () {
  threadMessages.value = threadMessages.value.filter((item) => item.threadId !== props.message.id)
}

function removeUnmountedReactions () {
  const localThreadMessagesIds = localThread.value.map(item => item.id)
  threadReactions.value = threadReactions.value.filter((item) => localThreadMessagesIds.includes(item.messageId))
}

</script>
