<template>
  <TaskBoardModalView v-if="!isScreenTaskView || !isLargeScreen" />

  <TaskBoardFullScreenView v-else />
</template>

<script setup lang="ts">
import useTaskModal from '@/pages/task-board/useTaskModal'

const { isScreenTaskView } = useTask()
const { getRows } = useTask()
const { isLargeScreen } = useGeneral()
const { modalTask } = useTaskModal()

const route = useRoute()

onMounted(async () => {
  if (route.name === 'Today') {
    await getRows(modalTask.value.bookId)
  }
})
</script>
