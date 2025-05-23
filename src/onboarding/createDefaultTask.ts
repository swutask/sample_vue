import { attachmentService } from '@/pages/file-manager/attachment.service'
import { formatDate } from '@/core/helper-functions'
import dayjs from 'dayjs'

export default async ({ bookId }) => {
  const { data } = await taskService.getTaskTags([bookId])

  const { complete } = useTask()

  const rowsData = await taskService.getRows({ bookId })

  const rows = rowsData?.data?.taskRows

  if (rows?.length === 0) return

  const images = [
    {
      url: 'https://production-eu-uploads.s3.eu-central-1.amazonaws.com/defaultImages/cover-1.png',
      name: 'cover 1.png',
      type: 'image/png'
    },
    {
      url: 'https://production-eu-uploads.s3.eu-central-1.amazonaws.com/defaultImages/feed-1.2.jpg',
      name: 'cover 2.jpg',
      type: 'image/jpeg'
    },
    {
      url: 'https://production-eu-uploads.s3.eu-central-1.amazonaws.com/defaultImages/cover-4.jpg',
      name: 'cover 4.jpeg',
      type: 'image/jpeg'
    },
    {
      url: 'https://production-eu-uploads.s3.eu-central-1.amazonaws.com/defaultImages/cover-5.gif',
      name: 'cover 5.gif',
      type: 'image/gif'
    },
    {
      url: 'https://production-eu-uploads.s3.eu-central-1.amazonaws.com/defaultImages/cover-6.png',
      name: 'cover 6.png',
      type: 'image/png'
    },
    {
      url: 'https://production-eu-uploads.s3.eu-central-1.amazonaws.com/defaultImages/cover-7.png',
      name: 'cover 7.png',
      type: 'image/png'
    },
    {
      url: 'https://production-eu-uploads.s3.eu-central-1.amazonaws.com/defaultImages/buy-paint-color.png',
      name: 'buy-paint-color.png',
      type: 'image/png'
    }
  ]

  const files = []
  for (const image of images) {
    const { data } = await attachmentService.proxy(image.url)
    const file = new File([data], image.name, { type: image.type })
    files.push(file)
  }

  await taskService.updateTaskTag({
    name: 'example',
    id: data.tags[2].id,
    bookId
  })

  await taskService.updateTaskTag({
    name: 'Copy',
    id: data.tags[0].id,
    bookId
  })

  await taskService.updateTaskTag({
    name: 'Design',
    id: data.tags[1].id,
    bookId
  })

  await taskService.updateTaskTag({
    name: 'Tech',
    id: data.tags[3].id,
    bookId
  })

  await taskService.updateTaskTag({
    name: 'Meeting',
    id: data.tags[4].id,
    bookId
  })

  await taskService.updateTaskTag({
    name: 'Launch!',
    id: data.tags[5].id,
    bookId
  })

  await taskService.updateTaskTag({
    name: 'Team',
    id: data.tags[6].id,
    bookId
  })

  // row 1 - task 1
  await taskService.create({
    isSample: true,
    order: 0,
    title: 'Set up the blog',
    subTitle: '<p>AKA The Magazine</p>',
    additionalInfo: '',
    urgentStatus: 2,
    taskRowId: rows[0].id,
    bookId,
    tagIds: [data.tags[3].id]
  })

  // row 1 - task 2
  const task2Row1 = await taskService.create({
    isSample: true,
    order: 1,
    title: 'Update image for "Add tasks" section',
    subTitle: '',
    additionalInfo: '',
    taskRowId: rows[0].id,
    bookId,
    tagIds: [data.tags[1].id],
    startDate: formatDate(dayjs()),
    endDate: formatDate(dayjs())
  })

  const formDataRow1Task2 = new FormData()
  formDataRow1Task2.append('data', files[6])

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  await attachmentService.upload({
    taskId: task2Row1.data.id,
    data: formDataRow1Task2,
    showInModal: true,
    showInCard: true,
    isTaskThumbnail: true,
    bookId
  })

  // row 1 - task 3
  await taskService.create({
    isSample: true,
    order: 2,
    title: '11:00 - Website V0.9 review meeting',
    subTitle: '',
    additionalInfo: '',
    taskRowId: rows[0].id,
    bookId,
    tagIds: [data.tags[4].id],
    startDate: formatDate(dayjs().add(1, 'day')),
    endDate: formatDate(dayjs().add(1, 'day'))
  })

  // row 1 - task 4
  await taskService.create({
    isSample: true,
    order: 3,
    title: '<p>Finalize copy for <em>About </em>and <em>Features </em>pages</p>',
    subTitle: '',
    additionalInfo: '',
    taskRowId: rows[0].id,
    bookId,
    tagIds: [data.tags[0].id]
  })

  // row 1 - task 5
  await taskService.create({
    isSample: true,
    order: 4,
    title: 'Launch website 🎉',
    subTitle: '',
    additionalInfo: '',
    taskRowId: rows[0].id,
    bookId,
    tagIds: [data.tags[5].id],
    startDate: formatDate(dayjs().add(2, 'day')),
    endDate: formatDate(dayjs().add(2, 'day'))
  })

  // row 1 finished ------------------

  // row 2 - task 1
  await taskService.create({
    isSample: true,
    order: 0,
    title: 'Invite Filipa to the space',
    subTitle: '',
    additionalInfo: '',
    taskRowId: rows[1].id,
    bookId,
    tagIds: [data.tags[6].id]
  })

  // row 2 - task 2
  await taskService.create({
    isSample: true,
    order: 1,
    title: 'Change main theme color to DarkMaroon (#d8479)',
    subTitle: '',
    additionalInfo: '',
    taskRowId: rows[1].id,
    bookId,
    tagIds: [data.tags[1].id]
  })

  // row 2 - task 3
  const task3Row2 = await taskService.create({
    isSample: true,
    order: 2,
    title: 'Set up welcome email',
    subTitle: 'Let\'s add this GIF, it\'s awesome.',
    additionalInfo: '',
    taskRowId: rows[1].id,
    tagIds: [data.tags[3].id],
    bookId
  })

  const formDataRow2Task3 = new FormData()
  formDataRow2Task3.append('data', files[3])

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  await attachmentService.upload({
    taskId: task3Row2.data.id,
    data: formDataRow2Task3,
    showInModal: true,
    showInCard: true,
    isTaskThumbnail: true,
    bookId
  })

  // row 2 finished ------------------
  // row 3 - task 1
  await taskService.create({
    isSample: true,
    order: 0,
    title: 'Finalize Figma designs',
    additionalInfo: '',
    taskRowId: rows[2].id,
    tagIds: [data.tags[1].id],
    bookId,
    startDate: formatDate(dayjs().add(7, 'day')),
    endDate: formatDate(dayjs().add(7, 'day'))
  })

  // row 3 - task 2
  await taskService.create({
    isSample: true,
    order: 1,
    title: 'Proofread homepage text',
    additionalInfo: '',
    taskRowId: rows[2].id,
    tagIds: [data.tags[3].id],
    bookId
  })

  // row 3 - task 3
  await taskService.create({
    isSample: true,
    order: 2,
    title: 'Set up staging environment',
    additionalInfo: '',
    urgentStatus: 4,
    taskRowId: rows[2].id,
    tagIds: [data.tags[3].id],
    bookId,
    startDate: formatDate(dayjs().add(14, 'day')),
    endDate: formatDate(dayjs().add(14, 'day'))
  })

  // row 3 finished ------------------
  // row 4 - task 1
  const task1Row4 = await taskService.create({
    isSample: true,
    order: 0,
    title: 'Pick website editor',
    subTitle: 'Framer ✅',
    additionalInfo: '',
    taskRowId: rows[3].id,
    bookId
  })

  await complete({
    id: task1Row4.data.id,
    bookId: task1Row4.data.bookId,
    completedAt: new Date(),
    task: task1Row4.data,
    showNotification: false,
    isForSampleSpace: true
  })

  // row 4 - task 2
  const task2Row4 = await taskService.create({
    isSample: true,
    order: 1,
    title: 'Add Developer Rick to the space',
    additionalInfo: '',
    taskRowId: rows[3].id,
    bookId
  })

  await complete({
    id: task2Row4.data.id,
    bookId: task2Row4.data.bookId,
    completedAt: new Date(),
    task: task2Row4.data,
    showNotification: false,
    isForSampleSpace: true
  })

  // row 4 - task 3
  const task3Row4 = await taskService.create({
    isSample: true,
    order: 2,
    title: 'Complete Lottie animations',
    additionalInfo: '',
    taskRowId: rows[3].id,
    bookId
  })

  await complete({
    id: task3Row4.data.id,
    bookId: task3Row4.data.bookId,
    completedAt: new Date(),
    task: task3Row4.data,
    showNotification: false,
    isForSampleSpace: true
  })

  // row 4 - task 4
  const task4Row4 = await taskService.create({
    isSample: true,
    order: 3,
    title: 'Upload header image for the first blog post',
    additionalInfo: '',
    taskRowId: rows[3].id,
    bookId
  })

  await complete({
    id: task4Row4.data.id,
    bookId: task4Row4.data.bookId,
    completedAt: new Date(),
    task: task4Row4.data,
    showNotification: false,
    isForSampleSpace: true
  })

  const formDataRow4Task4 = new FormData()
  formDataRow4Task4.append('data', files[0])

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  await attachmentService.upload({
    taskId: task4Row4.data.id,
    data: formDataRow4Task4,
    showInModal: true,
    showInCard: true,
    isTaskThumbnail: true,
    bookId
  })
}
