<template>
  <div>
    <!-- S I G N U P  T I T L E -->
    <form>
      <div class="text-center">
        <p class="auth-title mb-10">Set a password</p>
        <p class="auth-subtitle">Create a password for your account</p>
      </div>

      <PasswordInput
        v-model="password"
        name="password"
        autofocus
        label="Password"
        placeholder="••••••••••"
        class="w-full mt-20"
        inputClasses="auth-input-classes anim-all"
        labelClass="mb-5 auth-label-classes"
        :errorMessage="errorMessages.password"
        showPasswordPower
        @clearErrorMessage="name => errorMessages[name] = null"
      />

      <ButtonModule
        text="Create account"
        class="w-full justify-center text-white rounded-10 mt-30 py-16 font-medium text-17"
        :class="password.length < 8 ? 'bg-grey-750 pointer-events-none' : 'bg-dark-1000 hover:bg-black'"
        @click.prevent="next"
      />
    </form>
  </div>
</template>

<script setup lang="ts">

import { requiredFieldsValidation } from '@/helpers'
const props = defineProps<{
  modelValue: IAuthUser
}>()

const emit = defineEmits(['next', 'update:modelValue'])

const password = ref('')

const errorMessages = reactive({
  password: null
})

const next = () => {
  requiredFieldsValidation(errorMessages, password.value)

  if (Object.values(errorMessages).every(i => !i)) {
    emit('update:modelValue', {
      ...props.modelValue,
      password: password.value
    })

    emit('next')
  }
}
</script>
