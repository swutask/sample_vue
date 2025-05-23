<template>
  <div v-clickOutside="save" class="flex items-center w-full">
    <input
      ref="titleInputRef"
      v-model="title"
      placeholder="Task title"
      class=" w-full text-12 mr-5 bg-transparent outline-none block text-app-color leading-tight h-18"
      maxlength="255"
      type="text"
      @click="clickOnTiTleInput"
      @keyup.enter="save"
      @keydown.space="handleSpaceInput"
    >
  </div>
</template>

<script setup lang="ts">
import { parseDate } from '@/plugins/filters'

const props = defineProps<{
  arg: any
  bookId: number
}>()

const emit = defineEmits(['removeTaskFromCalendar'])

const { allowSendToGoogle } = useGoogleCalendar()

const { todayBook } = useBook()
const { member } = useTeam()

const {
  rows,
  tasks,
  getRows,
  setTasks,
  createTask
} = useTask()

const titleInputRef = ref(null)
const title = ref('')

onMounted(() => {
  setTimeout(() => titleInputRef.value?.focus(), 100)
  getRows(props.bookId)
})

function clickOnTiTleInput () {
  setTimeout(() => titleInputRef.value?.blur(), 10)
  setTimeout(() => titleInputRef.value?.focus(), 11)
}

function handleSpaceInput () {
  title.value += ' '
}

async function save () {
  if (title.value.trim() === '') {
    return emit('removeTaskFromCalendar')
  }

  const eventTitle = title.value

  const preparedDate = new Date(props.arg.endStr)
  preparedDate.setDate(preparedDate.getDate() - 1)

  const endDate = parseDate(preparedDate, 'YYYY-MM-DD')

  const row = rows.value.find(r => r.title.toLocaleLowerCase() === 'to do') || rows.value[0]

  const taskData = {
    title: eventTitle,
    subTitle: '',
    additionalInfo: '',
    taskRowId: row.id,
    startDate: props.arg.startStr,
    endDate,
    addToGoogle: allowSendToGoogle.value,
    bookId: props.bookId,
    isToday: props.bookId === todayBook.value?.id,
    teamMembers: props.bookId === todayBook.value?.id ? [member.value.id] : []
  }

  const { data } = await createTask(taskData)

  const localTasks = tasks.value
  localTasks.push(data)
  setTasks(localTasks)

  title.value = ''
  emit('removeTaskFromCalendar')
}

// function updateTitle (value) {
//   title.value = value
// }

defineExpose({
  save
})

</script>
