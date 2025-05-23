interface IAvatar {
  url: string
}

interface IIntegrationItem {
  action: function
  cancelAction: function
  label: string
  title: string
  text: string
  icon: string
  showCancelAction: boolean
}

interface IProject {
  id: number
  title: string
  body: string
  document?: string
  order: number
  isLocked: boolean
  state: string
  icon: string
  createdAt: string
  updatedAt: string
  deletedAt?: string
  bookId: number
  userId?: number
  parentId?: number
  subProject?: IProject[]
  comments: any[]
}

type TIndexedObject<T = any> = {
  [key: string | number]: T
}

type TNullableField<T = any> = T | null

interface ILoginState {
  email: string
  password: string
}

interface ISignUp {
  color: string
  email: string
  firstName: string
  inviteLink: string
  lastName: string
  password: string
  teamName: string
}

interface IFile {
  id: number
  percent: number
  name: string
  bookId: number
  abort?: () => void
}

interface IProfile {
  firstName: string
  lastName?: string
  userName?: string
  location?: string
  timezone?: string
  position?: string
  showBookOnboarding?: boolean
  showProjectOnboarding?: boolean
  color?: string
}

interface ITrashItem {
  deletedAt: string
  icon?: string
  id: number
  title?: string
  name?: string
  attachments?: IAttachment[]
  book?: { title: string }
}

interface IOnboarding {
  id: number
  showBookOnboarding: boolean
  showProjectOnboarding: boolean
  showTaskOnboarding: boolean
  showChatOnboarding: boolean
  showFileOnboarding: boolean
  showTeamDashboardOnboarding: boolean
  showPostOnboarding: boolean
  showOverviewOnboarding: boolean
  showCalendarOnboarding: boolean
  showNewLookOnboarding: boolean
  createdAt: string
  updatedAt: string
  deletedAt: string
  userId: number
}

interface IUser {
  id: number
  email?: string
  createdAt?: string
  isPassword?: boolean
  isClient?: boolean
  profile?: IProfile
  role?: { name: string }
  avatar?: { url: string }
  onboarding?: IOnboarding
}

interface ITeam {
  id: number
  name: string
  info: string
  link: string
  inviteLink: string
  createdAt: string
  updatedAt: string
  deletedAt?: string
  userId: number
  teamLogo: {
    url: string
    id: number
  }
}
interface ITeamRole {
  id?: number
  name: string
  type?: string
}

interface ITeamMember {
  avatar?: IAvatar
  user?: Partial<IUser> // TODO: check members types on the BE
  isOpen?: boolean
  color?: string
  createdAt?: string
  deletedAt?: string
  email?: string
  firstName?: string
  id: number
  lastName?: string
  location?: string
  position?: string
  showBookOnboarding?: boolean
  showProjectOnboarding?: boolean
  timezone?: string
  timezoneName?: string
  updatedAt?: string
  userId?: number
  userName?: string
  teamRole?: ITeamRole
  role?: string
  hasBillingAccess?: boolean
  books?: IBook[]
}

interface IPaginationPayload {
  limit?: number
  page?: number
  column?: string
  direction?: string
  search?: string
}

interface ISubscription {
  isCancelled: boolean
  isActive: boolean
  expireAt: string
  createdAt: string
  planId: number
  teamId: number
  extendable?: boolean
}

interface IPlan {
  id: number
  name: string
  provider: string
  maxSize: string
  maxBooks: number
  maxMembers: number
  maxClients: number
  maxProjects: number
  recurringPeriod: number
  recurringPer: string
  price: string
  pricePerMonth: string
  singleFileSize?: any
  maxTasks?: any
}

interface IPlanInfo {
  title: string
  key?: string
  prevPlan?: string
  name: string
  keys?: string[]
  description: string
  tools: string[]
  blockedTools?: string[]
  noPrice?: boolean
  show?: boolean
  icon?: string
  subDescription?: string
}

interface IStats {
  success?: boolean
  books: number
  clients: number
  members: number
  size: number
  tasks: number
  activeTasks: number
  projects: number
}

interface IInvoice {
  amount: number
  createdAt: string
  currency: string
  url: string
}

interface IClient {
  id: number
  createdAt?: string
  updatedAt?: string
  deletedAt?: string
  userId?: number
  user: IUser
  books?: { title: string; icon: string }[]
}

interface ITemporaryClient {
  id: number
  email: string
  bookIds: string
  createdAt: string
  updatedAt: string
  deletedAt?: string
  teamId: number
}

interface IOrder {
  order: number
  createdAt: string
}

interface IFolder {
  archivedAt?: null | string
  bookOrder?: IOrder | null
  books?: IBook[]
  favorite?: boolean
  icon?: null | string
  id: number
  name?: string
  createdAt?: string
  isFolder?: boolean
}

interface IClientTeams extends ITeam {
  books: IBook[]
}

interface INotification {
  hasUndo?: boolean
  message: string
  color?: string
  id?: number
  uuid: string
  type?: string
  bookId?: number
  task?: ITask
  timeout?: number
  additionalInfo?: any
  indexInArray?: number
}

interface IRevertableNotification {
  id: number
  uuid: string
  type: string
  title: string
  bookId?: number
  task?: ITask
}

interface IRecentNote {
  url: string
  title: string | { firstPartTitle: string; secondPartTitle: string }
  icon: string
  isFavorite?: boolean
}

interface ISwitcherModelValue { index: number; key: string }

interface IEmoji {
  name: string
  char: string
  keywords?: string[]
  category?: string
  description?: string
  skinVariations?: boolean
}
