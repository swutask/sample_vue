import { sidebarService } from './sidebar.service'

const useSidebarStore = defineStore('sidebar', () => {
  const { team, members } = useTeam()
  const { unreadMessageCount } = useChat()
  const { isClient } = useProfile()
  const { clients } = useClient()

  const isSidebarCollapsed = ref(false)
  const isSidebarHovered = ref(false)

  const router = useRouter()
  const route = useRoute()

  const sidebarRoutes = ref<INavigationRoute[]>([
    { name: 'Today', icon: 'icon-perspectives text-18 !mr-7 px-2 opacity-80 hover:opacity-100', text: 'Overview', isVisible: true, id: 'onboardingOverviewMenuItem', unreadCount: false, isPined: true },
    { name: 'WeekPlanner', icon: 'icon-week-planner-sidebar text-19 !mr-8 !-ml-1 px-2 opacity-80 hover:opacity-100', text: 'Week planner', id: 'onboardingWeekPlannerItem', toolName: 'weekPlanner', isVisible: true, unreadCount: false, isPined: true, isForPro: true },
    { name: 'CalendarTeam', icon: 'icon-week_planner text-20 !mr-7 !-ml-2 px-2 opacity-80 hover:opacity-100', text: 'Calendar', id: 'onboardingCalendarMenuItem', toolName: 'calendar', isVisible: true, unreadCount: false, isPined: true },
    { name: 'Chat', icon: 'icon-chat-page text-16 !mr-8 -ml-2 px-2 opacity-80 hover:opacity-100', text: 'Chat', isVisible: false, toolName: 'chat', unreadCount: !!unreadMessageCount.value, isPined: false }
  ])

  const headerRoutes = ref<INavigationRoute[]>([
    { name: 'TeamBooks', icon: 'icon-books-v2 text-18 lg:text-22', text: 'Spaces', isVisible: true, id: 'onboardingProjectsMenuItemHeader', unreadCount: false, isPined: true },
    { name: 'Today', icon: 'icon-perspectives text-17 lg:text-21', text: 'Overview', isVisible: true, id: 'onboardingOverviewMenuItemHeader', unreadCount: false, isPined: true },
    { name: 'CalendarTeam', icon: 'icon-week_planner text-18 lg:text-22', toolName: 'calendar', id: 'onboardingCalendarMenuItemHeader', text: 'Calendar', isVisible: true, unreadCount: false, isPined: true },
    { name: 'WeekPlanner', icon: 'icon-week-planner-sidebar text-18 lg:text-22', toolName: 'weekPlanner', id: 'onboardingWeekPlannerItemHeader', text: 'Week planner', isVisible: true, unreadCount: false, isPined: true, isForPro: true },
    { name: 'Chat', icon: 'icon-chat-page text-17', text: 'Chat', toolName: 'chat', isVisible: false, unreadCount: !!unreadMessageCount.value, isPined: true }
  ])

  function showDot (item: INavigationRoute) {
    return item?.name === 'Chat' ? unreadMessageCount.value : 0
  }

  const setActiveStyle = computed(() => (routeName) => {
    if (routeName === route.name) {
      return 'text-dark-500 bg-grey-425 font-medium'
    }

    return 'text-grey-975'
  })

  watch(() => members.value, () => {
    sidebarRoutes.value = sidebarRoutes.value.map((item) => {
      if (item.name === 'Chat') {
        return {
          ...item,
          isVisible: members.value?.length > 1 || !!clients.value.length
        }
      }

      return item
    })

    if (!isClient.value) {
      headerRoutes.value = headerRoutes.value.map((item) => {
        if (item.name === 'Chat') {
          return {
            ...item,
            isVisible: members.value?.length > 1 || !!clients.value.length
          }
        }

        return item
      })
    }
  })

  const onMouseEnter = () => {
    isSidebarHovered.value = true
  }

  const onMouseLeave = () => {
    isSidebarHovered.value = false
  }

  function toggleSidebar () {
    const { user } = useProfile()
    const sidebarState = useLocalStorage.getItem('isSidebarCollapsedV2') || {}
    isSidebarCollapsed.value = !isSidebarCollapsed.value
    sidebarState[user.value.id] = isSidebarCollapsed.value
    useLocalStorage.setItem('isSidebarCollapsedV2', sidebarState)
  }

  async function getNavigationTools () {
    try {
      const res = await sidebarService.getNavigationTools()
      const tools = res?.data.tools

      sidebarRoutes.value = sidebarRoutes.value.map((route) => {
        route = {
          ...route,
          isPined: tools[route.toolName] ?? true
        }

        return route
      })

      headerRoutes.value = headerRoutes.value.map((route) => {
        route = {
          ...route,
          isPined: tools[route.toolName] ?? true
        }

        return route
      })
    } catch (error) {
      console.log(error)
    }
  }

  async function updatePinValue (event: INavigationRoute) {
    try {
      await sidebarService.updateSidebarTools({
        [event.toolName]: event?.isPined
      })

      sidebarRoutes.value = sidebarRoutes.value.map((route) => {
        if (route.name === event.name) {
          return event
        }

        return route
      })

      headerRoutes.value = headerRoutes.value.map((route) => {
        if (route.name === event.name) {
          return {
            ...route,
            isPined: event.isPined
          }
        }

        return route
      })
    } catch (error) {
      console.log(error)
    }
  }

  function navigationHandler (val: number | string) {
    const params: {
      team: string
      id?: number
    } = { team: team.value.link }
    const { isFreePlan, togglePlansInfoModal } = usePlan()
    const name = typeof val === 'string' ? val : sidebarRoutes.value[val]?.name

    if (sidebarRoutes.value[val]?.isForPro && isFreePlan.value) {
      togglePlansInfoModal(true)
      return
    }

    router.push({ name, params })
  }

  return {
    sidebarRoutes,
    headerRoutes,
    isSidebarCollapsed,
    isSidebarHovered,
    onMouseEnter,
    onMouseLeave,

    showDot,
    setActiveStyle,

    updatePinValue,
    getNavigationTools,
    toggleSidebar,
    navigationHandler
  }
})

export function useSidebar () {
  const store = useSidebarStore()

  return {
    ...store,
    ...storeToRefs(store)
  }
}
