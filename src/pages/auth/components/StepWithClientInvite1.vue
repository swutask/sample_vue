<template>
  <div>
    <form>
      <div class="text-center w-full">
        <p class="auth-title">Join {{ team.name }} workspace</p>
        <p class="auth-subtitle">Let's set up your account, it won't take long.</p>
      </div>

      <InputModule
        v-model="email"
        name="email"
        type="email"
        label="Email address"
        placeholder="alex@email.com"
        class="w-full mt-30"
        :readonly="hasEmail"
        inputClasses="auth-input-classes anim-all"
        label-class="mb-5 font-bold auth-label-classes"
        :error-message="errorMessages.email"
        @clearErrorMessage="clearErrorMessage"
      >
        <template v-if="showLoginLink" #errorLink>
          <router-link to="/login" class="text-app-color">Please login</router-link>
        </template>
      </InputModule>

      <PasswordInput
        v-model="password"
        name="password"
        autofocus
        label="Password"
        placeholder="••••••••••"
        class="w-full mt-20"
        inputClasses="auth-input-classes anim-all"
        labelClass="mb-5 font-bold auth-label-classes"
        :errorMessage="errorMessages.password"
        showPasswordPower
        @clearErrorMessage="clearErrorMessage"
      />

      <ButtonModule
        text="Continue"
        class="w-full justify-center text-white rounded-10 mt-30 py-16 group font-medium text-17 bg-dark-1000 hover:bg-black"
        @click.prevent="continueRegister"
      />
    </form>
  </div>
</template>

<script setup lang="ts">
import { requiredFieldsValidation, emailValidation, passwordValidation } from '@/helpers'
defineProps<{
  team: IAuthTeam
}>()

const emit = defineEmits(['next', 'update:modelValue'])

const route = useRoute()

const showLoginLink = ref(false)

const password = ref('')
const email = ref(route.query.email as string || null)
const hasEmail = computed(() => !!route.query.email)

const errorMessages = reactive({
  email: null,
  password: null
})

function clearErrorMessage (name: string) {
  errorMessages[name] = null
}

function continueRegister () {
  requiredFieldsValidation(errorMessages, {
    email: email.value,
    password: password.value
  })

  if (!errorMessages.email) errorMessages.email = emailValidation(email.value)
  if (!errorMessages.password) errorMessages.password = passwordValidation(password.value)

  if (!errorMessages.email && !errorMessages.password) {
    teamsService.checkEmail(email.value).then(({ data }) => {
      emit('update:modelValue', {
        email: email.value,
        password: password.value
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
