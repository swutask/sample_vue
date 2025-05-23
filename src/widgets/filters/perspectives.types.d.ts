interface IShowCompletedFilter {
  label?: string
  val?: number
  completedAtFrom?: Date | null | string
  completedAtTo?: Date | null | string
  withoutCompleted?: boolean
}

interface IUrgencyFilter {
  type: number
  text: string
}

interface IDateOption {
  startDate?: string | Date
  endDate?: string | Date
}

interface IDateFilter {
  option: IDateOption
  text: string
}

interface IShowOnTaskFilter {
  name: string
  key: string
  width: number
  selected: boolean
  isHidden?: boolean
}

TSortedDirection = 'ASC' | 'DESC'

interface IFilters {
  selectedBooksFilter?: number[]
  showCompletedFilter: IShowCompletedFilter
  search: string
  tagsFilter: ITag[]
  urgencyFilter: IUrgencyFilter[]
  dateFilter: IDateFilter[]
  membersFilter: ITeamMember[]
  groupBy: string
  sortedBy: string
  sortedDirection: TSortedDirection
  showOnTask: IShowOnTaskFilter[]
}

interface IPerspective {
  id: number
  name: string
  bookId?: number
  userId?: number
  task: IFilters
  createdAt?: string
  updatedAt?: string
  deletedAt?: string
}

interface ICreatePerspective {
  name: string
  bookId?: number
  taskFilter: IFilters
}

interface IUpdatePerspective {
  id: number
  name?: string
  bookId?: number
  taskFilter?: IFilters
}
