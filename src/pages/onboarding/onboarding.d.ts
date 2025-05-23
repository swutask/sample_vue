interface IOnboardingTask {
  id: number
  title: string
  description?: string
  media?: string
  estimatedTime: string
}

interface IOnboardingScheme {
  id: number
  isClosed: boolean
  completedTasksCount: number
  videoWatched: boolean
  projectCreated: boolean
  tasksCreated: boolean
  tasksGrouped: boolean
  profileCompleted: boolean
  teamMemberInvited: boolean
  createdAt: string
  updatedAt: string
  deletedAt: any
  teamId: number
}
