<template>
  <div
    class="text-app-color flex items-center truncate"
    :class="{'cursor-pointer': task?.integrationType}"
  >
    <BookLabel
      :showTitle="false"
      class="font-semibold text-13 mr-5"
      :bookId="selectedBook?.id"
      :googleEvent="!!task.integrationType"
      size="w-18 h-18"
      :showTooltip="!!task?.integrationType"
    />

    <TitleEditor
      :key="task.title"
      :content="task?.startEventTime ? `${task.startEventTime} ${task.title}` : task?.title"
      disabled
      class="task-event-title w-full bg-transparent max-h-28 overflow-hidden block multi-truncate-editor"
      style="--mt-lines: 1;"
      :class="{ 'line-through opacity-40 dark:opacity-70': !!task.completedAt }"
      :taskId="task.id"
      :bookId="task.bookId"
      editorClass="task-event-editor-class"
      editorId="task-event-editor-id"
    />

    <i v-if="task.reminders?.length" class="icon-alarm text-13 ml-3" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  selectedBook: IBook
  title?: string
  task?: ITask
  arg?: any // TODO: create an interface for arg
  modelValue?: boolean
}>()

const router = useRouter()
const route = useRoute()

watch(() => route.query.additionalInfo, (value) => {
  if (value) {
    router.push({ query: { taskId: props.task.id } })
  }
})

watch(() => route.query, (value) => {
  const id = value.taskId || value.highlight
  if (id && +id === props.task.id) {
    router.push({ query: { taskId: props.task.id } })
  }
})

onMounted(() => {
  nextTick(() => {
    if (+route.query.taskId === props.task.id || +route.query?.highlight === props.task.id) {
      router.push({ query: { taskId: props.task.id } })
    }
  })
})

// function setEventColor ({ color, isSelected }) {
//   let preparedColor = color
//   if (isSelected) {
//     preparedColor = props.task.taskTags[0]?.color
//   }

//   const { borderClass, borderColor } = plannerService.eventColor(preparedColor)

//   emit('update:modelValue', true)
//   props.arg.event.setProp('classNames', borderClass)
//   props.arg.event.setProp('borderColor', borderColor)

//   if (props.task.taskTags.length === 1) {
//     setTimeout(() => {
//       emit('update:modelValue', true)
//       props.arg.event.setProp('classNames', borderClass)
//       props.arg.event.setProp('borderColor', borderColor)
//     }, 300)
//   }

//   emit('update:modelValue', false)
// }

// function setEventDate ({ date, type = 'start' }) {
//   if (type === 'all') {
//     props.arg.event.setStart(date.start)
//     props.arg.event.setEnd(date.end)

//     return
//   }

//   if (type === 'start') {
//     props.arg.event.setStart(date)
//   } else {
//     props.arg.event.setEnd(date)
//   }
// }

function openModal () {
  if (props.task.htmlLink) {
    window.open(props.task.htmlLink, '_blank')
  } else {
    router.push({ query: { taskId: props.task.id } })
  }
}

defineExpose({
  openModal
})
</script>
