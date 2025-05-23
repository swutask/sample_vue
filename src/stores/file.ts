import localStorageService from '@/core/local-storage'

const useFileStore = defineStore('file', () => {
  const files = ref<IFile[]>(localStorageService.getItem('files') || [])

  function setFile (value: IFile) {
    const localFiles = JSON.parse(JSON.stringify(files.value))

    if (value.percent === -1) {
      delete localFiles[value.id]
    } else {
      localFiles[value.id] = {
        percent: value.percent,
        bookId: value.bookId || 'bookId',
        abort: value.abort
      }
    }

    files.value = localFiles
    localStorageService.setItem('files', localFiles)
  }

  function deleteFile (id: number) {
    const localFiles = JSON.parse(JSON.stringify(files.value))

    delete localFiles[id]

    files.value = localFiles
    localStorageService.setItem('files', localFiles)
  }

  return {
    files,
    setFile,
    deleteFile
  }
})

export function useFile () {
  const store = useFileStore()

  return {
    ...store,
    ...storeToRefs(store)
  }
}
