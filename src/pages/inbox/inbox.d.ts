interface IInboxNotification {
  id: number
  title: number
  category: string
  oldBookTitle?: any
  message?: any
  status: string
  createdAt: string
  updatedAt: string
  deletedAt?: string | null
  bookId: number
  chatId?: number | null
  commentId?: number | null
  inboxId: number
  userId: number
  teamId: number
  teamMemberId: number
  projectId?: number | null
  attachmentId?: number | null
  taskId?: number | null
  chatMessageId?: number | null
  team: ITeam
  teamMember: ITeamMember
  project?: IProject
  book?: IBook
  chat?: IChat
  attachment?: IAttachment
  task?: ITask
  comment?: any
}

interface INotificationRule {
  push: boolean
  email: boolean
  originalKey: string
  label: string
}

type TNotificationMappedRules = Record<'General' | 'Tasks' | 'Other', INotificationRule[]>
