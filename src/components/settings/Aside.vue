<template>
  <div class="bg-grey-450 flex flex-col justify-between h-full w-[270px] text-app-color ">
    <div class="pt-30 px-12 overflow-y-auto">
      <h2 class="pl-20 mb-30 font-bold text-22">Settings</h2>

      <p
        v-for="item in items"
        v-show="item.show"
        :key="item.key"
        class="flex items-center pl-20 py-6 leading-extraTight cursor-pointer rounded-8 hover:bg-grey-425 mb-5"
        :class="{ 'font-semibold rounded-8 bg-grey-425': activeState === item.key }"
        @click="update(item.key)"
      >
        <i :class="item.icon" />
        <span>{{ item.label }}</span>
      </p>

      <p
        v-if="showStatisticButton && isTeamAccount && !isClient"
        class="pl-20 py-8 leading-small cursor-pointer rounded-4 hover:bg-grey-450"
        @click="goToStatistic"
      >
        Statistic
      </p>
    </div>

    <!-- L O G  O U T  B U T T O N -->
    <ButtonModule
      has-hover
      prefix="icon-log-out"
      text="Log out"
      class="text-app-color text-14 ml-27 mb-20 mt-30 p-5"
      @click="logout"
    />
  </div>
</template>

<script setup lang="ts">
import localStorageService from '@/core/local-storage'

const router = useRouter()
const {
  activeState,
  changeActiveState,
  toggleSettingsModal
} = useSettings()

const { resetMixpanel } = useMixpanel()

const { user, isClient } = useProfile()
const { isAdmin, isTeamAccount, hasBillingAccess, totalMembers } = useTeam()

const showTrash = computed(() => isTeamAccount.value ? isAdmin.value : true)
const showStatisticButton = computed(() => user.value.role.name === 'admin')

const items = [
  {
    label: 'My profile',
    icon: 'icon-person mr-13 text-16',
    show: true,
    key: 'Account'
  },
  {
    label: 'Design',
    icon: '',
    show: !isTeamAccount.value,
    key: 'Design'
  },
  {
    label: 'Preferences',
    icon: 'icon-preferences mr-13 text-16',
    show: true,
    key: 'Preferences'
  },
  {
    label: 'Team notifications',
    icon: 'icon-sidebar-inbox mr-13 text-16',
    show: isTeamAccount.value && !isClient.value && totalMembers.value > 1,
    key: 'Notifications'
  },
  {
    label: 'Reminders',
    icon: 'icon-alarm mr-13 text-15',
    show: true,
    key: 'Reminders'
  },
  {
    label: 'Calendar integration',
    icon: 'icon-icon-calendar-control mr-13 text-16',
    show: isTeamAccount.value && !isClient.value,
    key: 'Integrations'
  },
  {
    label: 'Keyboard shortcuts',
    icon: 'icon-keyboard-shortcuts mr-13 text-16',
    show: true,
    key: 'Keyboard'
  },
  {
    label: 'Billing & invoices',
    icon: 'icon-billing mr-13 text-16',
    show: hasBillingAccess.value && !isClient.value,
    key: 'Billing'
  },
  {
    label: 'Plans & pricing',
    icon: 'icon-plans mr-13 text-16',
    show: hasBillingAccess.value && !isClient.value,
    key: 'Plans'
  },
  {
    label: 'Trash',
    icon: 'icon-delete mr-13 text-16',
    show: showTrash.value && !isClient.value,
    key: 'Trash'
  }
]

const update = (value: string) => {
  changeActiveState(value)
}

const logout = async () => {
  toggleSettingsModal(false)

  router.push({ name: 'Login' })

  resetMixpanel()

  await useOneSignal().User.PushSubscription.optOut()
  await useOneSignal().logout()

  const html = document.getElementsByTagName('html').item(0)
  html.removeAttribute('class')

  localStorageService.removeItem('lastOpenedProject')
  localStorageService.removeItem('startOnboarding')
}

function goToStatistic () {
  router.push({ name: 'Statistic' })

  toggleSettingsModal(false)
}

</script>
