interface IAttachment {
  bookId?: number
  chat?: IChat
  createdAt?: string
  deletedAt?: string
  fileManagerId?: number
  id: number
  isTaskThumbnail: boolean
  key: string
  mimeType: string
  name: string
  projectId?: number
  showInCard: boolean
  showInFileManager: boolean
  showInModal: boolean
  size: number
  taskId: number
  teamId: number
  url: string
  userId: number
  version?: number
  externalVersion?: string
  subversion: IAttachment[]
  subversionMessageCount?: string
  status?: number | null
  order: number
}

interface IImg {
  key: string
  mimeType: string
  size: number
  name: string
  url: string
  id: string | number
}
