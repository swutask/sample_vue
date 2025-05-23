import { removeHTMLTags } from '@/core/helper-functions'
import mixpanel from 'mixpanel-browser'

async function initMixpanel (localUser: IUser, planName: string, teamName: string, teamId: number) {
  if (import.meta.env.VITE_APP_ENV === 'production') {
    await mixpanel.init(
      import.meta.env.VITE_APP_MIXPANEL_TOKEN,
      { debug: true, track_pageview: true, persistence: 'localStorage' }
    )

    await mixpanel.identify(localUser.id.toString())

    await mixpanel.people.set({
      $name: `${localUser.profile.firstName} ${localUser.profile.lastName || ''}`,
      $email: localUser.email,
      $plan: planName,
      $teamName: teamName,
      $teamId: teamId
    })
  }
}

async function resetMixpanel () {
  if (import.meta.env.VITE_APP_ENV === 'production') {
    await mixpanel.reset()
  }
}

function spaceCreated (title: string) {
  if (import.meta.env.VITE_APP_ENV === 'production') {
    mixpanel.track('Space creation', { title: removeHTMLTags(title) })
  }
}

function taskCreated (title: string) {
  const { stats } = usePlan()

  if (import.meta.env.VITE_APP_ENV === 'production') {
    mixpanel.track('Task created', { title: removeHTMLTags(title) })

    mixpanel.track('Total workspace tasks', { TotalWorkspaceTasks: stats.value.tasks })
  }
}

function taskDeleted () {
  const { stats } = usePlan()

  if (import.meta.env.VITE_APP_ENV === 'production') {
    mixpanel.track('Total workspace tasks', { TotalWorkspaceTasks: stats.value.tasks })
  }
}

function taskCompleted (title: string) {
  if (import.meta.env.VITE_APP_ENV === 'production') {
    mixpanel.track('Task completed', { title: removeHTMLTags(title) })
  }
}

function setActiveTasks (value = 0) {
  const { stats } = usePlan()

  const tasks = stats.value.activeTasks + value

  if (import.meta.env.VITE_APP_ENV === 'production') {
    mixpanel.track('Total active tasks', { TotalActiveTasks: tasks })
  }
}

export function useMixpanel () {
  return {
    initMixpanel,
    resetMixpanel,
    spaceCreated,
    taskCreated,
    taskCompleted,
    setActiveTasks,
    taskDeleted
  }
}
