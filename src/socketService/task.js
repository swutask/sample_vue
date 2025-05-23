import { computed } from 'vue'

export default () => {
  const {
    handleUpdateTask,
    handleDeleteTask,
    handleDeleteSubTask,
    addTask,
    addSubTask, handleUpdateRow, handleDeleteRow, addRow,
    handleAssignMember
  } = useTask()

  function orderTask (parsedData) {
    parsedData.payload.value.forEach((item, index) => {
      handleUpdateTask({
        id: item,
        order: index
      })
    })
  }

  function updateTask (parsedData) {
    handleUpdateTask({
      id: parsedData.payload.id,
      ...parsedData.payload.value
    })
  }

  function createTask (parsedData) {
    if (parsedData.payload.value.parentId) {
      addSubTask({ value: parsedData.payload.value })
    } else {
      addTask(parsedData.payload.value)
    }
  }

  function deleteTask (parsedData) {
    if (parsedData.payload.value.parentId) {
      handleDeleteSubTask({
        value: {
          id: parsedData.payload.value.id,
          parentId: parsedData.payload.value.parentId
        }
      })
    } else {
      handleDeleteTask(parsedData.payload.value)
    }
  }

  function orderRow (parsedData) {
    parsedData.payload.value.forEach((item, index) => {
      handleUpdateRow({
        id: item,
        order: index
      })
    })
  }

  function updateRow (parsedData) {
    handleUpdateRow({
      id: parsedData.payload.id,
      ...parsedData.payload.value
    })
  }

  function createRow (parsedData) {
    addRow(parsedData.payload.value)
  }

  function deleteRow (parsedData) {
    handleDeleteRow(parsedData.payload.value)
  }

  function assignMemberToTask (parsedData) {
    handleAssignMember({
      task: parsedData.payload.value.task,
      memberId: parsedData.payload.value.memberId
    })
  }

  function initTasks (parsedData, route) {
    const isTaskBoard = computed(() => route.name === 'TaskBoard' || route.name === 'TaskBoardTeam')

    if (parsedData.payload.type === 'order') {
      orderTask(parsedData)
    } else if (parsedData.payload.type === 'assignMember') {
      assignMemberToTask(parsedData)
    } else if (parsedData.payload.type === 'update') {
      updateTask(parsedData)
    } else if (parsedData.payload.type === 'create') {
      createTask(parsedData)
    } else if (parsedData.payload.type === 'delete') {
      deleteTask(parsedData)
    } else if (parsedData.payload.type === 'orderRow' && isTaskBoard.value && +route.params.id === parsedData.payload.bookId) {
      orderRow(parsedData)
    } else if (parsedData.payload.type === 'updateRow' && isTaskBoard.value && +route.params.id === parsedData.payload.bookId) {
      updateRow(parsedData)
    } else if (parsedData.payload.type === 'createRow' && isTaskBoard.value && +route.params.id === parsedData.payload.bookId) {
      createRow(parsedData)
    } else if (parsedData.payload.type === 'deleteRow' && isTaskBoard.value && +route.params.id === parsedData.payload.bookId) {
      deleteRow(parsedData)
    }
  }

  return {
    initTasks
  }
}
