import { formatDate } from '@/core/helper-functions'
import { attachmentService } from '@/pages/file-manager/attachment.service'

export default async (onboarding?: IAuthOnboarding) => {
  const today = new Date()
  const tomorrow = new Date()
  const dateTwentyDaysLater = new Date(today)
  const dateFourDaysLater = new Date(today)

  dateTwentyDaysLater.setDate(today.getDate() + 20)
  dateFourDaysLater.setDate(today.getDate() + 4)
  tomorrow.setDate(today.getDate() + 1)

  const book = await bookService.create({
    title: onboarding?.bookTitle || 'Welcome',
    subTitle: '',
    order: 0,
    favorite: true,
    icon: onboarding?.bookIcon || 'vaporwave',
    startDate: formatDate(today),
    endDate: formatDate(dateTwentyDaysLater)
  })

  const { getMember } = useTeam()
  const { getRows } = useTask()

  const member = await getMember()
  const rows = await getRows(book.data.id)

  if (rows?.length === 0) return

  if (onboarding && onboarding.task1Title?.trim() !== '') {
    await taskService.create({
      title: onboarding.task1Title,
      taskRowId: rows[0].id,
      startDate: formatDate(tomorrow),
      endDate: formatDate(tomorrow),
      bookId: book.data.id,
      teamMembers: [member?.id]
    })
  }
  if (onboarding && onboarding.task2Title?.trim() !== '') {
    await taskService.create({
      title: onboarding.task2Title,
      taskRowId: rows[1].id,
      startDate: formatDate(today),
      endDate: formatDate(today),
      bookId: book.data.id,
      teamMembers: [member?.id]
    })
  }

  // const subTitleDownloadLink = '<a href="https://complex.so/#downloads" target="_blank">https://complex.so/downloads</a>'

  // await taskService.create({
  //   title: 'Download Complex on all your devices📱🤖🍏',
  //   subTitle: subTitleDownloadLink,
  //   taskRowId: rows[1].id,
  //   startDate: formatDate(today),
  //   endDate: formatDate(today),
  //   bookId: book.data.id,
  //   teamMembers: [member?.id]
  // })

  const additionalInfo = `
<p>When you open a task, you'll discover its full range of possibilities. You can set a due date, assign a priority, add reminders, and so much more. 
The description field is incredibly versatile—think of it as a full-fledged document where you can add everything you need,
 from notes and images to links and attachments.
</p>
<p></p>
<h3><strong>Here's some tips</strong></h3>
<ul>
<li data-type="listItem">
    <p>Use the keyboard shortcut Alt + C to create a new task at any time.</p>
  </li>

  <li data-type="listItem">
  <p>Use the '@' symbol to easily link to another task within the same space.</p>
</li>

 <li data-type="listItem">
  <p>A task is <em>always</em> part of a space, make sure you save it to the correct one.</p>
</li> 

 <li data-type="listItem">
  <p>Right-click a task to explore additional options.</p>
</li>

  <li data-type="listItem">
    <p>Invite other people to view your spaces and collaborate.</p>
  </li>

  <li data-type="listItem">
    <p>For inspiration, check out these examples:</p> <a href="https://complex.so/use-cases">https://complex.so/use-cases</a>
  </li>
</ul>
<p></p>
<p>When you're ready to <strong>upgrade to Complex PRO</strong>
 for unlimited tasks, reminders, Google Calendar Sync and increased storage space, you can
 <button label="Upgrade Here" class="localLink" style="text-decoration: underline;">Upgrade Here</button>
</p>
<p></p>
<p><strong>Enjoy being more productive!</strong></p>
<p></p>
`

  const task = await taskService.create({
    title: 'Welcome to Complex 👋',
    additionalInfo,
    taskRowId: rows[0].id,
    bookId: book.data.id,
    teamMembers: [member?.id],
    startDate: formatDate(today),
    endDate: formatDate(today)
  })

  const images = [
    {
      url: 'https://production-eu-uploads.s3.eu-central-1.amazonaws.com/defaultImages/cover-4.jpg',
      name: 'cover 4.jpeg',
      type: 'image/jpeg'
    }
  ]

  const files = []
  for (const image of images) {
    const { data } = await attachmentService.proxy(image.url)
    const file = new File([data], image.name, { type: image.type })
    files.push(file)
  }

  const formData0 = new FormData()
  formData0.append('data', files[0])

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  await attachmentService.upload({
    taskId: task.data.id,
    data: formData0,
    showInModal: true,
    showInCard: true,
    isTaskThumbnail: true,
    bookId: book.data.id
  })

  return book.data
}
