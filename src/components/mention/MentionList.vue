<template>
  <div class="tippy-box bg-primary">
    <template v-if="items.length">
      <div
        v-for="(item, index) in items"
        :key="item.id"
        :ref="el => mentionRefs[index] = el"
        class="mention-item max-w-[200px] flex items-center py-5 px-10 cursor-pointer text-app-color
        last:mb-0 no-scroll-bar last:rounded-b-10 text-14 hover:bg-grey-f3f5f7"
        :class="[
          {'bg-grey-f3f5f7': selectedIndex === index},
          getMentionClass(item.label)
        ]"
        @click.stop="selectItem(index)"
      >
        <MentionUser v-if="item.label === 'users'" :item="item" />

        <MentionItem v-else :item="item" />
      </div>
    </template>

    <div v-else class="p-10 text-grey-275 text-14">
      No result
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  items: IMentionItem[]
  editor: any
  command: (data: any) => void
  selectMention?: (data: any) => void
}>()

const { isTeamAccount, team } = useTeam()

const selectedIndex = ref(0)

const mentionRefs = ref([])

onBeforeUpdate(() => {
  mentionRefs.value = []
})

watch(() => props.items, () => {
  selectedIndex.value = 0
})

function getMentionClass (label: string) {
  const classes = {
    'complex-project': 'mention-project',
    users: 'mention-user',
    'complex-task': 'mention-tasks',
    'complex-attachment': 'mention-attachment'
  }

  return classes[label]
}

function onKeyDown ({ event }) {
  if (event.key === 'ArrowUp') {
    upHandler()
    return true
  }

  if (event.key === 'ArrowDown') {
    downHandler()
    return true
  }

  if (event.key === 'Enter') {
    enterHandler()
    return true
  }

  return false
}

function upHandler () {
  selectedIndex.value = ((selectedIndex.value + props.items.length) - 1) % props.items.length
  mentionRefs.value[selectedIndex.value].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
}

function downHandler () {
  selectedIndex.value = (selectedIndex.value + 1) % props.items.length
  mentionRefs.value[selectedIndex.value].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
}

function enterHandler () {
  selectItem(selectedIndex.value)
}

function selectItem (index: number) {
  const item = props.items[index]

  if (item) {
    if (item.label === 'users') {
      props.command({
        id: item.id,
        title: item.firstName,
        lastName: item.lastName || '',
        label: item.label,
        color: item.color,
        avatar: item.avatar?.url
      })

      if (item.sendImmediately) {
        const span = document.createElement('span')
        span.innerHTML = props.editor.getHTML().replace(/(<([^>]+)>)/ig, '\n')

        const index = span.textContent?.lastIndexOf(item.firstName)

        bookService.mentionMember({
          memberId: item.id,
          projectId: item.projectId,
          chatId: item.chatId,
          bookId: item.bookId,
          taskId: item.taskId,
          message: span.textContent.slice(index, 255 + index)
        })
      } else {
        if (props.selectMention && typeof props.selectMention === 'function') {
          props.selectMention(item)
        }
      }
    } else {
      props.command({
        href: generateLink(item),
        title: item.title,
        label: item.label
      })
    }

    if (props.editor) props.editor.chain().focus().run()
  }
}

function generateLink (item: IMentionItem) {
  const teamLink = isTeamAccount.value ? `/${team.value.link}` : ''

  switch (item.label) {
    case 'complex-project':
      return `${teamLink}/space/${item.bookId}?page=${item.id}`
    case 'complex-task':
      return `${teamLink}/task-board/${item.bookId}?taskId=${item.id}`
    case 'complex-attachment':
      return `${teamLink}/files/${item.bookId}?fileId=${item.id}`
    default:
      return `${teamLink}/`
  }
}

defineExpose({
  onKeyDown
})
</script>
