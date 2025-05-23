<template>
  <div class="h-full w-full flex flex-col justify-between overflow-y-auto text-app-color">
    <div class="w-full max-w-[320px] mx-auto md:max-w-full md:pl-[100px] pt-31 md:px-50 pb-50">
      <div class="flex items-center md:hidden text-app-color" @click="back">
        <i class="text-12 mr-10 icon-keyboard-arrow-left opacity-50" />
        <p class="text-opacity-80">Back</p>
      </div>

      <h2 class="text-app-color font-bold text-35 md:text-21">Billing</h2>

      <div class="border-b border-hover pb-20">
        <p class="font-bold mt-35">Your plan</p>
        <div class="flex items-center mt-5">
          <span>You’re currently on our {{ parsedPlanName }} </span>
          <div class="ml-5">
            <ButtonModule
              text="(change)"
              class="text-blue-main text-15 hover:underline px-0"
              @click="upgrade"
            />
          </div>
        </div>

        <div v-if="isTrialPlan" class="mt-6">
          You have {{ daysLeft.title }} days left in your free trial
        </div>
      </div>

      <div class="border-b border-hover py-20">
        <p class="font-bold">Payment method</p>

        <ButtonModule
          type="black"
          text="Add credit card"
          class="font-semibold px-20 py-10 dark:text-white mt-5 hover:bg-dark-500 dark:hover:bg-dark-600 hover:text-white bg-black"
          @click="clickAddCard"
        />
      </div>

      <div v-if="invoices && invoices.length" class="py-20">
        <p class="font-bold">Invoices</p>
        <div
          v-for="(invoice, index) in invoices"
          :key="invoice.createdAt"
          :class="{ 'border-b border-hover': index !== invoices.length - 1}"
          class="flex items-center text-15 py-5"
        >
          <p class="flex-1">{{ parseDate(invoice.createdAt, 'MMM YYYY') }}</p>
          <p class="mr-15 md:mr-35">{{ currency(invoice.amount, invoice.currency) }} - paid</p>
          <ButtonModule
            tag="a"
            target="_blank"
            :href="invoice.url"
            :has-hover="true"
            text="view invoice"
            class="text-app-color text-15 p-5"
          />
        </div>
      </div>

      <CancelSubscription v-if="!isFreePlan" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { parseDate, currency } from '@/plugins/filters'

const emit = defineEmits(['back'])
const { changeActiveState } = useSettings()
const { invoices, getInvoices, isFreePlan, isTrialPlan, currentPlan, subscription } = usePlan()

const { daysLeft } = useSubscriptionCountdown(subscription.value.expireAt)

const parsedPlanName = computed(() => currentPlan.value?.name.replace(/\s+(Monthly|Yearly)$/, ''))

const hasInvoices = computed(() => invoices.value.length)

onMounted(() => {
  !invoices.value && getInvoices()
})

function back () {
  emit('back')
}

function upgrade () {
  changeActiveState('Plans')
}

async function updatePaymentMethod () {
  const stripeLoader = () => import(/* chunkName: Stripe */ '@stripe/stripe-js')
  const { loadStripe } = await stripeLoader()
  const stripe = await loadStripe(import.meta.env.VITE_APP_STRIPE)

  planService.upgradePaymentMethod().then(res => {
    stripe.redirectToCheckout({ sessionId: res.data.sessionId })
  })
}

function clickAddCard () {
  hasInvoices.value ? updatePaymentMethod() : changeActiveState('Plans')
}
</script>
