import { bookService } from '@/services'
import createNotesTasks from '@/onboarding/sample-spaces/notes/createNotesTasks'

export default async () => {
  const { addBookToBooks, folders, handleUpdateBookFolderId } = useBook()

  // create first book
  const book = await bookService.create({
    title: 'Notes',
    subTitle: '',
    color: 'light-green',
    icon: 'orange-book',
    isSample: true
  })

  addBookToBooks(book.data)

  handleUpdateBookFolderId(book.data.id, folders.value[0].id)

  await createNotesTasks({
    bookId: book.data.id
  })
}
