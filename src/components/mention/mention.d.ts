interface IMentionItem {
  uuid: string
  id: number
  label: string
  title?: string
  firstName?: string
  lastName?: string
  color?: string
  avatar?: IAvatar
  sendImmediately?: boolean
  icon?: string
  projectId?: number
  chatId?: number
  bookId?: number
  taskId?: number
  start?: string
  parentId?: number
  resolvedAt?: string
}
