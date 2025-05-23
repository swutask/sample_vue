interface ITemplate {
  content: string
  createdAt: string
  deletedAt?: string
  id: number
  projectTitle: string
  teamId?: number | boolean
  templateAttachments: { url: string}[]
  url: string
  templateOrder: {order: number; createdAt: string }
  createdAt: number
  order: number
  title: string
  updatedAt: string
  userId: number
}

type TActiveState = 'All' | 'Library' | 'Private' | 'Shared'
