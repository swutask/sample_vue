<template>
  <div class="mb-15 relative w-full select-none">
    <div v-if="!preventShowConnectorTop" class="h-full left-12 z-0 w-1 bg-grey-500 absolute" />
    <div v-if="!preventShowConnectorBottom" class="h-[30px] left-12 top-30 z-0 w-1 bg-grey-500 absolute" />

    <div class="flex items-center ">
      <UserBadge
        :first-name="creator?.firstName"
        :last-name="creator?.lastName"
        :color="creator?.color"
        :avatarUrl="creator?.avatar?.url"
        :size="25"
        :userId="creator?.userId"
        :showName="false"
        class="mr-10"
      />

      <div
        ref="messageRef"
        class="text-12 text-grey-975"
        :class="{ 'multi-truncate': !isModal, 'max-w-[500px] ': isModal }"
        :style="isModal ? '' : {'--mt-lines': 4}"
      />
    </div>

    <p class="ml-35 whitespace-nowrap text-12 text-grey-250 mb-auto self-start">{{ getActivityTime(activity.createdAt) }}</p>
  </div>
</template>
<script setup lang="ts">
import lastActivitiesForTask from '@/widgets/activity/utils/latestActivityConfigForTasks'
import { getActivityTime } from '@/widgets/activity/utils/latest-activity-utils'

const props = defineProps<{
  activity: ITaskActivity
  preventShowConnectorBottom: boolean
  preventShowConnectorTop: boolean
  isModal?: boolean
}>()

const { members } = useTeam()

const messageRef = ref(null)

const creator = computed(() => members.value.find((e) => e.userId === +props.activity.activity.creatorId))

onMounted(() => {
  nextTick(() => {
    const fn = lastActivitiesForTask(props.activity.activity)[props.activity.activity.data.column || props.activity.activity.data.action]

    if (fn) {
      fn({
        activity: props.activity.activity.data,
        ref: messageRef.value,
        truncateText: props.isModal,
        creatorId: props.activity.activity.creatorId
      })
    }
  })
})
</script>
