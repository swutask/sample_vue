<template>
  <div>
    <div v-if="hasNotifications">
      <NotificationItem
        v-for="(notification, index) in filteredNotifications"
        :key="notification.id"
        :notification="notification"
        :inboxActivity="notification"
        :isPersonal="!notification.hasOwnProperty('type')"
        :showOnlyOneBookLabel="showOnlyOneBookLabel(filteredNotifications, notification, index)"
        @closeModal="$emit('closeModal')"
      />
    </div>

    <div v-if="!hasNotifications" class="px-20">
      <div class="text-center w-full max-w-[514px] mx-auto rounded-10 py-50 bg-grey-450">
        <img src="@/assets/images/inbox.svg" class="w-full max-w-[200px] mx-auto" alt="teams">
        <p class="font-bold text-17 mt-50">Your inbox is empty</p>
        <p class="text-grey-1050">Once there is news, we'll let you know.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getTime } from '@/core/helper-functions'

defineEmits(['closeModal'])

const { getBooks } = useBook()
const { notifications, updateNotificationStatus } = useInbox()
const { inboxActivities, inboxPrivateActivities, updateInboxNotificationStatus } = useActivity()

const dropDownModuleRef = ref()

const filteredNotifications = computed(() => {
  const items = [
    ...inboxPrivateActivities.value,
    ...notifications.value.personal,
    ...inboxActivities.value
  ]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  return items
})

watch(() => notifications.value.personal.filter(item => item.status === 'unread'), async (value) => {
  if (value.filter(e => e.title === 14).length) {
    await getBooks()
  }
})

const hasNotifications = computed(() => {
  return Object.values(filteredNotifications.value).flat().length > 0
})

watch(() => Object.values(filteredNotifications.value).flat().length, () => {
  if (dropDownModuleRef.value?.isDropdownVisible) {
    updateStatus(0)
  }
})

function updateStatus (timeout = 1000) {
  const ids = Object.values(filteredNotifications.value).flat()
    .filter((item: IBookActivity) => item.status === 'unread')
    .map((item: IBookActivity) => item.id)

  if (ids.length > 0) {
    setTimeout(() => {
      Promise.all([
        updateNotificationStatus({ ids }),
        updateInboxNotificationStatus(ids)])
    }, timeout)
  }
}

function showOnlyOneBookLabel (items, notification, index: number) {
  if (index === 0) return true

  if (notification?.bookId) {
    return +items[index - 1]?.bookId !== +notification?.bookId
  } else if (notification.activity?.data?.bookId && items[index - 1]?.activity?.data.bookId) {
    return +items[index - 1]?.activity?.data.bookId !== +notification.activity?.data.bookId
  } else if (notification.activity?.data?.remindAt) {
    return getTime(items[index - 1]?.activity?.data?.remindAt) !== getTime(notification?.activity?.data?.remindAt)
  } else {
    return getTime(items[index - 1]?.createdAt) === getTime(notification?.createdAt)
  }
}

defineExpose({
  hasNotifications,
  updateStatus
})
</script>
