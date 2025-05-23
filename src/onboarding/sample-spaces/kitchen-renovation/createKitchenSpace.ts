import { bookService } from '@/services'
import createKitchenTasks from '@/onboarding/sample-spaces/kitchen-renovation/createKitchenTasks'

export default async () => {
  const { addBookToBooks, folders, handleUpdateBookFolderId } = useBook()

  // create first book
  const book = await bookService.create({
    title: 'Kitchen renovation',
    subTitle: '',
    color: 'light-green',
    icon: 'avocado',
    isSample: true
  })

  addBookToBooks(book.data)

  await handleUpdateBookFolderId(book.data.id, folders.value[0].id)

  await createKitchenTasks({
    bookId: book.data.id
  })
}
