<template>
  <teleport to="#main_section">
    <div
      class="fixed top-0 left-0 w-full h-full flex z-[11020] bg-[#0007] text-app-color overflow-auto text-14 px-15"
      @click.self="showReminderUpgradeModal = false"
    >
      <div
        class="relative overflow-hidden mx-auto mb-auto mt-50 lg:mt-[135px]
          w-full max-w-[445px] rounded-10 p-20 bg-primary shadow-dropdown"
      >
        <div class="h-[250px] w-full rounded-10 bg-grey-500 flex justify-center items-center">
          <div class="flex flex-col">
            <p class="text-16 text-grey-950 font-semibold">Reminder set</p>

            <div class="flex py-10 px-20 justify-between items-center rounded-12 bg-primary h-[55px] w-[180px]">
              <i class="icon-alarm text-25 text-grey-950" />

              <p class="text-16 text-grey-950">Today, 15:00</p>
            </div>
          </div>
        </div>

        <div class="mt-20 flex flex-col px-10">
          <p class="text-20 font-bold mb-5">Unlock reminders</p>

          <p class="text-grey-1000 text-14 leading-[1.7]">
            Upgrade to Complex Pro to unlock powerful reminders that keep you on track
            and ensure you never miss an important task again!
          </p>

          <ButtonModule
            text="Upgrade to Pro"
            class="bg-black self-end mt-28 rounded-8 h-45 px-20 font-semibold text-white text-14"
            @click="upgrade"
          />
        </div>
      </div>
    </div>
  </teleport>
</template>
<script setup lang="ts">
const { showReminderUpgradeModal } = useReminder()
const { toggleLimitModal, togglePlansInfoModal } = usePlan()

function upgrade () {
  showReminderUpgradeModal.value = false

  togglePlansInfoModal(true)
}
</script>
