<template>
  <div class="min-h-full text-app-color flex flex-col bg-grey-450 px-15">
    <div class="w-full mx-auto mt-30 md:m-auto max-w-[600px] pb-[60px] md:pt-[60px]">
      <LogoModule class="flex justify-center pt-25" />

      <div class="m-15 px-15 md:px-40 py-30 bg-primary shadow-sign-up rounded-10">
        <div class="max-w-[500px] mx-auto">
          <div class="text-center">
            <p class="auth-title">New password</p>
            <p class="text-18 text-grey-20">We received your password reset request</p>
            <p class="mb-40 text-18 text-grey-20">Please enter your new password</p>
          </div>

          <PasswordInput
            v-model="user.password"
            name="password"
            maxLength="64"
            label="Enter password"
            placeholder="New password"
            class="w-full mt-30"
            inputClasses="auth-input-classes anim-all"
            labelClass="mb-5 auth-label-classes"
            :errorMessage="errorMessages.password"
            @clearErrorMessage="name => errorMessages[name] = null"
          />

          <PasswordInput
            v-model="user.confirmPassword"
            name="confirmPassword"
            maxLength="64"
            label="Confirm password"
            placeholder="Confirm password"
            class="w-full mt-30"
            inputClasses="auth-input-classes anim-all"
            labelClass="mb-5 auth-label-classes"
            :errorMessage="errorMessages.confirmPassword"
            @clearErrorMessage="name => errorMessages[name] = null"
          />

          <ButtonModule
            text="Continue"
            class="w-full justify-center text-white rounded-10 mt-30 py-16 group font-medium text-17 bg-dark-1000 hover:bg-black"
            @click="passwordReset"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { requiredFieldsValidation, passwordValidation } from '@/helpers'

const route = useRoute()
const router = useRouter()
const { setToken } = useAuth()

const user = reactive({
  password: null,
  confirmPassword: null
})

const errorMessages = reactive({
  password: null,
  confirmPassword: null
})

function passwordReset () {
  requiredFieldsValidation(errorMessages, user)

  if (!errorMessages.password) {
    errorMessages.password = passwordValidation(user.password)
  }

  if (!errorMessages.confirmPassword) {
    errorMessages.confirmPassword = passwordValidation(user.confirmPassword)
  }

  if (user.password !== user.confirmPassword && !errorMessages.confirmPassword) {
    errorMessages.confirmPassword = 'password and confirm password does not match'
  }

  if (Object.values(errorMessages).every(i => !i)) {
    authService.passwordReset({ ...route.query, password: user.password }).then(({ data }) => {
      setToken(data.token)
      router.push('/')
    })
  }
}
</script>
