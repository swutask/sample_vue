<template>
  <div v-if="currentPlan" class="h-full w-full flex flex-col justify-between overflow-y-auto text-dark-500">
    <div class="w-full max-w-[320px] mx-auto md:max-w-full md:pl-[100px] pt-31 md:pr-50 pb-50">
      <div class="flex items-center md:hidden text-app-color" @click="back">
        <i class="text-12 mr-10 icon-keyboard-arrow-left opacity-50" />
        <p class="text-opacity-80">Back</p>
      </div>

      <h2 class="text-app-color font-bold text-35 md:text-21">Plans & pricing</h2>

      <p v-if="isExpired" class="text-error">Your plan has expired.</p>

      <div class="flex items-center mt-20">
        <Switcher
          v-model="billMonthly"
          class="text-13 font-semibold"
          width="145px"
          :tabs="[
            { name: 'Pay monthly', key: 'bill-monthly' },
            { name: 'Pay annually', key: 'bill-annually' }
          ]"
        />
      </div>

      <div class="flex flex-wrap mt-20">
        <div>
          <div class="flex flex-wrap -mx-15">
            <div v-for="(item, index) in teamPlansData" :key="item.title + index + billMonthly.index" class="px-8">
              <TeamsPlan
                :key="billMonthly.index"
                :bill-monthly="billMonthly.index"
                :planInfo="item"
                class="mt-30 md:mt-10 mb-30"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { bytesToSize } from '@/core/helper-functions'

const emit = defineEmits(['back'])

const {
  currentPlan,
  isExpired,
  freePlan,
  proPlan,
  teamProPlan
} = usePlan()
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

onMounted(() => {
  nextTick(() => {
    billMonthly.value = currentPlan.value.name.includes('Monthly')
      ? { index: 0, key: 'bill-monthly' }
      : { index: 1, key: 'bill-annually' }
  })
})

function back () {
  emit('back')
}
</script>
