<template>
  <div class="min-h-full text-app-color flex flex-col px-15 border-t-[5px] border-black bg-grey-200">
    <LogoModule class="flex justify-center pt-30" />

    <div class="w-full md:m-auto">
      <div class="w-full mx-auto max-w-[900px] px-15 border border-grey-425 rounded-10 m-15 py-50 md:mt-[60px] mt-10">
        <div class="max-w-[500px] mx-auto">
          <div class="text-center">
            <p class="auth-title">Welcome back</p>
            <p class="auth-subtitle">Log in using your account</p>
          </div>

          <!-- INPUT CONTROLS -->
          <InputModule
            ref="emailInputRef"
            v-model="user.email"
            name="email"
            type="email"
            label="Your email"
            placeholder="email@example.com"
            class="w-full mt-30"
            inputClasses="anim-all auth-input-classes"
            label-class="mb-5 auth-label-classes"
            :error-message="errorMessages.email"
            @clearErrorMessage="clearErrorMessage"
            @keypress.enter="login"
          />

          <PasswordInput
            v-model="user.password"
            name="password"
            label="Your password"
            placeholder="password"
            class="w-full mt-30"
            inputClasses="anim-all auth-input-classes"
            label-class="mb-5 auth-label-classes"
            maxLength="64"
            hasForgotPasswordButton
            :error-message="errorMessages.password"
            @clearErrorMessage="clearErrorMessage"
            @keypress.enter="login"
          />

          <ButtonModule
            text="Continue"
            class="w-full justify-center text-white rounded-10 mt-30 py-16 group font-medium text-17"
            :class="user.email?.trim() === '' || user.password?.trim() === '' ? 'bg-grey-750 pointer-events-none' : 'bg-dark-1000 hover:bg-black'"
            @click="login"
          />

          <SocialAuth v-if="isGoogleOauthShown" text="Login" class="pt-10 md:pt-30" position="top" />
        </div>
      </div>

      <div class="mt-20 text-center w-full text-14 mb-50">
        <p class="text-grey-275 inline mr-5">Don’t have an account yet?</p>
        <router-link :to="{ name: 'SignUp' }" class="text-dark-200 mt-5 hover:underline mb-10 md:mb-35">Sign up</router-link>
      </div>
    </div>
    <RestoreAccount ref="restoreModal" :email="user.email" :date="deletedAt" title="Account deleted">
      <p class="text-14 mt-20 mb-25">
        This account was recently deleted and may be recoverable.
        If you want to restore this account, please type a password.
      </p>
    </RestoreAccount>
  </div>
</template>

<script setup lang="ts">
import { requiredFieldsValidation, emailValidation, passwordValidation } from '@/helpers'
import type { RouteLocationRaw } from 'vue-router'

const stripeLoader = () => import(/* chunkName: Stripe */ '@stripe/stripe-js')

const { setUser, getProfile } = useProfile()
const { setNotification } = useGeneral()
const { signIn } = useAuth()
const { getCurrentPlan, upgradePlan } = usePlan()
const { isGoogleOauthShown } = useFeatureFlag()

const router = useRouter()
const route = useRoute()

const deletedAt = ref(null)
const restoreModal = ref(null)

const emailInputRef = ref(null)

const user = reactive({
  email: route.query.email as string || null,
  password: null
})

const errorMessages = reactive({
  email: null,
  password: null
})

onMounted(() => {
  nextTick(() => {
    setUser(null)
    emailInputRef.value.focus()
  })
})

async function updatePlan () {
  const currentPlan = await getCurrentPlan()

  if (currentPlan.planId === +route.query.planId || currentPlan.planId === 2 || currentPlan.planId === 3) {
    router.push({ name: 'Today', params: { team: 'team' } })
  } else {
    const curUser = await getProfile()
    const { loadStripe } = await stripeLoader()
    const stripe = await loadStripe(import.meta.env.VITE_APP_STRIPE)

    const data = {
      planId: +route.query.planId,
      userId: curUser.id
    }

    upgradePlan(data)
      .then(res => {
        stripe.redirectToCheckout({ sessionId: res })
      })
  }
}

function login () {
  requiredFieldsValidation(errorMessages, user)

  if (!errorMessages.email) errorMessages.email = emailValidation(user.email)

  if (!errorMessages.password) errorMessages.password = passwordValidation(user.password)

  if (Object.values(errorMessages).every(i => !i)) {
    signIn(user).then((res) => {
      if (route.query.planId) {
        updatePlan()
        return
      }

      const savedUrl = route.params.savedUrl as RouteLocationRaw
      let routeLocation: RouteLocationRaw = { name: 'Today', params: { team: 'team' } }

      if (res.isClient) {
        routeLocation = { name: 'TeamBooks', params: { team: 'team' } }
      }

      router.push(savedUrl || routeLocation)
    }).catch((error) => {
      console.error(error)
      if (error?.data?.error?.code === 6) {
        deletedAt.value = +error.data.error.message
        restoreModal.value.open()
      } else {
        setNotification({
          uuid: window.crypto.randomUUID(),
          message: 'Incorrect email or password. Please try again.',
          color: 'error'
        })
      }
    })
  }
}

function clearErrorMessage (name: string) {
  errorMessages[name] = null
}
</script>
