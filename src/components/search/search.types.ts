
export interface ISource {
  subTitle?: string
  icon?: string
  title?: string
  name?: string
  bookId?: number
  parentId?: number
  resolvedAt?: null | string
  start: string
}

export interface IHighlight {
  subTitle: string[]
  title: string[]
  content: string[]
  text: string[]
  lastName: string[]
  firstName: string[]
  additionalInfo: string[]
}

export interface IChat {
  id: number
  isMain: boolean
  createdAt: string
  updatedAt: string
  deletedAt?: null
  attachmentId?: number
  bookId?: number
  teamId?: number
  taskId?: number
}

export interface IProfile {
  firstName: string
  lastName: string
  color: string
}

export interface ISearchItem {
  _index: string
  _type: string
  _id: string
  _score: number
  _source: ISource
  highlight: IHighlight
  chat: IChat
  profile: IProfile
}
