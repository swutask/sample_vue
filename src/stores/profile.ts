import { timezones } from '@/components/settings/timezones'

const useProfileStore = defineStore('profile', () => {
  const user = ref<IUser>(null)
  const quickThoughts = ref<string>(null)

  const isClient = computed(() => user.value?.isClient)

  function setUser (payload: IUser) {
    user.value = payload
  }

  function setUserAvatar (payload: string) {
    user.value.avatar = { url: payload }
  }

  async function getQuickThoughts () {
    const data = await profileService.getQuickThoughts()

    quickThoughts.value = data.data.text
  }

  function updateQuickThoughts (text: string) {
    quickThoughts.value = text
    profileService.updateQuickThoughts(text)
  }

  function getProfile () {
    return profileService.profile().then(({ data }) => {
      setUser(data)
      return Promise.resolve(data)
    })
  }

  function updateTimezone () {
    if (!user.value?.profile?.timezone) {
      const timezone = timezones.find(item => {
        const timezone = user.value.profile?.timezone?.split(' ')[1] || Intl.DateTimeFormat().resolvedOptions().timeZone

        return item.name.split(' ')[1] === timezone
      })

      profileService.update({ timezone: timezone?.name })
    }
  }

  return {
    user,
    isClient,
    quickThoughts,
    setUser,
    getProfile,
    setUserAvatar,
    updateTimezone,
    getQuickThoughts,
    updateQuickThoughts
  }
})

export function useProfile () {
  const store = useProfileStore()

  return {
    ...store,
    ...storeToRefs(store)
  }
}
