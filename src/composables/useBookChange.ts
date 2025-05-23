import localStorageService from '@/core/local-storage'

export default function useBookChange () {
  const route = useRoute()
  const router = useRouter()
  const { isTeamAccount, team } = useTeam()
  const { getBook } = useBook()
  const { handleLoading } = useGeneral()
  const { user } = useProfile()

  const isToolPage = computed(() => ['TaskBoard', 'TaskBoardTeam', 'Discussions', 'Chat'].includes(route.name as string))

  function setRecentOpenBook (id) {
    const recentlyOpenedBooks = localStorageService.getItem('recentlyOpenedBooks') || {}
    const recentlyOpenedBooksByUser = recentlyOpenedBooks[user.value.id] || []
    const userId = user.value.id

    localStorageService.setItem('recentlyOpenedBooks', {
      ...recentlyOpenedBooks,
      [userId]: [id, ...recentlyOpenedBooksByUser.filter(item => item !== id)]
    })
  }

  async function changeBook (item, isSidebarNavigation = false) {
    const bookId = +route.params.id

    if (bookId !== item.id) {
      if (isToolPage.value || isSidebarNavigation) {
        handleLoading(true)
        setRecentOpenBook(item.id)

        await getBook(item.id)
          .then(res => {
            if (isTeamAccount.value) {
              localStorageService.setItem('lastVisitedBook', res.id)
            }
          })
          .finally(() => handleLoading(false))
      }

      if (isSidebarNavigation) {
        return router.push({ name: 'TaskBoardTeam', params: { team: team.value.link, id: item.id } })
      }

      router.replace({ params: { id: item.id }, query: route.query })
    }
  }

  return {
    changeBook
  }
}
