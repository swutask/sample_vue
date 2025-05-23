import $axios from '@/core/api-config'

class ReminderService {
  setReminder (data: IReminderRequestBody) {
    return $axios.post('/api/reminders', data)
  }

  updateReminder (reminderId: number, data: IReminderRequestBody) {
    return $axios.put(`/api/reminders/${reminderId}`, data)
  }

  deleteReminder (reminderId: number) {
    return $axios.delete(`/api/reminders/${reminderId}`)
  }

  getReminderSettings () {
    return $axios.get('/api/reminders/settings')
  }

  updateReminderSettings (data: IReminderSettingsRequestBody) {
    return $axios.put('/api/reminders/settings', data)
  }
}

export const reminderService = new ReminderService()
