
export default () => {
  function initInbox (parsedData) {
    if (parsedData.payload.type === 'create') {
      const { addNotification } = useInbox()
      addNotification(parsedData.payload.message)

      if (parsedData.payload.message?.title === 105) {
        const { updateBookTitle } = useBook()
        updateBookTitle({
          id: parsedData.payload.message.bookId,
          title: parsedData.payload.message.message
        })
      }
    }
  }

  return {
    initInbox
  }
}
