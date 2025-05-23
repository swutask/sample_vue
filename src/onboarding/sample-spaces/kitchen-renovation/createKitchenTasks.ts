import { attachmentService } from '@/pages/file-manager/attachment.service'

export default async ({ bookId }) => {
  const { complete } = useTask()
  const { data } = await taskService.getRows({ bookId })

  const rows = data.taskRows

  const updateRowsData = [
    { id: rows[0].id, title: 'To arrange', color: 12148735 },
    { id: rows[1].id, title: 'Up next', color: 8947848 },
    { id: rows[2].id, title: 'Done', color: 6291359 },
    { id: rows[3].id, title: 'Inspiration', color: 6284031 }
  ]

  for (const { id, title, color } of updateRowsData) {
    await taskService.updateRow({ id, color, title, bookId })
  }

  if (!rows?.length) return

  const images = [
    { url: 'https://production-eu-uploads.s3.eu-central-1.amazonaws.com/defaultImages/kitchen-floor.jpg', name: 'kitchen-floor.jpg', type: 'image/jpg' },
    { url: 'https://production-eu-uploads.s3.eu-central-1.amazonaws.com/defaultImages/shelves.png', name: 'shelves.png', type: 'image/png' },
    { url: 'https://production-eu-uploads.s3.eu-central-1.amazonaws.com/defaultImages/measurements.png', name: 'measurements.png', type: 'image/png' },
    { url: 'https://production-eu-uploads.s3.eu-central-1.amazonaws.com/defaultImages/counter-top.jpg', name: 'counter-top.jpg', type: 'image/jpg' },
    { url: 'https://production-eu-uploads.s3.eu-central-1.amazonaws.com/defaultImages/kitchen-island.jpg', name: 'kitchen-island.png', type: 'image/jpg' },
    { url: 'https://production-eu-uploads.s3.eu-central-1.amazonaws.com/defaultImages/tiles-agains-wall.jpg', name: 'tiles-agains-wall.jpg', type: 'image/v' }
  ]

  // Download images and create files
  const files = []
  for (const image of images) {
    const { data } = await attachmentService.proxy(image.url)
    const file = new File([data], image.name, { type: image.type })
    files.push(file)
  }

  const tasks = [
    { row: 0, title: 'Shelves', subTitle: '', fileIndex: 1, order: 0 },
    { row: 0, title: 'Finalize budget', subTitle: '', fileIndex: null, order: 1 },
    { row: 0, title: 'Hire handyman', subTitle: 'For power sockets and installation of cupboards', fileIndex: null, order: 2 },
    { row: 0, title: 'Pick kitchen floor', subTitle: 'Wood or stone?', fileIndex: 0, order: 3 },
    { row: 1, title: 'Measurements', subTitle: '', fileIndex: 2, order: 0, urgency: 4 },
    { row: 1, title: 'Pick counter top', subTitle: 'Let\'s go marble?', fileIndex: 3, order: 1 },
    { row: 2, title: 'Meeting kitchen designer', subTitle: '', fileIndex: null, order: 0, completedAt: new Date() },
    { row: 2, title: 'Pick appliances', subTitle: '', fileIndex: null, order: 1, completedAt: new Date() },
    { row: 3, title: 'Kitchen island', subTitle: '', fileIndex: 4, order: 0 },
    { row: 3, title: 'Tiles against wall?', subTitle: '', fileIndex: 5, order: 1 },
    { row: 3, title: 'For more Complex use cases', subTitle: '<a href="https://complex.so/use-cases" target="_blank">https://complex.so/use-cases</a>', fileIndex: null, order: 2 }
  ]

  // Create tasks and upload images
  for (const { row, title, subTitle, fileIndex, order, urgency, completedAt } of tasks) {
    const taskData = await taskService.create({
      isSample: true,
      order,
      title,
      subTitle,
      taskRowId: rows[row].id,
      tagIds: [],
      bookId,
      urgentStatus: urgency || null
    })

    if (completedAt) {
      await complete({
        id: taskData.data.id,
        bookId: taskData.data.bookId,
        completedAt,
        task: taskData.data,
        showNotification: false,
        isForSampleSpace: true
      })
    }

    if (fileIndex !== null) {
      const formData = new FormData()
      formData.append('data', files[fileIndex])

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await attachmentService.upload({
        taskId: taskData.data.id,
        data: formData,
        showInModal: true,
        showInCard: true,
        isTaskThumbnail: true,
        bookId
      })
    }
  }
}
