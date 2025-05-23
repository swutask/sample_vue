import { attachmentService } from '@/pages/file-manager/attachment.service'
import {
  gamesToPlay,
  bucketList,
  hotels,
  giftsForMom,
  cpeCode,
  vatNumber,
  newAddress,
  namesForBuisnes,
  moonPhase,
  meetingNotes,
  groceryList,
  houseAdvertisement
} from '@/onboarding/sample-spaces/notes/additionalInfoForNotes'

export default async ({ bookId }) => {
  const { updateTask } = useTask()

  const { data } = await taskService.getRows({ bookId })

  const rows = data.taskRows

  const updateRowsData = [
    { id: rows[0].id, title: 'Quick access notes' },
    { id: rows[1].id, title: 'Work notes' },
    { id: rows[2].id, title: 'Private notes' },
    { id: rows[3].id, title: 'Admin' }
  ]

  for (const { id, title } of updateRowsData) {
    await taskService.updateRow({ id, color: null, title, bookId })
  }

  if (!rows?.length) return

  const images = [
    { url: 'https://production-eu-uploads.s3.eu-central-1.amazonaws.com/defaultImages/hotels.png', name: 'hotels.png', type: 'image/png' },
    { url: 'https://production-eu-uploads.s3.eu-central-1.amazonaws.com/defaultImages/grocery-list.jpg', name: 'grocery-list.jpg', type: 'image/jpg' },
    { url: 'https://production-eu-uploads.s3.eu-central-1.amazonaws.com/defaultImages/moon-phases.png', name: 'moon-phases.png', type: 'image/png' },
    { url: 'https://production-eu-uploads.s3.eu-central-1.amazonaws.com/defaultImages/games-to-play.jpg', name: 'games-to-play.jpg', type: 'image/jpg' },
    { url: 'https://production-eu-uploads.s3.eu-central-1.amazonaws.com/defaultImages/house-advertisment-cover.png', name: 'house-advertisment-cover.png', type: 'image/png' },
    { url: 'https://production-eu-uploads.s3.eu-central-1.amazonaws.com/defaultImages/bucket-list.png', name: 'bucket-list.png', type: 'image/png' }
  ]

  const imagesForAdditionalInfo = [
    { url: 'https://production-eu-uploads.s3.eu-central-1.amazonaws.com/defaultImages/house1.png', name: 'house1.png', type: 'image/png' },
    { url: 'https://production-eu-uploads.s3.eu-central-1.amazonaws.com/defaultImages/house2.png', name: 'house2.png', type: 'image/png' }
  ]

  // Download images and create files
  const files = []
  for (const image of images) {
    const { data } = await attachmentService.proxy(image.url)
    const file = new File([data], image.name, { type: image.type })
    files.push(file)
  }

  const tasks = [
    { row: 0, title: 'Grocery list', subTitle: 'Weekly things to pick up', fileIndex: 1, order: 0, additionalInfo: groceryList },
    { row: 0, title: 'House advertisement', subTitle: 'Airbnb listing', fileIndex: 4, order: 1, additionalInfo: houseAdvertisement, hasImagesInside: true },
    { row: 1, title: 'Meeting notes', subTitle: '5 September board meeting', fileIndex: null, order: 0, additionalInfo: meetingNotes },
    { row: 1, title: 'The Moon Phases explained', subTitle: '', fileIndex: 2, order: 1, additionalInfo: moonPhase },
    { row: 1, title: 'Names for my new business', subTitle: 'Spooky Forest?', fileIndex: null, order: 2, additionalInfo: namesForBuisnes },
    { row: 2, title: 'Bucket list', subTitle: 'Once in a lifetime', fileIndex: 5, order: 0, additionalInfo: bucketList },
    { row: 2, title: 'Gift ideas for Mom', subTitle: 'Mother day\'s gifts', fileIndex: null, order: 1, additionalInfo: giftsForMom },
    { row: 2, title: 'Games to play', subTitle: 'For the coming year', fileIndex: 3, order: 2, additionalInfo: gamesToPlay },
    { row: 2, title: 'Hotels to once stay in', subTitle: 'Getting pampered', fileIndex: 0, order: 3, additionalInfo: hotels },
    { row: 3, title: 'CPE code', subTitle: '', fileIndex: null, order: 0, additionalInfo: cpeCode },
    { row: 3, title: 'Passport numbers family', subTitle: '', fileIndex: null, order: 1 },
    { row: 3, title: 'VAT number', subTitle: '', fileIndex: null, order: 2, additionalInfo: vatNumber },
    { row: 3, title: 'My new address', subTitle: '', fileIndex: null, order: 3, additionalInfo: newAddress }
  ]

  // Create tasks and upload images
  for (const { row, title, subTitle, fileIndex, order, additionalInfo, hasImagesInside } of tasks) {
    const taskData = await taskService.create({
      isSample: true,
      order,
      title,
      subTitle,
      taskRowId: rows[row].id,
      tagIds: [],
      additionalInfo: hasImagesInside ? '' : additionalInfo as string,
      bookId
    })

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

    if (hasImagesInside) {
      const imagesInside = {}
      for (const image of imagesForAdditionalInfo) {
        const { data } = await attachmentService.proxy(image.url)

        const file = new File([data], image.name, { type: image.type })

        const formDataForAdditionalInfo = new FormData()

        formDataForAdditionalInfo.append('data', file, image.name)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const response = await attachmentService.upload({
          taskId: taskData.data.id,
          data: formDataForAdditionalInfo,
          bookId
        })

        imagesInside[image.name] = { id: response.data.id, url: response.data.url }
      }

      await updateTask({
        id: taskData.data.id,
        additionalInfo: (additionalInfo as ((images) => string))(imagesInside),
        bookId
      })
    }
  }
}
