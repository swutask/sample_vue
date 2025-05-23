<template>
  <div>
    <label class="flex flex-col">
      <div v-if="label" class="flex justify-between items-end" :class="labelClass">
        <p>{{ label }}</p>
        <router-link
          v-if="hasForgotPasswordButton"
          to="/reset-password"
          class="text-13 md:text-opacity-50 hover:text-opacity-100 font-normal"
        >
          Forgot password?
        </router-link>
      </div>
      <div class="relative">
        <input
          v-model="value"
          v-focus="autofocus"
          type="password"
          :placeholder="placeholder"
          class="w-full outline-none"
          :class="[
            inputClasses,
            errorMessage && 'shadow-[0px_0px_0px_1.6px_#FF5252]']"
          :disabled="disabled"
          maxlength="64"
          :readonly="readonly"
          @blur="$emit('blur')"
          @focus="$emit('focus')"
          @input="onInput"
        >
        <div v-if="showPasswordPower" class=" mt-10 flex items-center">
          <div v-if="value.length >= 1" class="flex items-center">
            <div class="mr-5 w-30 h-4 rounded-full" :class="passwordPower.level < 2 ? 'bg-error' : color" />
            <div class="mr-5 w-30 h-4 rounded-full" :class="color" />
            <div class="mr-10 w-30 h-4 rounded-full" :class="passwordPower.level > 2 ? 'bg-green-800' : 'bg-grey-700'" />
          </div>
          <p class="text-14 text-grey-275">{{ passwordPower.desc }}</p>
        </div>
      </div>
    </label>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  label?: string
  name?: string
  placeholder?: string
  inputClasses?: string
  labelClass?: string
  disabled?: boolean
  readonly?: boolean
  modelValue?: string
  errorMessage?: string
  hasForgotPasswordButton?: boolean
  autofocus?: boolean
  isNeedLink?: boolean
  showPasswordPower?: boolean
}>(), {
  label: '',
  name: '',
  placeholder: '',
  inputClasses: 'px-13 py-9',
  labelClass: 'md:mx-5 mb-10',
  disabled: false,
  readonly: false,
  modelValue: '',
  errorMessage: null,
  hasForgotPasswordButton: false,
  autofocus: false,
  isNeedLink: false,
  showPasswordPower: false
})

const emit = defineEmits(['update:modelValue', 'clearErrorMessage', 'blur', 'focus', 'input'])

const passwordPower = reactive({
  level: 0,
  desc: 'At least 8 characters.'
})

const value = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit('update:modelValue', val)
    emit('clearErrorMessage', props.name)
  }
})

const color = computed(() => {
  return passwordPower.level === 2 ? 'bg-yellow' : passwordPower.level > 2 ? 'bg-green-800' : 'bg-grey-700'
})

function onInput (e) {
  emit('input', e.target.value)
  checkPasswordStrength(e.target.value)
}

onMounted(() => {
  if (props.showPasswordPower) checkPasswordStrength(value.value)
})

function checkPasswordStrength (password: string) {
  const regex = ['[a-z]', '[0-9]', '[$@$!%*#?&]']

  let level = 0

  for (let i = 0; i < regex.length; i++) {
    if (new RegExp(regex[i]).test(password)) {
      level++
    }
  }

  if (password.length < 8) {
    passwordPower.level = 0
    passwordPower.desc = 'At least 8 characters.'
  } else {
    if (level > 2 && password.length >= 14) {
      passwordPower.level = 3
      passwordPower.desc = 'strong password'
    } else if (level > 1 && password.length >= 9) {
      passwordPower.level = 2
      passwordPower.desc = 'okay password'
    } else {
      passwordPower.level = 1
      passwordPower.desc = 'weak password'
    }
  }
}
</script>
