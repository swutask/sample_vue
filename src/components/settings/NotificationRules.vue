<template>
  <div class="flex flex-col justify-end md:p-0 p-10 w-full mb-30">
    <div class="grid grid-cols-4 gap-20 pr-0 md:pr-20 w-full mt-20">
      <p class="col-span-2 text-15 font-semibold whitespace-nowrap">Notify me when...</p>
      <div v-for="item in notificationOptions" :key="item.label" class="flex flex-col justify-start items-start w-1/2">
        <p class="text-15 font-semibold">{{ item.label }}</p>
        <span
          class="text-12 text-brand cursor-pointer whitespace-nowrap"
          @click="item.action"
        >
          {{ item.turnOffLabel }}
        </span>
      </div>
    </div>

    <div class="flex flex-col justify-between items-start w-full pr-0 md:pr-20">
      <template v-for="(value, key, index) in preparedRules" :key="key">
        <p class="my-5 font-semibold" :class="index === 0 ? 'mt-5' : 'mt-30'">{{ key }}</p>

        <div v-for="item in value" :key="item.label" class="grid grid-cols-4 gap-20 border-b border-grey-350 w-full py-10">
          <p class="col-span-2 text-14">{{ item.label }}</p>

          <ToggleModule
            v-for="(valueOfToggle, indexOfToggle) in [item.email, item.push]"
            :key="indexOfToggle"
            :value="!!valueOfToggle"
            @input="update(item.originalKey, $event, indexOfToggle)"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
const {
  mappedRules,
  turnOffAll,
  toggleNotifications
} = useInbox()

const notificationOptions = [
  { label: 'Email', turnOffLabel: 'Turn off all email', action: () => turnOffAll('email') },
  { label: 'Push', turnOffLabel: 'Turn off all push', action: () => turnOffAll('push') }
]

const preparedRules = computed<TNotificationMappedRules>(() => ({
  General: [
    mappedRules.value.ProjectInvite,
    mappedRules.value.RoleChange,
    mappedRules.value.MentionCreate
  ],
  Tasks: [
    mappedRules.value.TaskAssign,
    mappedRules.value.TaskChange,
    mappedRules.value.TaskCommentAdd,
    mappedRules.value.TaskCompleted,
    mappedRules.value.TaskUnassign
  ],
  Other: [mappedRules.value.ChatMessageReceive]
} as TNotificationMappedRules))

function update (originalKey: string, value: boolean, index: number) {
  toggleNotifications({ key: `${index === 0 ? 'email' : 'push'}${originalKey}`, value })
}
</script>
