import { attachmentService } from '@/pages/file-manager/attachment.service'

export default async ({ bookId }) => {
  const { data } = await taskService.getTaskTags([bookId])

  const rowsData = await taskService.getRows({ bookId })

  const rows = rowsData.data.taskRows

  const updateRowsData = [
    { id: rows[0].id, title: 'To Watch' },
    { id: rows[1].id, title: 'Won’t recommend' },
    { id: rows[2].id, title: 'Recommend' },
    { id: rows[3].id, title: 'Top 25' }
  ]

  for (const { id, title } of updateRowsData) {
    await taskService.updateRow({ id, color: null, title, bookId })
  }

  if (!rows?.length) return

  const images = [
    { url: 'https://production-eu-uploads.s3.eu-central-1.amazonaws.com/defaultImages/shawshank.png', name: 'shawshank.png', type: 'image/png' },
    { url: 'https://production-eu-uploads.s3.eu-central-1.amazonaws.com/defaultImages/prestige.jpg', name: 'prestige.jpg', type: 'image/jpg' },
    { url: 'https://production-eu-uploads.s3.eu-central-1.amazonaws.com/defaultImages/gatsby.jpg', name: 'gatsby.jpeg', type: 'image/jpg' },
    { url: 'https://production-eu-uploads.s3.eu-central-1.amazonaws.com/defaultImages/cars-2.jpg', name: 'cars-2.jpg', type: 'image/jpg' },
    { url: 'https://production-eu-uploads.s3.eu-central-1.amazonaws.com/defaultImages/mrripley.jpg', name: 'mrripley.png', type: 'image/jpg' },
    { url: 'https://production-eu-uploads.s3.eu-central-1.amazonaws.com/defaultImages/pinocchio.png', name: 'pinocchio.png', type: 'image/png' },
    { url: 'https://production-eu-uploads.s3.eu-central-1.amazonaws.com/defaultImages/jurassic-world.jpeg', name: 'jurassic-world.jpeg', type: 'image/jpeg' },
    { url: 'https://production-eu-uploads.s3.eu-central-1.amazonaws.com/defaultImages/skyfall.jpg', name: 'skyfall.jpg', type: 'image/jpg' },
    { url: 'https://production-eu-uploads.s3.eu-central-1.amazonaws.com/defaultImages/nemo.jpeg', name: 'nemo.jpeg', type: 'image/jpeg' },
    { url: 'https://production-eu-uploads.s3.eu-central-1.amazonaws.com/defaultImages/catch-me.jpg', name: 'catch-me.jpg', type: 'image/jpg' },
    { url: 'https://production-eu-uploads.s3.eu-central-1.amazonaws.com/defaultImages/movie-gladiator.png', name: 'movie-gladiator.png', type: 'image/png' }
  ]

  const tagUpdates = [
    { name: 'Comedy', id: data.tags[2].id },
    { name: 'Drama', id: data.tags[1].id },
    { name: 'Animation', id: data.tags[3].id },
    { name: 'Action', id: data.tags[5].id }
  ]

  // Update Tags
  await Promise.all(tagUpdates.map(({ name, id }) =>
    taskService.updateTaskTag({ name, id, bookId })
  ))

  // Download images and create files
  const files = []
  for (const image of images) {
    const { data } = await attachmentService.proxy(image.url)
    const file = new File([data], image.name, { type: image.type })
    files.push(file)
  }

  const tasks = [
    { row: 0, title: 'Catch Me If You Can', subTitle: 'IMBD score: 8.8', tags: [data.tags[2].id], fileIndex: 9, order: 0 },
    { row: 0, title: 'Finding Nemo', subTitle: 'IMBD score: 8.3', tags: [data.tags[3].id], fileIndex: 8, order: 1 },
    { row: 0, title: 'James Bond - Skyfall', subTitle: 'IMBD score: 8.2', tags: [data.tags[5].id], fileIndex: 7, order: 2 },
    { row: 1, title: 'Jurassic World', subTitle: 'IMBD score: 6.9', fileIndex: 6, order: 0 },
    { row: 1, title: 'Pinocchio', subTitle: 'IMBD score: 5.2', fileIndex: 5, order: 1 },
    { row: 2, title: 'The Talented Mr. Ripley', subTitle: 'IMBD score: 7.9', tags: [data.tags[1].id], fileIndex: 4, order: 0 },
    { row: 2, title: 'Cars 2', subTitle: 'IMBD score: 6.2', fileIndex: 3, order: 1 },
    { row: 2, title: 'The Great Gatsby', subTitle: 'IMBD score: 7.2', fileIndex: 2, order: 2 },
    { row: 3, title: 'Gladiator', subTitle: 'IMBD score: 8.9', tags: [data.tags[1].id], fileIndex: 10, order: 0 },
    { row: 3, title: 'The Prestige', subTitle: 'IMBD score: 8.5', fileIndex: 1, order: 1 },
    { row: 3, title: 'The Shawshank Redemption', subTitle: 'IMBD score: 9.1', fileIndex: 0, order: 2 }
  ]

  // Create tasks and upload images
  for (const { row, title, subTitle, tags, fileIndex, order } of tasks) {
    const taskData = await taskService.create({
      isSample: true,
      order,
      title: `<strong><em>${title}</em></strong>`,
      subTitle,
      taskRowId: rows[row].id,
      tagIds: tags || [],
      bookId
    })

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
