import { attachmentService } from '@/pages/file-manager/attachment.service'

const useAttachmentStore = defineStore('attachment', () => {
  const localAttachment = ref<IAttachment[]>([])
  const attachments = ref<IAttachment[]>([])
  const attachmentsCount = ref(0)
  const attachmentNameMaxLength = ref(48)

  async function updateAttachmentStatus (statusId, attachmentId) {
    try {
      const isChild = localAttachment.value[0]?.subversion.some(e => e.id === attachmentId)

      const localStatusId = isChild
        ? localAttachment.value[0]?.subversion.find(e => e.id === attachmentId)?.status
        : localAttachment.value[0]?.status

      await attachmentService.updateStatus(attachmentId, localStatusId === statusId ? null : statusId)

      const updateValue = { id: attachmentId, status: localStatusId === statusId ? null : statusId }

      localAttachment.value = updateArray(localAttachment.value, updateValue)
      attachments.value = updateArray(attachments.value, updateValue)
    } catch (error) {
      console.log(error)
    }
  }

  function addAttachment (value: IAttachment) {
    const preparedAttachments = attachments.value
    preparedAttachments.unshift(value)

    attachments.value = preparedAttachments
    attachmentsCount.value++
  }

  function deleteAttachment (id: number) {
    attachments.value = attachments.value.filter(item => item.id !== id)
    attachmentsCount.value--
  }

  function deleteMultipleAttachment (ids: number[]) {
    attachments.value = attachments.value.filter(item => !ids.includes(item.id))
    attachmentsCount.value = attachmentsCount.value - ids.length
  }

  function updateArray (array: IAttachment[], value: Partial<IAttachment>) {
    return array.map(item => {
      if (item.id === value.id) {
        return { ...item, ...value }
      } else if (item.subversion?.some(a => a.id === value.id)) {
        item.subversion = item.subversion.map((at: IAttachment) => {
          if (at.id === value.id) {
            return { ...at, ...value }
          }

          return at
        })
      }
      return item
    })
  }

  function updateName ({ id, name }: { id: number; name: string }) {
    attachments.value = updateArray(attachments.value, { id, name })
    localAttachment.value = updateArray(localAttachment.value, { id, name })
  }

  async function getAttachments ({ bookIds, limit, search }: { bookIds: number[]; limit: number; search?: string }) {
    const { data } = await attachmentService.getFilesForManager({ bookIds, limit, search })

    attachments.value = data.files
    attachmentsCount.value = data.count
  }

  async function getAttachmentsBySharedId (value: { id: number; projectId: number; shareId: string }) {
    const { data } = await attachmentService.getShareFile({
      id: value.id,
      projectId: value.projectId,
      shareId: value.shareId
    })

    localAttachment.value.unshift(data)

    return data
  }

  async function getAttachmentsById (
    { id, projectId, taskId }:
    { id: number; projectId: number; taskId: number }) {
    const { data } = await attachmentService.getFile({ id, projectId, taskId })

    localAttachment.value.unshift(data)

    return data
  }

  async function updateAttachmentName ({ name, id }: { id: number; name: string }) {
    const cuttedName = name.substring(0, attachmentNameMaxLength.value)

    await attachmentService.updateName({ name: cuttedName, id })

    updateName({ id, name: cuttedName })
  }

  async function deleteFromManager (id: number) {
    await attachmentService.deleteFromManager(id)

    deleteAttachment(id)
  }

  async function download (file: IAttachment) {
    attachmentService.proxy(file.url)
      .then(res => {
        const blob = res.data
        const blobUrl = window.URL.createObjectURL(blob)

        const a = document.createElement('a')
        a.setAttribute('href', blobUrl)
        a.setAttribute('download', `${file.name}.${file.key.split('.')[1]}`)
        document.body.appendChild(a)
        a.click()
        a.remove()
      })
  }

  async function createNewVersion ({ name, size, originalId }) {
    return attachmentService.setNewVersion({ name, size, originalId })
  }

  function addNewVersionToAttachments (parentId: number, attachment: IAttachment) {
    attachments.value.map(item => {
      if (item.id === parentId) {
        const localAttachment = item?.subversion?.length > 0 ? [...item.subversion] : []

        localAttachment.push(attachment)
        item.subversion = localAttachment
        item.subversionMessageCount = '0'
        return item
      }
      return item
    })
  }

  async function deleteVersion (parentId: number, attachmentId: number) {
    attachments.value.map(item => {
      if (item.id === parentId) {
        item.subversion = item.subversion.filter(a => a.id !== attachmentId)
        return item
      }
      return item
    })

    await attachmentService.deleteCompletely(attachmentId)
  }

  async function order (attachmentIds: number[]) {
    await attachmentService.order(attachmentIds).then(() => {
      attachmentIds.forEach((item, index) => updateArray(attachments.value, { id: item, order: index }))
    })
  }

  async function setMessageCount (attachmentId: number, { messageCount }: { messageCount: number }) {
    const isChild = localAttachment.value[0]?.subversion.some(e => e.id === attachmentId)

    if (isChild) {
      attachments.value = updateArray(attachments.value, { id: localAttachment.value[0].id, subversionMessageCount: messageCount.toString() })
    } else {
      attachments.value = updateArray(attachments.value, {
        id: localAttachment.value[0].id,
        chat: {
          ...localAttachment.value[0].chat,
          messageCount: messageCount.toString()
        }
      })
    }
  }

  return {
    attachments,
    attachmentsCount,
    localAttachment,
    attachmentNameMaxLength,
    addAttachment,
    deleteAttachment,
    deleteMultipleAttachment,
    updateName,
    getAttachments,
    getAttachmentsById,
    getAttachmentsBySharedId,
    updateAttachmentName,
    deleteFromManager,
    download,
    createNewVersion,
    deleteVersion,
    addNewVersionToAttachments,
    updateAttachmentStatus,
    order,
    updateArray,
    setMessageCount
  }
})

export function useAttachment () {
  const store = useAttachmentStore()

  return {
    ...store,
    ...storeToRefs(store)
  }
}
