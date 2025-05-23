interface IBookLink {
  id: number
  name: string
  description?: string
  url: string
  createdAt: string
  updatedAt: string
  deletedAt?: string
  bookId: number
}
interface IBookOrder {
  order: number
  createdAt?: string | Date
}

interface IMilestone{
  id: number
  startDate?: string | Date
  endDate?: string | Date
  description?: string
  title: string
  userId?: number
  progress?: string
  tasks?: number[]
  bookId?: number
}

interface IBook {
  id: number
  uuid?: string
  isOpen?: boolean
  tasks?: ITask[]
  title?: string
  color?: string
  isSample?: boolean
  archivedAt?: string | Date
  isToday?: boolean
  favorite?: boolean
  icon?: string
  createdAt?: string | Date
  updatedAt?: string | Date
  deletedAt?: string | Date
  isFolder?: boolean
  userId?: number
  teamId?: number
  bookFolderId?: number
  bookOrder?: IBookOrder
  chat?: IChat
  clients?: IClient[]
  projects?: IProject[]
  shareWith?: ITeamMember[]
  milestones?: IMilestone[]
  subTitle?: string
  filter?: {
    task: string
  }
}

type TSortBy = 'Recent' | 'A-Z' | 'Manual'
