import { bookService } from '@/services'
import createMovieTasks from '@/onboarding/sample-spaces/movie-space/createMovieTasks'

export default async () => {
  const { addBookToBooks, folders, handleUpdateBookFolderId } = useBook()

  // create first book
  const book = await bookService.create({
    title: 'Movies',
    subTitle: '',
    color: 'light-green',
    icon: 'movies-folder',
    isSample: true
  })

  addBookToBooks(book.data)

  await handleUpdateBookFolderId(book.data.id, folders.value[0].id)

  await createMovieTasks({
    bookId: book.data.id
  })
}
