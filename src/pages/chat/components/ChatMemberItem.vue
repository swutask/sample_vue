<template>
  <div
    class="flex justify-between sm:justify-between items-center px-12 py-5 w-full
    hover:bg-grey-150 select-none rounded-8 cursor-pointer anim-color"
    :class="{ 'lg:bg-grey-150': isActive }"
  >
    <UserBadge
      :first-name="user.profile.firstName"
      :last-name="user.profile.lastName"
      :avatarUrl="user.avatar?.url"
      :color="user.profile.color"
      :size="22"
      :hasAvatarMargin="false"
      class="!pl-0 overflow-hidden"
    >
      <template #name>
        <p
          class="inline-block md:max-w-[150px] ml-10 md:text-13 text-15 truncate"
          :class="isActive ? 'lg:text-dark-1000 lg:font-medium' : 'text-grey-1050'"
        >
          {{ user.profile.firstName }} {{ user.profile.lastName }}
        </p>
      </template>
    </UserBadge>

    <NotificationDot v-if="!!unreadCount" showCount :unreadCount="isActive ? 0 : unreadCount" class="mr-10" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  user: IUser
  isActive?: boolean
  unreadCount?: number
}>()
</script>
