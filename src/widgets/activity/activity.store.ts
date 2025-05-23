const useActivityStore = defineStore('activity', () => {
  const taskActivities = ref<ITaskActivity[]>([])
  const bookActivities = ref<IBookActivity[]>([])
  const inboxActivities = ref<IBookActivity[]>([])
  const inboxPrivateActivities = ref<IBookActivity[]>([])

  function handleDeleteNotification (id: number, type = 'private') {
    if (type === 'private') {
      inboxPrivateActivities.value = inboxPrivateActivities.value?.filter(item => item.id !== id)
    } else {
      inboxActivities.value = inboxActivities.value?.filter(item => item.id !== id)
    }
  }

  async function clearInboxActivity () {
    try {
      const { notifications } = useInbox()
      await Promise.all([
        await activityService.clearInboxActivity('public'),
        await activityService.clearInboxActivity('private'),
        await activityService.deleteNotifications()
      ])

      inboxActivities.value = []
      notifications.value.general = []
      notifications.value.personal = []
      inboxPrivateActivities.value = []
    } catch (error) {
      console.log(error)
    }
  }

  function handleUpdateInboxStatus (ids: number[]) {
    inboxActivities.value = inboxActivities.value?.map(item => {
      if (ids.includes(item.id)) {
        return {
          ...item,
          status: 'read'
        }
      }
      return item
    })

    inboxPrivateActivities.value = inboxPrivateActivities.value?.map(item => {
      if (ids.includes(item.id)) {
        return {
          ...item,
          status: 'read'
        }
      }
      return item
    })
  }

  async function getTaskActivities (taskId: number) {
    const { data } = await activityService.getTaskActivities(taskId)

    taskActivities.value = data.taskActivities

    return data.taskActivities
  }

  async function getBookActivities (bookId: number) {
    const { data } = await activityService.getBookActivities(bookId)

    bookActivities.value = data.bookActivities

    return data.bookActivities
  }

  async function getInboxLatestActivities (type = 'public') {
    try {
      const { data } = await activityService.getInboxActivities(type)

      if (type === 'public') {
        inboxActivities.value = data.inboxActivities
      } else {
        inboxPrivateActivities.value = data.inboxActivities
      }

      return data.inboxActivities
    } catch (error) {
      console.log(error)
    }
  }

  async function deleteInbox (id: number, type = 'private') {
    await activityService.deleteInbox(id)
    handleDeleteNotification(id, type)
  }

  async function updateInboxNotificationStatus (inboxActivityIds: number[]) {
    await activityService.updateInboxNotificationsStatus({ inboxActivityIds })
    handleUpdateInboxStatus(inboxActivityIds)
  }

  return {
    taskActivities,
    bookActivities,
    inboxActivities,
    inboxPrivateActivities,
    getTaskActivities,
    getBookActivities,
    getInboxLatestActivities,
    deleteInbox,
    updateInboxNotificationStatus,
    clearInboxActivity
  }
})

export function useActivity () {
  const store = useActivityStore()

  return {
    ...store,
    ...storeToRefs(store)
  }
}
