<template>
  <div>
    <div class="text-center w-full">
      <p class="auth-title">Check your inbox</p>

      <p class="auth-subtitle md:-mx-15">
        We've just emailed you a
        <span class="text-dark-default font-semibold">6-digit code</span>.
        <br> Please enter it below
      </p>
    </div>

    <InputModule
      v-model="confirmCode"
      autofocus
      type="number"
      name="confirmCode"
      placeholder="352846"
      class="w-full mt-50"
      inputClasses="auth-input-classes anim-all"
      label-class="auth-label-classes"
      max-length="6"
      @input="maxLengthCount"
    />

    <div class="text-14 w-full">
      <div>
        <ButtonModule
          text="Click here"
          class="text-brand mt-10 p-5"
          :disabled="isDisabledCodeButton"
          :class="isDisabledCodeButton ? 'opacity-50' : ''"
          @click="sendVerificationCode"
        />

        <span class="text-grey-275">to receive a new code</span>
      </div>
    </div>

    <ButtonModule
      text="Continue"
      :disabled="isDisabledContinueButton"
      :class="isDisabledContinueButton ? 'bg-grey-750 pointer-events-none' : 'bg-dark-1000 hover:bg-black'"
      class="w-full justify-center text-white rounded-10 mt-50 py-16 group font-medium text-17"
      @click="checkConfirmCode"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  user: IAuthUser
  team: IAuthTeam
}>()

const emit = defineEmits(['next'])

const { setNotification } = useGeneral()
const { setRequestCount } = useAuth()

const confirmCode = ref('')
const isDisabledCodeButton = ref(false)

const showLastStep = ref(false)

const isDisabledContinueButton = computed(() => confirmCode.value.toString().length !== 6)

onMounted(() => {
  teamsService.sendVerificationCode({ email: props.user.email })
  setRequestCount(0)
})

const sendVerificationCode = () => {
  isDisabledCodeButton.value = true
  setTimeout(() => {
    isDisabledCodeButton.value = false
  }, 60000)

  setNotification({ uuid: window.crypto.randomUUID(), message: 'Please check your email', color: 'success' })

  return teamsService.sendVerificationCode({ email: props.user.email, teamName: props.team.name })
}

async function checkConfirmCode () {
  if (confirmCode.value.toString().length === 6) {
    try {
      await teamsService.verifyCode({
        code: confirmCode.value,
        email: props.user.email
      })

      emit('next')
    } catch (error) {
      showLastStep.value = false
    }
  }
}

function maxLengthCount () {
  if (confirmCode.value.toString().length > 6) confirmCode.value = confirmCode.value.toString().slice(0, 6)
}
</script>
