<template>
  <div>
    <!-- S I G N U P  T I T L E -->
    <div class="text-center w-full">
      <p class="auth-title">Join {{ team.name }} workspace</p>
      <p class="auth-subtitle">Let's set up your account, it won't take long.</p>
    </div>

    <InputModule
      v-model="account.firstName"
      name="firstName"
      autofocus
      type="text"
      label="First name"
      placeholder="Alex"
      class="w-full mt-30"
      inputClasses="auth-input-classes anim-all"
      label-class="mb-5 font-bold auth-label-classes"
      :error-message="errorMessages.firstName"
      @clearErrorMessage="name => errorMessages[name] = null"
    />
    <InputModule
      v-model="account.lastName"
      name="lastName"
      type="text"
      label="Last name"
      placeholder="Johnson"
      class="w-full mt-20"
      inputClasses="auth-input-classes anim-all"
      label-class="mb-5 font-bold auth-label-classes"
      :error-message="errorMessages.lastName"
      @clearErrorMessage="name => errorMessages[name] = null"
    />

    <div v-if="account.firstName && account.lastName" class="flex items-center mt-30">
      <span class="font-semibold">Your name badge</span>

      <UserBadge
        :first-name="account.firstName"
        :last-name="account.lastName"
        :color="color"
        class="mx-10 bg-primary flex items-center px-10 py-2 text-14 rounded-8 shadow-sharp font-semibold"
      />

      <ButtonModule
        :prefix="`icon-arrow-circle rotate-${rotateIndex ? '180' : '0'} anim-all`"
        text="Change"
        class="text-app-color text-14 opacity-40 hover:opacity-70 group"
        @click="changeColor"
      />
    </div>

    <ButtonModule
      text="Create account"
      class="w-full justify-center text-white rounded-10 mt-30 py-16 group font-medium text-17 bg-dark-1000 hover:bg-black"
      @click="next"
    />
  </div>
</template>

<script setup lang="ts">
import colors from '@/core/userColors.json'
import { requiredFieldsValidation } from '@/helpers'

const props = defineProps<{
  team: IAuthTeam
  user: IAuthUser
}>()

const route = useRoute()
const router = useRouter()
const { registerClient } = useClient()

const lastColorIndex = colors.length - 1
const color = ref(colors[Math.floor(Math.random() * lastColorIndex)])
const rotateIndex = ref(true)

const account = reactive({
  firstName: '',
  lastName: ''
})

const errorMessages = reactive({
  firstName: null,
  lastName: null
})

const teamId = ref(null)
const signature = ref(null)
const inviteLink = ref(null)

onMounted(() => {
  nextTick(() => {
    teamId.value = route.query.teamId
    signature.value = route.query.signature
    inviteLink.value = route.query.inviteLink
  })
})

const next = async () => {
  requiredFieldsValidation(errorMessages, account)

  if (Object.values(errorMessages).every(i => !i)) {
    await registerClient({
      firstName: account.firstName,
      lastName: account.lastName,
      color: color.value,
      inviteLink: inviteLink.value,
      signature: signature.value,
      email: props.user.email,
      teamId: +teamId.value,
      password: props.user.password
    })

    router.push({ name: 'TeamBooks', params: { team: 'team' } })
  }
}

function changeColor () {
  rotateIndex.value = !rotateIndex.value
  color.value = colors[Math.floor(Math.random() * lastColorIndex)]
}
</script>
