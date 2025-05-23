import { copy, preventBodyScroll } from '@/core/helper-functions'
import localStorageService from '@/core/local-storage'

export default function useBooks ({ props }: any) {
  const { team, isTeamAccount, setTeam } = useTeam()
  const { setBooks, editBook, duplicateBook, booksViewType } = useBook()
  const { setNotification } = useGeneral()
  const { isClient } = useProfile()
  const { changeBook } = useBookChange()

  const emitter = useEmitter()
  const router = useRouter()
  const route = useRoute()

  // refs
  const titleInputRef = ref(null)
  const subTitleRef = ref(null)
  const menuRef = ref(null)
  const inviteModalRef = ref(null)

  // data
  const showDropdown = ref(false)
  const showInviteModal = ref(false)
  const inviteModalType = ref<'observer' | 'member'>('member')

  const temporaryTitle = ref(props.book?.title || '')
  const temporarySubTitle = ref(props.book?.subTitle || '')

  let timerEdit = null
  const menuIsOpen = ref(false)

  watch(() => props.book?.id, () => {
    temporaryTitle.value = props.book.title
    temporarySubTitle.value = props.book.subTitle
  })

  const localBook = computed<Partial<IBook>>({
    get: () => ({
      title: props.book.title,
      subTitle: props.book.subTitle
    }),
    set: () => {}
  })

  const iconSize = computed(() => {
    const icons = ['FC5EFF', 'FF00A8', '00FF19', '1400FF', '7E5EFF', 'FF5E67', 'FFEF5E', 'F0A411', '00D1FF', '14A6F9', '5EFFF5', 'F91466', '00FFC2', '14F98B']

    if (icons.includes(props.book.icon)) {
      return booksViewType.value.index === 0 ? 'w-15 h-15' : 'w-17 h-17'
    }

    return 'w-18 h-18'
  })

  const isEdit = reactive({
    title: false,
    subTitle: false
  })

  // computed
  const dropdownIconClasses = computed(() => {
    let classes = 'text-app-color'
    const prefix = isTeamAccount.value ? 'hover' : 'group-hover'
    classes = `${classes} icon-more-horizontal text-17 ${prefix}:opacity-100 transition-color duration-50`

    return classes
  })

  const isActive = computed(() => Number(route.params?.id) === props.book?.id)

  const menuHoverBg = computed(() => {
    const prefix = menuIsOpen.value ? '' : 'hover:'
    return `${prefix}bg-grey-150 px-5 py-3 rounded-6 anim-color-200`
  })

  // functions
  function toggleMenu (value) {
    menuIsOpen.value = value
  }

  function goToBook () {
    if ((!isEdit.title) && !props.disableDrag) {
      router.push({ name: 'TeamBook', params: { team: team.value.link, id: props.book.id } })
    }
  }

  function toggleFullEdit () {
    isEdit.title = true
    isEdit.subTitle = true

    nextTick(() => {
      closeMenu()
      titleInputRef.value.focus()
      titleInputRef.value.setSelectionRange(0, 9999)
    })
  }

  function cancelEdit (keepOldBook = false) {
    if (!isEdit.title) return

    isEdit.title = false
    isEdit.subTitle = false

    if (localBook.value.title.trim() !== temporaryTitle.value.trim() || localBook.value.subTitle?.trim() !== temporarySubTitle.value) {
      save(keepOldBook)
    }

    if (localBook.value.title.trim() === '') {
      localBook.value.title = temporaryTitle.value
    }
  }

  function save (keepOldBook = false) {
    if (localBook.value.title.trim() === '') return

    temporaryTitle.value = localBook.value.title
    temporarySubTitle.value = localBook.value.subTitle

    editBook({
      ...props.book,
      title: localBook.value.title.trim(),
      subTitle: localBook.value.subTitle?.trim()
    }, keepOldBook)
  }

  function edit (keepOldBook = false) {
    clearTimeout(timerEdit)

    timerEdit = setTimeout(() => {
      save(keepOldBook)
    }, 1000)
  }

  function closeInviteModal () {
    showInviteModal.value = false
    preventBodyScroll(false)
  }

  function openInviteModal (type) {
    showInviteModal.value = true
    preventBodyScroll(true)
    closeMenu()
    inviteModalType.value = type
  }

  function toggleFavorite (keepOldBook = false) {
    editBook({
      id: props.book.id,
      favorite: !props.book.favorite
    }, keepOldBook)
  }

  function archiveBook (keepOldBook = false) {
    closeMenu()

    return editBook({
      id: props.book.id,
      archivedAt: props.book.archivedAt ? null : new Date(),
      bookFolderId: null
    }, keepOldBook)
  }

  function copyLink () {
    const teamUrlPart = isTeamAccount.value ? `/${team.value.link}/` : '/'
    const url = `${window.location.origin}${teamUrlPart}task-board/${props.book.id}`

    copy(url, () => setNotification({ uuid: window.crypto.randomUUID(), message: 'Link copied' }))
  }

  async function duplicate () {
    closeMenu()
    const newBook = await duplicateBook(props.book.id)

    router.push({ name: 'TaskBoardTeam', params: { team: team.value.link, id: newBook.id } })
  }

  function handleNavigation () {
    if (isClient.value) {
      setTeam(props.clientTeam)
      setBooks(props.clientTeam.books)

      localStorageService.setItem('clientStorage', {
        teamId: props.clientTeam.id,
        bookId: props.book.id
      })
    }

    changeBook(props.book, true)
    emitter.emit('closeChat')
  }

  function closeMenu () {
    menuRef.value?.close()
  }

  return {
    // data
    showDropdown,
    menuIsOpen,
    localBook,
    isEdit,
    showInviteModal,
    inviteModalType,
    // refs
    subTitleRef,
    inviteModalRef,
    menuRef,
    titleInputRef,
    // computed
    dropdownIconClasses,
    isTeamAccount,
    menuHoverBg,
    iconSize,
    isActive,
    // function
    toggleFullEdit,
    closeInviteModal,
    goToBook,
    edit,
    cancelEdit,
    toggleMenu,
    toggleFavorite,
    openInviteModal,
    archiveBook,
    copyLink,
    duplicate,
    handleNavigation,
    closeMenu
  }
}
