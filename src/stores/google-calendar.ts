import { defineStore } from 'pinia'

const useGoogleCalendarStore = defineStore('planner', () => {
  const showGooglePopup = ref(true)
  const allowSendToGoogle = ref(false)
  const showGoogleCalendarLabel = ref(false)
  const calendarSynced = ref(false)

  async function checkGoogleSync () {
    const { data } = await googleCalendarService.checkSync()

    allowSendToGoogle.value = data?.allowSendToGoogle
    showGooglePopup.value = !data?.active
    showGoogleCalendarLabel.value = data?.active || false
    calendarSynced.value = data?.active
  }

  async function deleteGoogleSync () {
    await googleCalendarService.deleteGoogleSync()

    showGooglePopup.value = true
    calendarSynced.value = false
  }

  async function toggleGoogleEvents (value) {
    await googleCalendarService.toggleGoogleEvents(value)

    allowSendToGoogle.value = value
  }

  return {
    showGooglePopup,
    allowSendToGoogle,
    showGoogleCalendarLabel,
    calendarSynced,

    checkGoogleSync,
    deleteGoogleSync,
    toggleGoogleEvents
  }
})

export function useGoogleCalendar () {
  const store = useGoogleCalendarStore()

  return {
    ...store,
    ...storeToRefs(store)
  }
}
