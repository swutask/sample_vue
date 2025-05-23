<template>
  <div
    v-if="loaded"
    class="flex w-full h-full bg-primary"
  >
    <!-- sidebar -->
    <MainSidebar
      v-if="!isSubscriptionExpirePage && !isSidebarCollapsed"
      class="hidden lg:flex shrink-0 w-sidebar"
    />

    <!-- main section -->
    <section
      class="flex flex-col flex-grow relative overflow-hidden"
      :class="isSidebarCollapsed ? 'bg-primary' : 'bg-secondary'"
    >
      <LoadingModule
        :loading="bookLoading && !mainLoading && (isBookPage || isToolPage)"
        class="z-9999"
        :class="isMobile ? 'fixed' : 'absolute'"
      />

      <LoadingModule class="fixed" :loading="mainLoading" />

      <!-- MainHeader -->
      <div class="flex transition-all w-full fixed top-0 backdrop-blur-xl z-[101]">
        <HeaderLayoutMobile v-if="!isLargeScreen && !isChat" class="flex lg:hidden" />

        <div
          class="hidden lg:flex px-28 flex-wrap justify-between w-full py-8 bg-primary/[0.8] absolute z-100"
          :class="[
            isSidebarCollapsed ? 'top-0 border-b border-grey-850' : '-top-[65px]'
          ]"
          style="height: var(--main-header-height)"
        >
          <div class="xl:w-[33%] flex items-center order-1">
            <LogoDropdown />
          </div>

          <div class="xl:w-[33%] flex justify-center mx-auto order-3 md:order-2">
            <NavigationBar />
          </div>

          <div class="xl:w-[33%] flex justify-end order-2 md:order-3">
            <RightHeaderTools />
          </div>
        </div>
      </div>

      <!-- Second Header -->
      <HeaderLayout
        v-if="!isSubscriptionExpirePage"
        :book="book"
        :class="isSidebarCollapsed ? 'pt-[65px]' : ''"
      />

      <PortalTarget name="subHeader" />

      <main
        id="main"
        class="overflow-y-auto flex justify-center bg-primary h-full"
        :class="{
          'scrollbar-gutter': !isCalendar && !isChat,
          'mt-3 mr-10 ml-15 shadow-lightest rounded-t-12': !isSidebarCollapsed && isLargeScreen
        }"
      >
        <router-view class="w-full h-full" />
      </main>

      <FooterMobile class="flex lg:hidden" />
    </section>

    <ChatWidget v-if="isTaskBoard && isLargeScreen && bookHasMembers" />

    <InstructionTooltips v-if="showInstructions && !isMobile" @close="closeInstructions" />
    <SettingsModal />
    <PlansInfoModal />
    <NewTaskModal />
    <ConfettiMessage />
    <DeleteSampleSpacesModal v-if="showDeleteSampleSpaceModal" />
    <UpgradePlanBar v-if="isTrialPlan && !isMobile && !isClient && isSidebarCollapsed" />
    <UpgradeFreePlan v-if="isFreePlan && !isMobile && !isClient && isSidebarCollapsed" />
    <TaskBoardModal v-if="modalTask && showTaskModal" />
    <!--temporary hidden-->
    <RecentNotes
      v-if="!isSubscriptionExpirePage && !isMobile && false"
      :data-onboarding-id="isSidebarCollapsed ? 'onboardingRecentNotesHeader' : 'onboardingRecentNotes'"
    />
    <WelcomeModal v-if="showWelcomeModalValue" @close="toggleInstructions" />
    <NewTaskButtonMobile />
  </div>

  <div v-if="showLogoutButton" class="fixed bottom-15 right-20 flex items-center z-9999">
    <ButtonModule type="transparent">
      <router-link to="/login">
        Log out
      </router-link>
    </ButtonModule>
  </div>
</template>

<script setup lang="ts">
import useSocket from '@/socketService/Socket.js'
import initOnboarding from '@/onboarding/initTeam'
import { useHomePageHotKeys } from '@/composables/useHotKeys'
import { isMoreThanDaysOld } from '@/core/helper-functions'

const stripeLoader = () => import(/* chunkName: Stripe */ '@stripe/stripe-js')

const { isSidebarCollapsed } = useSidebar()
const { settings } = useSettings()
const { user, isClient, getProfile, updateTimezone } = useProfile()
const {
  loading: mainLoading,
  bookLoading,
  isMobile,
  isLargeScreen,
  getGlobalData,
  handleLoading,
  setNotification
} = useGeneral()
const { setBooks, book, books, getBookChats } = useBook()
const { setTeam, getTeam } = useTeam()
const { showWelcomeModalValue } = useAuth()
const { subscription, upgradePlan, currentPlan, togglePlansInfoModal } = usePlan()
const { modalTask, showTaskModal, getTaskById } = useTask()
const { isTrialPlan, isFreePlan } = usePlan()
const { initMixpanel } = useMixpanel()

const route = useRoute()
const router = useRouter()
const { getClients, getClientBooks } = useClient()

const { initSocket } = useSocket()

initSocket()

const loaded = ref(false)
const showLogoutButton = ref(false)
const showDeleteSampleSpaceModal = ref(false)

