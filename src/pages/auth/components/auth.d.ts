
interface IAuthUser {
  email: string
  password: string
  firstName: string
  lastName: string
  color: string
  avatar?: string
  avatarURL: string
}

interface IAuthTeam {
  name: string
  logo: string
  logoUrl: string
  inviteLink: string
  size: number | null
}
interface IAuthOnboarding {
  bookTitle: string
  bookIcon: string
  task1Title?: string
  task2Title?: string
}
