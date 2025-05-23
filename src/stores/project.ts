import { nextIndex } from '@/core/helper-functions'
import router from '@/router'

const useProjectStore = defineStore('project', () => {
  const projects = ref([])
  const trash = ref([])
  const currentProject = ref(null)
  const words = ref(0)
  const characters = ref(0)
  const share = ref(null)
  const projectSize = ref(0)
  const sizes = ref({})
  const isTableActive = ref(false)
  const isNewPageCreated = ref(false)

  function setProjects (value) {
    projects.value = value
  }

  function setCurrentProject (value) {
    currentProject.value = value
  }

  function setUpdatedAt () {
    currentProject.value.updatedAt = new Date()
  }

  function setProjectContent (value) {
    currentProject.value.body = value
  }

  function clearProject () {
    currentProject.value = null
  }

  function setWordsCount (value) {
    words.value = value
  }

  function setCharactersCount (value) {
    characters.value = value
  }

  function setShare (value) {
    share.value = value
  }

  function updateComments (value) {
    currentProject.value.comments = value
  }

  function setTableActive (value) {
    isTableActive.value = value
  }

  function getProject (id) {
    const { toggleBookLoading } = useGeneral()
    toggleBookLoading(true)
    return projectService.getProjectById(id)
      .then(({ data }) => {
        setCurrentProject(data)
        return Promise.resolve(data)
      })
      .finally(() => toggleBookLoading(false))
  }

  async function getProjects () {
    try {
      const response = await projectService.getAll()

      if (!response) return

      setProjects(response.data.projects)
    } catch (error) {
      console.log(error)
    }
  }

  async function getShareAndProject (shareId) {
    const { handleLoading } = useGeneral()
    const { resetSettings } = useSettings()

    const shareData = await projectService.getShare(shareId)
    setShare(shareData.data)

    if (shareData.data.isActive) {
      return projectService.getSharedProject(shareData.data.projectId, shareId)
        .then(project => {
          setCurrentProject(project.data)
          resetSettings()
          handleLoading(false)
          return Promise.resolve(project.data)
        })
    } else {
      handleLoading(false)
    }
  }

  function getDeletedProjects () {
    const { handleLoading } = useGeneral()

    handleLoading(true)
    projectService.getDeleted().then(({ data }) => {
      trash.value = data.projects
      sizes.value = data.sizes
    })
  }

  function addProject (parentId = null) {
    const { toggleBookLoading } = useGeneral()
    const { allowAddProject, toggleLimitModal, getStats } = usePlan()
    const { book, getBook } = useBook()

    if (allowAddProject.value) {
      toggleBookLoading(true)
      const { defaultProjectIcon } = useSettings()
      const projectTitle = `Note ${nextIndex(book.value.projects, 'Note', ' ')}`
      projectService.add({
        bookId: book.value.id,
        title: projectTitle,
        icon: defaultProjectIcon.value || 'purple_circle',
        parentId,
        body: ''
      }).then(() => {
        getBook(book.value.id)
          .then((data) => {
            const project = data.projects.find(item => item.title === projectTitle)
            if (project) {
              const { team } = useTeam()

              router.push({ name: 'TeamBook', params: { id: book.value.id, team: team.value.link }, query: { page: project.id } })
            }
          })
        getStats()

        isNewPageCreated.value = true
      })
    } else {
      toggleLimitModal({ show: true, type: 'pages' })
      return Promise.reject(new Error('Limit reached - notes'))
    }
  }

  function deleteProject (id) {
    const { toggleBookLoading, setNotification } = useGeneral()
    const { getStats } = usePlan()
    const { book, getBook } = useBook()

    if (book.value.projects.length <= 1) {
      setNotification({ uuid: window.crypto.randomUUID(), message: 'Cannot delete last note', color: 'error' })
      return
    }

    toggleBookLoading(true)
    return projectService.delete(id).then(async () => {
      Promise.all([
        getStats(),
        getBook(book.value.id)
      ]).then(() => {
        setNotification({
          id,
          uuid: window.crypto.randomUUID(),
          hasUndo: true,
          type: 'project',
          message: 'Page deleted'
        })
        if (currentProject.value.id === id) {
          router.replace({ query: { page: book.value.projects[0].id } })
        }
      })
        .finally(() => toggleBookLoading(false))
    })
  }

  function editProject (value) {
    if (value.id === currentProject.value.id) {
      setUpdatedAt()
    }

    return projectService.edit(value.id, value.data)
  }

  function restoreProject (id) {
    const { handleLoading } = useGeneral()
    const { allowAddProject, toggleLimitModal } = usePlan()
    const { book, getBook } = useBook()

    if (allowAddProject.value) {
      return projectService.restore(id).then(() => {
        if (book.value) {
          getBook(book.value.id)
          router.replace({ query: { page: id } }).catch(() => undefined)
        }

        return Promise.resolve()
      })
    } else {
      handleLoading(false)
      toggleLimitModal({ show: true, type: 'pages' })
      return Promise.reject(new Error('Limit reached - notes'))
    }
  }

  function getShare (id) {
    return projectService.getShareByProjectId(id).then(({ data }) => {
      setShare(data)
      return data
    })
  }

  function getSize (id) {
    return projectService.getSize(id).then(({ data }) => {
      projectSize.value = data.size
    })
  }

  function getSizeOfSharedProject (id) {
    return projectService.getSizeOfSharedProject(id, share.value.id).then(({ data }) => {
      projectSize.value = data.size
    })
  }

  return {
    projects,
    trash,
    currentProject,
    words,
    characters,
    share,
    projectSize,
    sizes,
    isTableActive,
    isNewPageCreated,
    getSize,
    getShare,
    setShare,
    getProject,
    addProject,
    getProjects,
    editProject,
    setProjects,
    setUpdatedAt,
    clearProject,
    setWordsCount,
    deleteProject,
    setTableActive,
    updateComments,
    restoreProject,
    setProjectContent,
    setCurrentProject,
    getDeletedProjects,
    setCharactersCount,
    getShareAndProject,
    getSizeOfSharedProject
  }
})

export function useProject () {
  const store = useProjectStore()

  return {
    ...store,
    ...storeToRefs(store)
  }
}
