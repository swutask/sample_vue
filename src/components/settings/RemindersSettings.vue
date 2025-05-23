<template>
  <div class="h-full w-full overflow-y-auto text-app-color">
    <div class="max-w-[320px] mx-auto md:mx-0 md:mr-40 md:max-w-full md:pl-[100px] py-31 text-app-color">
      <div class="flex items-center md:hidden" @click="back">
        <i class="text-12 mr-10 icon-keyboard-arrow-left opacity-50" />
        <p class="text-opacity-80">Back</p>
      </div>

      <p class="text-30 md:text-21 font-bold">Reminders</p>

      <div
        v-if="isFreePlan && !isClient"
        class="mt-30 rounded-12 px-25 border-2 border-black
         py-15 bg-[#E4FFFA]/[0.8] flex md:flex-row flex-col items-center justify-between"
      >
        <div class="mr-20">
          <div class="flex items-center">
            <i class="icon-alarm text-16 mr-4 mb-5" />

            <p class="font-semibold text-15 mb-4">Unlock reminders</p>
          </div>

          <p class="text-grey-975 leading-[1.7]">
            Upgrade to Complex Pro and get access to reminders, unlimited tasks,
            and 20GB of storage.<br> Stay on track and never miss a task again!
          </p>
        </div>

        <ButtonModule
          text="Upgrade to Pro"
          class="bg-black rounded-8 h-50 px-25 font-medium text-white text-14"
          @click="toggleLimitModal({ show: true })"
        />
      </div>

      <div class="mt-30">
        <p class="font-semibold mb-10">How should we remind you?</p>

        <ToggleModule
          v-for="option in remindersOptions"
          :key="option.key"
          :disabled="isFreePlan"
          :isBlue="option.isEnabled"
          :label="option.name"
          class="mb-15 !block"
          size="base"
          :value="option.isEnabled"
          @input="update($event, option.key)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits(['back'])
const { isFreePlan, toggleLimitModal } = usePlan()
const { updateReminderSettings, reminderSettings } = useReminder()
const { isClient } = useProfile()

const remindersOptions = computed(() => {
  return [
    {
      key: 'allowSendToEmail',
      name: 'Email',
      isEnabled: reminderSettings.value.allowSendToEmail
    },
    {
      key: 'allowSendToPush',
      name: 'Desktop push notifications',
      isEnabled: reminderSettings.value.allowSendToPush
    }
  ] as {
    key: 'allowSendToEmail' | 'allowSendToPush'
    name: string
    isEnabled: boolean
  }[]
})

function update (value: boolean, type: 'allowSendToPush' | 'allowSendToEmail') {
  updateReminderSettings({ [type]: value })
}

const back = () => {
  emits('back')
}
</script>
