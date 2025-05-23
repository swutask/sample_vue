<template>
  <div
    class="min-h-full max-h-screen overflow-hidden text-app-color flex
     border-t-[5px] border-black bg-grey-200 items-center"
    :class="[step >= 4 && step <= 6 ? 'flex-col justify-center items-center' : 'justify-between'] "
  >
    <LogoModule
      :class="[step >= 4 && step <= 6 ? 'static mt-[70px]' : 'absolute top-30 left-30']"
    />

    <div
      class="pb-[60px] mx-auto"
      :class="[
        showDots ? 'w-full max-w-[565px]' : 'w-1/2 max-w-[900px]',
        isMobile ? 'w-full' : ''
      ]"
    >
      <div
        class="rounded-10 m-15 mt-30 py-50"
        :class="{'bg-primary border border-grey-e3e3e3 rounded-xl': step > 3}"
      >
        <div :class="{ 'max-w-[500px] mx-auto px-15 md:px-40': step < 4}">
          <template v-if="hasInvite">
            <StepWithInvite1
              v-if="step === 1"
              v-model="user"
              :team="team"
              @next="next"
            />

            <StepWithInvite2
              v-if="step === 2"
              v-model="user"
              :team="team"
              :user="user"
            />
          </template>

          <template v-else-if="hasClientInvite">
            <StepWithClientInvite1
              v-if="step === 1"
              v-model="user"
              :team="team"
              @next="next"
            />

            <StepWithClientInvite2
              v-if="step === 2"
              v-model="user"
              :team="team"
              :user="user"
            />
          </template>

          <template v-else>
            <Step1
              v-if="step === 1"
              v-model="user"
              @next="next()"
            />

            <Step2
              v-if="step === 2"
              :team="team"
              :user="user"
              @next="next"
            />

            <Step3
              v-if="step === 3"
              v-model="user"
              @next="next"
            />

            <Step4
              v-if="step === 4"
              v-model="user"
              @next="next"
            />

            <Step5
              v-if="step === 5"
              v-model="team"
              :user="user"
              @next="next"
              @back="back"
            />

            <Step6
              v-if="step === 6"
              v-model="onboarding"
              :team="team"
              :user="user"
              :hasAccount="hasAccount"
              @next="next"
            />
          </template>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex justify-center mt-20 text-center w-full text-14 text-grey-275">
        <p v-if="step === 1">
          Already have an account? <router-link :to="url" class="text-dark-200 mt-5 hover:underline mb-10 md:mb-35">Log in</router-link>
        </p>

        <p v-if="step === 2" class="max-w-[415px]">
          Keep this window open while getting your code, and don't forget to check your spam folder.
        </p>

        <div v-if="showDots" class="flex">
          <span
            v-for="(dot, index) in 3"
            :key="dot"
            :class="isDotActive(index) ? 'bg-black' : 'bg-grey-425'"
            class="mr-10 rounded-full h-8 w-8"
          />
        </div>
      </div>

      <div v-if="showBackArrow" class="flex fixed left-20 bottom-20 cursor-pointer" @click="back">
        <i class="icon-arr-left text-grey-20 text-20" />
      </div>
    </div>

    <SignUpPreview
      v-if="!isMobile && step <= 3"
      :step="step"
      :user="user"
      :team="team"
      :onboarding="onboarding"
      :class="{'hidden': step === 8}"
    />
  </div>
</template>

<script setup lang="ts">
import { teamsService } from '@/services'

const { isMobile } = useGeneral()
const { token } = useAuth()
const route = useRoute()
const router = useRouter()
const step = ref(1)

const user = ref<IAuthUser>({
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  color: '',
  avatar: null,
  avatarURL: ''
})

const team = ref<IAuthTeam>({
  name: '',
  logo: '',
  logoUrl: null,
  inviteLink: '',
  size: undefined
})

const onboarding = ref<IAuthOnboarding>({
  bookTitle: '',
  bookIcon: 'vaporwave',
  task1Title: '',
  task2Title: ''
})

const hasAccount = ref(false)
const hasInvite = ref<string | boolean>('')
const hasClientInvite = ref(false)
const showDots = computed(() => step.value === 4 || step.value === 5 || step.value === 6)
const showBackArrow = computed(() => step.value === 5 || step.value === 6)
const isDotActive = computed(() => (index: number) => index + 4 === step.value)

const url = computed(() => route.query ? { name: 'Login', query: route.query } : { name: 'Login' })

onMounted(() => {
  hasInvite.value = !!route.query.invite
  hasClientInvite.value = !!route.query['client-invite']

  if (hasInvite.value || hasClientInvite.value) {
    if (route.query.inviteLink) {
      teamsService.getTeamByInviteLink(route.query.inviteLink)
        .then((res) => {
          team.value.name = res.data.team.name
          router.replace({
            query: {
              ...route.query,
              teamId: res.data.team.id
            }
          })
        })
    } else {
      team.value.name = route.query.teamName as string
      user.value.email = route.query.email as string
    }
  }

  if (route.query.oauth && token.value) {
    step.value = 4
    hasAccount.value = true
  }
})

function next () {
  step.value++
}

function back () {
  step.value--
}
</script>
