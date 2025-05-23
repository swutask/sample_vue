const useGeneralStore = defineStore('general', () => {
  const loading = ref(false)
  const bookLoading = ref(false)
  const notifications = ref<INotification[]>([])
  const confettiMessage = ref('')
  const notificationDefaultTimeout = ref(5000)
  const innerWidth = ref(0)
  const showSearch = ref(false)
  const highlightedText = ref('')
  const allowHotKey = ref(true)

  const isMobile = computed(() => innerWidth.value < 768)
  const isLargeScreen = computed(() => innerWidth.value > 992)
  const isAttachmentPreview = ref(false)

  function blockHotKey (value) {
    allowHotKey.value = !value
  }

  function setHighlightedText (value: string) {
    highlightedText.value = value
  }

  function handleLoading (value: boolean) {
    loading.value = value
  }

  function toggleBookLoading (value: boolean) {
    bookLoading.value = value
  }

  function setInnerWidth (value: number) {
    innerWidth.value = value
  }

  function setConfettiMessage (value: string, timeout = 4000) {
    confettiMessage.value = value

    setTimeout(() => {
      confettiMessage.value = null
    }, timeout || notificationDefaultTimeout.value)
  }

  function setNotification (value: INotification) {
    notifications.value.push(value)

    setTimeout(() => {
      notifications.value = notifications.value.filter(item => item.uuid !== value.uuid)
    }, value.timeout || notificationDefaultTimeout.value)
  }

  function removeNotification (uuid: string) {
    notifications.value = notifications.value.filter(item => item.uuid !== uuid)
  }

  function toggleSearch (value: boolean) {
    showSearch.value = value
  }

  async function getGlobalData () {
    try {
      const { getMembers } = useTeam()
      const { isClient } = useProfile()
      const { getSettings } = useSettings()
      const { getNotifications, getInboxes } = useInbox()
      const { getProjects } = useProject()
      const { getInboxLatestActivities } = useActivity()
      const { isExpired, getCurrentPlan, getPlans, getStats } = usePlan()
      const { getBooks } = useBook()
      const { checkGoogleSync } = useGoogleCalendar()
      const { getUnreadMessageCount } = useChat()
      const { getReminderSettings } = useReminder()
      const { getOnboarding } = useOnboarding()

      await getPlans()
      await getCurrentPlan()

      if (isExpired.value) throw new Error('subscription expired')

      const methods = [
        getStats(),
        getProjects(),
        getSettings(),
        getReminderSettings(),
        getMembers(),
        getUnreadMessageCount()
      ]

      if (!isClient.value) {
        methods.push(
          getOnboarding(),
          getInboxes(),
          checkGoogleSync(),
          getNotifications(),
          getInboxLatestActivities('public'),
          getInboxLatestActivities('private')
        )

        await getBooks()
      }

      Promise.all(methods)

      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
  }

  return {
    // data
    loading,
    bookLoading,
    notifications,
    innerWidth,
    showSearch,
    highlightedText,
    isMobile,
    allowHotKey,
    isAttachmentPreview,
    notificationDefaultTimeout,
    confettiMessage,
    // function
    blockHotKey,
    setHighlightedText,
    setNotification,
    setConfettiMessage,
    removeNotification,
    handleLoading,
    toggleBookLoading,
    setInnerWidth,
    toggleSearch,
    getGlobalData,
    isLargeScreen
  }
})

export function useGeneral () {
  const store = useGeneralStore()

  return {
    ...store,
    ...storeToRefs(store)
  }
}
