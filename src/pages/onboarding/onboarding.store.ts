import { onboardingService } from '@/pages/onboarding/onboarding.service'

const useOnboardingStore = defineStore('onboarding', () => {
  const { isOwner } = useTeam()

  const router = useRouter()

  const confirmRef = ref(null)
  const completedTasksToUpgrade = ref(25)
  const onboarding = ref({} as IOnboardingScheme)
  const hasOnboarding = ref(false)
  const onboardingTasks = ref<IOnboardingTask[]>([
    // {
    //   id: 1,
    //   title: 'Watch our introduction video',
    //   media: 'https://assets.mixkit.co/videos/download/mixkit-close-up-shot-of-the-wrinkles-and-waves-of-a-51005-medium.mp4',
    //   estimatedTime: '1 min'
    // },
    {
      id: 2,
      title: 'Create a space',
      description: 'Create a new space and invite your team members to the space',
      estimatedTime: '1 min'
    },
    {
      id: 3,
      title: 'Create 3 tasks',
      description: 'Create three tasks in a space and assign each one to a team member',
      estimatedTime: '2 min'
    },
    {
      id: 4,
      title: 'Group your tasks by assignee or priority.',
      description: 'Navigate to a space, open the filter settings, and adjust the task grouping using the \'Group by\' dropdown menu.',
      estimatedTime: '1 min'
    },
    {
      id: 6,
      title: 'Complete your profile',
      description: 'Add a profile a profile picture, job title, time zone and location',
      estimatedTime: '1 min'
    },
    {
      id: 7,
      title: 'Invite a teammate to collaborate',
      estimatedTime: '1 min'
    }
  ].map((item, idx) => ({ ...item, id: idx + 1 }))) // TODO remove this map when list of tasks will be ready

  const isHighlighted = ref(false)

  const areTasksCompletedToUpgrade = computed(() => {
    return onboarding.value.completedTasksCount < completedTasksToUpgrade.value
  })

  const currentProgress = computed(() => {
    return isCompleted.value.filter(Boolean).length
  })

  const isCompleted = computed(() => {
    return Object.values({
      // videoWatched: true,
      projectCreated: onboarding.value.projectCreated,
      tasksCreated: onboarding.value.completedTasksCount > 2,
      tasksGrouped: onboarding.value.tasksGrouped,
      profileCompleted: onboarding.value.profileCompleted,
      teamMemberInvited: onboarding.value.teamMemberInvited
    })
  })

  async function getOnboarding () {
    try {
      const { data } = await onboardingService.getOnboarding()

      if (data.onboardingTaskSettings) {
        onboarding.value = {
          ...data.onboardingTaskSettings
        // videoWatched: true
        }
        hasOnboarding.value = true
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function closeOnboarding () {
    onboarding.value.isClosed = true

    await onboardingService.updateOnboarding({ isClosed: true })

    confirmRef.value.close()
    router.push({ name: 'Today' })
  }

  async function completeOnboardingTask (task: string) {
    try {
      if (hasOnboarding.value && isOwner.value && !onboarding.value?.isClosed) {
        if (task === 'completedTasksCount' && onboarding.value.completedTasksCount < 3) {
          onboarding.value.completedTasksCount += 1
        } else {
          onboarding.value[task] = true
        }
        await onboardingService.updateOnboarding({ [task]: onboarding.value[task] })
      }
    } catch (e) {
      console.log(e)
    }
  }

  return {
    // data
    onboarding,
    onboardingTasks,
    isHighlighted,

    // computed
    currentProgress,
    isCompleted,
    areTasksCompletedToUpgrade,
    completedTasksToUpgrade,

    // refs
    confirmRef,

    // function
    closeOnboarding,
    getOnboarding,
    completeOnboardingTask
  }
})

export function useOnboarding () {
  const store = useOnboardingStore()

  return {
    ...store,
    ...storeToRefs(store)
  }
}
