<template>
  <transition-group name="fade">
    <div
      v-for="(notification, index) in notifications"
      :key="notification.uuid"
      class="fixed left-1/2 -translate-x-1/2 bg-primary
        w-[300px] max-w-full mx-auto rounded-[16px] z-[12000] overflow-hidden"
      :style="`bottom: ${index * (height + betweenGap) + bottomGap}px`"
      @click="close(notification)"
    >
      <div class="flex items-center relative min-h-[55px] bg-dark-200 dark:bg-sidebar rounded-8 pb-7 px-15">
        <div class="flex items-center w-full" :class="notification.hasUndo ? 'justify-start' : 'justify-center'">
          <i v-if="notification.color === 'success'" class="icon-check-circle text-white text-20 pt-13 pb-12 pr-10" />
          <i v-if="notification.color === 'error'" class="icon-warning text-white text-18 py-13 pr-10" />
          <!-- eslint-disable-next-line vue/no-v-html -->
          <p
            class="py-9 font-medium text-left text-[13.5px] text-sidebar dark:text-white"
            :class="notification.hasUndo ? 'max-w-[335px]' : 'max-w-[235px]'"
            v-html="notification.message"
          />
        </div>

        <div
          v-if="notification.hasUndo"
        >
          <ButtonModule
            text="Undo"
            type="dark"
            class="px-15 py-7 rounded-6 text-14 dark:bg-primary"
            @click="undo(notification)"
          />
        </div>
        <!-- <i
          v-if="!notification.hasUndo"
          class="icon-close absolute top-0 right-0 text-white cursor-pointer text-10 p-15"
          @click="close(notification)"
        /> -->
      </div>

      <ProgressBar :timeout="notification.timeout" class="absolute bottom-0 left-0 w-[93%]" />
    </div>
  </transition-group>
</template>

<script setup lang="ts">
const { deleteReminder } = useReminder()
const { restoreProject } = useProject()
const { restoreBook, restoreFolder } = useBook()
const { notifications, removeNotification } = useGeneral()
const { tasks, complete, updateTask, handleUpdateTask, undoMoveTo } = useTask()

const bottomGap = 20
const betweenGap = 15
const height = 55

function close (item: INotification) {
  removeNotification(item.uuid)
}

function unCompleteTask (item: INotification) {
  if (!item.task) return

  if (!tasks.value.find(t => t.id === item.task.id)) {
    tasks.value.splice(item.indexInArray, 0, item.task)
  }

  complete({
    id: item.id,
    bookId: item.bookId,
    completedAt: null,
    task: item.task,
    isSubTask: !!item.task.parentId
  })

  if (!item.task.parentId) {
    updateTask({
      id: item.id,
      bookId: item.bookId,
      order: item.task.order,
      taskRowId: item.task.taskRowId
    })

    handleUpdateTask({
      id: item.id,
      order: item.task.order,
      taskRowId: item.task.taskRowId
    })
  }
}

function undo (item: INotification) {
  switch (item.type) {
    case 'book':
      restoreBook(item.id)
      break
    case 'folder':
      restoreFolder(item.id)
      break
    case 'project':
      restoreProject(item.id)
      break
    case 'task':
      unCompleteTask(item)
      break
    case 'reminder':
      deleteReminder(item.id)
      break

    case 'taskBookChange':
      undoMoveTo(item.additionalInfo.newTaskId)
      break

    default:
      break
  }

  close(item)
}
</script>
