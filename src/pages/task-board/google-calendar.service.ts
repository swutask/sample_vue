import $axios from '@/core/api-config'

class GoogleCalendarService {
  goToCalendar () {
    return $axios.get('/api/auth/oauth/google/calendar')
  }

  checkSync () {
    return $axios.get('api/google-calendar/synced')
  }

  getCalendarList () {
    return $axios.get('api/google-calendar/getCalendars')
  }

  toggleGoogleEvents (value) {
    return $axios.put('api/google-calendar', { allowSendToGoogle: value })
  }

  deleteGoogleSync () {
    return $axios.delete('api/google-calendar')
  }
}

export const googleCalendarService = new GoogleCalendarService()
