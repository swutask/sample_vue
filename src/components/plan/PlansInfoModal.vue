<template>
  <div
    v-if="(isTrialOver && !isFreePlan) || showPlansInfoModal"
    class="fixed top-0 left-0 p-15 w-full h-full bg-backdrop flex z-[105] overflow-auto"
    @click.self="close"
  >
    <div
      class="w-full max-w-[1040px] px-28 pt-15 pb-5 rounded-10 relative bg-primary
             md:rounded-20 shadow-modal dark:shadow-event-dark m-auto"
    >
      <div class="flex flex-col items-center justify-center w-full max-w-[320px] mx-auto md:max-w-full py-20 md:px-50">
        <h2 class="text-app-color font-bold text-31">
          {{ isTrialOver ? 'Your trial has ended' : 'Choose a plan' }}
        </h2>

        <p>Please select the plan that best suits your needs.</p>

        <Switcher
          v-model="billMonthly"
          class="text-13 font-semibold mt-20"
          width="145px"
          :tabs="[
            { name: 'Pay monthly', key: 'bill-monthly' },
            { name: 'Pay annually', key: 'bill-annually' }
          ]"
        />

        <div class="flex flex-wrap mt-20">
          <div class="flex flex-wrap -mx-15">
            <div v-for="(item, index) in teamPlansData" :key="item.title + index + billMonthly.index" class="px-12">
              <TeamsPlan
                v-show="item.show"
                :key="billMonthly.index"
                :bill-monthly="billMonthly.index"
                :planInfo="item"
                isTrialModal
                class="mt-30 md:mt-10 mb-30"
              />
            </div>
          </div>
        </div>
      </div>

      <ButtonModule
        v-if="!isTrialOver"
        prefix="icon-close text-13"
        class="hover:bg-menu-hover absolute top-10 right-10 p-10 rounded-8"
        teleportTooltip
        tooltipText="Close"
        tooltipBottom
        @click.stop="togglePlansInfoModal(false)"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { bytesToSize } from '@/core/helper-functions'

const { showPlansInfoModal, isTrialOver, togglePlansInfoModal, currentPlan, freePlan, proPlan, isFreePlan, teamProPlan } = usePlan()
const { members } = useTeam()

const billMonthly = ref<ISwitcherModelValue>({ index: 0, key: 'bill-monthly' })

const teamPlansData = computed<IPlanInfo[]>(() => {
  const plans: IPlanInfo[] = [
    {
      title: 'Free',
      key: 'Free Plan',
      icon: 'plan1',
      noPrice: true,
      show: true,
      name: 'Free Plan',
      description: 'Organize your (work)life for free',
      subDescription: 'Free plan includes:',
      tools: [`${freePlan.value.maxTasks} tasks`, `${bytesToSize(freePlan.value.maxSize)} storage space`, 'Unlimited members & guests', `Up to ${bytesToSize(freePlan.value.singleFileSize)} per file upload`],
      blockedTools: []
    },
    {
      title: 'Personal Pro',
      key: 'Pro',
      icon: 'plan2',
      show: members.value.length === 1,
      name: billMonthly.value.index === 0 ? 'Personal Pro Plan Monthly' : 'Personal Pro Plan Yearly',
      keys: ['Personal Pro Plan Monthly', 'Personal Pro Plan Yearly'],
      description: 'Unlimited ways to organize your personal life and tasks.',
      subDescription: 'The Personal Pro plan includes:',
      tools: ['Unlimited tasks', `${bytesToSize(proPlan.value.maxSize)} storage space`, 'Reminders', 'Week planner', `Up to ${bytesToSize(proPlan.value.singleFileSize)} per file upload`],
      blockedTools: []
    },
    {
      title: 'Teams Pro',
      key: 'Teams Pro',
      icon: 'plan3',
      show: true,
      name: billMonthly.value.index === 0 ? 'Team Plan Monthly' : 'Team Plan Yearly',
      keys: ['Team Plan Yearly', 'Team Plan Monthly'],
      description: 'For managing tasks with teams of two or more.',
      subDescription: 'Everything in Personal Pro, plus:',
      tools: ['Unlimited tasks', `${bytesToSize(teamProPlan.value.maxSize)} storage space`, 'A shared team workspace', 'Team management', `Up to ${bytesToSize(teamProPlan.value.singleFileSize)} per file upload`],
      blockedTools: []
    }
  ]

  return plans
})

function close () {
  if (!isTrialOver.value) {
    togglePlansInfoModal(false)
  }
}

onMounted(() => {
  nextTick(() => {
    billMonthly.value = currentPlan.value.name.includes('Monthly')
      ? { index: 0, key: 'bill-monthly' }
      : { index: 1, key: 'bill-annually' }
  })
})
</script>
