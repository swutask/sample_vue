<template>
  <div class="font-Space-Grotesk min-h-full text-app-color flex flex-col bg-grey-450 px-15">
    <div class="w-full mx-auto mt-30 md:m-auto max-w-[600px] pb-[60px] md:pt-[60px]">
      <LogoModule class="flex justify-center pt-25" />

      <div class="m-15 px-15 md:px-40 py-30 bg-primary shadow-sign-up rounded-10">
        <div class="max-w-[500px] mx-auto">
          <div class="text-center w-full">
            <p class="auth-title">Reset password</p>
          </div>

          <transition name="fade" mode="out-in">
            <div v-if="step === 1" key="step1">
              <p
                class="mb-40 text-18 text-grey-20 text-center"
              >
                Forgot your password? No problem, we will send you instructions to reset your password.
              </p>

              <InputModule
                v-model="email"
                autofocus
                name="email"
                type="email"
                label="Your email"
                placeholder="email@example.com"
                class="w-full mt-30"
                inputClasses="auth-input-classes anim-all"
                label-class="mb-5 auth-label-classes"
                :error-message="errorMessages"
                @clearErrorMessage="errorMessages = null"
              />

              <ButtonModule
                text="Send instructions"
                class="w-full justify-center text-white rounded-10 mt-30 py-16 group font-medium text-17 bg-dark-1000 hover:bg-black"
                @click="passwordRecover"
              />
            </div>

            <p v-else key="step2" class="text-20 text-grey-20 text-center">
              We just sent you instructions to reset your password. Please check your email
            </p>
          </transition>
        </div>
      </div>
      <div class="mt-20 text-center w-full text-15">
        <ButtonModule
          text="Back to Login"
          class="text-dark-200 mt-5 hover:underline"
          @click="goToLogin"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { requiredFieldsValidation, emailValidation } from '@/helpers'

const router = useRouter()

const step = ref(1)
const email = ref('')
const errorMessages = ref('')

function passwordRecover () {
  requiredFieldsValidation({ errorMessages: errorMessages.value }, { email: email.value })

  if (!errorMessages.value) {
    errorMessages.value = emailValidation(email.value)
  }

  if (!errorMessages.value) {
    authService.passwordRecover(email.value).then(() => {
      step.value = 2
    })
  }
}

function goToLogin () {
  router.push({ name: 'Login' })
}
</script>
