<template>
  <div>
    <div class="text-center w-full">
      <p class="auth-title">Welcome to Complex</p>
      <p class="auth-subtitle">Sign up and Supercharge Your Productivity</p>
    </div>

    <SocialAuth v-if="isGoogleOauthShown" text="Sign up" class="mt-10 md:mt-30" />

    <InputModule
      v-model="email"
      autofocus
      name="email"
      type="email"
      placeholder="Enter your work email"
      class="w-full mt-30"
      inputClasses="auth-input-classes anim-all"
      label-class="mb-5 auth-label-classes"
      :error-message="errorMessages.email"
      @keypress.enter="continueRegister"
      @clearErrorMessage="clearErrorMessage"
    >
      <template v-if="showLoginLink" #errorLink>
        <router-link to="/login" class="text-app-color">Please login</router-link>
      </template>
    </InputModule>

    <ButtonModule
      text="Continue"
      class="w-full justify-center text-white rounded-10 mt-30 py-16 group font-medium text-17"
      :class="email.trim() === '' ? 'bg-grey-750 pointer-events-none' : 'bg-dark-1000 hover:bg-black'"
      @click="continueRegister"
    />
  </div>
</template>

<script setup lang="ts">
import { requiredFieldsValidation, emailValidation } from '@/helpers'
import { teamsService } from '@/services'

const props = defineProps<{
  modelValue: IAuthUser
}>()

const emit = defineEmits(['next', 'update:modelValue'])

const { isGoogleOauthShown } = useFeatureFlag()
const route = useRoute()

const showLoginLink = ref(false)

const email = ref<string>(route.query.email as string || '')

const errorMessages = reactive({
  email: null,
  password: null
})

function clearErrorMessage (name: string) {
  errorMessages[name] = null
}

function continueRegister () {
  requiredFieldsValidation(errorMessages, {
    email: email.value
  })

  if (!errorMessages.email) errorMessages.email = emailValidation(email.value)

  if (!errorMessages.email) {
    teamsService.checkEmail(email.value).then(({ data }) => {
      emit('update:modelValue', {
        ...props.modelValue,
        email: email.value
      })

      if (data.hasTeamAccount) {
        errorMessages.email = 'A user user already exists. '
        showLoginLink.value = true
      } else {
        emit('next')
      }
    })
  }
}
</script>
