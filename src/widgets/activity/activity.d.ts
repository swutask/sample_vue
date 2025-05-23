interface ITaskActivityDescription {
  id: number
  data: {
    action: string
    column: string | null
    value?: any
    isSubtask?: boolean
    additionValue?: any
    customValue?: any
    taskTitle?: string
    remindAt?: Date
    taskId?: number
  }
  type: string
  createdAt: string
  updatedAt: string
  deletedAt?: string
  creatorId?: number
  relatedUserId?: number | null
}

interface ITaskActivity {
  id: number
  createdAt: string
  updatedAt: string
  deletedAt?: string
  activityId: number
  status: string
  taskId: number
  teamId: number
  activity: ITaskActivityDescription
}

interface IBookActivityDescription {
  id: number
  data: {
    action: string
    column: string | null
    value?: any
    additionValue?: any
    customValue?: any
    attachmentId?: number
    annotationId?: number
    projectId?: number
    chatId?: number
    messageId?: number
    bookId: number
    taskTitle?: string
    remindAt?: Date
  }
  projectId: number
  type: string
  createdAt: string
  updatedAt: string
  deletedAt?: string
  creatorId?: number
  relatedUserId?: number | null
}

interface IBookActivity {
  id: number
  createdAt: string
  updatedAt: string
  deletedAt?: string
  activityId: number
  taskId: number
  teamId: number
  bookId: number
  status: string
  task?: ITask
  type?: 'private' | 'public'
  activity: IBookActivityDescription
}

type TActivityConfigElement = {
  value: (activity: ITaskActivityDescription['data'] | IBookActivityDescription['data']) => string
  classes?: string[]
  isLabel?: boolean
  styles?: any
  tagName?: string
  event?: any
}

interface IActivityData {
  activity: ITaskActivityDescription['data'] | IBookActivityDescription['data']
  ref: HTMLDivElement
  truncateText?: boolean
  creatorId: number
  router?: any
  task?: ITask
  isPrivate?: boolean
  isLinkDotted?: boolean
  withSpaceName?: boolean
}

type TDefaultActivityAction = 'create' | 'update' | 'delete' | string
