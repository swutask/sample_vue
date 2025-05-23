interface IFeatureFlag {
  id: number
  name: string
  key: string
  active: boolean
  createdAt?: string
  updatedAt?: string
  deletedAt?: string | null
}
