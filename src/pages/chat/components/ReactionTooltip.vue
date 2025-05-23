<template>
  <div
    class="text-main-color absolute py-4 rounded-[13px] capitalize bottom-full z-100
    mb-[-20px] text-14 bg-primary shadow-[0_1px_3px_#ddd] dark:shadow-event-dark border border-grey-500"
    :class="tooltipPosition"
  >
    <UserBadge
      v-for="u in users"
      :key="u.id"
      :first-name="u.profile.firstName"
      :last-name="u.profile.lastName"
      :color="u.profile.color"
      :avatarUrl="u.avatar?.url"
      fontSize="text-13"
      :size="21"
      class="cursor-default !text-app-color rounded-6 py-2 px-10 truncate items-center !text-13"
    />
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{
  id: number
  messageReactions: IReaction[]
  tooltipPosition?: string
}>(), {
  tooltipPosition: 'left-1/2 -translate-x-1/2 '
})

const users = computed(() => props.messageReactions?.filter(item => item.reactionId === props.id).map(item => item.user))
</script>
