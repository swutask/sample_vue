import { bookService, projectService } from '@/services'
import { first, third, fourth, fifth } from './defaultTeamProjects'
import createTemplate from './createTemplate'
import createDefaultTask from './createDefaultTask'
import { attachmentService } from '@/pages/file-manager/attachment.service'
import { formatDate } from '@/core/helper-functions'

const images = [
  {
    url: 'https://helloivy-icons.s3.eu-central-1.amazonaws.com/default-project/default-1.jpeg',
    name: 'first.jpg',
    type: 'image/jpeg'
  },
  {
    url: 'https://helloivy-icons.s3.eu-central-1.amazonaws.com/default-project/default-2.jpeg',
    name: 'second.jpg',
    type: 'image/jpeg'
  },
  {
    url: 'https://helloivy-icons.s3.eu-central-1.amazonaws.com/logo/logo-complex.png',
    name: 'third.png',
    type: 'image/png'
  }
]

const imagesForSixthProject = [{
  url: 'https://helloivy-icons.s3.eu-central-1.amazonaws.com/default-project/default-4.jpg',
  name: 'first.jpg',
  type: 'image/jpeg'
}]

export default async ({ settings }) => {
  const { addBookToBooks, handleUpdateBookFolderId, folders } = useBook()

  const today = new Date()
  const dateTenDaysLater = new Date(today)
  dateTenDaysLater.setDate(today.getDate() + 14)
  // create first book
  const book = await bookService.create({
    title: 'Website redesign',
    subTitle: 'An example space to explore.',
    color: 'light-green',
    startDate: formatDate(new Date()),
    endDate: formatDate(dateTenDaysLater),
    icon: 'default-waves',
    isSample: true
  })

  addBookToBooks(book.data)

  await handleUpdateBookFolderId(book.data.id, folders.value[0].id)
  // create first project
  const firstProject = await projectService.add({
    bookId: book.data.id,
    title: 'Getting started with notes',
    icon: 'high-voltage',
    parentId: null,
    body: first()
  })

  const uploadedImages = {}
  for (const image of images) {
    const { data } = await attachmentService.proxy(image.url)
    const file = new File([data], image.name, { type: image.type })
    const formData = new FormData()
    formData.append('data', file, image.name)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const response = await attachmentService.upload({
      projectId: firstProject.data.id,
      data: formData,
      bookId: book.data.id
    })
    uploadedImages[image.name] = {
      id: response.data.id,
      url: response.data.url
    }
  }

  await projectService.edit(
    firstProject.data.id,
    {
      title: 'Getting started with notes',
      body: first(uploadedImages)
    }
  )

  // create third project
  const thirdProject = await projectService.add({
    bookId: book.data.id,
    title: 'Meeting notes',
    icon: 'file-folder',
    parentId: null,
    body: third()
  })

  // create fourth project

  const fourthProject = await projectService.add({
    bookId: book.data.id,
    title: '5 sept',
    icon: 'spiral-notepad',
    parentId: thirdProject.data.id,
    body: fourth()
  })

  // create fifth project
  const fifthProject = await projectService.add({
    bookId: book.data.id,
    title: '12 sept',
    icon: 'spiral-notepad',
    parentId: thirdProject.data.id,
    body: fifth()
  })

  for (const image of imagesForSixthProject) {
    const { data } = await attachmentService.proxy(image.url)
    const file = new File([data], image.name, { type: image.type })
    const formData = new FormData()
    formData.append('data', file, image.name)
  }

  // update third project
  await projectService.edit(
    thirdProject.data.id,
    {
      title: 'Meeting notes',
      body: third(book.data.id, fourthProject.data.id, fifthProject.data.id)
    }
  )

  // create templates
  await createTemplate({
    settings,
    project: fourthProject.data,
    isShared: true,
    name: 'Meeting notes'
  })

  await createDefaultTask({
    bookId: book.data.id
  })
}
