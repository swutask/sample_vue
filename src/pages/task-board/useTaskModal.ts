import { prepareDate } from '@/core/helper-functions'
import { rrulestr, RRuleSet } from 'rrule'

import { attachmentService } from '@/pages/file-manager/attachment.service'

export default function useTaskModal () {
  const { isClient } = useProfile()
  const { files } = useFile()
  const { messages } = useChat()
  const { isAttachmentPreview, setNotification, blockHotKey } = useGeneral()
  const { isTeamAccount, team } = useTeam()
  const {
    modalTask,
    tasks,
    rows,
    tags: storedTags,
    isScreenTaskView,
    taskCalendarEventDate,
    complete,
    copyLink,
    updateTask,
    deleteTask,
    getTaskTags,
    setModalTask,
    toggleTaskTag,
    updateTaskTag,
    changeTaskBook,
    handleUpdateTask,
    getTasksForTaskBoardPageWithFilters
  } = useTask()

  const { books } = useBook()
  const { checkLimits, allowAddTasks, toggleLimitModal, currentPlan, getStats } = usePlan()

  const depthPageChatRef = ref(null)
  const preventScroll = ref(false)
  const isBookSelectOpened = ref(false)
  const mouseOverBookSelect = ref(false)

  const route = useRoute()
  const router = useRouter()

  const previewImage = ref(null)
  const showCoverImageModal = ref(false)
  const isCalendar = computed(() => route.name === 'Calendar' || route.name === 'CalendarTeam')
  const tags = computed(() => storedTags.value.filter(tag => tag.bookId === selectedBook.value?.id))
  const selectedBook = computed(() => books.value.find(b => b.id === modalTask.value.bookId))
  const computedModalTask = computed(() => tasks.value.find(e => e.id === modalTask.value?.id))

  const showSubtask = ref(false)

  const taskSubscription = ref(computedModalTask.value?.taskSubscriptions)

  const countMessages = computed(() => {
    const msgs = messages.value[modalTask.value.chat?.id] || []
    return msgs.length > 50 ? 50 : msgs.length
  })

  const showInModal = ref(true)
  const showInCard = ref(true)

  const hasSubscription = computed(() => !!modalTask.value?.taskSubscriptions?.length)

  const localTask = computed({
    get: () => {
      return modalTask.value
    },
    set: (value) => {
      handleUpdateTask({
        ...value,
        title: localTitle.value,
        subTitle: localSubTitle.value
      })
    }
  })

  watch(() => modalTask.value, (value) => {
    if (value) {
      localTitle.value = value?.title
      localSubTitle.value = value?.subTitle
    }
  })

  const isDeleteTaskWithRrule = computed(() => {
    const viewTypeData = useLocalStorage.getItem('taskBoardTypeV3') || {}

    return (isCalendar.value || viewTypeData?.[route.params?.id?.toString()]?.index === 2) && taskDates.value.rrule !== null
  })

  const sampleMembersSliceIndex = computed(() => Math.floor(Math.random() * (2 - 0 + 1) + 0))
  const sampleMembersCount = computed(() => {
    const result = Math.floor(Math.random() * (3 - 1 + 1) + 1)

    return result + sampleMembersSliceIndex.value > 3 ? 3 : result + sampleMembersSliceIndex.value
  })

  const taskDates = computed(() => ({
    groupDates: true,
    dates: prepareDate(modalTask.value.startDate, modalTask.value.endDate),
    start: modalTask.value.startDate || modalTask.value.endDate,
    end: modalTask.value.endDate,
    rrule: modalTask.value?.rrule
  }))

  const localTitle = ref(modalTask.value.title)
  const localSubTitle = ref(modalTask.value.subTitle)

  function getSortedBooks (array) {
    return array.sort((a, b) => (
      a.id === localTask.value.bookId && b.id !== localTask.value.bookId ? -1 : 1
    ))
  }

  const sortedBooks = computed(() => getSortedBooks(books.value))

  function close () {
    if (Object.values(files.value).some(item => item?.percent >= 0 && item.bookId === modalTask.value.bookId)) {
      setNotification({
        uuid: window.crypto.randomUUID(),
        message: 'Your file is still uploading, please wait for it to finish'
      })
      return false
    } else {
      if (!isAttachmentPreview.value) {
        nextTick(() => { setModalTask(null) })
        router.replace({ query: {} })
      }
    }
  }

  function onDeleteSubtask () {
    if (computedModalTask.value.subTask.length === 1) {
      showSubtask.value = false
    }
  }

  function scrollToEditor () {
    const element = document.getElementById('depthPageChatEditor')
    element.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  function handleToggleTaskTag ({ tag, isSelected, isUpdate }) {
    let taskTags = modalTask.value.taskTags || []

    if (isUpdate) {
      if (taskTags.length > 0) {
        const currentTagIndex = modalTask.value.taskTags.findIndex(item => item.id === tag.id)
        taskTags = modalTask.value.taskTags
        taskTags.splice(currentTagIndex, 1, { ...taskTags[currentTagIndex], name: tag.name })
      } else {
        taskTags = [tag]
      }
    } else {
      if (isSelected) {
        taskTags = taskTags.filter(t => t.id !== tag.id)
      } else {
        taskTags.push(tag)
      }

      toggleTaskTag({
        tag,
        taskId: modalTask.value.id,
        isSelected,
        bookId: modalTask.value.bookId
      })

      modalTask.value.taskTags = taskTags
    }

    handleUpdateTask({
      ...modalTask.value,
      taskTags
    })
  }

  function goToBook (bookId) {
    router.push({ name: 'TaskBoardTeam', params: { team: team.value.link, id: bookId } })
  }

  function assignToMilestone (milestone: IMilestone) {
    const isTaskAssignedToMilestone = milestone.id === modalTask.value.milestoneId
    if (isTaskAssignedToMilestone) {
      modalTask.value.milestoneId = null
      milestone.tasks = milestone.tasks.filter(item => modalTask.value.id !== item)
    } else {
      modalTask.value = {
        ...modalTask.value,
        milestoneId: milestone.id
      }
      milestone.tasks.push(modalTask.value.id)
    }
    // updateTask({
    //   ...modalTask.value
    // })
    //
    // handleUpdateTask({
    //   ...modalTask.value
    // })
  }

  function toggleDate (value) {
    const isStartEqualEnd = value.end === value.start

    updateTask({
      id: modalTask.value.id,
      bookId: modalTask.value.bookId,
      endDate: value.end,
      startDate: value.start,
      rrule: isStartEqualEnd ? value.rrule : null
    })

    modalTask.value.startDate = value.start
    modalTask.value.endDate = value.end

    handleUpdateTask({
      ...modalTask.value,
      bookId: modalTask.value.bookId,
      endDate: value.end,
      startDate: value.start,
      rrule: isStartEqualEnd ? value.rrule : null
    })

    if (route.name === 'TaskBoardTeam') {
      getTasksForTaskBoardPageWithFilters(+route.params.id)
    }
  }

  function updateTag ({ name, id }) {
    updateTaskTag({ name, id, bookId: modalTask.value.bookId })
  }

  let timer = null

  function saveTitle (value: string) {
    localTitle.value = value

    clearTimeout(timer)
    if (localTitle.value.trim() === '') {
      return
    }

    timer = setTimeout(() => {
      save('title', value)
    }, 600)
  }

  function saveSubTitle (value: string | null) {
    clearTimeout(timer)

    localSubTitle.value = value || ''

    timer = setTimeout(() => {
      save('subTitle')
    }, 350)
  }

  function save (prop: string, title?: string) {
    const data = {}

    data[prop] = localTask.value[prop]

    handleUpdateTask({
      ...modalTask.value,
      bookId: modalTask.value.bookId,
      ...data,
      title: title ? title?.replace(/<p><\/p>\s*/g, '') : localTitle.value,
      subTitle: localSubTitle.value || ''
    })

    updateTask({
      id: modalTask.value.id,
      bookId: modalTask.value.bookId,
      ...data,
      title: title ? title?.replace(/<p><\/p>\s*/g, '') : localTitle.value,
      subTitle: localSubTitle.value || ''
    })
  }

  function completeTask () {
    const completedAt = modalTask.value.completedAt ? null : new Date()

    complete({
      id: modalTask.value.id,
      bookId: modalTask.value.bookId,
      completedAt,
      task: modalTask.value
    })
  }

  function selectRow (value) {
    updateTask({
      id: modalTask.value.id,
      order: 0,
      taskRowId: value.id,
      bookId: modalTask.value.bookId
    })

    handleUpdateTask({
      id: modalTask.value.id,
      order: 0,
      taskRow: value,
      taskRowId: value.id
    })

    modalTask.value.taskRow = value

    const destinationDoneRows = ['done', 'completed']
    const shouldPreventCompleting = destinationDoneRows.includes(modalTask.value.taskRow.title.toLowerCase())

    if (destinationDoneRows.includes(value.title.toLowerCase()) && !shouldPreventCompleting) {
      completeTask()
    }
  }

  function handleDeleteTask () {
    if (isDeleteTaskWithRrule.value) {
      const localrrule = rrulestr(modalTask.value.rrule, { forceset: true }) as RRuleSet
      localrrule.exdate(taskCalendarEventDate.value)
      modalTask.value.rrule = localrrule.toString()

      updateTask({
        id: modalTask.value.id,
        bookId: modalTask.value.bookId,
        endDate: modalTask.value.endDate,
        startDate: modalTask.value.startDate,
        rrule: modalTask.value.rrule
      })

      handleUpdateTask({
        ...modalTask.value,
        bookId: modalTask.value.bookId,
        endDate: modalTask.value.endDate,
        startDate: modalTask.value.startDate,
        rrule: modalTask.value.rrule
      })
    } else {
      deleteTask({ id: modalTask.value.id, bookId: modalTask.value.bookId })
    }

    nextTick(() => {
      close()
    })
  }

  function changeCurrentBook (value) {
    const newBookTitle = books.value.find(e => e.id === value.id).title

    changeTaskBook({
      taskId: localTask.value.id,
      oldBookId: localTask.value.bookId,
      newBookId: value.id
    })
      .then((res) => {
        setNotification({
          uuid: window.crypto.randomUUID(),
          message: `Task moved to '${newBookTitle}' space`,
          type: 'taskBookChange',
          hasUndo: true,
          additionalInfo: {
            oldBookId: value.id,
            newBookId: localTask.value.bookId,
            localTaskId: localTask.value.id,
            newTaskId: res?.id
          }
        })
        close()
      })
  }

  async function uploadPreviewImage (event: Event) {
    const targetFiles = (event.target as HTMLInputElement).files as FileList
    const hasFiles = targetFiles.length

    if (!hasFiles) return

    const files = Array.from(targetFiles)

    if (files.length === 0) return

    const file = files[0]

    if (checkLimits(file.size)) {
      return
    }

    const reader = new FileReader()

    reader.onloadend = function () {
      if (showInModal.value) {
        previewImage.value = reader.result
      }

      handleUpdateTask({
        ...modalTask.value,
        attachments: [{
          url: reader.result as string,
          showInCard: showInCard.value,
          showInModal: showInModal.value
        }]
      })
      showCoverImageModal.value = false
    }

    reader.readAsDataURL(file)

    const formData = new FormData()
    formData.append('data', file)
    /* eslint-disable-next-line */
    // @ts-ignore
    await attachmentService.upload({
      taskId: modalTask.value.id,
      data: formData,
      showInModal: showInModal.value,
      showInCard: showInCard.value,
      isTaskThumbnail: true,
      bookId: modalTask.value.bookId
    }).then(res => {
      getStats()
      handleUpdateTask({
        ...modalTask.value,
        attachments: [{
          id: res.data.id,
          url: res.data?.url,
          showInCard: showInCard.value,
          showInModal: showInModal.value
        }]
      })
    })
  }

  async function deletePreviewImage () {
    await attachmentService.deleteTaskThumbnail({
      taskId: modalTask.value.id,
      id: modalTask.value.attachments[0]?.id
    })
    handleUpdateTask({
      ...modalTask.value,
      attachments: []
    })
    previewImage.value = null
  }

  async function changePreviewImage (event) {
    const oldAttachmentId = modalTask.value.attachments[0]?.id

    await uploadPreviewImage(event)
    attachmentService.deleteTaskThumbnail({
      taskId: modalTask.value.id,
      id: oldAttachmentId
    })
  }

  function toggleShowInCard (value) {
    if (modalTask.value.attachments.length) {
      taskService.updatePreview({
        imageId: modalTask.value.attachments[0]?.id,
        id: modalTask.value.id,
        bookId: modalTask.value.bookId,
        showInCard: value
      })

      handleUpdateTask({
        ...modalTask.value,
        attachments: [{
          id: modalTask.value.attachments[0]?.id,
          url: modalTask.value.attachments[0]?.url,
          showInCard: value,
          showInModal: showInModal.value
        }]
      })
    }

    showInCard.value = value
  }

  function toggleShowInPage (value) {
    if (modalTask.value.attachments.length) {
      taskService.updatePreview({
        imageId: modalTask.value.attachments[0]?.id,
        id: modalTask.value.id,
        bookId: modalTask.value.bookId,
        showInModal: value
      })

      previewImage.value = value ? modalTask.value.attachments[0]?.url : null

      handleUpdateTask({
        ...modalTask.value,
        attachments: [{
          id: modalTask.value.attachments[0]?.id,
          url: modalTask.value.attachments[0]?.url,
          showInCard: showInCard.value,
          showInModal: value
        }]
      })
    }

    showInModal.value = value
  }

  async function getTags () {
    getTaskTags([modalTask.value.bookId])
  }

  function toggleShowCoverImageModal () {
    if (isClient.value) return
    showCoverImageModal.value = !showCoverImageModal.value
  }

  function showNewSubtask () {
    if (!allowAddTasks.value) {
      toggleLimitModal({
        show: true,
        type: 'Special',
        title: 'You\'re Doing Great',
        // eslint-disable-next-line max-len
        description: `<p>You've reached the limit of
            <span class="font-semibold underline">${currentPlan.value?.maxTasks} tasks</span>
              on the free plan</p>`
      })

      return
    }

    showSubtask.value = !showSubtask.value
  }

  function toggleSubscription () {
    const id = modalTask.value.id
    hasSubscription.value ? taskService.unsubscribe(id) : taskService.subscribe(id)
    handleUpdateTask({
      ...localTask.value,
      taskSubscriptions: hasSubscription.value ? [] : taskSubscription.value
    })
  }

  function toggleView () {
    isScreenTaskView.value = !isScreenTaskView.value
    settingsService.update({ taskFullScreen: isScreenTaskView.value })
  }

  return {
    showSubtask,
    modalTask,
    showInModal,
    showInCard,
    previewImage,
    depthPageChatRef,
    route,
    router,
    // taskScreenSize,
    localTask,
    sortedBooks,
    countMessages,
    computedModalTask,
    isClient,
    isScreenTaskView,
    isDeleteTaskWithRrule,
    taskCalendarEventDate,
    localTitle,
    localSubTitle,
    isTeamAccount,
    sampleMembersCount,
    sampleMembersSliceIndex,
    tags,
    rows,
    taskDates,
    showCoverImageModal,
    preventScroll,
    mouseOverBookSelect,
    isBookSelectOpened,

    goToBook,
    blockHotKey,
    getTags,
    changeCurrentBook,
    scrollToEditor,
    toggleShowInPage,
    copyLink,
    handleDeleteTask,
    changePreviewImage,
    deletePreviewImage,
    saveTitle,
    saveSubTitle,
    selectRow,
    handleToggleTaskTag,
    updateTag,
    toggleDate,
    showNewSubtask,
    toggleShowCoverImageModal,
    uploadPreviewImage,
    toggleShowInCard,
    close,
    assignToMilestone,
    toggleSubscription,
    toggleView,
    completeTask,
    onDeleteSubtask
  }
}
