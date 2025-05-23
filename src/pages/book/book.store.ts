import router from '@/router'
import { nextIndex, transformProjects } from '@/core/helper-functions'
import localStorageService from '@/core/local-storage'

const useBookStore = defineStore('book', () => {
  const books = ref<IBook[]>([])
  const bookOwner = ref(null)
  const bookMembers = ref<ITeamMember[]>([])
  const book = ref<IBook>(null)
  const activeBookId = ref(null)
  const trash = ref<ITrashItem[]>([])
  const booksMemory = ref<{ [key: string]: number }>(localStorageService.getItem('newBooksMemory') || {})
  const foldersCount = ref(0)
  const folders = ref<IFolder[]>([])
  const trashedFolders = ref<ITrashItem[]>([])
  const booksViewType = ref<ISwitcherModelValue>(localStorageService.getItem('teamBooksViewTypeV2') || { index: 0, key: 'board-view' })
  const bookChats = ref([])

  const milestones = ref<IMilestone[]>([
    {
      id: 1,
      startDate: '2023-01-15',
      endDate: '2023-01-31',
      description: 'This is the first milestone',
      title: 'Milestone 1',
      tasks: [],
      userId: 123,
      bookId: 8591
    },
    {
      id: 2,
      startDate: '2023-02-10',
      endDate: '2023-12-28',
      description: 'This is the second milestone',
      title: 'Milestone 2',
      tasks: [],
      userId: 456,
      bookId: 8591
    },
    {
      id: 3,
      startDate: '2023-03-05',
      endDate: '2023-03-20',
      title: 'Milestone 3',
      tasks: [],
      userId: 789,
      bookId: 8591
    }
  ])

  const todayBook = computed<IBook>(() => books.value.find(book => book.isToday))

  function setBookProjects (value: IProject[]) {
    book.value.projects = value
  }

  function setBooks (value: IBook[]) {
    books.value = value
  }

  function addBookToBooks (value: IBook) {
    books.value.push(value)
  }

  function setBook (value: IBook) {
    book.value = value
  }

  function handleUpdateBookFolderId (bookId: number, folderId: number) {
    books.value = books.value.map((item) => {
      if (item.id === +bookId) {
        return {
          ...item,
          bookFolderId: +folderId
        }
      }
      return item
    })

    if (folderId >= 0) {
      bookService.update({
        id: bookId,
        bookFolderId: folderId
      })
    }
  }

  function saveBook (value: IBook) {
    books.value = books.value.map(book => {
      if (book.id === value.id) {
        return {
          ...book,
          ...value
        }
      } else {
        return book
      }
    })

    if (book.value?.id === value.id) {
      book.value = {
        ...book.value,
        ...value
      }
    }

    folders.value = folders.value.map(f => {
      if (!value.isFolder && value.bookFolderId === f.id) {
        const books = f.books.map((book: IBook) => {
          if (book.id === value.id) {
            return {
              ...book,
              ...value
            }
          } else {
            return book
          }
        })
        return {
          ...f,
          books
        }
      }
      return f
    })
  }

  function handleUpdateBookOrder (id, order) {
    books.value = books.value.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          bookOrder: {
            ...item.bookOrder,
            order
          }
        }
      }
      return item
    })
  }

  function updateBookTitle ({ id, title }: { id: number; title: string }) {
    const b = books.value.find((book: IBook) => book.id === id)

    saveBook({
      id,
      title,
      bookFolderId: b.bookFolderId
    })
  }

  function setIconAndTitle ({ projectId, icon, title }: { projectId: number; icon?: string; title: string }) {
    book.value.projects = book.value.projects.map(item => {
      if (item.id === projectId) return { ...item, icon, title }
      return item
    })
  }

  function setBookClients ({ clientId, bookId }: { clientId: number; bookId: number }) {
    books.value = books.value.map(b => {
      if (b.id === bookId) {
        const filteredClients = b.clients.filter(item => item.id !== clientId)

        return {
          ...b,
          clients: filteredClients
        }
      } else {
        return b
      }
    })
  }

  function clearBook () {
    book.value = null
  }

  function clearBooks () {
    books.value = []
  }

  function setBooksMemory (value: { [key: string]: number }) {
    const memory = { ...booksMemory.value }
    memory[value.bookId] = value.projectId
    localStorageService.setItem('newBooksMemory', memory)

    booksMemory.value = memory
  }

  function sortBooksAndFolders (booksValue: IBook[], foldersValue: IFolder[], sortBy: TSortBy = 'Recent') {
    const preparedFolders = foldersValue?.map((item: IFolder) => {
      return {
        ...item,
        books: handleSort(item.books, sortBy),
        isFolder: true
      }
    }) || []

    foldersCount.value = foldersValue?.length || 0

    books.value = handleSort(booksValue, sortBy)
    folders.value = handleSort(preparedFolders, sortBy, 'folder')
  }

  function handleSort<T extends IBook | IFolder> (arr: T[], sortBy: TSortBy, type = 'book') {
    if (sortBy === 'Recent') {
      return arr.sort((a, b) => {
        if (a.createdAt > b.createdAt) return -1
        if (a.createdAt < b.createdAt) return 1
        return 0
      })
    } else if (sortBy === 'A-Z') {
      const fieldName = type === 'book' ? 'title' : 'name'
      return arr.sort((a, b) => {
        if (a[fieldName].toLowerCase() < b[fieldName].toLowerCase()) return -1
        if (a[fieldName].toLowerCase() > b[fieldName].toLowerCase()) return 1
        if (a.createdAt > b.createdAt) return -1
        if (a.createdAt < b.createdAt) return 1
        return 0
      })
    } else {
      return arr.sort((a, b) => {
        if (a.bookOrder?.order < b.bookOrder?.order) return -1
        if (a.bookOrder?.order > b.bookOrder?.order) return 1
        if (a.createdAt > b.createdAt) return -1
        if (a.createdAt < b.createdAt) return 1
        return 0
      })
    }
  }

  function getBooks () {
    return bookService.getBooks().then(({ data }) => {
      const allBooks = [...data.books]

      data.folders?.forEach((item: IFolder) => {
        allBooks.push(...item.books)
      })

      const { user } = useProfile()

      const storedSortByValues = localStorageService.getItem('booksSortBy') || {}
      const sortedBy = storedSortByValues[user.value.id] || 'Recent'

      sortBooksAndFolders(allBooks, data.folders, sortedBy)
      return books.value
    }).catch((err) => {
      console.log(err)
    })
  }

  async function getBook (id: number) {
    const { updateChatMutedAt } = useChat()

    try {
      const { data } = await bookService.getBookById(id)

      activeBookId.value = data.book.id

      let projects = book.value?.projects

      const { data: projectsData } = await bookService.getBookProjects(id)

      projects = transformProjects(projectsData.projects)

      if (projects.length === 0) {
        await projectService.add({
          bookId: data.book.id,
          title: 'Note 1',
          icon: 'purple_circle',
          isSample: true,
          body: '<p></p>'
        }).then(project => {
          projects = [project.data]
        })
      }

      setBook({
        ...data.book,
        shareWith: data.members,
        projects,
        clients: data.clients || []
      })

      updateChatMutedAt(data.book?.chat?.chatSetting?.mutedAt)

      bookMembers.value = data.members // TODO: replace this with book.shareWith
      bookOwner.value = data.owner

      return {
        ...data.book,
        shareWith: data.members,
        projects,
        clients: data.clients || []
      }
    } catch (err) {
      return await router.push({ name: 'Today', params: { team: 'team' } })
    }
  }

  const { handleLoading } = useGeneral()

  async function addBook ({
    isTeam,
    payload
  }: {
    isTeam: boolean
    payload: any
  }) {
    const { spaceCreated } = useMixpanel()
    const { allowAddBook, toggleLimitModal, getStats } = usePlan()

    if (allowAddBook.value && !isTeam) {
      handleLoading(true)
      const bookTitle = `Space #${nextIndex(books.value, 'Space', ' #')}`
      try {
        const res = await bookService.create({
          title: bookTitle,
          subTitle: 'This is a space, let\'s add some pages to it.'
        })

        await getBooks()
        await getStats()

        return Promise.resolve(res.data)
      } catch (err) {
        return Promise.reject(err)
      }
    } else if (allowAddBook.value && isTeam) {
      handleLoading(true)

      try {
        const res = await bookService.create({
          title: payload.title,
          members: payload.members.map(item => item.id),
          subTitle: payload?.description,
          icon: payload.icon,
          order: 0
        }, isTeam)
        const currentBook = res.data

        const { defaultProjectIcon } = useSettings()

        await projectService.add({
          bookId: currentBook.id,
          title: 'Note 1',
          icon: defaultProjectIcon.value || 'purple_circle',
          isSample: true,
          body: '<p></p>'
        }).then(project => {
          currentBook.projects = [project.data]
        })

        const prepBooks = [currentBook, ...books.value]
        setBooks(prepBooks)
        book.value = currentBook

        const { getLatestActivities } = useInbox()

        await getLatestActivities({ bookId: currentBook.id })

        spaceCreated(currentBook?.title)

        return Promise.resolve(currentBook)
      } catch (err) {
        return Promise.reject(err)
      }
    } else {
      toggleLimitModal({ show: true, type: 'projects' })
      return Promise.reject(new Error('Limit reached - projects'))
    }
  }

  async function addSection (value = 'New Section') {
    const { handleLoading } = useGeneral()

    handleLoading(true)

    const res = await bookService.createSection(value)
    await getBooks()
    return await Promise.resolve(res.data)
  }

  async function duplicateBook (id: number) {
    const { handleLoading } = useGeneral()

    handleLoading(true)

    const res = await bookService.duplicateBook(id)
    await getBooks()
    return await Promise.resolve(res.data)
  }

  async function deleteBook (id: number) {
    const { handleLoading, setNotification } = useGeneral()
    const { getStats } = usePlan()

    handleLoading(true)
    await bookService.delete(id)
    setNotification({
      id,
      uuid: window.crypto.randomUUID(),
      hasUndo: true,
      type: 'book',
      message: 'Space deleted'
    })
    getBooks()
    getStats()
  }

  async function deleteFolder ({ id, permanent = false }: { id: number; permanent?: boolean }) {
    const { handleLoading, setNotification } = useGeneral()

    handleLoading(true)
    await bookService.deleteFolder(id, permanent)
    setNotification({
      id,
      uuid: window.crypto.randomUUID(),
      hasUndo: true,
      type: 'folder',
      message: 'Section deleted'
    })
    getBooks()
  }

  async function restoreFolder (id: number) {
    const { allowAddBook, toggleLimitModal } = usePlan()

    if (allowAddBook.value) {
      await bookService.restoreFolder(id)
      getBooks()
      return await Promise.resolve()
    } else {
      toggleLimitModal({ show: true, type: 'folders' })
      return Promise.reject(new Error('Limit reached - folders'))
    }
  }

  function getDeletedBooks () {
    const { handleLoading } = useGeneral()

    handleLoading(true)
    bookService.getDeleted().then(({ data }) => {
      trash.value = data.books
      trashedFolders.value = data.folders
    })
  }

  function editBook (value: IBook, keepOldBook = false) {
    bookService.update(value)
      .then(() => {
        saveBook(value)
        if (book.value && !keepOldBook) book.value = { ...book.value, ...value }
      })
  }

  async function restoreBook (id: number) {
    const { allowAddBook, toggleLimitModal, getStats } = usePlan()

    if (allowAddBook.value) {
      await bookService.restore(id)
      getBooks()
      getStats()
      return await Promise.resolve()
    } else {
      toggleLimitModal({ show: true, type: 'projects' })
      return Promise.reject(new Error('Limit reached - projects'))
    }
  }

  async function createFolder () {
    const folderTitle = `Section ${nextIndex(folders.value, 'Section', ' ', 'name')}`

    const payload = {
      name: folderTitle,
      favorite: false,
      archivedAt: null,
      bookOrder: {
        order: 0
      },
      order: 0
    }

    const res = await bookService.createFolder(payload)

    const data = {
      ...res.data.bookFolder,
      isFolder: true
    }

    folders.value.unshift(data)
    return data
  }

  async function updateFolder (folderId: number, payload: Partial<IFolder>, isRequest = true) {
    if (isRequest) {
      await bookService.updateFolder(folderId, payload)
    }

    folders.value = folders.value.map((f) => {
      if (f.id === folderId) {
        return {
          ...f,
          ...payload
        }
      }
      return f
    })
  }

  async function getBookChats () {
    await bookService.getChats()
      .then(({ data }) => {
        const hasChatTool = books.value.map((e) => e.id)

        // Temporary solution: Refactor after backenf updates
        bookChats.value = data.chats
          .filter((chat: IChat) => !chat.book.archivedAt && !chat.book.isSample && hasChatTool.includes(chat.book.id))
          .sort((a, b) => a.book.title.localeCompare(b.book.title))
      })
  }

  return {
    books,
    bookOwner,
    booksViewType,
    bookMembers,
    book,
    trash,
    booksMemory,
    foldersCount,
    folders,
    trashedFolders,
    todayBook,
    milestones,
    bookChats,
    setBookProjects,
    setBooks,
    addBookToBooks,
    setBook,
    saveBook,
    updateBookTitle,
    handleUpdateBookOrder,
    setIconAndTitle,
    setBookClients,
    clearBook,
    clearBooks,
    setBooksMemory,
    getBooks,
    getBook,
    addBook,
    addSection,
    duplicateBook,
    deleteBook,
    deleteFolder,
    restoreFolder,
    getDeletedBooks,
    editBook,
    restoreBook,
    createFolder,
    updateFolder,
    sortBooksAndFolders,
    handleUpdateBookFolderId,
    getBookChats,
    activeBookId
  }
})

export function useBook () {
  const store = useBookStore()

  return {
    ...store,
    ...storeToRefs(store)
  }
}
