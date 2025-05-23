const useReminderStore = defineStore('reminder', () => {
  const showReminderUpgradeModal = ref(false)
  const reminderSettings = ref<IReminderSettings>(null)

  async function createReminder (payload: IReminderRequestBody, task: ITask) {
    const { setNotification } = useGeneral()

    const reminder = await reminderService.setReminder(payload).then(({ data }) => {
      setNotification({
        id: data.reminder.id,
        uuid: window.crypto.randomUUID(),
        hasUndo: true,
        type: 'reminder',
        message: 'Reminder set'
      })

      return data.reminder
    })
      .catch((err) => {
        setNotification({ uuid: window.crypto.randomUUID(), message: err.data?.error?.message, color: 'error' })
      })

    const { handleUpdateTask } = useTask()

    handleUpdateTask({
      ...task,
      reminders: [reminder]
    })

    return reminder
  }

  async function updateReminder (reminderId: number, data: IReminderRequestBody) {
    const { setNotification } = useGeneral()
    const { handleUpdateTask, modalTask } = useTask()

    const newReminder = {
      ...modalTask.value.reminders[0],
      remindAt: data.date
    }

    handleUpdateTask({
      ...modalTask.value,
      reminders: [newReminder]
    })

    reminderService.updateReminder(reminderId, data)
      .catch((err) => {
        setNotification({ uuid: window.crypto.randomUUID(), message: err.data.error.message, color: 'error' })
      })
  }

  async function deleteReminder (reminderId: number) {
    const { handleUpdateTask, modalTask } = useTask()

    handleUpdateTask({
      ...modalTask.value,
      reminders: []
    })

    reminderService.deleteReminder(reminderId)
  }

  async function getReminderSettings () {
    reminderService.getReminderSettings().then((data) => {
      reminderSettings.value = data.data.reminderSettings
    })
  }

  async function updateReminderSettings (data: IReminderSettingsRequestBody) {
    reminderService.updateReminderSettings(data).then(() => {
      getReminderSettings()
    })
  }

  return {
    showReminderUpgradeModal,
    reminderSettings,

    createReminder,
    updateReminder,
    deleteReminder,
    getReminderSettings,
    updateReminderSettings
  }
})

export function useReminder () {
  const store = useReminderStore()

  return {
    ...store,
    ...storeToRefs(store)
  }
}
