import { computed } from 'vue'

export default () => {
  const { getBookActivities, getTaskActivities, getInboxLatestActivities } = useActivity()

  function getBookLatestActivities (parseData) {
    getBookActivities(parseData.payload.activity.data.bookId)
  }

  function getTaskLatestActivities (parseData) {
    getTaskActivities(parseData.payload.taskId)
  }

  function initLatestActivity (parsedData, router) {
    const taskIdQuery = +router.query?.taskId === parsedData.payload.taskId
    const isTaskBoard = computed(() => router.name === 'TaskBoard' || router.name === 'TaskBoardTeam')
    const bookId = +router.params?.id === parsedData.payload.activity.data.bookId

    if (parsedData.payload.type === 'addBookActivity' && bookId) {
      getBookLatestActivities(parsedData)
    }

    if (parsedData.payload.type === 'addInboxActivity') {
      getInboxLatestActivities()
      getInboxLatestActivities('private')
    }

    if (parsedData.payload.type === 'addTaskActivity' && isTaskBoard && taskIdQuery) {
      getTaskLatestActivities(parsedData)
    }
  }

  return {
    initLatestActivity
  }
}
