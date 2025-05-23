<template>
  <DropdownModule
    prefix="icon-info_outline text-21 md:text-19 text-grey-975"
    class="relative ml-2"
    tooltipText="Task info"
    teleportTooltip
    tooltipBottom
    :width="180"
    :buttonClasses="buttonClasses"
    topPosition="30px"
    :isTeleported="false"
    :closeOnClick="false"
    background="bg-primary dark:bg-grey-110"
    isAutoMenuPosition
  >
    <div class="arrow relative flex flex-col space-y-20 px-20 py-10">
      <div v-if="task.user" class="flex flex-col items-start space-y-5">
        <p class="font-medium text-14">Created by</p>

        <UserBadge
          :first-name="task.user.profile.firstName"
          :last-name="task.user.profile.lastName"
          :avatarUrl="task.user.avatar?.url"
          :color="task.user.profile.color"
          :userId="task.user.id"
          class="items-center mr-7 cursor-pointer text-13"
        />
      </div>
      <div class="flex flex-col items-start space-y-1">
        <p class="font-medium text-14">Created on</p>
        <div class="flex space-x-8 opacity-[0.8] text-13">
          <span>{{ parseDate(task.createdAt, 'D MMM YYYY') }}</span>
          <span class="text-grey-250">{{ parseDate(task.createdAt, 'hh:mm') }}</span>
        </div>
      </div>

      <div v-if="task.updatedAt" class="flex flex-col items-start space-y-1">
        <p class="font-medium text-14">Updated on</p>

        <div class="flex space-x-8 opacity-[0.8] text-13">
          <span>{{ parseDate(task.updatedAt, 'D MMM YYYY') }}</span>
          <span class="text-grey-250">{{ parseDate(task.updatedAt, 'hh:mm') }}</span>
        </div>
      </div>
    </div>
  </DropdownModule>
</template>

<script setup lang="ts">
import { parseDate } from '@/plugins/filters'

defineProps<{ task: ITask; buttonClasses?: string }>()
</script>
