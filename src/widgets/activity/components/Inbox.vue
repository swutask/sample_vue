<template>
  <div>
    <DropdownModule
      ref="dropDownModuleRef"
      :width="475"
      background="bg-primary dark:bg-grey-110"
      :closeOnClick="false"
      isTeleported
      z-index="z-9998"
    >
      <template #button="{isOpen}">
        <ButtonModule
          v-clickOutside="closeModal"
          tooltipText="Inbox"
          :tooltipClasses="customTooltipClasses"
          tooltipBottom
          teleportTooltip
          skipGap
          :main="!isSidebarCollapsed"
          :class="[isOpen ? 'bg-grey-150' : 'text-grey-1300 hover:bg-grey-150', customBtnClasses]"
          @click="openModal"
        >
          <template #wrapper>
            <NotificationDot
              v-if="hasUnreadNotification"
              showCount
              :unreadCount="hasUnreadNotification"
              class="absolute top-[-3px] left-26"
            />

            <i class="icon-sidebar-inbox" :class="customIconClasses" />
          </template>
        </ButtonModule>
      </template>

      <div class="h-full mx-auto bg-primary text-14 rounded-[15px] pt-15 pb-5" @click.stop>
        <!-- header -->
        <div class="flex justify-between items-center space-x-10 mb-15 pl-22 pr-15">
          <h1 class="text-20 font-bold leading-none">Notifications</h1>

          <div class="flex space-x-8">
            <PauseNotifications isTeleported />

            <ButtonModule
              :disabled="!notificationListRef?.hasNotifications"
              tooltipText="Clear all notifications"
              tooltipBottom
              teleportTooltip
              prefix="icon-clear-notification text-17 text-grey-975"
              class="flex items-center justify-center opacity-50 mx-4 cursor-pointer select-none
                   hover:bg-menu-hover hover:opacity-100 rounded-8 px-8 py-6 h-33"
              :class="{'!opacity-100 !bg-menu-hover':!notificationListRef?.hasNotifications}"
              @click="clearInboxActivity"
            />
          </div>
        </div>
        <!-- content -->
        <NotificationList
          id="projects show-scrollbar-on-hover"
          ref="notificationListRef"
          class="mt-40 pb-35 h-full overflow-y-auto max-h-[460px]"
          @closeModal="closeModal"
        />
      </div>
    </DropdownModule>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  customBtnClasses?: string
  customIconClasses?: string
  customTooltipClasses?: string
}>(), {
  customBtnClasses: 'justify-center items-center rounded-20 px-15 py-8 h-35 w-48',
  customIconClasses: 'text-19',
  customTooltipClasses: 'text-13 px-10 py-7 rounded-8 z-9999'
})

const emitter = useEmitter()
const { notifications, toggleNotifications, mutedUntil } = useInbox()
const { inboxPrivateActivities, clearInboxActivity } = useActivity()
const { isSidebarCollapsed } = useSidebar()

const dropDownModuleRef = ref()
const notificationListRef = ref()

const route = useRoute()

const hasUnreadNotification = computed(() => {
  const unreadNotifications = notifications.value.personal.filter(item => item.status === 'unread').length
  const unreadInboxPrivateActivities = inboxPrivateActivities.value.filter(item => item.status === 'unread').length

  return unreadNotifications + unreadInboxPrivateActivities
})

watch(route, () => {
  closeModal()
})

function openModal () {
  emitter.emit('closeChat')
  setTimeout(() => {
    notificationListRef.value?.updateStatus()
  }, 1000)
}

function closeModal () {
  dropDownModuleRef.value?.toggle(false)
}

const timer = ref(null)

const myFunc = setInterval(function () {
  if (!mutedUntil.value) {
    timer.value = null

    return
  }

  const now = new Date().getTime()
  const timeLeft = new Date(mutedUntil.value).getTime() - now

  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))

  timer.value = `${hours}h ${minutes}m`

  if (timeLeft < 0) {
    timer.value = null
    toggleNotifications({ key: 'mutedUntil', value: null })
    clearInterval(myFunc)
  }
}, 1000)

</script>
