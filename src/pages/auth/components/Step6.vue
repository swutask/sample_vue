<template>
  <div class="overflow-hidden">
    <LoadingModule
      :loading="loading"
      class="z-9999 fixed"
    />
    <div class="flex">
      <div class="w-full px-15 md:px-40 flex-shrink-0 z-10">
        <div>
          <p class="auth-title">
            Let's set up your first space
          </p>
          <p class="auth-subtitle">What projects are you currently working on?</p>
        </div>

        <div class="relative mt-25">
          <Icons
            class="!absolute left-10 pl-3 pr-9 border-r border-grey-1500 top-43 z-10"
            @setIcon="setIcon"
          >
            <div class="flex rounded-10 cursor-pointer">
              <img class="m-auto w-22 h-22 mr-2" :src="iconSrc" alt="icon">
            </div>
          </Icons>
          <InputModule
            v-model="bookTitle"
            name="firstName"
            type="text"
            autofocus
            label="Space name"
            placeholder="My project"
            class="w-full"
            inputClasses="auth-input-classes anim-all pl-[60px]"
            labelClass="mb-5 text-14 auth-label-classes"
            @input="onInput"
          />
        </div>

        <InputModule
          v-model="task1Title"
          name="firstName"
          type="text"
          label="Task #1"
          placeholder="Design book cover"
          class="w-full mt-25"
          inputClasses="auth-input-classes anim-all"
          labelClass="mb-5 text-14 auth-label-classes"
          @input="onInput"
        />

        <InputModule
          v-model="task2Title"
          name="firstName"
          type="text"
          label="Task #2"
          placeholder="Prepare meeting"
          class="w-full mt-25"
          inputClasses="auth-input-classes anim-all"
          labelClass="mb-5 text-14 auth-label-classes"
          @input="onInput"
        />

        <ButtonModule
          text="Continue"
          class="w-full justify-center text-white rounded-10 my-30 py-16 font-medium text-17"
          :disabled="disabledButton"
          :class="continueActionRule ? 'bg-grey-750 pointer-events-none' : 'bg-dark-1000 hover:bg-black'"
          @click.prevent="next"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import localStorageService from '@/core/local-storage'
import createOnboardingBookAndTasks from '@/onboarding/createOnboardingBookAndTasks'
import { useGtag } from 'vue-gtag-next'
import { initialFiltersForToday } from '@/pages/task-board/tasks-utils'

const stripeLoader = () => import(/* chunkName: Stripe */ '@stripe/stripe-js')

const props = defineProps<{
  team: IAuthTeam
  user: IAuthUser
  modelValue: IAuthOnboarding
  hasAccount: boolean
}>()

const emit = defineEmits(['next', 'update:modelValue'])

const router = useRouter()
const route = useRoute()

const { setRequestCount } = useAuth()
const { event } = useGtag()
const { setLogo, registerTeam, createTeam: handleCreateTeam, team } = useTeam()
const { user: userProfile, getProfile } = useProfile()
const { upgradeTeamPlan } = usePlan()

const bookTitle = ref(props.modelValue.bookTitle)
const bookIcon = ref(props.modelValue.bookIcon)
const task1Title = ref(props.modelValue.task1Title)
const task2Title = ref(props.modelValue.task2Title)
const disabledButton = ref(false)
const inviteLink = ref(null)
const loading = ref(false)
const teamId = ref(null)
const book = ref(null)

const continueActionRule = computed(() => bookTitle.value.trim() === '' || task1Title.value.trim() === '' || task2Title.value.trim() === '')

const iconSrc = computed(() => {
  const icon = props.modelValue.bookIcon || 'default-phoenix'

  if (icon.includes('default-')) {
    return `https://helloivy-icons.s3.eu-central-1.amazonaws.com/${icon}.svg`
  }

  return `https://helloivy-icons.s3.eu-central-1.amazonaws.com/${icon}.png`
})

onMounted(() => {
  localStorageService.removeItem('onboardingData')
})

function setIcon (icon: string) {
  bookIcon.value = icon
  emit('update:modelValue', {
    ...props.modelValue,
    bookIcon: icon
  })
}

function onInput () {
  emit('update:modelValue', {
    bookTitle: bookTitle.value,
    bookIcon: bookIcon.value,
    task1Title: task1Title.value,
    task2Title: task2Title.value
  })
}

async function next () {
  setRequestCount(0)
  await teamsService.createInviteLink()
    .then(res => (inviteLink.value = res.data.inviteLink))

  await skipForNow()
}

async function createDefaultPerspective (book: IBook) {
  const { createPerspective } = usePerspectives()
  const { member } = useTeam()

  await createPerspective({
    name: 'Space',
    taskFilter: {
      ...initialFiltersForToday,
      sortedBy: 'Priority',
      groupBy: 'Space',
      membersFilter: [member.value],
      selectedBooksFilter: [book.id]
    }
  })
}

async function registerAndCreateUser () {
  try {
    loading.value = true
    const data = await registerTeam({
      firstName: props.user.firstName,
      lastName: props.user.lastName,
      color: props.user.color,
      email: props.user.email,
      password: props.user.password,
      teamName: props.team.name,
      inviteLink: inviteLink.value,
      size: props.team.size || null
    }).catch((error) => {
      throw new Error(error)
    })

    teamId.value = data.team.id

    if (import.meta.env.VITE_APP_ENV === 'production') {
      event('conversion', { send_to: 'AW-16561328233/WFWBCN_-6a8ZEOmgh9k9' })
    }

    if (props.team.logo) {
      await teamsService.upload(props.team.logo).then(res => setLogo(res.data))
    }

    if (props.user.avatar) {
      await profileService.uploadAvatar(props.user.avatar)
    }

    book.value = await createOnboardingBookAndTasks(props.modelValue)

    await createDefaultPerspective(book.value)

    loading.value = false
  } catch (error) {
    loading.value = false

    console.log(error)
    throw new Error('Something went wrong')
  }
}

async function skipForNow () {
  if (props.hasAccount) {
    await createTeam()
  } else {
    await registerAndCreateUser()
  }

  disabledButton.value = true

  await initApp()
}

async function initApp () {
  if (route.query.planId) {
    await getProfile()
    const { loadStripe } = await stripeLoader()
    const stripe = await loadStripe(import.meta.env.VITE_APP_STRIPE)

    upgradeTeamPlan({
      planId: +route.query.planId,
      teamId: team.value.id,
      userId: userProfile.value.id
    }).then(res => {
      stripe.redirectToCheckout({ sessionId: res })
    })
  } else {
    router.push({ name: 'TaskBoardTeam', params: { team: team.value?.link, id: book.value.id } })
    localStorageService.setItem('startOnboarding', true)
  }
}

async function createTeam () {
  const data = await handleCreateTeam({
    teamName: props.team.name,
    inviteLink: inviteLink.value
  })

  teamId.value = data.team.id

  if (props.team.logo) {
    await teamsService.upload(props.team.logo).then(res => setLogo(res.data))
  }

  if (import.meta.env.VITE_APP_ENV === 'production') {
    event('conversion', { send_to: 'AW-16561328233/WFWBCN_-6a8ZEOmgh9k9' })
  }

  book.value = await createOnboardingBookAndTasks(props.modelValue)
}
</script>
