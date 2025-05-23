interface IShowOnTaskObj {
  labels: boolean
  assignee: boolean
  dueDate: boolean
  priority: boolean
  comments: boolean
  attachments: boolean
  description: boolean
  subtitle: boolean
  image: boolean
  storyPoints: boolean
}

interface ITagToTask {
  id: number
  createdAt: string
  updatedAt: string
  deletedAt?: any
  taskId: number
  tagId: number
}

interface ITag {
  id: number
  name?: string
  color?: number
  createdAt?: string
  updatedAt?: string
  deletedAt?: string
  bookId?: number
  teamId?: number
  ITagToTask?: ITagToTask
}

interface ITaskRow {
  id: number
  title?: string
  color?: number
  order?: number
  createdAt?: Date | null
  updatedAt?: Date | null
  deletedAt?: Date | null
  userId?: number
  teamId?: number
  bookId?: number
}

interface ITaskAttachment {
  id?: number
  url: string
  showInModal: boolean
  showInCard: boolean
  isTaskThumbnail?: boolean
  createdAt?: string
}

interface ITaskSubscriptions {
  id: number
  createdAt: string
  updatedAt?: string
  deletedAt?: any
  taskId: number
  userId: number
}

interface ITaskReminder {
  createdAt: Date
  deletedAt?: Date
  id: number
  remindAt: string
  scheduleArn: string
  taskId: number
  updatedAt?: Date
  userId: number
}

interface ITask {
  endEventTime: string
  startEventTime: string
  htmlLink: string
  integrationType: string
  id: number
  uuid?: string
  title: string
  subTitle?: string
  additionalInfo?: string
  isSample?: boolean
  isUrgent?: boolean
  isToday?: boolean
  urgentStatus?: number
  storyPoints?: number
  position?: string
  order?: number
  homeOrder?: number
  endDate?: string
  startDate?: string
  rrule?: string
  createdAt?: string
  completedAt?: Date | null
  updatedAt?: Date | null
  deletedAt?: Date | null
  userId?: number
  teamId?: number
  bookId?: number
  projectId?: number
  taskRowId?: number
  parentId?: number | null
  taskTags?: ITag[]
  taskRow?: ITaskRow
  project?: IProject
  event?: any
  attachments?: ITaskAttachment[]
  user?: IUser
  teamMembers?: ITeamMember[]
  chat?: IChat
  subTask?: ITask[]
  showUserBadge?: boolean
  milestoneId?: number
  reminders?: Partial<ITaskReminder>[]
  taskSubscriptions?: ITaskSubscriptions[]
}

interface ICreateTask {
  title: string
  subTitle?: string
  additionalInfo?: string
  isUrgent?: boolean
  taskRowId: number
  bookId?: number
  projectId?: number
  order?: number
  subTask?: ITask[]
  isSample?: boolean
  isToday?: boolean
  startDate?: string
  endDate?: string
  tagIds?: number[]
  teamMembers?: number[]
  urgentStatus?: number
  parentId?: number
  storyPoints?: number
}

interface IReminderRequestBody {
  date: string
  taskId: number
}

interface IReminderSettingsRequestBody {
  allowSendToEmail?: boolean
  allowSendToPush?: boolean
}

interface IReminderSettings {
  id: number
  allowSendToEmail: boolean
  allowSendToPush: boolean
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  userId: number
}

interface IGetTask {
  ids?: number[]
  tagIds?: number[]
  bookIds?: number[]
  search?: string
  teamMemberIds?: number[]
  urgencyStatuses?: number[]
  date?: {
    startDate?: string
    endDate?: string
  }
  showCompleted?: Partial<IShowCompletedFilter>
  sortedBy?: string
  sortedDirection?: TSortedDirection
  calendarSynced?: boolean
}

interface ICompleteTask {
  id: number
  bookId: number
  task: ITask
  isSubTask?: boolean
  completedAt?: Date | null
  showNotification?: boolean
  isForSampleSpace?: boolean
}

interface IToggleTaskTag {
  tag: ITag
  taskId: number
  isSelected?: boolean
  bookId?: number
  isSubtask?: boolean
}

interface IDeleteTask {
  id: number
  bookId: number
  parentId?: number
  isSubtask?: boolean
}

interface IUpdatePreview {
  id: number
  bookId: number
  imageId: number
  showInModal?: boolean
  showInCard?: boolean
}
