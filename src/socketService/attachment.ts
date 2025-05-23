export default () => {
  const { addAttachment, deleteAttachment, deleteMultipleAttachment, updateName } = useAttachment()

  function create (parsedData) {
    addAttachment(parsedData.payload.value)
  }

  function deleteAttachmentFile (parsedData) {
    deleteAttachment(parsedData.payload.value)
  }

  function deleteMultipleAttachments (parsedData) {
    deleteMultipleAttachment(parsedData.payload.value)
  }

  function updateAttachmentName (parsedData) {
    updateName(parsedData.payload.value)
  }

  function initAttachment (parsedData) {
    if (parsedData.payload.type === 'create') {
      create(parsedData)
    } else if (parsedData.payload.type === 'delete') {
      deleteAttachmentFile(parsedData)
    } else if (parsedData.payload.type === 'deleteMultiple') {
      deleteMultipleAttachments(parsedData)
    } else if (parsedData.payload.type === 'updateName') {
      updateAttachmentName(parsedData)
    }
  }
  return {
    initAttachment
  }
}
