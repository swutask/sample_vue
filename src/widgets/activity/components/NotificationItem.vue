<template>
  <div>
    <div
      v-if="((inboxActivity?.activity?.data.bookId || notification.book || isReminder) && showOnlyOneBookLabel)"
      class="flex items-center mt-24 mb-9 ml-15"
    >
      <div
        class="flex items-center py-5 px-12 text-13 font-medium bg-grey-150 hover:bg-grey-150 cursor-pointer rounded-full"
        @click="goToBook"
      >
        <div class="flex items-center flex-shrink-0">
          <div class="mr-16 w-18 h-18">
            <img :src="iconSRC" alt="icon">
          </div>
        </div>
        <span class="text-app-color w-full font-semibold">{{ getBook?.title }}</span>
      </div>
    </div>

    <div class="group relative hover:bg-grey-200 py-17 border-t border-grey-150 px-22">
      <div class="flex w-full space-x-5 min-w-0" :class="message.length ? 'items-stretch' : 'items-center'">
        <div class="items-center">
          <UserBadge
            :first-name="isPersonalNotifications ? notification.teamMember.user.profile.firstName : creator?.firstName"
            :last-name="isPersonalNotifications ? notification.teamMember.user.profile.lastName : creator?.lastName"
            :color="isPersonalNotifications ? notification.teamMember.user.profile.color : creator?.color"
            :avatarUrl="isPersonalNotifications ? notification.teamMember.user.avatar?.url : creator?.avatar?.url"
            :showName="false"
            :userId="isPersonalNotifications ? notification.teamMember.user.id : creator?.userId"
            :size="24"
            fontSize="text-12"
            class="mr-11"
          />
        </div>

        <div class="min-w-0 text-13 pr-15">
          <div ref="descriptionRef" class="text-dark-300 multi-truncate" style="--mt-lines: 2;" />

          <p class="hidden md:block notification-message multi-truncate text-grey-250 leading-[1.6]" style="--mt-lines: 2;">
            {{ message }}
          </p>
          <p class="text-grey-250 text-12" :title="titleTime">{{ getActivityTime(notification.createdAt) }}</p>
        </div>

        <div class="absolute top-17 right-22">
          <span v-if="notification.status === 'unread'" class="block group-hover:hidden w-8 h-8 rounded-full bg-error opacity-70" />
        </div>
      </div>

      <div class="md:opacity-0 group-hover:opacity-100">
        <ButtonModule
          prefix="icon-close"
          :has-hover="true"
          class="absolute right-5 top-6 text-12 text-grey-1050 cursor-pointer pt-10 pr-10"
          @click="deleteNotification"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { parseDate } from '@/plugins/filters'
import notificationDescriptions from '../../../components/inbox/NotificationDescriptions'
import lastActivitiesForBooks from '@/widgets/activity/utils/latestActivityConfigForBooks'
import lastActivitiesForTask from '@/widgets/activity/utils/latestActivityConfigForTasks'
import { getActivityTime } from '../utils/latest-activity-utils'

const props = defineProps<{
  notification: IInboxNotification
  inboxActivity: IBookActivity
  showOnlyOneBookLabel: boolean
  isPersonal?: boolean
}>()

const emit = defineEmits(['closeModal'])

const { deleteNotification: handleDeleteNotification } = useInbox()
const { books } = useBook()
const { team, members } = useTeam()
const { deleteInbox } = useActivity()

const router = useRouter()

const descriptionRef = ref(null)

const isPrivateInboxNotifications = computed(() => props.inboxActivity?.type === 'private')
const isPersonalNotifications = computed(() => props.isPersonal && !isPrivateInboxNotifications.value)
const currentBook = computed(() => books.value.find(e => e.id === +props.inboxActivity?.activity?.data.bookId))
const creator = computed(() => members.value.find((e) => {
  if (Object.prototype.hasOwnProperty.call(props.inboxActivity, 'activity')) {
    return e.userId === +props.inboxActivity?.activity?.creatorId
  }
  return false
}))

const isReminder = computed(() => !!props.inboxActivity?.activity?.data?.remindAt)

