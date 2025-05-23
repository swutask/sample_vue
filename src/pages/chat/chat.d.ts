/* eslint-disable no-use-before-define */

interface IReaction {
  id: number
  name?: string
  createdAt?: string
  updatedAt?: string
  deletedAt?: string | Date
  reactionId?: number
  messageId?: number
  userId?: number
  user?: IUser
}
interface IMessage {
  id: number
  text: string
  createdAt?: string | Date
  updatedAt?: string | Date
  deletedAt?: string | Date
  resolvedAt?: string | Date
  chatId: number
  userId?: number
  bookId?: number
  taskId?: number
  projectId?: string
  reactions?: IReaction[]
  messageStatus?: IMessageStatus
  attachments?: IAttachment[]
  attachmentIds?: number[]
  user?: IUser
  replyId?: number
  resolvedAt?: string | Date
  threadId?: number
  reply?: IMessage
  isSample?: boolean
  thread?: IMessage[]
  threadCount?: number
  annotation?: IAnnotation
  showNewMessage?: boolean
}

interface IHoveredAnnotation {
  id: number | null
  pointHover: boolean
}

interface IAnnotation {
  id: number
  text: string
  x: number
  y: number
  messageId: number
  resolvedAt?: string | Date
  createdAt?: string | Date
  updatedAt?: string | Date
  deletedAt?: string | Date
  attachmentId: number
  teamId: number
}

interface IAnnotationPayload {
  text: string
  x: number
  y: number
}

interface IUpdateAnnotation {
  resolvedAt?: Date | null
  text: string
  x: number
  y: number
}

interface ISearchMessage extends IMessage {
  highlight: { text: string[] }
}

interface IMessageStatus {
  id?: number
  status: string
  createdAt?: string | Date
  updatedAt?: string | Date
  deletedAt?: string | Date
  chatId?: number
  messageId?: number
  userId?: number
}

interface IChatSettings {
  id: number
  mutedAt?: string
  createdAt: string
  updatedAt: string
  deletedAt?: string
  chatId: number
  userId: number
}

interface IChat {
  attachmentId?: number
  book?: IBook
  bookId?: number
  createdAt: string
  deletedAt?: string
  id: number
  isMain: boolean
  taskId?: number
  teamId?: number
  updatedAt?: string
  messages: IMessage[]
  messageCount?: string
  chatSetting?: IChatSettings
}

interface IUpdateMessage {
  chatId: number
  bookId: number
  id: number
  text?: string
  replyId?: number
  reply?: IMessage
  resolvedAt?: date | null
  threadId?: number
  attachments?: IAttachment[]
  attachmentIds?: number[]
}

interface IPrivateChat {
  privateChat: {
    id: number
    chatId: number
    creatorId: number
    memberId: number
    unreadMessageCount: string | number
  }
  chatSetting: {
    id: number
    mutedAt?: null | Date
  }
  opponent: {
    avatar: {
      url: null | string
    }
    id: number
    profile: {
      firstName: string
      lastName: string
      color: string
    }
  }
}
