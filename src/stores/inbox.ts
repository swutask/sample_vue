import { defineStore } from 'pinia'
import { inboxService } from '@/services'

const notificationLabels = {
  ProjectInvite: "You're invited to a space",
  RoleChange: 'Your workspace role changed to',
  TaskAssign: "You're assigned to a task",
  TaskUnassign: "You're unassigned from a task",
  TaskChange: 'An attribute of a task has been changed',
  TaskCommentAdd: 'A comment is added to a task',
  TaskCompleted: 'A task is completed',
  ChatMessageReceive: 'You received a new chat message',
  MentionCreate: 'You\'re mentioned'
}

const useInboxStore = defineStore('inbox', () => {
  const notifications = reactive({
    personal: [],
    general: []
  })

  const mutedUntil = ref(null)
  const receiveWeeklyPersonalEmailNotifications = ref(false)
  const latestActivity = ref([])
  const mappedRules = ref(null)
  const latestActivityCount = ref(null)

  function handleUpdateNotificationStatus ({ ids }) {
    notifications.personal = notifications.personal?.map(item => {
      if (ids.includes(item.id)) {
        return {
          ...item,
          status: 'read'
        }
      }
      return item
    })
  }

  function addLatestActivity (value) {
    const notifications = latestActivity.value

    notifications.unshift(value)

    latestActivity.value = notifications
    latestActivityCount.value++
  }

  function setLatestActivities ({ notifications, count }) {
    latestActivity.value = notifications
    latestActivityCount.value = count
  }

  function handleUpdateMappedRules (value) {
    const result = {}

    Object.entries(notificationLabels).forEach(([type, label]) => {
      result[type] = {
        push: value[`push${type}`],
        email: value[`email${type}`],
        originalKey: type,
        label
      }
    })

    mappedRules.value = result
    mutedUntil.value = value.mutedUntil
    receiveWeeklyPersonalEmailNotifications.value = value.receiveWeeklyPersonalEmailNotifications
  }

  function addNotification (value) {
    if (!value) return

    if (value?.title >= 1000) {
      if (latestActivity.value[0]?.bookId === value.bookId) {
        addLatestActivity(value)
      }
    } else {
      if (latestActivity.value[0]?.bookId === value.bookId) {
        addLatestActivity(value)
      }
      const localNotifications = notifications[value.category]

      localNotifications.unshift(value)

      notifications[value.category] = localNotifications
    }
  }

  async function getNotifications () {
    try {
      const { isTeamAccount } = useTeam()

      if (isTeamAccount.value) {
        const { data } = await inboxService.getAll()

        notifications.personal = data.notifications.personal.filter(item => item.title !== 13)
        notifications.general = data.notifications.general.filter(item => item.title !== 13)
      }

      return Promise.resolve()
    } catch (error) {
      console.log(error)
    }
  }

  async function getLatestActivities ({ bookId, limit = 50, page = 0 }) {
    const { data } = await inboxService.getByBookId({ bookId, limit, page })

    setLatestActivities(data)

    return data
  }

  async function updateNotificationStatus ({ ids }) {
    await inboxService.update({ ids })
    handleUpdateNotificationStatus({ ids })
  }

  async function deleteNotification ({ id, category }) {
    await inboxService.delete({ id })

    notifications[category] = notifications[category]?.filter(item => item.id !== id)
    latestActivity.value = latestActivity.value?.filter(item => item.id !== id)
  }

  async function getInboxes () {
    const { data } = await inboxService.getInboxes()

    handleUpdateMappedRules(data.inbox)
  }

  async function toggleNotifications ({ key, value }) {
    const { data } = await inboxService.updateInboxNotifications({ [key]: value })

    handleUpdateMappedRules(data.inbox)
  }

  async function turnOffAll (type) {
    const keys = Object.keys(mappedRules.value)

    const { data } = await inboxService.updateInboxNotifications(Object.fromEntries(
      keys.map((key: string) => [`${type}${key}`, false])
    ))

    handleUpdateMappedRules(data.inbox)
  }

  return {
    notifications,
    mutedUntil,
    mappedRules,
    receiveWeeklyPersonalEmailNotifications,

    addNotification,
    getNotifications,
    getLatestActivities,
    updateNotificationStatus,
    deleteNotification,
    getInboxes,
    toggleNotifications,
    turnOffAll
  }
})

export function useInbox () {
  const store = useInboxStore()

  return {
    ...store,
    ...storeToRefs(store)
  }
}
