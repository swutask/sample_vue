interface IClientStorage {
  teamId: number
  bookId: number
}

interface IShowInstructions {
  Today: boolean
  Chat: boolean
  TeamBooks: boolean
  TeamMembers: boolean
  CalendarTeam: boolean
  TaskBoardTeam: boolean
  TeamBook: boolean
  Discussions: boolean
  FileManagerTeam: boolean
  OverviewTeam: boolean
  WeekPlanner: boolean
}

interface IIdBooleanMap {
  [key: number]: boolean
}

interface IFoldedFolders {
  [key: number]: number[]
}

interface IResizeData {
  width: number
  height: number
}

interface ILocalStorage {
  planId: number
  startOnboarding: boolean
  clientStorage: IClientStorage
  showInstructions: IShowInstructions
  isSidebarCollapsedV2: IIdBooleanMap
  alreadyShowedDeleteSampleSpaces: IIdBooleanMap
  bookChatOpened: IIdBooleanMap
  foldedFolders: IFoldedFolders
  gifPickerSize: IResizeData
  quickThoughtsHeight: number
  recentlyViewedTasks: IFoldedFolders
  isAllBooksSelected: IIdBooleanMap
  todayActivePerspective: { [key: number]: number }
  perspectives: { [key: number]: IFilters }
  taskBoardTypeV3: { [key: number]: ISwitcherModelValue }
  disableEventType: string[]
  perspectiveView: { [key: number]: { index: number; key: string } }
}