const getBook = computed(() => {
  if (isReminder.value) {
    return books.value.find(book => book.id === props.inboxActivity?.task?.bookId)
  } else if (isPersonalNotifications.value) {
    return props.notification?.book
  } else {
    return currentBook.value
  }
})

const iconSRC = computed(() => {
  const bookIcon = getBook.value?.icon || 'default-phoenix'
  const iconExtension = bookIcon.includes('default-') ? 'svg' : 'png'

  return `https://helloivy-icons.s3.eu-central-1.amazonaws.com/${bookIcon}.${iconExtension}`
})

function getTextContent (text: string) {
  if (text) {
    const span = document.createElement('span')
    span.innerHTML = text.replace(/(<([^>]+)>)/ig, '\n') || ''
    return span.textContent.trim().slice(0, 500) || span.innerText.trim().slice(0, 500)
  }
  return null
}

const message = computed(() => {
  if (isPersonalNotifications.value) {
    const span = document.createElement('span')
    span.innerHTML = props.notification?.message
    const text = span.textContent

    switch (props.notification?.title) {
      case 2:
        return `"${text?.replace(/(@)+/g, '') || getTextContent(props.notification.chat.messages[0]?.text)?.replace(/(@)+/g, '')}"`
      case 4:
        return `"${getTextContent(props.notification.project?.body)?.replace(/(@)+/g, '') || ''}"`
      case 6:
        return `"${getTextContent(props.notification.comment.body)?.replace(/(@)+/g, '')}"`
      case 8:
        return `"${getTextContent(props.notification.task?.additionalInfo)?.replace(/(@)+/g, '') || getTextContent(props.notification.task?.title)}"`
      case 9:
        return `"${getTextContent(props.notification.task?.additionalInfo)?.replace(/(@)+/g, '') || getTextContent(props.notification.task?.title)}"`
      case 19:
        return `"${getTextContent(props.notification.task?.additionalInfo)?.replace(/(@)+/g, '') || getTextContent(props.notification.task?.title)}"`
      case 12:
        return `"${props.notification.message || ''}"`
      default:
        return ''
    }
  } else {
    return ''
  }
})

const titleTime = computed(() => {
  return parseDate(props.notification.createdAt, 'DD-MM-YYYY hh:mm')
})

onMounted(() => {
  nextTick(() => {
    const fn = isPersonalNotifications.value
      ? notificationDescriptions[props.notification?.title]
      : isPrivateInboxNotifications.value
        ? lastActivitiesForTask(props.inboxActivity.activity)[props.inboxActivity.activity.data.column || props.inboxActivity.activity.data.action]
        : lastActivitiesForBooks(props.inboxActivity?.activity)[props.inboxActivity.activity.data.column || props.inboxActivity.activity.data.action]

    const shouldShowPrivateInboxNotifications =
      props.inboxActivity?.activity?.data?.column !== 'remindAt' && isPrivateInboxNotifications.value

    const params = isPersonalNotifications.value
      ? {
        notification: props.notification,
        ref: descriptionRef.value,
        router
      }
      : {
        activity: props.inboxActivity.activity.data,
        ref: descriptionRef.value,
        router,
        task: props.inboxActivity.task,
        isPrivate: shouldShowPrivateInboxNotifications,
        creatorId: props.inboxActivity.activity.creatorId,
        isLinkDotted: true,
        withSpaceName: false
      }

    if (fn) fn(params)
  })
})

function goToBook () {
  const bookId = getBook.value?.id

  if (bookId) {
    router.push({ name: 'TaskBoardTeam', params: { team: team.value.link, id: bookId } })

    emit('closeModal')
  }
}

function deleteNotification () {
  if (isPersonalNotifications.value) {
    handleDeleteNotification({
      id: props.notification.id,
      category: props.notification?.category
    })
  } else {
    deleteInbox(props.notification.id, isPrivateInboxNotifications.value ? 'private' : 'public')
  }
}
</script>

<style lang="scss">
.notification-message * {
  font-size: 14px !important;
}
</style>