const isBookPage = computed(() => ['Book', 'TeamBook'].includes(route.name as string))
const isToolPage = computed(() => ['TaskBoard', 'TaskBoardTeam', 'Chat', 'CalendarTeam'].includes(route.name as string))
const isTaskBoard = computed(() => ['TaskBoard', 'TaskBoardTeam'].includes(route.name as string))
const isChat = computed(() => route.name === 'Chat')
const isCalendar = computed(() => ['CalendarTeam'].includes(route.name as string))
const isSubscriptionExpirePage = computed(() => route.name === 'SubscriptionExpired')

const hasSampleSpaces = computed(() => books.value.filter(e => e.isSample).length > 0)

const bookHasMembers = computed(() => {
  const book = books.value?.find(e => e.id === +route.params?.id)

  return book.shareWith?.length > 1 || book.clients?.length || isClient.value
})

const showInstructions = ref(useLocalStorage.hasKey('showInstructions'))

watch(() => route.query, () => openTaskModal())

onMounted(async () => {
  try {
    // Used for redirect from email
    if (route.query.upgradeToday) {
      setTimeout(() => {
        togglePlansInfoModal(true)
      }, 600)
    }

    const localUser = await getProfile()

    const team = await initTeam(localUser.isClient)
    if (!team) return

    const startOnboarding = useLocalStorage.getItem('startOnboarding')

    if (!startOnboarding) handleLoading(true)

    await getGlobalData()

    initTheme()

    await getBookChats()
    const alreadyShowedDeleteSampleSpaces = useLocalStorage.getItem('alreadyShowedDeleteSampleSpaces') || {}

    if (hasSampleSpaces.value && isMoreThanDaysOld(localUser.createdAt, 2) &&
    !alreadyShowedDeleteSampleSpaces?.[localUser.id]) {
      alreadyShowedDeleteSampleSpaces[localUser.id] = true
      showDeleteSampleSpaceModal.value = true
    }

    useLocalStorage.setItem('alreadyShowedDeleteSampleSpaces', alreadyShowedDeleteSampleSpaces)

    loaded.value = true

    updatePlan(team.link)
    updateTimezone()

    if (import.meta.env.VITE_APP_ENV === 'production') {
      initOneSignal(localUser.id)
      initMixpanel(localUser, currentPlan.value?.name, team.name, team.id)
    }

    openTaskModal()

    if (startOnboarding) {
      showWelcomeModalValue.value = true

      useLocalStorage.removeItem('startOnboarding')
      initOnboarding({ settings: settings.value })
    }
  } catch (error) {
    loaded.value = true
    console.log(error)
  }
})

useHomePageHotKeys()

async function initTeam (isClient: boolean) {
  let team: ITeam | IClientTeams = null

  if (isClient) {
    const teams: IClientTeams[] = await getClientBooks()

    if (teams.length > 0) {
      const clientStorageData = useLocalStorage.getItem('clientStorage')

      let clientTeam = teams.find(t => t.id === clientStorageData?.teamId) || teams[0]

      if (clientTeam.books?.length === 0) {
        clientTeam = teams.find(t => t.books.length > 0) // return the first book or null if there is no book
      }

      setTeam(clientTeam)
      setBooks(clientTeam.books)
      team = clientTeam
    } else {
      setNotification({
        uuid: window.crypto.randomUUID(),
        message: 'You don\'t have access to any spaces yet'
      })

      showLogoutButton.value = true
      return null
    }

    isSidebarCollapsed.value = true
  } else {
    team = await getTeam()
    getClients()

    if (route.params.team !== team?.link) {
      router.replace({ params: { team: team?.link } })
    }

    const localSidebarState = useLocalStorage.getItem('isSidebarCollapsedV2')
    isSidebarCollapsed.value = localSidebarState?.[user.value.id]

    if (isMobile.value) {
      isSidebarCollapsed.value = true
    }
  }

  return team
}

function initTheme () {
  const html = document.getElementsByTagName('html').item(0)

  if (settings.value.theme === 'dark') {
    html.setAttribute('class', 'dark')
  }
}

function openTaskModal () {
  const id = route.query.taskId || route.query.highlight

  if (id) {
    getTaskById(+id)
  }
}

async function updatePlan (teamLink: string) {
  const planId = useLocalStorage.getItem('planId')

  if (!planId) return

  useLocalStorage.removeItem('planId')

  try {
    handleLoading(true)

    if (+subscription.value.planId === +planId) {
      router.push({ name: 'Today', params: { team: teamLink } })
    } else {
      const { loadStripe } = await stripeLoader()
      const stripe = await loadStripe(import.meta.env.VITE_APP_STRIPE)

      upgradePlan({
        planId,
        userId: user.value?.id
      }).then(res => {
        handleLoading(true)

        stripe.redirectToCheckout({ sessionId: res })
          .catch(() => handleLoading(false))
      })
    }
  } finally {
    handleLoading(false)
  }
}

function closeInstructions () {
  useLocalStorage.removeItem('showInstructions')
  showInstructions.value = false
}

function toggleInstructions () {
  showInstructions.value = true

  useLocalStorage.setItem('showInstructions', {
    Today: true,
    Chat: true,
    TeamBooks: true,
    TeamMembers: true,
    CalendarTeam: true,
    TaskBoardTeam: true,
    TeamBook: true,
    Discussions: true,
    FileManagerTeam: true,
    OverviewTeam: true,
    WeekPlanner: true
  })

  showWelcomeModalValue.value = false
}

</script>
