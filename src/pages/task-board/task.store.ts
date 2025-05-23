import { copy, moveItem } from '@/core/helper-functions'

import {
  findDateRange,
  showCompletedOptions
} from '@/pages/task-board/tasks-utils'

const useTaskStore = defineStore('task', () => {
  const { taskCreated, taskDeleted, taskCompleted, setActiveTasks } = useMixpanel()

  const rows = ref<ITaskRow[]>([])
  const tags = ref<ITag[]>([])
  const tasks = ref<ITask[]>([])
  const recentlyViewed = ref<ITask[]>([])
  const showNewTaskModal = ref(false)
  const initialDataForNewTask = ref<Partial<ITask>>({})
  const filters = ref<IFilters>()
  const modalTask = ref<ITask>()
  const isScreenTaskView = ref(true)
  const showTaskModal = ref(true)
  const taskCalendarEventDate = ref()
  const backUpTask = ref<ITask>()
  const disableEventType = ref<string[]>(useLocalStorage.getItem('disableEventType') || [])

  function setModalTask (task: ITask) {
    modalTask.value = task
    showTaskModal.value = !!task

    if (task) {
      setRecentlyViewedTasks(task)
    }
  }

  async function updateFilters (filters: IFilters, bookId?: number) {
    await taskService.updateFilters(filters, bookId)
  }

  function toggleNewTaskModal (value: boolean, initialData?: Partial<ITask>) {
    const { toggleLimitModal, allowAddTasks, currentPlan } = usePlan()

    if (value && !allowAddTasks.value) {
      return toggleLimitModal({
        show: true,
        type: 'Special',
        title: 'You\'re Doing Great',
        // eslint-disable-next-line max-len
        description: `<p>You've reached the limit of
                <span class="font-semibold underline">${currentPlan.value?.maxTasks} tasks</span>
                  on the free plan</p>`
      })
    }

    showNewTaskModal.value = value
    initialDataForNewTask.value = initialData
  }

  const showOnTask = computed(() => {
    return filters.value?.showOnTask?.reduce((acc, item) => {
      acc[item.key] = item.selected
      return acc
    }, {} as IShowOnTaskObj)
  })

  function setTasks (value: ITask[]) {
    tasks.value = value
  }

  function handleUpdateTask (value: Partial<ITask>) {
    if (!value?.parentId && modalTask.value?.id === value.id) {
      modalTask.value = {
        ...modalTask.value,
        ...value
      } as ITask
    }

    tasks.value = tasks.value.map(item => {
      if (item.id === value.id) {
        return {
          ...item,
          ...value,
          updatedAt: new Date()
        }
      }
      return item
    })

    recentlyViewed.value = recentlyViewed.value.map(item => {
      if (item.id === value.id) {
        return {
          ...item,
          ...value,
          updatedAt: new Date()
        }
      }
      return item
    })
  }

  function onUpdateSubTask (items: ITask[], value: Partial<ITask>) {
    if (items.length === 0) return []
    return items.map(item => {
      if (item.id === value.parentId) {
        const subTask = item.subTask?.map(sub => {
          if (sub?.id === value.id) {
            return {
              ...sub,
              ...value
            }
          }
          return sub
        })

        return {
          ...item,
          subTask
        }
      }
      return item
    })
  }

  function handleUpdateSubTask ({ value }) {
    if (modalTask.value?.id === value.parentId) {
      modalTask.value = onUpdateSubTask([modalTask.value], value)[0]
    }
    tasks.value = onUpdateSubTask(tasks.value, value)
  }

  function addSubTask ({ value }) {
    tasks.value = tasks.value.map(item => {
      if (item.id === value.parentId) {
        const subTasks = item.subTask || []
        subTasks.push(value)

        return {
          ...item,
          subTask: subTasks
        }
      }
      return item
    })
  }

  function handleAssignMember ({ task, memberIds, isSubtask }) {
    let teamMembers = task.teamMembers

    if (teamMembers.some(m => m.id === memberIds[0])) {
      teamMembers = teamMembers.filter(m => m.id !== memberIds[0])
    } else {
      const { members } = useTeam()

      const member = members.value.find(m => m.id === memberIds[0])

      if (!member) return

      const m = {
        id: member.id,
        user: {
          id: member.userId,
          avatar: member.avatar,
          profile: {
            firstName: member.firstName,
            lastName: member.lastName,
            color: member.color
          }
        }
      }

      teamMembers.push(m)
    }

    task.teamMembers = teamMembers

    if (isSubtask) {
      handleUpdateSubTask({
        value: {
          id: task.id,
          parentId: task.parentId,
          teamMembers: task.teamMembers
        }
      })
    } else {
      handleUpdateTask({
        id: task.id,
        teamMembers
      })
    }
  }

  function handleDeleteTask (id: number) {
    tasks.value = tasks.value.filter(item => item.id !== id)
  }

  function onDeleteSubTask (items: ITask[], value: ITask) {
    return items.map((task) => {
      if (task.id === value.parentId) {
        const subTask = task.subTask.filter(item => item.id !== value.id)

        return {
          ...task,
          subTask
        }
      }
      return task
    })
  }

  function handleDeleteSubTask ({ value }) {
    if (modalTask.value?.id === value.parentId) {
      modalTask.value = onDeleteSubTask([modalTask.value], value)[0]
    }
    tasks.value = onDeleteSubTask(tasks.value, value)
  }

  function addTask (value: ITask) {
    tasks.value.push(value)
  }

  function changeTaskBook ({ taskId, oldBookId, newBookId }) {
    return taskService.changeBook({ taskId, oldBookId, newBookId }).then((res) => {
      backUpTask.value = tasks.value.find((e) => e.id === taskId)
      const filteredTasks = tasks.value.filter(e => e.id !== taskId)

      setTasks(filteredTasks)

      return res.data
    })
  }

  function handleUpdateRow (value: ITaskRow) {
    rows.value = rows.value.map(item => {
      if (item.id === value.id) {
        return {
          ...item,
          ...value
        }
      }
      return item
    })
  }

  function handleDeleteRow (id: number) {
    rows.value = rows.value.filter(item => item.id !== id)
  }

  function addRow (value: ITaskRow) {
    rows.value.push(value)
  }

  function handleToggleTaskTag (value: IToggleTaskTag) {
    const task: ITask = tasks.value.find(item => item.id === value.taskId)

    let localTags = task?.taskTags || []

    if (value.isSelected) {
      localTags = localTags.filter(t => t.id !== value.tag.id)
    } else {
      localTags.push(value.tag)
    }

    tasks.value = tasks.value.map(item => {
      if (item.id === value.taskId) {
        return {
          ...item,
          taskTags: localTags
        }
      }
      return item
    })
  }

  function parseSorting (key: string, direction?: 'ASC' | 'DESC') {
    const options = {
      Manual: {},
      Title: { titleOrder: direction },
      'Last updated': { updatedAtOrder: direction },
      'Last created': { createdAtOrder: direction },
      'Due date': { endDateOrder: direction },
      Priority: { urgentStatusOrder: direction },
      Assignee: { firstNameOrderTeamMember: direction },
      Labels: { nameOrderTag: direction },
      Estimate: { storyPointsOrder: direction }
    }

    return options[key] || {}
  }

  async function getTasks ({
    tagIds, sortedBy, sortedDirection, bookIds, search, teamMemberIds,
    urgencyStatuses, date, showCompleted, calendarSynced
  }: IGetTask) {
    const { data } = await taskService.getAll({
      bookIds,
      ...parseSorting(sortedBy, sortedDirection),
      completedAtFrom: showCompleted?.completedAtFrom,
      completedAtTo: showCompleted?.completedAtTo,
      endDate: date?.endDate,
      search,
      startDate: date?.startDate,
      tagIds,
      teamMemberIds,
      urgencyStatuses,
      withoutCompleted: showCompleted?.withoutCompleted
    })
    if (calendarSynced) {
      const calendarTask = await taskService.getCalendarTasks()
      const filteredCalendarTasks = calendarTask.data.tasks.filter(
        (task) => !disableEventType.value.includes(task.calendarId)
      )
      const allData = [...data.tasks, ...filteredCalendarTasks]
      setTasks(allData)
    } else {
      setTasks(data.tasks)
    }
  }

  async function getCalendarList () {
    const calendarList = await googleCalendarService.getCalendarList()
    return calendarList.data
  }

  function setEventType (types: string[]) {
    disableEventType.value = types
    useLocalStorage.setItem('disableEventType', types)
  }

  async function getTasksForTaskBoardPageWithFilters (bookId: number) {
    const { books } = useBook()
    const showCompleted = showCompletedOptions(filters.value.showCompletedFilter)
    const sortedBy = filters.value.sortedBy
    const sortedDirection = filters.value.sortedDirection
    const date = findDateRange(filters.value?.dateFilter)

    const book = books.value.find(b => b.id === bookId)
    const members = filters.value.membersFilter?.map(e => e.id)

    const teamMemberIds = members.length === book?.shareWith?.length ? [] : members

    const { data } = await taskService.getAll({
      bookIds: [bookId],
      ...parseSorting(sortedBy, sortedDirection),
      completedAtFrom: showCompleted?.completedAtFrom,
      completedAtTo: showCompleted?.completedAtTo,
      endDate: date?.endDate,
      search: filters.value.search,
      startDate: date?.startDate,
      tagIds: filters.value?.tagsFilter?.map(e => e.id),
      teamMemberIds,
      urgencyStatuses: filters.value?.urgencyFilter?.map(e => e.type),
      withoutCompleted: showCompleted?.withoutCompleted
    })

    setTasks(data.tasks)
  }

  async function getRecentlyViewedTasks (ids: number[]) {
    const { data } = await taskService.getAll({ ids, bookIds: [] })

    const { user } = useProfile()
    const storedRecentTaskIds = useLocalStorage.getItem('recentlyViewedTasks') || {}
    const taskIds = storedRecentTaskIds[user.value.id]

    recentlyViewed.value = (data.tasks as ITask[]).sort((a, b) => {
      return taskIds.indexOf(a.id) - taskIds.indexOf(b.id)
    })
  }

  function setRecentlyViewedTasks (task: ITask) {
    const { user } = useProfile()
    const storedRecentTaskIds = useLocalStorage.getItem('recentlyViewedTasks') || {}

    const fromIndex = recentlyViewed.value.findIndex(t => t.id === task.id)

    if (fromIndex >= 0) {
      recentlyViewed.value = moveItem(recentlyViewed.value, fromIndex, 0)
    } else if (recentlyViewed.value.length === 5) {
      recentlyViewed.value.pop()
      recentlyViewed.value.unshift(task)
    } else {
      recentlyViewed.value.unshift(task)
    }

    const taskIds = recentlyViewed.value.map(t => t.id)

    storedRecentTaskIds[user.value.id] = taskIds
    useLocalStorage.setItem('recentlyViewedTasks', storedRecentTaskIds)
  }

  function createTask (data: ICreateTask) {
    const { allowAddTasks, stats } = usePlan()
    if (allowAddTasks.value) {
      stats.value.tasks++

      taskCreated(data.title)

      setActiveTasks(1)
      return taskService.create(data)
    }
  }

  async function complete ({ id, bookId, task, isSubTask = false, completedAt, showNotification = true, isForSampleSpace = false }: ICompleteTask) {
    const { setNotification, setConfettiMessage } = useGeneral()
    const { isTrialPlan } = usePlan()
    const { isClient } = useProfile()
    const { onboarding, areTasksCompletedToUpgrade, completedTasksToUpgrade } = useOnboarding()

    const index = tasks.value.findIndex(t => t.id === task.id) || 0
    const label = filters.value?.showCompletedFilter?.label || ''

    if ((label === 'None' || label === 'Last 7 days') && completedAt) {
      tasks.value = tasks.value.filter(t => t.id !== id)
    }

    if (areTasksCompletedToUpgrade.value && isTrialPlan.value && completedAt && !task.isSample) {
      onboarding.value.completedTasksCount++

      await onboardingService.updateOnboarding({ completedTasksCount: onboarding.value.completedTasksCount })

      const isFirstTaskCompleted = onboarding.value.completedTasksCount === 1
      const isLastTaskCompleted = onboarding.value.completedTasksCount === completedTasksToUpgrade.value

      if (isFirstTaskCompleted || isLastTaskCompleted) {
        const message = isFirstTaskCompleted
          ? '<p>🥳 <span class="font-semibold">Hurray!</span> You’ve completed your first task — awesome job!</p>'
          : `<p>🥳 <span class="font-semibold">Hurray!</span> You’ve completed ${completedTasksToUpgrade.value} tasks — great job!</p>`

        setConfettiMessage(message)
      }
    }

    if (isSubTask) {
      handleUpdateSubTask({
        value: {
          ...task,
          completedAt
        }
      })
    } else {
      handleUpdateTask({
        id,
        completedAt
      })
    }

    if (completedAt && !task.isSample) {
      taskCompleted(task.title)
    }

    await taskService.complete({ id, bookId })

    if (completedAt) {
      setActiveTasks(-1)
      if (showNotification) {
        setNotification({
          id,
          bookId,
          hasUndo: true,
          uuid: window.crypto.randomUUID(),
          type: 'task',
          indexInArray: index,
          message: 'Task completed',
          task
        })
      }

      if (!isSubTask && !isClient.value && !isForSampleSpace) {
        getRows(bookId)
          .then((res) => {
            const completedRow = res.find(item => ['done', 'completed'].includes(item.title.toLowerCase()))

            if (completedRow) {
              updateTask({
                id,
                order: 0,
                taskRowId: completedRow?.id,
                bookId
              })

              handleUpdateTask({
                id,
                order: 0,
                taskRow: completedRow,
                taskRowId: completedRow.id
              })
            }
          })
      }
    }
  }

  async function assignMember ({ id, bookId, memberIds, task, isSubtask }) {
    handleAssignMember({
      memberIds,
      task,
      isSubtask
    })

    await taskService.assignMember({ id, bookId, memberIds })
  }

  async function unassignMember ({ id, bookId, memberIds, task, isSubtask }) {
    handleAssignMember({
      memberIds,
      task,
      isSubtask
    })

    await taskService.unassignMember({ id, bookId, memberIds })
  }

  function updateTask (data) {
    return taskService.update(data)
  }

  async function deleteTask ({ id, bookId, parentId, isSubtask }: IDeleteTask) {
    const { toggleBookLoading, setNotification } = useGeneral()
    const { stats } = usePlan()
    toggleBookLoading(true)

    try {
      await taskService.delete({ id, bookId })
      toggleBookLoading(false)
      setActiveTasks(-1)
      stats.value.tasks--
      taskDeleted()
      if (isSubtask) {
        handleDeleteSubTask({
          value: {
            id,
            parentId
          }
        })
      } else {
        handleDeleteTask(id)
      }
      setNotification({ uuid: window.crypto.randomUUID(), message: 'Task deleted' })
    } catch {
      return toggleBookLoading(false)
    }
  }

  function getTaskTags (bookIds) {
    taskService.getTaskTags(bookIds)
      .then(({ data }) => {
        tags.value = data.tags
      })
  }

  function duplicate ({ id, bookId }) {
    const { handleLoading } = useGeneral()

    handleLoading(true)

    return taskService.duplicate({ id, bookId }).then((res) => {
      const localTasks = tasks.value
      localTasks.push(res.data)
      tasks.value = localTasks
      setActiveTasks(1)
      return res.data
    })
  }

  async function toggleTaskTag ({ tag, taskId, bookId }: IToggleTaskTag) {
    await taskService.toggleTaskTag({ tagId: tag?.id, taskId, bookId })
  }

  async function deleteTaskTags ({ taskId, bookId, tagIds }: { taskId: number; bookId: number; tagIds: number[] }) {
    await taskService.deleteTaskTags({ taskId, bookId, tagIds })
  }

  async function updateTaskTag ({ name, id, bookId }) {
    await taskService.updateTaskTag({ name, id, bookId })

    const localTags = tags.value.map(tag => {
      if (tag.id === id) {
        return {
          ...tag,
          name
        }
      }
      return tag
    })

    tags.value = localTags
  }

  async function getRows (bookId: number) {
    const { data } = await taskService.getRows({ bookId })
    rows.value = data.taskRows
    return data.taskRows
  }

  async function createRow (data) {
    const row = await taskService.createRow(data)
    if (row?.data) addRow(row.data)
  }

  async function updateRow (data) {
    handleUpdateRow(data)
    await taskService.updateRow(data)
  }

  async function deleteRow ({ id, bookId }) {
    handleDeleteRow(id)
    await taskService.deleteRow({ id, bookId })
  }

  function copyLink ({ bookId, taskId }) {
    const { isTeamAccount, team } = useTeam()
    const { setNotification } = useGeneral()

    const teamUrlPart = isTeamAccount.value ? `/${team.value.link}/` : '/'
    const url = new URL(`${window.location.origin}${teamUrlPart}task-board/${bookId}?taskId=${taskId}`).toString()

    copy(url, () => setNotification({ uuid: window.crypto.randomUUID(), message: 'Link copied' }))
  }

  async function undoMoveTo (taskId: number) {
    await taskService.undoMoveTo(taskId)
      .then(() => {
        tasks.value.push(backUpTask.value)
        setActiveTasks(1)
      })
  }

  async function getTaskById (id: number) {
    showTaskModal.value = true

    let task = tasks.value.find(t => t.id === id)

    if (!task) {
      task = await taskService.getTaskById(id).then((res) => res?.data.task)
    }

    setModalTask(task)
  }

  return {
    rows,
    tags,
    tasks,
    filters,
    modalTask,
    showOnTask,
    showTaskModal,
    recentlyViewed,
    showNewTaskModal,
    initialDataForNewTask,
    isScreenTaskView,
    taskCalendarEventDate,
    backUpTask,

    addRow,
    addTask,
    getRows,
    setTasks,
    getTasks,
    complete,
    copyLink,
    createRow,
    updateRow,
    deleteRow,
    duplicate,
    createTask,
    updateTask,
    deleteTask,
    addSubTask,
    undoMoveTo,
    getTaskById,
    getTaskTags,
    assignMember,
    setModalTask,
    toggleTaskTag,
    updateTaskTag,
    updateFilters,
    deleteTaskTags,
    unassignMember,
    changeTaskBook,
    handleUpdateRow,
    handleDeleteRow,
    handleDeleteTask,
    handleUpdateTask,
    handleAssignMember,
    toggleNewTaskModal,
    handleToggleTaskTag,
    handleUpdateSubTask,
    handleDeleteSubTask,
    getRecentlyViewedTasks,
    getTasksForTaskBoardPageWithFilters,
    disableEventType,
    setEventType,
    getCalendarList
  }
})

export function useTask () {
  const store = useTaskStore()

  return {
    ...store,
    ...storeToRefs(store)
  }
}
